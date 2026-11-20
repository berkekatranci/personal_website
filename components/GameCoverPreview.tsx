"use client";

import { motion, useAnimationControls } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

type GameCoverPreviewProps = {
  title: string;
  src: string;
  alt: string;
};

const entered = { opacity: 1, y: 0, scale: 1 };
const motionPreference = "(prefers-reduced-motion: reduce)";

function lockPageScroll() {
  const { scrollX, scrollY, innerWidth } = window;
  const { body, documentElement } = document;
  const { style } = body;
  const scrollbarWidth = innerWidth - documentElement.clientWidth;
  const originalPadding = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
  const previous = {
    position: style.position,
    top: style.top,
    left: style.left,
    width: style.width,
    paddingRight: style.paddingRight,
    overflow: style.overflow
  };

  Object.assign(style, {
    position: "fixed",
    top: `-${scrollY}px`,
    left: `-${scrollX}px`,
    width: "100%",
    paddingRight: `${originalPadding + scrollbarWidth}px`,
    overflow: "hidden"
  });

  return () => {
    Object.assign(style, previous);
    window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
  };
}

export function GameCoverPreview({ title, src, alt }: GameCoverPreviewProps) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const unlock = useRef<(() => void) | null>(null);
  const closing = useRef(false);
  const pressedBackdrop = useRef(false);
  const controls = useAnimationControls();
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia(motionPreference);
    function handlePreference(event: MediaQueryListEvent) {
      if (!event.matches || !dialog.current?.open) return;
      controls.stop();
      if (closing.current) dialog.current.close();
      else controls.set(entered);
    }

    preference.addEventListener("change", handlePreference);
    return () => {
      preference.removeEventListener("change", handlePreference);
      unlock.current?.();
      unlock.current = null;
    };
  }, [controls]);

  function openCover() {
    const element = dialog.current;
    if (!element || element.open || unlock.current) return;

    const reduce = window.matchMedia(motionPreference).matches;
    controls.set(reduce ? entered : { opacity: 0, y: 12, scale: 0.97 });
    element.showModal();
    unlock.current = lockPageScroll();
    setShowImage(true);

    if (!reduce) {
      void controls.start(entered, { duration: 0.23, ease: [0.22, 0.78, 0.24, 1] });
    }
  }

  async function closeCover() {
    const element = dialog.current;
    if (!element?.open || closing.current) return;

    closing.current = true;
    if (!window.matchMedia(motionPreference).matches) {
      await controls.start({ opacity: 0, y: 8, scale: 0.98 }, { duration: 0.16 });
    }
    if (dialog.current === element && element.open) element.close();
  }

  function restorePage() {
    unlock.current?.();
    unlock.current = null;
    closing.current = false;
    pressedBackdrop.current = false;
    setShowImage(false);
    trigger.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-label={`View cover for ${title}`}
        aria-haspopup="dialog"
        aria-controls={`game-cover-${id}`}
        onClick={openCover}
        className="focus-ring group mt-2 inline-flex min-h-11 w-fit items-center gap-2 pr-2 text-sm font-medium text-sky underline decoration-white/30 underline-offset-4 transition-colors hover:text-text active:text-text"
      >
        View cover
        <ArrowUpRight aria-hidden size={15} className="link-arrow motion-safe:group-active:-translate-y-0.5 motion-safe:group-active:translate-x-0.5" />
      </button>
      <dialog
        id={`game-cover-${id}`}
        ref={dialog}
        aria-labelledby={`game-cover-title-${id}`}
        onCancel={(event) => {
          event.preventDefault();
          void closeCover();
        }}
        onClose={restorePage}
        onPointerDown={(event) => {
          pressedBackdrop.current = event.target === event.currentTarget;
        }}
        onClick={(event) => {
          if (pressedBackdrop.current && event.target === event.currentTarget) void closeCover();
          pressedBackdrop.current = false;
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-[42rem] max-h-[calc(100dvh-2rem)] overflow-auto overscroll-contain border-0 bg-transparent p-0 text-text backdrop:bg-ink/80"
      >
        <motion.div
          initial={false}
          animate={controls}
          className="border border-white/15 bg-panel p-4 sm:p-5"
        >
          <div className="mb-3 flex items-center justify-between gap-4">
            <h3 id={`game-cover-title-${id}`} className="display-title min-w-0 text-2xl leading-tight">{title}</h3>
            <button
              type="button"
              onClick={() => void closeCover()}
              className="focus-ring inline-flex min-h-11 shrink-0 items-center gap-2 px-2 text-sm transition-colors hover:text-sky active:bg-white/10"
            >
              Close
              <X aria-hidden size={17} />
            </button>
          </div>
          <div className="relative h-[min(68dvh,36rem)] w-full bg-night">
            {showImage && (
              <Image
                src={src}
                alt={alt}
                fill
                loading="eager"
                sizes="(min-width: 704px) 630px, (min-width: 640px) calc(100vw - 72px), calc(100vw - 64px)"
                className="object-contain"
              />
            )}
          </div>
        </motion.div>
      </dialog>
    </>
  );
}
