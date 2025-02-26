import { aclonica } from "@/components/font/fonts";
import Link from "next/link";

interface FooterLinkGroupProps {
  title: string;
  links: { label: string; href: string }[];
}

const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ title, links }) => {
  return (
    <div>
      <h3
        className={` ${aclonica.className}
        text-lg font-semibold mb-4`}
      >
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className="hover:text-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkGroup;
