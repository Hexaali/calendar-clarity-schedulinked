import { Link } from "react-router-dom";
import { BrandLogo, BrandText } from "../shared/Constants";
import { FooterLinkGroup } from "../shared/FooterLinkGroup";

const FooterSection = () => {
  const footerLinks = {
    product: [
      { label: "How It Works", href: "#how" },
      { label: "Pricing", href: "#pricing" },
      { label: "API Documentation", href: "#" },
      { label: "Integrations", href: "#" },
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "/contact-us" },
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "Status Page", href: "#" },
      { label: "Community", href: "#" },
      { label: "Security", href: "#" },
    ],
  };

  return (
    <footer className="bg-background border-t">
      <div className="container px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {BrandLogo}
              {/* <div className="text-2xl font-bold text-foreground tracking-tight">
                {BrandText}
              </div> */}
            </div>
            <p className="text-brand-grey text-sm leading-relaxed">
              Marketing people actually want. Put your content straight into
              calendars with reminders, media, and automation.
            </p>
            <p className="text-brand-grey text-sm">
              We're not trying to fix email. We're skipping it entirely. At
              Calendure, we believe your calendar isn't just for meetings — it's
              where attention lives.
            </p>
          </div>

          <FooterLinkGroup title="Product" links={footerLinks.product} />
          <FooterLinkGroup title="Company" links={footerLinks.company} />
          <FooterLinkGroup title="Support" links={footerLinks.support} />
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-grey text-sm">
            © 2025 Calendure. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              to="/privacy-policy"
              className="text-brand-grey hover:text-brand-orange transition-colors"
            >
              Privacy Policy
            </Link>
            <a
              href="#"
              className="text-brand-grey hover:text-brand-orange transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-brand-grey hover:text-brand-orange transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
