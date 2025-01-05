import React from "react";
import SectionTitle from "../../customUi/SectionTitle";
import Cart from "./Cart";
import { FaPaintBrush, FaHandsHelping, FaLeaf } from "react-icons/fa"; // Example icons from react-icons

const servicesData = [
  { name: "Products", icon: <FaPaintBrush /> },
  { name: "Bookings", icon: <FaHandsHelping /> }
];

const Services = () => {
  return (
    <div>
      <SectionTitle title="Services" />
      <div className="flex justify-center items-center gap-6 mt-5">
        {servicesData.map((service, index) => (
          <Cart key={index} name={service.name} icon={service.icon} />
        ))}
      </div>
    </div>
  );
};

export default Services;
