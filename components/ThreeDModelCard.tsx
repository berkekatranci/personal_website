import Image from "next/image";
import Script from "next/script";
import type { CreativeModel } from "@/data/creative";

type ThreeDModelCardProps = {
  model: CreativeModel;
};

export function ThreeDModelCard({ model }: ThreeDModelCardProps) {
  const hasModel = Boolean(model.modelSrc);

  return (
    <article className="group overflow-hidden border border-white/10 bg-panel">
      <div className="relative aspect-[4/3] bg-night">
        {hasModel ? (
          <>
            <Script
              type="module"
              src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
              strategy="lazyOnload"
            />
            <model-viewer
              src={model.modelSrc}
              poster={model.previewImage}
              alt={model.alt}
              camera-controls
              auto-rotate
              loading="lazy"
              exposure="0.9"
              shadow-intensity="0.6"
              className="h-full w-full"
            />
          </>
        ) : (
          <Image
            src={model.previewImage}
            alt={model.alt}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover opacity-60 grayscale transition duration-500 group-hover:opacity-80 group-hover:grayscale-0"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
      </div>
      <div className="p-5">
        <p className="font-mono text-[10px] uppercase text-sky">
          {hasModel ? "Interactive model" : "Model slot"}
        </p>
        <h3 className="mt-3 text-lg font-semibold text-text">{model.title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted">{model.description}</p>
      </div>
    </article>
  );
}
