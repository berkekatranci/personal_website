import type * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        poster?: string;
        alt?: string;
        "camera-controls"?: boolean;
        "auto-rotate"?: boolean;
        loading?: "auto" | "lazy" | "eager";
        exposure?: string;
        "shadow-intensity"?: string;
        ar?: boolean;
      };
    }
  }
}

export {};
