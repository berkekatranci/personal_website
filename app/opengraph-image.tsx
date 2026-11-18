import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Berke Katrancı | AI & Software Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          background: "#09111d",
          color: "#f2f5f9",
          borderTop: "8px solid #7dd3fc"
        }}
      >
        <div style={{ display: "flex", color: "#7dd3fc", fontSize: 25, letterSpacing: 4 }}>
          AI · MACHINE LEARNING · SOFTWARE
        </div>
        <div style={{ display: "flex", marginTop: 62, fontSize: 86, fontWeight: 700 }}>
          Berke Katrancı
        </div>
        <div style={{ display: "flex", marginTop: "auto", fontSize: 25, color: "#aab8ca" }}>
          Projects, research & community · TU Braunschweig
        </div>
        <div style={{ display: "flex", marginTop: 22, fontSize: 22, color: "#7dd3fc" }}>
          berkekatranci.com
        </div>
      </div>
    ),
    size
  );
}
