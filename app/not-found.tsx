import Image from "next/image";
import React from "react";

type Props = {};

function NotFound({}: Props) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-200">
      <div className="relative h-screen w-full overflow-hidden bg-white shadow-2xl sm:h-[712px] sm:w-[390px] sm:rounded-3xl">
        <div className="flex items-center justify-center flex-col h-full">
          <Image
            src="/assets/plans/tuko-live-logo.png"
            height={200}
            width={200}
          />
          <p className="text-xl font-semibold text-gray-700">Not Found</p>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
