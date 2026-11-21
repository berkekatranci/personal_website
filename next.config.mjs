/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async redirects() {
    // Vercel Domains owns host canonicalization. Duplicating www/apex rules
    // here can send requests back against Vercel's redirect and create a loop.
    return [
      { source: "/gariban-adam", destination: "/", permanent: true },
      { source: "/garibanadam", destination: "/", permanent: true },
      { source: "/gariban_adam", destination: "/", permanent: true }
    ];
  }
};

export default nextConfig;
