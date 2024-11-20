"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // For class name utility (if you're using it in your project)

const termsAndPrivacyContent = {
  terms: [
    {
      title: "General Information",
      content:
        "Ferdousis Henna Art (hereafter referred to as 'we', 'us', or 'our') offers henna art and related services. These Terms and Conditions govern the use of our website and services provided by Ferdousis Henna Art.",
    },
    {
      title: "Services",
      content:
        "We offer a variety of henna art services, including custom designs for weddings, festivals, parties, and more. Our services are provided as described on our website or as per individual consultations with clients.",
    },
    {
      title: "Ordering and Payment",
      content:
        "All orders for henna services must be placed via our website or through direct communication with our team. Payment must be made in full prior to service or as per the terms discussed during the booking process.",
    },
    // Add more sections as needed
  ],
  privacy: [
    {
      title: "Information We Collect",
      content:
        "We collect personal information, such as your name, email address, payment details, etc., when you place an order or sign up for our newsletter. We also collect usage data like your IP address and browsing activity on our website.",
    },
    {
      title: "How We Use Your Information",
      content:
        "We use the information to process your orders, improve our services, and send you promotional materials or notifications related to our services. Your information is never sold to third parties.",
    },
    {
      title: "Data Security",
      content:
        "We take appropriate measures to secure your data, including encrypting payment information and using secure servers. However, no method is 100% secure.",
    },
    // Add more sections as needed
  ],
};

const TermsAndPrivacyPage = () => {
  return (
    <div className="bg-background">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Terms and Privacy Policy
        </h1>

        {/* Accordion for Terms Section */}
        <Accordion type="single" collapsible className="mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Terms and Conditions
          </h2>
          {termsAndPrivacyContent.terms.map((section, index) => (
            <AccordionItem key={index} value={`terms-${index}`}>
              <AccordionTrigger className="w-full text-left text-xl font-medium py-2 px-4 bg-[#E7F0DC] hover:bg-[#729762] hover:text-white rounded-md focus:outline-none">
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="mt-2 text-black">
                <p>{section.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Accordion for Privacy Section */}
        <Accordion type="single" collapsible>
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Privacy Policy
          </h2>
          {termsAndPrivacyContent.privacy.map((section, index) => (
            <AccordionItem key={index} value={`privacy-${index}`}>
              <AccordionTrigger className="w-full text-left text-xl font-medium py-2 px-4 bg-[#E7F0DC] hover:bg-[#729762] hover:text-white rounded-md focus:outline-none">
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="mt-2 text-black">
                <p>{section.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Ferdousis Henna Art. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPrivacyPage;
