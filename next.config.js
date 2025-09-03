/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // je�eli u�ywasz obraz�w zewn�trznych (np. z Supabase Storage), dodaj tu swoje domeny
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // mo�esz doprecyzowa� np. "twoj-projekt.supabase.co"
      },
    ],
  },
};

module.exports = nextConfig;
