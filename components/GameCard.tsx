import Image from "next/image";
import type { FavoriteGame } from "@/data/games";

type GameCardProps = {
  game: FavoriteGame;
  index: number;
  featured?: boolean;
};

export function GameCard({ game, index, featured = false }: GameCardProps) {
  return (
    <article
      className={`group grid h-full overflow-hidden border border-white/10 bg-panel ${
        featured ? "lg:grid-cols-[1.15fr_0.85fr]" : "grid-rows-[auto_1fr]"
      }`}
    >
      <div
        className={`relative overflow-hidden bg-night ${
          featured ? "min-h-72 lg:min-h-[430px]" : "aspect-[16/9]"
        }`}
      >
        <Image
          src={game.backgroundImage}
          alt={game.alt}
          fill
          loading="lazy"
          sizes={
            featured
              ? "(min-width: 1024px) 58vw, 100vw"
              : "(min-width: 1024px) 42vw, 100vw"
          }
          className="object-cover opacity-80 transition duration-500 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/10" />
        <p className="absolute left-5 top-5 font-mono text-[10px] text-white/70">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="display-title absolute bottom-5 left-5 right-5 text-3xl leading-tight sm:text-4xl">
          {game.title}
        </h3>
      </div>
      <div className="flex flex-col p-5 sm:p-6">
        <p className="font-mono text-[10px] uppercase leading-5 text-gold">
          {game.genre}
        </p>
        <p className="mt-5 whitespace-pre-line text-sm leading-7 text-muted">
          {game.description}
        </p>
        <div className="mt-auto pt-6">
          <p className="border-t border-white/10 pt-4 text-sm leading-7 text-slate-300">
            <span className="font-semibold text-text">Design lesson: </span>
            {game.designLesson}
          </p>
        </div>
      </div>
    </article>
  );
}
