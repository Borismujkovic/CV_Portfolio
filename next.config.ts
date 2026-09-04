import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the workspace root so Turbopack ignores stray lockfiles further up the tree.
  turbopack: { root: path.resolve(process.cwd()) },
};

export default nextConfig;
