const million = require("million/compiler");

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = million.next(nextConfig, {
  auto: { rsc: true },
  env: {
    DATABASE_URL:
      process.env.NODE_ENV ===
      "mongodb+srv://isyrafmagic:svKOjjyck87dQ58A@undilokal.krcje1u.mongodb.net/undilokal",
    URL:
      process.env.NODE_ENV === "production"
        ? "https://undilokal.vercel.app"
        : "http://localhost:3000/",
  },
});
