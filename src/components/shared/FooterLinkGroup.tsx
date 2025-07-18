type FooterLinkGroupProps = {
  title: string;
  links: { label: string; href: string }[];
};

export const FooterLinkGroup = ({ title, links }: FooterLinkGroupProps) => (
  <div className="space-y-4">
    <h4 className="font-semibold text-brand-green">{title}</h4>
    <ul className="space-y-2 text-sm">
      {links.map(({ label, href }) => (
        <li key={label}>
          <a
            href={href}
            className="text-muted-foreground hover:text-brand-orange transition-colors"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
