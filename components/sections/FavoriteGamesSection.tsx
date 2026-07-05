import { GameCard } from "@/components/GameCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { favoriteGames } from "@/data/games";

export function FavoriteGamesSection() {
  return (
    <section id="games" className="bg-night">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Favorite Games"
            title="Favorite Games"
            description="Games are not only entertainment for me. The best games are complex designed systems. They combine mechanics, constraints, feedback loops, atmosphere, strategy, psychology, storytelling, and long-term decision-making."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {favoriteGames.map((game, index) => (
            <Reveal key={game.title} delay={index * 0.025}>
              <GameCard game={game} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
