import React, { type FC, type ReactNode } from "react";
import { cn } from "@/lib/utils"; // Assumes you have a `cn` utility

/**
 * Props for the Footer component.
 */
interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** The source URL for the company logo. */
  //   logoSrc: string;
  /** The name of the company, displayed next to the logo. */
  companyName?: string;
  /** A short description of the company. */
  description?: string;
  /** An array of objects for generating useful links. */
  usefulLinks?: { label: string; href: string }[];
  /** An array of objects for generating social media links. */
  socialLinks?: { label: string; href: string; icon: ReactNode }[];
  /** The title for the newsletter subscription section. */
  newsletterTitle?: string;
  /** Async function to handle email subscription. Should return `true` for success and `false` for failure. */
  onSubscribe?: (email: string) => Promise<boolean>;
}

/**
 * A responsive and theme-adaptive footer component with a newsletter subscription form.
 * Designed following shadcn/ui and 21st.dev best practices.
 */
export const Footer: FC<FooterProps> = ({
  //   logoSrc,
  companyName = "MWA Store",
  description = "Empowering businesses with intelligent financial solutions, designed for the future of finance.",
  usefulLinks = [
    { label: "Products", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
  socialLinks = [
    { label: "Facebook", href: "#", icon: <DummyIcon /> },
    { label: "Instagram", href: "#", icon: <DummyIcon /> },
    { label: "Twitter (X)", href: "#", icon: <DummyIcon /> },
  ],
  className,
  ...props
}) => {
  return (
    <footer className={cn("bg-muted/50 text-foreground", className)} {...props}>
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        {/* Company Info */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            {/* <img
              src={logoSrc}
              alt={`${companyName} Logo`}
              className="h-10 w-10 rounded-full"
            /> */}
            <span className="text-xl font-bold">{companyName}</span>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {/* Useful Links */}
        <div className="md:justify-self-center">
          <h3 className="mb-4 text-base font-semibold">Useful Link</h3>
          <ul className="space-y-2">
            {usefulLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div className="md:justify-self-center">
          <h3 className="mb-4 text-base font-semibold">Follow Us</h3>
          <ul className="space-y-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

// Dummy Icon: Replace with your actual icon library e.g., Lucide React
const DummyIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-muted-foreground"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);
