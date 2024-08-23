import Link from "next/link";

const links = [{ label: "projects", href: "/projects" }];

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <a className="text-lg font-bold" href="/">
          @melvinotieno
        </a>
      </div>

      <div>
        <nav className="flex space-x-4">
          {links.map(({ label, href }) => (
            <Link key={label} href={href} className="text-lg lowercase">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
