import { MenuTrigger } from "@/components/layout/menu-trigger";
import Image from "next/image";
import Link from "next/link";

export function MobileHeader({ homeHref }: { homeHref: string }) {
  return (
    <div className="relative flex items-center justify-between md:hidden border-b bg-primary px-2 py-1">
      <MenuTrigger />
      <span className="absolute left-1/2 -translate-x-1/2 font-semibold">
        מוקד אמון
      </span>
      <Link href={homeHref}>
        <Image src="/favicon.ico" height={30} width={30} alt="emun logo" />
      </Link>
    </div>
  );
}
