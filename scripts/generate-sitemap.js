// scripts/generate-sitemap.js
// Simple sitemap generator (no external dependencies).
// Writes to BOTH public/sitemap.xml (source of truth for repo)
// AND build/sitemap.xml (so it survives `react-scripts build`).

const fs = require("fs");
const path = require("path");

// ─── Configuration ───
// MUST be absolute, with protocol, NO trailing slash.
const BASE_URL = "https://www.asudhabeauty.shop";

const ROOT_DIR = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const BUILD_DIR = path.join(ROOT_DIR, "build");
const PUBLIC_SITEMAP = path.join(PUBLIC_DIR, "sitemap.xml");
const BUILD_SITEMAP = path.join(BUILD_DIR, "sitemap.xml");

// List of all static routes
const staticRoutes = [
  { url: "/",         priority: 1.0, changefreq: "daily"   },
  { url: "/shop",     priority: 0.9, changefreq: "daily"   },
  { url: "/about",    priority: 0.7, changefreq: "monthly" },
  { url: "/contact",  priority: 0.7, changefreq: "monthly" },
  { url: "/blog",     priority: 0.8, changefreq: "weekly"  },
  { url: "/wishlist", priority: 0.5, changefreq: "monthly" },
  { url: "/login",    priority: 0.5, changefreq: "monthly" },
  { url: "/signup",   priority: 0.5, changefreq: "monthly" },
  { url: "/profile",  priority: 0.5, changefreq: "monthly" },
  { url: "/search",   priority: 0.6, changefreq: "weekly"  },
];

function assertValidBaseUrl() {
  if (
    typeof BASE_URL !== "string" ||
    BASE_URL.trim() === "" ||
    !/^https?:\/\//i.test(BASE_URL)
  ) {
    console.error(
      "❌ BASE_URL must be an absolute URL (e.g. https://www.asudhabeauty.shop). " +
        `Got: "${BASE_URL}"`
    );
    process.exit(1);
  }
  if (BASE_URL.endsWith("/")) {
    console.error("❌ BASE_URL must NOT end with a trailing slash.");
    process.exit(1);
  }
}

function buildSitemapXml() {
  const today = new Date().toISOString().split("T")[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  staticRoutes.forEach((route) => {
    xml += "  <url>\n";
    xml += `    <loc>${BASE_URL}${route.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += "  </url>\n";
  });

  xml += "</urlset>\n";
  return xml;
}

function writeSitemap(targetPath, xml) {
  try {
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, xml, "utf8");
    console.log(`✅ Wrote ${staticRoutes.length} URLs → ${targetPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to write ${targetPath}: ${error.message}`);
    return false;
  }
}

function generateSitemap() {
  assertValidBaseUrl();

  console.log("🚀 Generating sitemap for ASudha Beauty…");
  console.log(`🌐 Base URL: ${BASE_URL}`);

  const xml = buildSitemapXml();

  // Always write to public/ (source of truth for the repo).
  const publicOk = writeSitemap(PUBLIC_SITEMAP, xml);

  // Also write to build/ if a production build already exists.
  // This is the critical fix: postbuild runs AFTER react-scripts build,
  // so build/ has already been produced from the previous public/ contents.
  let buildOk = true;
  if (fs.existsSync(BUILD_DIR)) {
    buildOk = writeSitemap(BUILD_SITEMAP, xml);
  } else {
    console.log("ℹ️  build/ not found — skipping build/sitemap.xml (run after `npm run build`).");
  }

  if (!publicOk || !buildOk) process.exit(1);
}

generateSitemap();