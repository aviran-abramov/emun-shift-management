import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-radial from-[#FFAB4F] to-[#D95E00]">
      <div className="w-full md:max-w-lg flex px-4 flex-col items-center gap-16 mb-16 md:mb-20 md:gap-20">
        <Image
          src="/emun-logo.png"
          alt="Emun logo"
          height={70}
          width={206}
          loading="eager"
        />

        {children}
      </div>
    </main>
  );
}
