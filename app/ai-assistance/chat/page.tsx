  "use client";

  import { useState, useRef, useEffect } from "react";
  import { products } from "@/components/sections/Products";
  import { productInfo } from "@/components/data/productInfo";
  import Link from "next/link";
  import {
    Bot,
    ArrowLeft,
    Send,
    Sparkles,
    Package,
    Factory,
    Truck,
    FileText,
  } from "lucide-react";
  import { error } from "console";
  import LocationModal from "@/components/chat/LocationModal";

  export default function AIChatPage() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<
      { 
        sender: "user" | "ai"; 
        text: string;
        timestamp: Date;
      }[]
    >([]);
    const [quotationMode, setQuotationMode] = useState(false);
    const [quotationCompleted, setQuotationCompleted] = useState(false);
    const [quotationConfirmation, setQuotationConfirmation] = useState(false);
    const [showConfirmationButtons, setShowConfirmationButtons] = useState(false);
    const [quotationSubmitted, setQuotationSubmitted] = useState(false);
    const [showProductsMenu, setShowProductsMenu] = useState(false);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [quotationEnabled, setQuotationEnabled] = useState(false);
    const [deliveryEnabled, setDeliveryEnabled] = useState(false);
    const [showLocationButtons, setShowLocationButtons] = useState(false);
    const [deliveryLocation, setDeliveryLocation] = useState<{
      address: string;
      city: string;
      state: string;
      country: string;
      pincode: string;
      latitude: number;
      longitude: number;
    } | null>(null);
    const [showLocationConfirm, setShowLocationConfirm] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [orderItems, setOrderItems] = useState<
      {
        product: string;
        quantity: string;
        unit: string;
      }[]
    >([]);

    const [currentItem, setCurrentItem] = useState({
      product: "",
      quantity: "",
      unit: "",
    });
    const [deliveryMode, setDeliveryMode] = useState<
      "domestic" | "international" | null
    >(null);

    const [showDeliveryButtons, setShowDeliveryButtons] = useState(false);
    const [deliveryButtonsFor, setDeliveryButtonsFor] = useState<number | null>(null);
    const [showMoreProductsButtons, setShowMoreProductsButtons] =
      useState(false);
    const [editField, setEditField] = useState<
      | "company"
      | "contact"
      | "email"
      | "phone"
      | "location"
      | "all"
      | null
    >(null);
    const [showEditButtons, setShowEditButtons] = useState(false);
    const [pendingConfirmation, setPendingConfirmation] = useState(false);
    const [quotationStep, setQuotationStep] = useState<
      "company" |
      "contact" |
      "email" |
      "phone" |
      "location" |
      "completed"
    >("company");
    const [quotationData, setQuotationData] = useState({
      company: "",
      contact: "",
      email: "",
      phone: "",
      country: "",
      city: "",
    });
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const botError = (text: string) => {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: `❌ ${text}`,
            timestamp: new Date(),
          },
        ]);
      }, 500);
    };

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, [messages]);

    const handleCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
              );

              const data = await response.json();

              const address = data.display_name;

              const city =
                data.address.city ||
                data.address.city_district ||
                data.address.county ||
                data.address.town ||
                data.address.village ||
                data.address.municipality ||
                "Pune";

              const state = data.address.state || "";

              const country = data.address.country || "";

              const pincode = data.address.postcode || "";

              setDeliveryLocation({
                address,
                city,
                state,
                country,
                pincode,
                latitude,
                longitude,
              });

              setShowLocationButtons(false);
              setShowLocationConfirm(true);
              setMessages((prev) => [
                ...prev,
                {
                  sender: "ai",
                  text: `<strong>📍 Delivery Location</strong>
 
                  <strong>Address:</strong>
                  ${address}
                  <strong>City:</strong>
                  ${city}
                  <strong>State:</strong>
                  ${state}
                  <strong>Pincode:</strong>
                  ${pincode}
                  <strong>Latitude:</strong>
                  ${latitude}
                  <strong>Longitude:</strong>
                  ${longitude}
 
                  Is this correct?`,
                  timestamp: new Date(),
                },
              ]);
            } catch (error) {
              console.error("Error getting location:", error);
              botError("Unable to get your current location. Please try again.");
            }
          },
          (error) => {
            console.error("Error getting location:", error);
            botError("Unable to get your current location. Please try again.");
          }
        );
      } else {
        botError("Geolocation is not supported by your browser.");
      }
    };

    const sendMessage = async (text?: string) => {
      const userMessage = text || message;

      if (!userMessage.trim()) return;

      setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
        timestamp: new Date(),
      },
    ]);

      setMessage("");

      if (editField) {
        let updatedData = { ...quotationData };

        switch (editField) {
          case "company":
            if (userMessage.trim().length < 2) {
              botError("Company name must contain at least 2 characters.");
              return;
            }
            updatedData.company = userMessage.trim();
            break;

          case "contact":
            if (userMessage.trim().length < 2) {
              botError("Contact person must contain at least 2 characters.");
              return;
            }
            updatedData.contact = userMessage.trim();
            break;

          case "email":
            const emailRegex =
              /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

            if (!emailRegex.test(userMessage.trim())) {
              botError("Please enter a valid email address.");
              return;
            }

            updatedData.email = userMessage.trim();
            break;

          case "phone":
            const phone = userMessage.replace(/\s/g, "");

            if (
              !/^\d{10}$/.test(phone) &&
              !/^\+\d{1,4}\d{8,12}$/.test(phone)
            ) {
              botError(
                "Please enter:\n• a 10-digit mobile number\n• or an international format with country code (e.g., +965XXXXXXXX)"
              );
              return;
            }

            updatedData.phone = phone;
            break;

          case "location":

            const countries = {
              Kuwait: ["Kuwait City", "Hawally", "Farwaniya", "Ahmadi", "Salmiya"],
              India: ["Mumbai", "Delhi", "Ahmedabad", "Surat", "Pune"],
              UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
              Oman: ["Muscat", "Salalah"],
              Qatar: ["Doha"],
              Bahrain: ["Manama"],
              "Saudi Arabia": ["Riyadh", "Jeddah", "Dammam"],
            };
  
            const parts = userMessage.split(",");

            if (parts.length !== 2) {
              botError("Please enter Country, City");
              return;
            }

            const country = parts[0].trim();
            const city = parts[1].trim();

            if (!(country in countries)) {
              botError("Country is not supported.");
              return;
            }

            if (
              !countries[country as keyof typeof countries].includes(city)
            ) {
              botError(`"${city}" is not a valid city in ${country}.`);
              return;
            }

            updatedData.country = country;
            updatedData.city = city;
            break;
        }

        setQuotationData(updatedData);

        setEditField(null);

        setQuotationConfirmation(true);

        setShowConfirmationButtons(true);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "ai",
              text: `✅ Details updated successfully.

      Please review your details:

      🏢 Company: ${updatedData.company}
      👤 Contact: ${updatedData.contact}
      📧 Email: ${updatedData.email}
      📱 Phone: ${updatedData.phone}
      🌍 Country: ${updatedData.country}
      🏙️ City: ${updatedData.city}

      Are these details correct?`,
      timestamp: new Date(),
            },
          ]);
        }, 600);

        return;
      }

      if (quotationConfirmation) {
        const answer = userMessage.trim().toLowerCase();

        if (["yes", "y", "correct", "confirm"].includes(answer)) {
          setShowConfirmationButtons(false);
          setQuotationConfirmation(false);
          setQuotationCompleted(true);
          setQuotationMode(false);

          setQuotationSubmitted(true);

          setDeliveryEnabled(true);

          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
              sender: "ai",
              text: `✅ Thank you for your quotation request.

              Your requested items have been recorded successfully.
              Our Representative Agent will connect with you shortly to discuss pricing, availability, and delivery details.
              If you have any additional requirements, please let us know.`,
              timestamp: new Date(),
            },
            {
              sender: "ai",
              text: "Thank you for contacting FS Enterprises. How else may I assist you?",
              timestamp: new Date(),
            },
            ]);
          }, 600);

          return;
        }

        if (["no", "n", "incorrect", "cancel"].includes(answer)) {
          setQuotationConfirmation(false);
          setShowConfirmationButtons(false);
          setShowEditButtons(true);
          
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                sender: "ai",
                text: "Which detail would you like to update?",
                timestamp: new Date(),
              },
            ]);
          }, 600);
          
          return;
        }

        botError("Please answer with 'yes' or 'no'.");
        return;
      }

      if (quotationMode && !quotationCompleted) {
        // ==========================
        // COMPANY NAME
        // ==========================
        if (quotationStep === "company") {

          if (userMessage.trim().length < 2) {
            botError("Company name must contain at least 2 characters.");
            return;
          }

          setQuotationData(prev => ({
            ...prev,
            company: userMessage.trim(),
          }));

          setQuotationStep("contact");

          setTimeout(() => {
              setMessages(prev => [
                  ...prev,
                  {
                      sender: "ai",
                      text: "<strong>👤 Please enter the Contact Person's Name.</strong>",
                      timestamp: new Date(),
                  },
              ]);
          }, 600);

          return;
        }

        // ==========================
        // CONTACT PERSON
        // ==========================
        if (quotationStep === "contact") {
          
          if (userMessage.trim().length < 2) {
            botError("Contact person must contain at least 2 characters.");
            return;
          }

          setQuotationData(prev => ({
            ...prev,
            contact: userMessage.trim(),
          }));

          setQuotationStep("email");

          setTimeout(() => {
              setMessages(prev => [
                  ...prev,
                  {
                      sender: "ai",
                      text: "<strong>📧 Please enter your Email Address.</strong>",
                      timestamp: new Date(),
                  },
              ]);
          }, 600);

          return;
        }

        // ==========================
        // EMAIL
        // ==========================
        if (quotationStep === "email") {
          
          const emailRegex = 
              /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
          
          if (!emailRegex.test(userMessage.trim())) {
            botError("Please enter a valid email address.");
            return;
          }
          
          setQuotationData(prev => ({
            ...prev,
            email: userMessage.trim(),
          }));
          
          setQuotationStep("phone");
          
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              {
                sender: "ai",
                text: "<strong>📱 Please enter your Phone / WhatsApp Number.</strong>",
                timestamp: new Date(),
              },
            ]);
          }, 600);
          
          return;
        }

        // ==========================
        // PHONE
        // ==========================
        if (quotationStep === "phone") {

          const phone = userMessage.replace(/\s/g, "");

          // Accept 10-digit number directly
          if (/^\d{10}$/.test(phone)) {
          
          setQuotationData(prev => ({
            ...prev,
            phone,
          }));
          
          setQuotationStep("location");
          
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              {
                sender: "ai",
                text: 
                  "<strong>📍 Please enter your Country and City.</strong>\n\nExample:\nIndia, Mumbai",
                timestamp: new Date(),
              },
            ]);
          }, 600);
          
          return;
        }

        // Accept international format
        if (/^\+\d{1,4}\d{8,12}$/.test(phone)) {

          setQuotationData(prev => ({
              ...prev,
              phone,
          }));
          
          setQuotationStep("location");
          
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              {
                sender: "ai",
                text: 
                  "<strong>📍 Please enter your Country and City.</strong>\n\nExample:\nKuwait, Hawally",
                timestamp: new Date(),
              },
            ]);
          }, 600);
          
          return;
        }

        botError(
          `<strong>Please enter:</strong>
              • a 10-digit mobile number
              • or an international format with country code (e.g., +965XXXXXXXX)`
        );
        return;
        }

        // ==========================
        // LOCATION
        // ==========================
        if (quotationStep === "location") {
          const countries = {
              Kuwait: [
                  "Kuwait City",
                  "Hawally",
                  "Farwaniya",
                  "Ahmadi",
                  "Salmiya",
              ],

              India: [
                  "Mumbai",
                  "Delhi",
                  "Ahmedabad",
                  "Surat",
                  "Pune",
              ],

              UAE: [
                  "Dubai",
                  "Abu Dhabi",
                  "Sharjah",
                  "Ajman",
              ],

              Oman: [
                  "Muscat",
                  "Salalah",
              ],

              Qatar: [
                  "Doha",
              ],

              Bahrain: [
                  "Manama",
              ],

              "Saudi Arabia": [
                  "Riyadh",
                  "Jeddah",
                  "Dammam",
              ],
          };

          const parts = userMessage.split(",");

          if (parts.length !== 2) {
              botError(
                  "Please enter your Country and City in this format:\n\nCountry, City"
              );
              return;
          }

          const country = parts[0].trim();
          const city = parts[1].trim();

          if (!(country in countries)) {
              botError("Country is not supported.");
              return;
          }

          if (
              !countries[country as keyof typeof countries].includes(city)
          ) {
              botError(`"${city}" is not a valid city in ${country}.`);
              return;
          }

          const updatedQuotationData = {
              ...quotationData,
              country,
              city,
          };

          setQuotationData(updatedQuotationData);
          setQuotationStep("completed");
          setQuotationConfirmation(true);
          setShowConfirmationButtons(true);

          setTimeout(() => {
              setMessages(prev => [
                  ...prev,
                  {
                      sender: "ai",
                      text: `</strong>Please review your details:</strong>
                      
                      <strong>🏢 Company:</strong> ${updatedQuotationData.company}
                      <strong>👤 Contact:</strong> ${updatedQuotationData.contact}
                      <strong>📧 Email:</strong> ${updatedQuotationData.email}
                      <strong>📞 Phone:</strong> ${updatedQuotationData.phone}
                      <strong>🌍 Country:</strong> ${updatedQuotationData.country}
                      <strong>🏙️ City:</strong> ${updatedQuotationData.city}
                      
                      Are these details correct?`,
                      timestamp: new Date(),
                  },
              ]);
          }, 600);

          return;
        }
      }

      setTimeout(() => {
        let reply =
          "Thank you for contacting FS Enterprises. How else may I assist you?";

        const product =
          productInfo[userMessage as keyof typeof productInfo];

        if (product) {
          reply = `
        🧻 ${product.title}

        ${product.description}

        Product Features

        ${product.features.map(f => `• ${f}`).join("\n")}

        Available Variants

        ${product.variants.map(v => `• ${v}`).join("\n")}

        Available Sizes

        ${product.sizes.map(s => `• ${s}`).join("\n")}

        Applications

        ${product.applications.map(a => `• ${a}`).join("\n")}

        Customization Options

        ${product.customization.map(c => `• ${c}`).join("\n")}

        Minimum Order Quantity

        ${product.moq}

        Need a quotation for ${product.title}?
        Just tell me the quantity required.
        `;
        }

        if (
          userMessage.toLowerCase().includes("product") ||
          userMessage === "Show Products"
        ) {
          setShowProductsMenu(true);
          reply =
            `We manufacture a wide range of premium tissue products.
            
            Please choose a product below.`;
        }

        if (userMessage.toLowerCase().includes("quotation")) {
          setQuotationMode(true);
          setQuotationCompleted(false);
          setQuotationSubmitted(false);
          setQuotationConfirmation(false);
          setShowConfirmationButtons(false);
          setShowEditButtons(false);
          setQuotationStep("company");

          setQuotationData({
            company: "",
            contact: "",
            email: "",
            phone: "",
            country: "",
            city: "",
          });
          reply = `Certainly! I'd be happy to prepare a quotation for you.

          Before we begin, could you please provide the following details:

          <strong>🏢 Please enter your Company Name.</strong>`;
        }

        if (userMessage === "Domestic Delivery") {

          reply = `🇮🇳 Domestic Delivery (From Pune, Maharashtra)

          We deliver across India through trusted logistics partners:

          • Delhivery
          • Blue Dart
          • DTDC
          • TCI Express
          • Safe Express
          • VRL Logistics
          • Gati
          • Xpressbees
          • India Post

          📦 Estimated Delivery

          • Maharashtra: 1–3 Business Days
          • West India: 2–4 Business Days
          • North India: 3–6 Business Days
          • South India: 3–6 Business Days
          • North-East India: 5–8 Business Days

          Our logistics partner is selected based on:

          • Shipment Size
          • Destination
          • Delivery Timeline
          • Customer Preference

          Need a delivery estimate?

          Please provide:

          • City
          • Quantity Required`;
        }

        if (userMessage === "International Export") {

          reply = `🌍 International Export

          We export tissue products worldwide from Pune, India.

          International Logistics Partners

          • DHL Express
          • FedEx
          • UPS
          • Aramex
          • Maersk
          • MSC (Mediterranean Shipping Company)
          • CMA CGM
          • Hapag-Lloyd

          Shipping Options

          • Air Freight
          • Sea Freight (FCL)
          • Sea Freight (LCL)
          • Express Courier
          • Door-to-Door Delivery

          📦 Export Documentation

          • Commercial Invoice
          • Packing List
          • Certificate of Origin
          • Export Documentation
          • Shipping Coordination

          🌎 Export Destinations

          • UAE
          • Kuwait
          • Qatar
          • Oman
          • Bahrain
          • Saudi Arabia
          • Africa
          • Europe
          • North America
          • Asia-Pacific

          ⏱ Estimated Transit Time

          • Air Freight: 3–10 Business Days
          • Sea Freight: 15–40 Days

          Need an export quotation?

          Please provide:

          • Country
          • City
          • Product
          • Quantity`;
        }

        if (

          userMessage !== "Domestic Delivery" &&
          userMessage !== "International Export" &&
          (
            userMessage.toLowerCase().includes("delivery") ||
            userMessage.toLowerCase().includes("export") ||
            userMessage.toLowerCase().includes("shipping") ||
            userMessage.toLowerCase().includes("logistics")
          )
        ) {
          setShowDeliveryButtons(true);

          reply =
            `🚚 Delivery & Export Services

            Would you like information about:

            • 📍 Local Delivery (Within Pune)
            • 🇮🇳 Domestic Delivery (Within India)
            • 🌍 International Export Shipping (Outside India)`;
        }

        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: reply,
            timestamp: new Date(),
          },
        ]);

        if (product) {
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                sender: "ai",
                text: "Would you like to know about our other products?",
                timestamp: new Date(),
              },
            ]);

            setShowMoreProductsButtons(true);
          }, 700);
        }
      }, 800);
    };
    const handleSuggestion = (text: string) => {
      setMessage(text);
    };

    return (
      <main className="flex h-screen flex-col bg-gradient-to-br from-[#f7faf9] via-white to-[#edf7f3]">

        {/* Header - Fixed */}

        <header className="shrink-0 border-b border-black/5 bg-white/90 backdrop-blur-xl">

          <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-6 sm:py-5">

            <div className="flex items-center gap-3 sm:gap-4">

              <Link
                href="/ai-assistance"
                className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:bg-gray-100 sm:h-11 sm:w-11"
              >
                <ArrowLeft size={18} />
              </Link>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white sm:h-10 sm:w-10">

                <Bot className="h-4 w-4 sm:h-5 sm:w-5" />

              </div>

              <div>

                <h1 className="text-base font-bold text-dark sm:text-xl">

                  FS AI Assistant

                </h1>

                <p className="text-xs text-green-600 sm:text-sm">

                  ● Online

                </p>

              </div>

            </div>

            <Sparkles className="text-primary h-8 w-8 sm:h-9 sm:w-9" />

          </div>

        </header>

        {/* Chat Area - Scrollable */}

        <div className="flex-1 overflow-y-auto px-4 sm:px-6">

          {/* Welcome Screen */}

          <div className="mx-auto max-w-4xl py-8 sm:py-10">

            {/* Welcome Card */}

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-lg">

                <Bot className="h-5 w-5" />

              </div>

              <div className="w-full max-w-[700px] rounded-2xl bg-white px-5 py-4 shadow">

                <h3 className="text-sm font-semibold text-dark sm:text-base">

                  Hello 👋

                </h3>

                <p className="mt-2 text-xs leading-6 text-muted sm:mt-3 sm:text-sm sm:leading-7">

                  Welcome to FS Enterprises.

                  I'm your AI Assistant.

                  Ask me anything about products,
                  quotations,
                  manufacturing,
                  exports,
                  pricing,
                  delivery,
                  or bulk orders.

                </p>

              </div>

            </div>

            {/* Suggestion Buttons */}

            <div className="mt-5 mb-8 ml-[52px] flex flex-wrap gap-3">

              {[
                {
                  icon: Package,
                  title: "Products",
                  prompt: "Tell me about your tissue paper products.",
                },
                {
                  icon: FileText,
                  title: "Quotation",
                  prompt: "I would like to request a quotation.",
                },
                {
                  icon: Truck,
                  title: "Delivery",
                  prompt: "What are your delivery and export options?",
                },
              ].map(({ icon: Icon, title, prompt }) => (

                <button
                  key={title}
                  disabled={
                    quotationMode ||
                    (title === "Quotation" && !quotationEnabled) ||
                    (title === "Delivery" && !deliveryEnabled)
                  }
                  onClick={() => sendMessage(prompt)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm shadow transition sm:gap-3 sm:px-5 sm:py-3 ${
                    (title === "Quotation" && !quotationEnabled) ||
                    (title === "Delivery" && !deliveryEnabled)
                      ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 opacity-60"
                      : quotationMode
                      ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                      : "cursor-pointer border-primary/20 bg-white hover:bg-primary hover:text-white shadow-glow hover:shadow-[0_0_25px_rgba(31,107,79,0.5)]"
                  }`}
                >

                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />

                  {title}

                </button>

              ))}

            </div>

            {/* Empty State */}

            {messages.length === 0 && (
              <div className="flex flex-1 items-center justify-center py-12 sm:py-20">

                <div className="max-w-xl px-4 text-center">

                  <Bot
                    className="mx-auto h-20 w-20 text-primary sm:h-28 sm:w-28"
                  />

                  <h2 className="mt-6 text-lg font-bold sm:mt-8 sm:text-3xl">

                    Start a Conversation

                  </h2>

                  <p className="mt-3 text-xs leading-6 text-muted sm:mt-4 sm:text-base sm:leading-8">

                    Type your question below or select one of the suggestions above to
                    begin chatting with the FS AI Assistant.

                  </p>

                </div>

              </div>
            )}

          </div>

          {/* Messages - Only show when there are messages */}

          {messages.length > 0 && (
            <div className="mx-auto max-w-4xl space-y-4 py-6 sm:space-y-6">

              {messages.map((msg, index) => (

                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                  }`}
                >

                  {/* AI Avatar */}

                  {msg.sender === "ai" && (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-lg">

                      <Bot className="h-5 w-5" />

                    </div>
                  )}

                  {/* Message Bubble */}

                  <div
                    className={`max-w-[90%] rounded-2xl px-5 py-3 shadow md:max-w-[650px] lg:max-w-[700px] sm:rounded-2xl sm:px-5 sm:py-3 ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-tr-sm"
                        : "bg-white rounded-tl-sm"
                    }`}
                  >
                    <div className="relative">
                      <div
                        className="whitespace-pre-line text-sm leading-6 sm:text-base sm:leading-8"
                        dangerouslySetInnerHTML={{ __html: msg.text }}
                      />

                      {msg.timestamp && (
                        <div className="mt-2 flex justify-end">
                          <span
                            className={`text-[11px] ${
                              msg.sender === "user"
                                ? "text-white/70"
                                : "text-gray-500"
                            }`}
                          > 
                            {msg.timestamp.toLocaleString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Dropdown */}

                    {msg.sender === "ai" &&
                      showProductsMenu &&
                      index === messages.length - 1 && (

                        <div className="mt-4">

                          <select
                            className="w-full rounded-xl border border-primary/20 bg-white px-4 py-3"
                            onChange={(e) => {
                              setSelectedProduct(e.target.value);

                              setCurrentItem(prev => ({
                                ...prev,
                                product: e.target.value
                              }));

                              setQuotationEnabled(true);

                              sendMessage(e.target.value);
                              setShowProductsMenu(false);
                            }}
                          >
                            <option value="">Select a product...</option>
                            {products.map((product) => (
                              <option 
                                key={product.title} 
                                value={product.title}
                              >
                                {product.title}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                    {/* Follow-up Suggestions */}

                    {msg.sender === "ai" &&
                      showDeliveryButtons &&
                      msg.text.includes("Would you like information about") &&
                      index === messages.findLastIndex(
                        (m) =>
                          m.sender === "ai" &&
                          m.text.includes("Would you like information about")
                      ) && (

                        <div className="mt-4 flex flex-wrap gap-3">

                          <button
                            onClick={() => {
                              setShowDeliveryButtons(false);

                              setMessages((prev) => [
                                ...prev,
                                {
                                  sender: "user",
                                  text: "Local Delivery (Pune)",
                                  timestamp: new Date(),
                                },
                                {
                                  sender: "ai",
                                  text: `📍 Local Delivery (Pune)

                      We provide fast and reliable local delivery services across Pune and nearby areas.
                      
                      🚚 Local Delivery Options

                      • Same-Day Delivery (Selected Areas)
                      • Next-Day Delivery
                      • Scheduled Delivery
                      • Bulk Order Delivery
                      • Factory Pickup Available

                      📦 Suitable For

                      • Retail Stores                    
                      • Supermarkets
                      • Hotels
                      • Restaurants
                      • Hospitals
                      • Offices
                      • Distributors
                      • Wholesalers
                      
                      ⏱ Estimated Delivery Time

                      • Central Pune: Same Day
                      • Pimpri-Chinchwad: Same Day
                      • Nearby Pune Areas: 1 Business Day

                      🚛 Delivery Methods

                      • Company Delivery Vehicle
                      • Trusted Local Logistics Partners

                      Need a local delivery estimate?

                      Please provide:

                      • Area / Location in Pune
                      • Product Required
                      • Quantity`,
                                  timestamp: new Date(),
                                },
                              ]);

                              // Second: After 800ms, ask for location
                              setTimeout(() => {
                                setMessages((prev) => [
                                  ...prev,
                                  {
                                    sender: "ai",
                                    text: `📍 Please share your delivery location.`,
                                    timestamp: new Date(),
                                  }
                                ]);

                                setShowLocationButtons(true);
                              }, 800);
                            }}
                            className="rounded-full border border-blue-300 bg-white px-5 py-2 text-blue-600 transition hover:bg-blue-50 cursor-pointer"
                          >
                            📍 Local (Pune)
                          </button>

                          <button
                            onClick={() => {
                              setShowDeliveryButtons(false);
                              setMessages((prev) => [
                                ...prev,
                                { 
                                  sender: "user", 
                                  text: "Domestic Delivery", 
                                  timestamp: new Date(), 
                                },
                                {
                                  sender: "ai",
                                  text: `🇮🇳 Domestic Delivery (From Pune, Maharashtra)
                          
                              We deliver across India through trusted logistics partners:

                              • Delhivery
                              • Blue Dart
                              • DTDC
                              • TCI Express
                              • Safe Express
                              • VRL Logistics
                              • Gati
                              • Xpressbees
                              • India Post

                              📦 Estimated Delivery

                              • Maharashtra: 1–3 Business Days
                              • West India: 2–4 Business Days
                              • North India: 3–6 Business Days
                              • South India: 3–6 Business Days
                              • North-East India: 5–8 Business Days

                              Need a delivery estimate?

                              Please provide:

                              • City
                              • Quantity Required`,
                                  timestamp: new Date(),
                                },
                              ]);

                              setTimeout(() => {
                                setMessages((prev) => [
                                  ...prev,
                                  {
                                    sender: "ai",
                                    text: `📍 Please share your delivery location.`,
                                    timestamp: new Date(),
                                  }
                                ]);

                                setShowLocationButtons(true);
                              }, 800);
                            }}
                            
                            className="rounded-full border border-green-300 bg-white px-5 py-2 text-green-600 transition hover:bg-green-50 cursor-pointer"
                          >
                            🇮🇳 Domestic
                          </button>

                          <button
                            onClick={() => {
                              setShowDeliveryButtons(false);
                              setMessages(prev => [    
                                  ...prev,
                                  {
                                      sender: "user",
                                      text: "International Export",
                                      timestamp: new Date(),
                                  },
                                  {
                                      sender: "ai",
                                      text: `🌍 International Export

                      We export tissue products worldwide from Pune, India.

                      International Logistics Partners

                      • DHL Express
                      • FedEx
                      • UPS
                      • Aramex
                      • Maersk
                      • MSC (Mediterranean Shipping Company)
                      • CMA CGM
                      • Hapag-Lloyd

                      Shipping Options

                      • Air Freight
                      • Sea Freight (FCL)
                      • Sea Freight (LCL)
                      • Express Courier
                      • Door-to-Door Delivery

                      📦 Export Documentation

                      • Commercial Invoice
                      • Packing List
                      • Certificate of Origin
                      • Export Documentation
                      • Shipping Coordination

                      🌎 Export Destinations

                      • UAE
                      • Kuwait
                      • Qatar
                      • Oman
                      • Bahrain
                      • Saudi Arabia
                      • Africa
                      • Europe
                      • North America
                      • Asia-Pacific

                      ⏱ Estimated Transit Time

                      • Air Freight: 3–10 Business Days
                      • Sea Freight: 15–40 Days

                      Need an export quotation?

                      Please provide:

                      • Country
                      • City
                      • Product
                      • Quantity`,
                      timestamp: new Date(),
                              },
                          ]);

                          setTimeout(() => {
                            setMessages((prev) => [
                              ...prev,
                              {
                                sender: "ai",
                                text: `📍 Please share your delivery location.`,
                                timestamp: new Date(),
                              }
                            ]);

                            setShowLocationButtons(true);
                          }, 800);
                        }}
                        className="rounded-full border border-red-300 bg-white px-5 py-2 text-red-600 transition hover:bg-red-50 cursor-pointer"
                      >
                          🌍 International
                      </button>

                    </div>

                    )}

                    {msg.sender === "ai" &&
                      showMoreProductsButtons &&
                      index === messages.length - 1 && (

                        <div className="mt-4 flex flex-wrap gap-3">

                          <button
                            onClick={() => {
                              setShowMoreProductsButtons(false);
                              setShowProductsMenu(true);

                              setMessages((prev) => [
                                ...prev,
                                {
                                  sender: "ai",
                                  text: `We manufacture a wide range of premium tissue products.

                                  Please choose a product below.`,
                                  timestamp: new Date(),
                                },
                              ]);

                              setShowProductsMenu(true);
                            }}
                            className="rounded-full border border-green-300 bg-white px-5 py-2 text-green-600 transition hover:bg-green-50"
                          >
                            ✅ Yes
                          </button>

                          <button
                            onClick={() => {
                              setShowMoreProductsButtons(false);

                              setMessages((prev) => [
                                ...prev,
                                {
                                  sender: "user",
                                  text: "No",
                                  timestamp: new Date(),
                                },
                                {
                                  sender: "ai",
                                  text: "📦 Please provide your order details.",
                                  timestamp: new Date(),
                                },
                              ]);

                              setShowOrderForm(true);
                            }}
                            className="rounded-full border border-red-300 bg-white px-5 py-2 text-red-600 transition hover:bg-red-50"
                          >
                            ❌ No
                          </button>
                        </div>
                      )
                    }

                    {msg.sender === "ai" &&
                      showLocationButtons &&
                      msg.text.includes("Please share your delivery location.") && (

                        <div className="mt-4 flex flex-wrap gap-3">

                          <button
                            onClick={handleCurrentLocation}
                            className="rounded-full border border-green-300 bg-white px-5 py-2 text-green-600 hover:bg-green-50 cursor-pointer"
                          >
                            📍 Use Current Location
                          </button>

                          <button
                            onClick={()=>{
                              setShowMap(true);
                            }}
                            className="rounded-full border border-blue-300 bg-white px-5 py-2 text-blue-600 hover:bg-blue-50 cursor-pointer"
                          >
                            🗺️ Choose on Map
                          </button>
                        </div>
                      )
                    }

                    {msg.sender === "ai" &&
                      showOrderForm &&
                      msg.text.includes("Please provide your order details.") && (

                      <div className="mt-4 rounded-xl border p-4 bg-gray-50 space-y-4">

                        <select
                          value={currentItem.product}
                          onChange={(e) =>
                            setCurrentItem(prev => ({
                              ...prev,
                              product: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg border p-3"
                        >
                          <option value="">Select Product</option>

                          {products.map((item) => (
                            <option key={item.title} value={item.title}>
                              {item.title}
                            </option>
                          ))}
                        </select>

                        <input
                          type="number"
                          min={1}
                          placeholder="Quantity"
                          value={currentItem.quantity}
                          onChange={(e) =>
                            setCurrentItem(prev => ({
                              ...prev,
                              quantity: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg border p-3"
                        />

                        <select
                          value={currentItem.unit}
                          onChange={(e) =>
                            setCurrentItem(prev => ({
                              ...prev,
                              unit: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg border p-3"
                        >
                          <option value="">Select Unit</option>
                          <option value="Boxes">Boxes</option>
                          <option value="Packs">Packs</option>
                          <option value="Rolls">Rolls</option>
                          <option value="Cartons">Cartons</option>
                          <option value="Pieces">Pieces</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => {

                            if (
                              !currentItem.product ||
                              !currentItem.quantity ||
                              !currentItem.unit
                            ) {
                              botError("Please complete this product.");
                              return;
                            }

                            setOrderItems(prev => [...prev, currentItem]);

                            setCurrentItem({
                              product: "",
                              quantity: "",
                              unit: "",
                            });

                          }}
                          className="w-full rounded-lg border border-primary py-3 text-primary hover:bg-primary hover:text-white cursor-pointer"
                        >
                          ➕ Add Product
                        </button>

                        {orderItems.length > 0 && (
                          <div className="rounded-lg border bg-white p-4">
                            <h3 className="mb-3 font-semibold">
                              Added Products
                            </h3>
                            <table className="w-full text-sm">
                              <thead>
                                <tr>
                                  <th className="text-left">Product</th>
                                  <th className="text-center">Qty</th>
                                  <th className="text-center">Unit</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orderItems.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.product}</td>
                                    <td className="text-center">{item.quantity}</td>
                                    <td className="text-center">{item.unit}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        <button
                          className="w-full rounded-lg bg-primary py-3 text-white cursor-pointer"
                          onClick={() => {

                            let items = [...orderItems];

                            if (
                              currentItem.product &&
                              currentItem.quantity &&
                              currentItem.unit
                            ) {
                              items.push(currentItem);
                            }

                            if (items.length === 0) {
                              botError("Please add at least one product.");
                              return;
                            }

                            setOrderItems(items);

                            setShowOrderForm(false);

                            setQuotationMode(true);
                            setQuotationStep("company");

                            setMessages(prev => [
                              ...prev,
                              {
                                sender: "ai",
                                text: "✅ Order details recorded successfully.",
                                timestamp: new Date(),
                              },
                              {
                                sender: "ai",
                                text: "Please proceed with the quotation by clicking the button below.",
                                timestamp: new Date(),
                              },
                            ]);

                          }}
                        >
                          Continue
                        </button>

                      </div>
                    )}

                    {msg.sender==="ai" &&
                      showLocationConfirm &&
                      msg.text.includes("Delivery Location") && (
 
                        <div className="mt-4 flex gap-3">
 
                          <button
                            onClick={()=>{
                              setShowLocationConfirm(false);
                              setMessages(prev=>[
                                ...prev,
                                {
                                  id: Date.now(),
                                  sender: "ai",
                                  text: "✅ Location confirmed.",
                                  timestamp: new Date(),
                                },
 
                                // Delivery + Contact Summary
                                {
                                  sender: "ai",
                                  text: `<strong>📋 Delivery Request Summary</strong>
 
                                  ━━━━━━━━━━━━━━━━━━━━
                                  <strong>👤 Contact Details</strong>
 
                                  <strong>Company:</strong>
                                  ${quotationData.company || "Not Provided"}
                                  <strong>Contact Person:</strong>
                                  ${quotationData.contact || "Not Provided"}
                                  <strong>Email:</strong>
                                  ${quotationData.email || "Not Provided"}
                                  <strong>Phone:</strong>
                                  ${quotationData.phone || "Not Provided"}
 
                                  ━━━━━━━━━━━━━━━━━━━━
                                  <strong>📍 Delivery Address</strong>
 
                                  <strong>Address:</strong>
                                  ${deliveryLocation?.address || ""}
                                  <strong>City:</strong>
                                  ${deliveryLocation?.city || ""}
                                  <strong>State:</strong>
                                  ${deliveryLocation?.state || ""}
                                  <strong>Pincode:</strong>
                                  ${deliveryLocation?.pincode || ""}
 
                                  ━━━━━━━━━━━━━━━━━━━━
                                  <strong>📦 Order Details</strong>

                                  <div style="margin-top:12px;">
                                    ${orderItems
                                      .map(
                                        (item) => `
                                        <div
                                          style="
                                            border:1px solid #e5e7eb;
                                            border-radius:10px;
                                            padding:10px;
                                            margin-bottom:10px;
                                          "
                                        >
                                          <strong>Product:</strong> ${item.product}<br>
                                          <strong>Quantity:</strong> ${item.quantity}<br>
                                          <strong>Unit:</strong> ${item.unit}
                                        </div>
                                      `
                                      )
                                      .join("")}
                                  </div>
 
                                  ━━━━━━━━━━━━━━━━━━━━
                                  <strong>Additional Notes:</strong>
                                  No additional notes provided.`,
                                  timestamp: new Date(),
                                }
                              ]);
                            }}
                            className="
                              rounded-4xl
                              border
                              border-green-500
                              px-4
                              py-2
                              text-sm
                              font-medium
                              text-green-700
                              transition-all
                              duration-300
                              hover:bg-green-500/20
                              hover:text-green-600
                              active:scale-95
                              cursor-pointer
                              min-w-[120px]
                              sm:min-w-[150px]
                            "
                          >
                            ✅ Confirm
                          </button>
 
                          <button
                            onClick={()=>{
                              setShowLocationConfirm(false);
                              setMessages((prev) => {
                                const last = prev[prev.length - 1];
 
                                // Prevent duplicate prompt
                                if (
                                  last?.sender === "ai" &&
                                  last.text === "📍 Please share your delivery location."
                                ) {
                                  return prev;
                                }
 
                                return [
                                  ...prev,
                                  {
                                    id: Date.now(),
                                    sender: "ai",
                                    text: "📍 Please share your delivery location.",
                                    timestamp: new Date(),
                                  }
                                ];
                              });
 
                              setShowLocationButtons(true);
                            }}
                            className="
                              rounded-4xl
                              border
                              border-blue-500
                              bg-white
                              px-4
                              py-2
                              text-sm
                              font-medium
                              text-blue-700
                              transition-all
                              duration-300
                              hover:bg-blue-500/20
                              hover:text-blue-600
                              active:scale-95
                              cursor-pointer
                              min-w-[120px]
                              sm:min-w-[150px]
                            "
                          >
                            🔄 Choose Again
                          </button>
                        </div>
                      )
                    }
 
                    {msg.sender === "ai" &&
                      quotationConfirmation &&
                      showConfirmationButtons &&
                      msg.text.includes("Are these details correct?") && (
                        <div className="mt-4 flex gap-3">

                          <button
                            onClick={() => sendMessage("yes")}
                            className="rounded-full border border-green-300 bg-white px-5 py-2 text-green-600 transition hover:bg-green-50"
                          >
                            ✅ Yes
                          </button>

                          <button
                            onClick={() => sendMessage("no")}
                            className="rounded-full border border-red-300 bg-white px-5 py-2 text-red-600 transition hover:bg-red-50"
                          >
                            ❌ No
                          </button>
                        </div>
                      )
                    }

                    {msg.sender === "ai" &&
                      showEditButtons &&
                      msg.text.includes("Which detail would you like to update?") && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          
                          <button
                            onClick={() => {
                              setEditField("company");
                              setShowEditButtons(false);
                              setMessages((prev) => [
                                ...prev,
                                {
                                  sender: "ai",
                                  text: "<strong>🏢 Please enter the new Company Name.</strong>",
                                  timestamp: new Date(),
                                },
                              ]);
                            }}
                            className="rounded-full border border-gray-300 bg-white px-5 py-2 text-gray-700 transition hover:bg-gray-100"
                          >
                            🏢 Company Name
                          </button>

                          <button
                            onClick={() => {
                              setEditField("contact");
                              setShowEditButtons(false);
                              setMessages((prev) => [
                                ...prev,
                                {
                                  sender: "ai",
                                  text: "<strong>👤 Please enter the new Contact Person.</strong>",
                                  timestamp: new Date(),
                                },
                              ]);
                            }}
                            className="rounded-full border border-gray-300 bg-white px-5 py-2 text-gray-700 transition hover:bg-gray-100"
                          >
                            👤 Contact Person
                          </button>

                          <button
                            onClick={() => {
                              setEditField("email");
                              setShowEditButtons(false);
                              setMessages((prev) => [
                                ...prev,
                                {
                                  sender: "ai",
                                  text: "<strong>📧 Please enter the new Email Address.</strong>",
                                  timestamp: new Date(),
                                },
                              ]);
                            }}
                            className="rounded-full border border-gray-300 bg-white px-5 py-2 text-gray-700 transition hover:bg-gray-100"
                          >
                            📧 Email
                          </button>

                          <button
                            onClick={() => {
                              setEditField("phone");
                              setShowEditButtons(false);
                              setMessages((prev) => [
                                ...prev,
                                {
                                  sender: "ai",
                                  text: "<strong>📞 Please enter the new Phone Number.</strong>",
                                  timestamp: new Date(),
                                },
                              ]);
                            }}
                            className="rounded-full border border-gray-300 bg-white px-5 py-2 text-gray-700 transition hover:bg-gray-100"
                          >
                            📞 Phone
                          </button>

                          <button
                            onClick={() => {
                              setEditField("location");
                              setShowEditButtons(false);
                              setMessages((prev) => [
                                ...prev,
                                {
                                  sender: "ai",
                                  text: "<strong>📍 Please enter the new Country & City.</strong>",
                                  timestamp: new Date(),
                                },
                              ]);
                            }}
                            className="rounded-full border border-gray-300 bg-white px-5 py-2 text-gray-700 transition hover:bg-gray-100"
                          >
                            📍Country & City
                          </button>

                          <button
                          onClick={() => {
                            setShowEditButtons(false);

                            setQuotationStep("company");
                            setQuotationMode(true);
                            setQuotationCompleted(false);
                            setQuotationConfirmation(false);

                            setQuotationData({
                              company:"",
                              contact:"",
                              email:"",
                              phone:"",
                              country:"",
                              city:"",
                            });

                            setMessages(prev=>[
                              ...prev,
                              {
                                sender:"ai",
                                text:"<strong>🏢 Please enter your Company Name.</strong>",
                                timestamp: new Date(),
                              }
                            ]);
                          }}
                          className="rounded-full border border-gray-300 bg-white px-5 py-2 text-gray-700 transition hover:bg-gray-100"
                          >
                            🔄 All Details
                          </button>
                        </div>
                      )
                    }

                    {msg.sender === "ai" &&
                      msg.text.includes("Please proceed with the quotation") && (
                        <div className="mt-4 flex flex-wrap gap-3">

                          {[
                            {
                              icon: Package,
                              title: "Products",
                              prompt: "Tell me about your tissue paper products.",
                            },
                            {
                              icon: FileText,
                              title: "Quotation",
                              prompt: "I would like to request a quotation.",
                            },
                            {
                              icon: Truck,
                              title: "Delivery",
                              prompt: "What are your delivery and export options?",
                            },
                          ].map(({ icon: Icon, title, prompt }) => (
                            <button
                              key={title}
                              disabled={title !== "Quotation"}
                              onClick={() => {
                                if (title !== "Quotation") return;

                                setQuotationMode(true);
                                setQuotationCompleted(false);
                                setQuotationSubmitted(false);
                                setQuotationConfirmation(false);
                                setShowConfirmationButtons(false);
                                setShowEditButtons(false);

                                setQuotationStep("company");

                                setQuotationData({
                                  company: "",
                                  contact: "",
                                  email: "",
                                  phone: "",
                                  country: "",
                                  city: "",
                                });

                                setMessages((prev) => [
                                  ...prev,
                                  {
                                    sender: "user",
                                    text: "I would like to request a quotation.",
                                    timestamp: new Date(),
                                  },
                                  {
                                    sender: "ai",
                                    text: `Certainly! I'd be happy to prepare a quotation.

Before we begin, could you please provide the following details:

<strong>🏢 Please enter your Company Name.</strong>`,
                                    timestamp: new Date(),
                                  },
                                ]);
                              }}
                              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm shadow transition sm:gap-3 sm:px-5 sm:py-3 ${
                                title !== "Quotation"
                                  ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 opacity-60"
                                  : "cursor-pointer border-primary/20 bg-white hover:bg-primary hover:text-white shadow-glow hover:shadow-[0_0_25px_rgba(31,107,79,0.5)]"
                              }`}
                            >
                              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                              {title}
                            </button>
                          ))}
                        </div>
                      )
                    } 

                    {msg.sender === "ai" &&
                      msg.text ===
                        "Thank you for contacting FS Enterprises. How else may I assist you?" && (
                        <div className="mt-4 flex flex-wrap gap-2 sm:mt-5 sm:gap-3">

                          {[
                            {
                              icon: Package,
                              title: "Products",
                              prompt: "Tell me about your tissue paper products.",
                            },
                            {
                              icon: FileText,
                              title: "Quotation",
                              prompt: "I would like to request a quotation.",
                            },
                            {
                              icon: Truck,
                              title: "Delivery",
                              prompt: "What are your delivery and export options?",
                            },
                          ].map(({ icon: Icon, title, prompt }) => (

                            <button
                              key={title}
                              disabled={title !== "Delivery"}
                              onClick={() => {
                                if (title !== "Delivery") return;

                                sendMessage("What are your delivery and export options?");
                              }}
                              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm shadow transition sm:gap-3 sm:px-5 sm:py-3 ${
                                title !== "Delivery"
                                  ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 opacity-60"
                                  : "cursor-pointer border-primary/20 bg-white hover:bg-primary hover:text-white shadow-glow hover:shadow-[0_0_25px_rgba(31,107,79,0.5)]"
                              }`}
                            >

                              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />

                              {title}

                            </button>

                          ))}

                        </div>
                      )}

                  </div>

                </div>

              ))}

              <div ref={messagesEndRef} />

            </div>
          )}

        </div>

        {/* Input - Fixed at Bottom */}

        <div className="shrink-0 border-t border-black/5 bg-white/95 backdrop-blur-xl">

          <div className="mx-auto flex max-w-4xl gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-6">

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask anything..."
              rows={1}
              className="flex-1 rounded-xl border border-primary/20 bg-white px-4 py-2.5 text-sm outline-none sm:rounded-2xl sm:px-6 sm:py-3"
            />

            <button
              onClick={() => sendMessage(message)}
              disabled={!message.trim()}
              className="
                group
                flex h-11 w-11 items-center justify-center
                rounded-full sm:h-12 sm:w-12
                bg-gradient-to-br from-emerald-500 to-green-700
                text-white
                shadow-lg shadow-green-500/30
                transition-all duration-300
                hover:scale-110
                hover:shadow-2xl hover:shadow-green-500/40
                active:scale-95
                disabled:cursor-not-allowed
                disabled:opacity-50
                disabled:hover:scale-100
              "
            >

              <Send className="h-5 w-5" />

            </button>

          </div>

        </div>

        <LocationModal
          open={showMap}
          onClose={() => setShowMap(false)}
          onSelect={async (lat, lng) => {
            const response = await fetch(
              `/api/reverse-geocode?lat=${lat}&lon=${lng}`
            );

            const data = await response.json();

            const address = data.display_name;
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "";
            const state = data.address.state || "";
            const country = data.address.country || "";
            const pincode = data.address.postcode || "";

            setDeliveryLocation({
              address,
              city,
              state,
              country,
              pincode,
              latitude: lat,
              longitude: lng,
            });

            setMessages((prev) => [
              ...prev.filter(msg => !msg.text.includes("📍 Delivery Location Selected")),
              {
                sender: "ai",
                text: `📍 Delivery Location Selected

<strong>Address:</strong> ${address}
<strong>City:</strong> ${city}
<strong>State:</strong> ${state}
<strong>Country:</strong> ${country}
<strong>Pincode:</strong> ${pincode}

<strong>Latitude:</strong> ${lat}
<strong>Longitude:</strong> ${lng}

Is this correct?`,
                timestamp: new Date(),
              },
            ]);

            setShowLocationConfirm(true);
          }}
        />

      </main>
    );
  }