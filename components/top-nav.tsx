import { BellDot, Search } from "lucide-react";
import Image from "next/image";

type Props = {
  selectedAction: string;
};

function TopNav({ selectedAction }: Props) {
  return (
    <div className="flex justify-between p-4 bg-slate-100 items-center">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/logo.png"
          alt="Tuko Logo"
          width={100}
          height={100}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h2 className="flex items-center gap-3">
            <span>TUKO LIVE!</span>

            <span
              className="inline-block w-[2px] self-stretch bg-gray-100 dark:bg-gray-700 my-1"
              aria-hidden="true"
            />

            <span>{selectedAction}</span>
          </h2>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Image
          src="/assets/girl-colored.jpg"
          alt="Tuko Logo"
          width={100}
          height={100}
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h2>Morning Swafiyah!</h2>
          <p>Status: Online</p>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
