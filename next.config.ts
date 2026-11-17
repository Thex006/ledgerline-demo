import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PGlite ships WASM + data files; load it from node_modules instead of bundling.
  serverExternalPackages: ["@electric-sql/pglite"],
  // Ship the schema file with the API route so it can self-migrate on first request.
  outputFileTracingIncludes: { "/api/demo": ["./db/**/*.sql"] },
};

export default nextConfig;
