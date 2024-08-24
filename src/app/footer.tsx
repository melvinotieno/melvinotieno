import Icons from "@/components/icons";
import { AUTHOR_NAME } from "@/utilities/constants";

const links = [
  {
    icon: Icons.Twitter,
    href: "https://x.com/o_melvinotieno",
  },
  {
    icon: Icons.LinkedIn,
    href: "https://www.linkedin.com/in/melvin-otieno",
  },
  {
    icon: Icons.GitHub,
    href: "https://github.com/melvinotieno",
  },
  {
    icon: Icons.RSS,
    href: "/rss",
  },
];

export default function Footer() {
  return (
    <div className="item-center flex justify-between">
      <div className="text-zinc-500">
        {AUTHOR_NAME} &copy; {new Date().getFullYear()}
      </div>

      <div className="flex flex-row items-center space-x-4">
        {links.map(({ icon, href }) => (
          <a
            key={icon.name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 transition-colors hover:text-zinc-700"
          >
            {icon()}
          </a>
        ))}
      </div>
    </div>
  );
}
