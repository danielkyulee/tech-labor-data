import Link from "next/link";

const links = [
  { href: "/#charts", label: "Charts" },
  { href: "/methods", label: "Method" },
  { href: "/data", label: "Data" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="wordmark" href="/" aria-label="Tech and Labor Data Research Group homepage">
          <span className="wordmark__text">Tech and Labor Data Research Group</span>
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
