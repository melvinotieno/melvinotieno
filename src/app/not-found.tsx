export default function NotFound() {
  return (
    <div className="absolute right-0 left-0 flex h-full items-center justify-center">
      <div className="leading-10">
        <h1 className="mr-6 inline-block border-r border-zinc-400 pr-6 align-top text-2xl leading-[50px] font-medium">
          404
        </h1>

        <h2 className="inline-block text-sm leading-[50px]">
          This page could not be found.
        </h2>
      </div>
    </div>
  );
}
