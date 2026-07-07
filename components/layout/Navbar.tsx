"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('header') && open) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const navItems = [
    "Home",
    "About",
    "Services",
    "Products",
    "Testimonials",
    "Contact",
    "AI Assistance",
  ];

  
  const links: Record<string, string> = {
    Home: "/#home",
    About: "/#about",
    Services: "/#services",
    Products: "/#products",
    Testimonials: "/#testimonials",
    Contact: "/#contact",
    "AI Assistance": "/ai-assistance",
  };

  return (
    <header className="fixed top-0 z-50 w-full px-4 py-4">
      <div className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-6 py-4 shadow-glow">
        <Link
          href="/"
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Fresh Soft Tissue Logo"
            width={60}
            height={60}
            priority
            className="h-12 w-12 object-contain"
          />

          <div className="leading-tight">
            <h1 className="text-base font-semibold text-primary sm:text-xl">
              FS Enterprises
            </h1>
            <p className="text-[10px] text-muted sm:text-xs">
              Fresh Soft Tissue
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item}
              href={links[item]}
              className="text-sm font-medium text-dark transition hover:text-primary hover:drop-shadow-[0_0_8px_rgba(21,101,176,0.5)]"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/quote"
          className="hidden rounded-full bg-primary px-5 py-2 text-white md:block hover:bg-green-950 transition shadow-glow hover:shadow-[0_0_25px_rgba(31,107,79,0.5)]"
        >
          Get Quotation
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-full hover:bg-black/5 transition"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Menu Content */}
          <div className="glass fixed top-20 left-4 right-4 z-50 rounded-3xl p-6 md:hidden shadow-2xl">
            <nav className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <Link
                  key={item}
                  href={links[item]}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-dark py-3 px-4 rounded-xl hover:bg-black/5 transition transform hover:translate-x-2"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item}
                </Link>
              ))}
              <div className="border-t border-black/10 my-2" />
              <Link
                href="/quote"
                onClick={() => setOpen(false)}
                className="w-full rounded-full bg-primary px-5 py-3 text-white text-center font-medium hover:bg-green-900 transition shadow-glow hover:shadow-[0_0_25px_rgba(31,107,79,0.5)]"
              >
                Get Quotation
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
