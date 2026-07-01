import { BellDot, Search } from "lucide-react";
import Image from "next/image";

function TopNav() {
  return (
    <div className="flex justify-between p-4 bg-slate-100 items-center">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/girl-colored.jpg"
          alt="Tuko Logo"
          width={100}
          height={100}
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h2>Morning!</h2>
          <p>Swafiyah</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <BellDot />
        <Search />
      </div>
    </div>
  );
}

export default TopNav;
