import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ship the schema file with the API route so it can self-migrate on first request.
  outputFileTracingIncludes: { "/api/demo": ["./db/**/*.sql"] },
};

export default nextConfig;
