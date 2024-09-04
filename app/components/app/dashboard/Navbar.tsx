"use client";

export default function Navbar({ dashboardPages }) {
  return (
    <div className="no-scrollbar w-full py-2.5 px-2.5 border-b border-b-zinc-800 flex items-center gap-1 overflow-scroll shadow shadow-zinc-950">
      <div className="px-1.5 py-0.5 rounded-md text-sm flex items-center justify-center bg-zinc-800 font-light text-zinc-500">
        &lt;/&gt;
      </div>
      <div className="w-1" />
      {dashboardPages.map((x, i) => {
        return (
          <button
            key={`doifasfasdf-${i}`}
            className="no-scrollbar px-1.5 py-0.5 rounded-lg hover:bg-zinc-800 transition font-medium text-zinc-300 whitespace-nowrap"
          >
            {x.name}
          </button>
        );
      })}
    </div>
  );
}
