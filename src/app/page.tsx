"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navigation from "./components/landing/Navigation";
import Hero from "./components/landing/Hero";
import HowItWorks from "./components/landing/HowItWorks";
import Benefits from "./components/landing/Benefits";
import Pricing from "./components/landing/Pricing";
import Testimonials from "./components/landing/Testimonials";
import FinalCTA from "./components/landing/FinalCTA";
import NewsletterPopup from "./components/landing/NewsletterPopup";

export default function Home() {
  const [showNewsletter, setShowNewsletter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNewsletter(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <Pricing />
        <Testimonials />
        <FinalCTA />
      </main>
      {showNewsletter && (
        <NewsletterPopup onClose={() => setShowNewsletter(false)} />
      )}
    </>
  );
}
