"use client";

type Anchor = { id: string; label: string };

type Props = {
  anchors: Anchor[];
};

export default function WorkAnchorNav({ anchors }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="border border-white/15 bg-white/[0.03] px-4 py-5">
      <p className="text-sm text-white/40 tracking-widest uppercase font-black mb-3">目次</p>
      <ol className="flex flex-col gap-3">
        {anchors.map((anchor, i) => (
          <li key={anchor.id}>
            <a
              href={`#${anchor.id}`}
              onClick={(e) => handleClick(e, anchor.id)}
              className="inline-flex items-center gap-3 text-sm text-white/80 font-bold hover:text-[#e55329] transition-colors"
            >
              <span className="text-[10px] text-white/25 font-black shrink-0 w-4">{String(i + 1).padStart(2, "0")}</span>
              {anchor.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
