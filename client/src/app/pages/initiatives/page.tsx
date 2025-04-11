import React from "react";
import ContactUs from "../ContactUs";
import InnovationsAndSolutionsExchange from "../InnovationsAndSolutionsExchange";

export default function InitiativesPage() {
  return (
    <div className="flex flex-col w-full h-auto bg-black pt-20 lg:pt-24">
      <InnovationsAndSolutionsExchange />
      <ContactUs />
    </div>
  );
}
