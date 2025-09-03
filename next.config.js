/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // je¿eli u¿ywasz obrazów zewnêtrznych (np. z Supabase Storage), dodaj tu swoje domeny
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // mo¿esz doprecyzowaæ np. "twoj-projekt.supabase.co"
      },
    ],
  },
};

module.exports = nextConfig;
