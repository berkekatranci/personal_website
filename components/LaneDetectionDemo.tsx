"use client";

import { useId, useState } from "react";
import styles from "./LaneDetectionDemo.module.css";

export function LaneDetectionDemo() {
  const id = useId();
  const [showOverlay, setShowOverlay] = useState(false);
  const titleId = `${id}-title`;
  const sceneId = `${id}-scene`;

  return (
    <figure id="lane-demo" aria-labelledby={titleId} className="mt-10 border border-white/15 bg-night">
      <div className="px-4 pt-5 sm:px-6 sm:pt-6">
        <p className="eyebrow">Illustrative demo</p>
        <h3 id={titleId} className="display-title mt-2 text-2xl leading-snug">See the lane boundaries</h3>
        <div role="group" aria-label="Road frame display" className="mt-4 flex flex-wrap gap-x-5">
          <button
            type="button"
            aria-pressed={!showOverlay}
            aria-controls={sceneId}
            onClick={() => setShowOverlay(false)}
            className={`${styles.option} focus-ring min-h-11 text-sm`}
          >
            Original
          </button>
          <button
            type="button"
            aria-pressed={showOverlay}
            aria-controls={sceneId}
            onClick={() => setShowOverlay(true)}
            className={`${styles.option} focus-ring min-h-11 text-sm`}
          >
            Model output
          </button>
        </div>
      </div>
      <div
        id={sceneId}
        role="img"
        aria-label={showOverlay
          ? "Illustrated road frame with two highlighted lane boundaries"
          : "Illustrated road frame with painted lane markings"}
        data-overlay={showOverlay}
        className={`${styles.scene} mx-4 mt-3 sm:mx-6`}
      >
        <div aria-hidden="true" className={styles.horizon} />
        <div aria-hidden="true" className={styles.road} />
        <div aria-hidden="true" className={styles.centerLine} />
        <div aria-hidden="true" className={`${styles.boundary} ${styles.left}`} />
        <div aria-hidden="true" className={`${styles.boundary} ${styles.right}`} />
        <div aria-hidden="true" className={styles.overlay}>
          <div className={`${styles.boundary} ${styles.left}`} />
          <div className={`${styles.boundary} ${styles.right}`} />
        </div>
      </div>
      <figcaption aria-live="polite" aria-atomic="true" className="min-h-[5.25rem] px-4 py-4 text-sm leading-6 text-muted sm:min-h-0 sm:px-6">
        {showOverlay
          ? "The cyan lines show where the pipeline would draw the estimated lane boundaries."
          : "This drawn road scene illustrates how the pipeline visualizes lane markings."}
      </figcaption>
    </figure>
  );
}
