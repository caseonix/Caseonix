#!/usr/bin/env node
// Writes /sitemap.xml and /feed.xml from the published HTML, so a new post can
// never be left out of either. lastmod comes from each page's JSON-LD
// dateModified. The home and blog index use the newest date on the site.
//
// Run before every push:  node scripts/build-sitemap.mjs

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SITE = 'https://caseonix.ca';
const N_FEED = 20;

function escapeXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function extractMeta(html) {
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const meta = {};
  let m;
  while ((m = re.exec(html)) !== null) {
    let obj;
    try { obj = JSON.parse(m[1].trim()); } catch { continue; }
    if (obj.dateModified) meta.modified = obj.dateModified;
    if (obj.datePublished) meta.published = obj.datePublished;
    if (obj.headline) meta.headline = obj.headline;
    if (obj.description) meta.description = obj.description;
  }
  return meta;
}

async function scan(dir, urlFor) {
  const out = [];
  for (const name of (await readdir(join(ROOT, dir))).sort()) {
    if (!name.endsWith('.html') || name === 'index.html') continue;
    const html = await readFile(join(ROOT, dir, name), 'utf8');
    out.push({ loc: urlFor(name), ...extractMeta(html) });
  }
  return out;
}

async function main() {
  const posts = await scan('blog', (n) => `${SITE}/blog/${n}`);
  const notes = await scan('notes', (n) => `${SITE}/notes/${n}`);
  const software = await scan('software', (n) => `${SITE}/software/${n}`);
  const about = extractMeta(await readFile(join(ROOT, 'about', 'index.html'), 'utf8'));
  const softwareIndex = extractMeta(await readFile(join(ROOT, 'software', 'index.html'), 'utf8'));

  const articles = [...posts, ...notes];
  const newest = [...articles, ...software, about].map((p) => p.modified).filter(Boolean).sort().at(-1);

  const pages = [
    { loc: `${SITE}/`, modified: newest },
    { loc: `${SITE}/about/`, modified: about.modified },
    { loc: `${SITE}/software/`, modified: softwareIndex.modified },
    ...software,
    { loc: `${SITE}/blog/`, modified: newest },
    ...articles,
  ];
  const urls = pages.map((p) => `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${p.modified}</lastmod>\n  </url>`).join('\n');
  await writeFile(
    join(ROOT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );

  const items = articles
    .filter((a) => a.published)
    .sort((a, b) => (a.published < b.published ? 1 : -1))
    .slice(0, N_FEED)
    .map((a) => `    <item>
      <title>${escapeXml(a.headline)}</title>
      <link>${a.loc}</link>
      <guid>${a.loc}</guid>
      <pubDate>${new Date(a.published + 'T12:00:00Z').toUTCString()}</pubDate>
      <description>${escapeXml(a.description ?? '')}</description>
    </item>`)
    .join('\n');
  await writeFile(
    join(ROOT, 'feed.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Caseonix lab notes</title>
    <link>${SITE}/blog/</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Research and long-form posts by Srivatsa Kasagar, a principal architect in Waterloo, Ontario.</description>
    <language>en-ca</language>
${items}
  </channel>
</rss>
`,
  );

  console.log(`wrote sitemap.xml · ${pages.length} urls, feed.xml · ${Math.min(articles.length, N_FEED)} items`);
}

main().catch((e) => { console.error(e); process.exit(1); });
