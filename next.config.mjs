/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?:www\\.)?garibanadam\\.com" }],
        destination: "https://berkekatranci.com/:path*",
        permanent: true
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www\\.berkekatranci\\.com" }],
        destination: "https://berkekatranci.com/:path*",
        permanent: true
      },
      { source: "/gariban-adam", destination: "/", permanent: true },
      { source: "/garibanadam", destination: "/", permanent: true },
      { source: "/gariban_adam", destination: "/", permanent: true }
    ];
  }
};

export default nextConfig;
