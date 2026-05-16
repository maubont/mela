import Image from "next/image";

import { cn } from "@/lib/utils";

type MelaAvatarProps = {
  className?: string;
};

export function MelaAvatar({ className }: MelaAvatarProps) {
  return (
    <div
      className={cn(
        "relative isolate aspect-square overflow-hidden rounded-[2rem] border border-white/14 bg-[linear-gradient(155deg,rgba(125,29,49,0.98),rgba(43,12,20,1))] shadow-[0_24px_54px_-28px_rgba(53,17,26,0.58)]",
        className,
      )}
    >
      <div className="absolute inset-[3%] rounded-[1.7rem] border border-white/12" />
      <div className="absolute inset-[7%] overflow-hidden rounded-[1.45rem]">
        <Image
          src="/media/mela-avatar-v2.jpg"
          alt="Avatar editorial de Mela más cercano a Melany"
          fill
          sizes="(max-width: 640px) 128px, 160px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(44,16,24,0)_58%,rgba(32,11,18,0.18)_100%)]" />
      </div>
    </div>
  );
}
