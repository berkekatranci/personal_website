import Image from "next/image";
import type { FavoriteGame } from "@/data/games";

type GameCardProps = {
  game: FavoriteGame;
  index: number;
  featured?: boolean;
};

export function GameCard({ game, index, featured = false }: GameCardProps) {
  const sizes = featured
    ? "(min-width: 1024px) 526px, (max-width: 359px) calc(100vw - 40px), calc(100vw - 48px)"
    : "(min-width: 1008px) 469px, (min-width: 768px) calc((100vw - 68px) / 2), (max-width: 359px) calc(100vw - 40px), calc(100vw - 48px)";
  return (
    <article className={`grid h-full min-w-0 overflow-hidden border border-white/10 bg-panel ${featured ? "lg:grid-cols-[1.1fr_0.9fr]" : "grid-rows-[auto_1fr]"}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-night">
        <Image
          src={game.backgroundImage}
          alt=""
          aria-hidden
          fill
          loading="lazy"
          sizes={sizes}
          className="scale-[1.2] object-cover brightness-[0.55] blur-xl"
        />
        <Image
          src={game.backgroundImage}
          alt={game.alt}
          fill
          loading="lazy"
          sizes={sizes}
          className="object-contain"
        />
      </div>
      <div className="flex min-w-0 flex-col p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <p className="pt-2 font-mono text-[11px] text-white/60">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="display-title text-2xl leading-tight sm:text-3xl">{game.title}</h3>
        </div>
        <p className="mt-5 font-mono text-[11px] uppercase leading-6 text-gold">{game.genre}</p>
        <p className="prose-copy mt-5 whitespace-pre-line text-muted">{game.description}</p>
        <div className="mt-auto pt-6">
          <p className="prose-copy border-t border-white/10 pt-4 text-slate-300">
            <span className="font-semibold text-text">Design lesson: </span>
            {game.designLesson}
          </p>
        </div>
      </div>
    </article>
  );
}
