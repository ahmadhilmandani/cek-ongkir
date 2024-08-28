/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/city',
        destination: 'https://api.rajaongkir.com/starter/city',
      },
      {
        source: '/api/cost',
        destination: 'https://api.rajaongkir.com/starter/cost',
      },
    ]
  },
};

export default nextConfig;
