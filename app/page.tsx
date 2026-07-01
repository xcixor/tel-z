import BodyWrapper from "@/components/body-wrapper";
import TopNav from "@/components/top-nav";

export default function Home() {
  return (
    <main className="flex flex-col justify-between h-full md:px-[25%] text-slate-500">
      <TopNav />
      <div className="flex-1">
        <BodyWrapper />
      </div>
      <div className="shrink-0 p-4 bg-slate-100">
        <p className="text-xs">&copy; 2024 Tuko Live</p>
        <p className="text-xs">TopShottas</p>
      </div>
    </main>
  );
}
