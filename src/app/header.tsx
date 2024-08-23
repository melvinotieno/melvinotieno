import Link from "next/link";

const links = [
  { label: "blog", href: "/blog" },
  { label: "projects", href: "/projects" },
];

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Link className="text-lg font-bold" href="/">
          @melvinotieno
        </Link>
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
