export default function Mdx({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="prose">{children}</div>;
}
