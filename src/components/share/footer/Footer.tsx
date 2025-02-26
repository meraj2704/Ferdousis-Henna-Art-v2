import FooterLinkGroup from "./FooterLinkGroup";
import SocialMediaLinks from "./SocialMediaLinks";
import ContactInfo from "./ContactInfo";
import Newsletter from "./Newsletter";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-1 md:px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <FooterLinkGroup
            title="Quick Links"
            links={[
              { label: "About Us", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Terms & Conditions", href: "/terms" },
              { label: "Privacy Policy", href: "/privacy" },
            ]}
          />

          {/* Social Media */}
          <SocialMediaLinks />

          {/* Contact Information */}
          <ContactInfo />

          {/* Newsletter */}
          <Newsletter />
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Ferdousi's Henna Art All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
