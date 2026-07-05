import Image from "next/image";
import type { FavoriteGame } from "@/data/games";

type GameCardProps = {
  game: FavoriteGame;
};

export function GameCard({ game }: GameCardProps) {
  return (
    <article className="group relative isolate min-h-[360px] overflow-hidden rounded-lg border border-white/10 bg-panel shadow-card">
      <Image
        src={game.backgroundImage}
        alt={game.alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/30" />
      <div className="relative flex min-h-[360px] flex-col justify-end p-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-gold">
          {game.genre}
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-text">{game.title}</h3>
        <p className="mt-4 text-sm leading-7 text-muted">{game.description}</p>
        <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-7 text-slate-200">
          <span className="font-semibold text-text">Design lesson: </span>
          {game.designLesson}
        </p>
      </div>
    </article>
  );
}
