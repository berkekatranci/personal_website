import { GameCard } from "@/components/GameCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { favoriteGames } from "@/data/games";

export function FavoriteGamesSection() {
  return (
    <section id="games" className="border-b border-white/10 bg-night">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Favorite Games"
            title="Favorite Games"
            description="Games are not only entertainment for me. The best games are complex designed systems. They combine mechanics, constraints, feedback loops, atmosphere, strategy, psychology, storytelling, and long-term decision-making."
          />
        </Reveal>

        <Reveal className="mt-14" delay={0.05}>
          <GameCard game={favoriteGames[0]} index={0} featured />
        </Reveal>

        <Reveal className="mt-5" delay={0.06}>
          <div className="grid gap-5 md:grid-cols-2">
            {favoriteGames.slice(1).map((game, index) => (
              <GameCard key={game.title} game={game} index={index + 1} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
