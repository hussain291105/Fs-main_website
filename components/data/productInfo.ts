export interface ProductInfo {
  title: string;
  description: string;
  features: string[];
  variants: string[];
  sizes: string[];
  applications: string[];
  customization: string[];
  moq: string;
}

export const productInfo: Record<string, ProductInfo> = {
  "Premium Tissue Rolls": {
    title: "Premium Tissue Rolls",

    description:
      "Our Premium Tissue Rolls are manufactured using premium-quality virgin pulp to provide exceptional softness, strength, and absorbency. They are ideal for residential, commercial, hospitality, healthcare, and industrial use.",

    features: [
      "Premium Virgin Pulp",
      "Soft & Skin Friendly",
      "High Absorbency",
      "Strong & Durable",
      "Smooth Perforation",
      "Eco-Friendly & Biodegradable",
      "Hygienically Manufactured",
    ],

    variants: [
      "1 Ply",
      "2 Ply",
      "3 Ply",
    ],

    sizes: [
      "Standard Roll",
      "Jumbo Roll",
      "Mini Jumbo Roll",
      "Customized Sizes",
    ],

    applications: [
      "Homes",
      "Hotels",
      "Restaurants",
      "Hospitals",
      "Offices",
      "Shopping Malls",
      "Commercial Buildings",
    ],

    customization: [
      "Private Label Manufacturing",
      "Customized Packaging",
      "Brand Printing",
      "Custom Roll Dimensions",
      "Bulk Supply",
    ],

    moq:
      "Available for wholesale and export orders. MOQ depends on the selected product specifications.",
  },

  "Bulk Supply Packs": {
    title: "Bulk Supply Packs",

    description:
      "Our Bulk Supply Packs are specifically designed for wholesalers, distributors, supermarkets, hotels, institutions, and export markets. These packs offer cost-effective purchasing, consistent quality, and reliable supply for high-volume commercial requirements.",

    features: [
      "Economical Bulk Packaging",
      "Premium Virgin & Recycled Paper Options",
      "High Absorbency",
      "Soft & Durable",
      "Commercial Grade Quality",
      "Export Ready Packaging",
      "Eco-Friendly Materials",
    ],

    variants: [
      "Facial Tissue Packs",
      "Toilet Tissue Packs",
      "Kitchen Towel Packs",
      "Napkin Packs",
    ],

    sizes: [
      "Small Bulk Packs",
      "Medium Bulk Packs",
      "Large Bulk Packs",
      "Customized Carton Sizes",
    ],

    applications: [
      "Wholesale Distribution",
      "Retail Chains",
      "Hotels & Resorts",
      "Hospitals",
      "Restaurants",
      "Corporate Offices",
      "Export Markets",
    ],

    customization: [
      "Custom Carton Quantity",
      "Private Label Packaging",
      "Brand Printing",
      "Export Packaging",
      "Custom Product Mix",
    ],

    moq:
      "Available for wholesale and export customers. Minimum order quantity depends on the selected product range and packaging configuration.",
  },

  "Private Label Range": {
    title: "Private Label Range",

    description:
      "Our Private Label Range enables businesses to launch their own tissue brand with complete OEM manufacturing solutions. We provide end-to-end customization, from product specifications to packaging design and branding.",

    features: [
      "Complete OEM Manufacturing",
      "Private Branding",
      "Premium Virgin Pulp Options",
      "Custom Packaging Designs",
      "High Manufacturing Standards",
      "Export Quality Production",
      "Flexible Production Capacity",
    ],

    variants: [
      "Facial Tissue",
      "Toilet Rolls",
      "Kitchen Towels",
      "Napkins",
      "Customized Tissue Products",
    ],

    sizes: [
      "Standard Retail Sizes",
      "Commercial Sizes",
      "Jumbo Rolls",
      "Mini Jumbo Rolls",
      "Fully Customized Dimensions",
    ],

    applications: [
      "Retail Brands",
      "Private Label Companies",
      "Supermarkets",
      "Wholesalers",
      "Distributors",
      "Hospitality Industry",
      "International Export",
    ],

    customization: [
      "Brand Logo Printing",
      "Custom Packaging",
      "Custom Product Specifications",
      "Barcode & Label Printing",
      "Private Label Manufacturing",
      "Retail Ready Packaging",
    ],

    moq:
      "MOQ depends on the selected product type, customization requirements, and packaging specifications. Suitable for wholesale and export orders.",
  },

  "Facial Tissue": {
    title: "Facial Tissue",

    description:
      "Soft and premium facial tissues manufactured from high-quality virgin pulp, offering excellent comfort and hygiene for daily use.",

    features: [
      "Ultra Soft",
      "Premium Virgin Pulp",
      "High Absorbency",
      "Dust Free",
      "Skin Friendly",
      "Strong Yet Gentle",
    ],

    variants: [
      "2 Ply",
      "3 Ply",
    ],

    sizes: [
      "Pocket Pack",
      "Travel Pack",
      "Standard Box",
      "Family Box",
      "Custom Sizes",
    ],

    applications: [
      "Homes",
      "Hotels",
      "Hospitals",
      "Clinics",
      "Offices",
      "Airports",
    ],

    customization: [
      "Custom Box Design",
      "Private Label",
      "Bulk Packaging",
      "Brand Printing",
    ],

    moq:
      "MOQ depends on packaging type and customization requirements.",
  },

  "Kitchen Towels": {
    title: "Kitchen Towels",

    description:
      "Highly absorbent kitchen towels designed for cleaning, wiping, drying, and maintaining hygiene in kitchens and food preparation areas.",

    features: [
      "Extra Absorbent",
      "Strong Wet Strength",
      "Premium Quality",
      "Food Safe",
      "Lint Free",
      "Quick Absorption",
    ],

    variants: [
      "1 Ply",
      "2 Ply",
    ],

    sizes: [
      "Standard Roll",
      "Jumbo Roll",
      "Customized Sizes",
    ],

    applications: [
      "Homes",
      "Restaurants",
      "Hotels",
      "Commercial Kitchens",
      "Catering",
    ],

    customization: [
      "Private Label",
      "Customized Packaging",
      "Bulk Supply",
    ],

    moq:
      "MOQ varies according to roll size and packaging.",
  },

  "Napkins": {
    title: "Napkins",

    description:
      "Premium paper napkins manufactured with excellent softness and absorbency, suitable for restaurants, hotels, events, and daily dining.",

    features: [
      "Soft Texture",
      "Highly Absorbent",
      "Food Grade",
      "Premium Finish",
      "Elegant Embossing",
    ],

    variants: [
      "1 Ply",
      "2 Ply",
      "3 Ply",
    ],

    sizes: [
      "Cocktail Napkin",
      "Lunch Napkin",
      "Dinner Napkin",
      "Customized Sizes",
    ],

    applications: [
      "Restaurants",
      "Hotels",
      "Events",
      "Cafes",
      "Homes",
    ],

    customization: [
      "Custom Printing",
      "Logo Printing",
      "Private Label",
      "Custom Packaging",
    ],

    moq:
      "MOQ depends on napkin size and printing requirements.",
  },

  "Customized Tissue Products": {
    title: "Customized Tissue Products",

    description:
      "We manufacture fully customized tissue products according to your brand requirements, dimensions, packaging, and market specifications.",

    features: [
      "OEM Manufacturing",
      "Private Label",
      "Custom Packaging",
      "Brand Printing",
      "Flexible Specifications",
      "Export Quality",
    ],

    variants: [
      "Custom",
    ],

    sizes: [
      "Fully Customized",
    ],

    applications: [
      "Retail Brands",
      "Hotels",
      "Hospitals",
      "Distributors",
      "Wholesalers",
      "Export Markets",
    ],

    customization: [
      "Complete OEM",
      "Private Label",
      "Printed Packaging",
      "Brand Logo",
      "Custom Dimensions",
      "Bulk Orders",
    ],

    moq:
      "MOQ depends on customization level and production requirements.",
  },
};