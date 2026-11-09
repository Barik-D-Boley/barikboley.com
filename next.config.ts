import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/legacy/v1", destination: "/legacy/v1/index.html" },
        { source: "/legacy/v2", destination: "/legacy/v2/index.html" },
        { source: "/legacy/v2/resume", destination: "/legacy/v2/index.html" },
        { source: "/legacy/v2/gallery", destination: "/legacy/v2/index.html" },
        { source: "/legacy/v2/contact", destination: "/legacy/v2/index.html" },
        { source: "/legacy/v2/login", destination: "/legacy/v2/index.html" },
      ],
    };
  },
};

export default nextConfig;
