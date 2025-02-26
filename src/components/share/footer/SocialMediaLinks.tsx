import { aclonica } from "@/components/font/fonts";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const socialLinks = [
  {
    href: "https://www.facebook.com/ChandpurMehendi.Artist?mibextid=ZbWKwL",
    icon: <FaFacebookF size={24} />,
  },
  {
    href: "https://www.instagram.com/ferdousis_henna_art?igsh=dzB4eXQ5dTkyc3g1",
    icon: <FaInstagram size={24} />,
  },
];

const SocialMediaLinks = () => {
  return (
    <div>
      <h3
        className={` ${aclonica.className}
              text-lg font-semibold mb-4`}
      >
        Follow Us
      </h3>
      <div className="flex space-x-4">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaLinks;
