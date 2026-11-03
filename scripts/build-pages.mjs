#!/usr/bin/env node
// Generates /about/index.html, /software/index.html and one /software/<slug>.html
// per product, reusing the head styles, nav, footer and theme script from
// scripts/templates/note.html so these pages stay in step with the lab notes.
//
// Product copy lives in PRODUCTS below. Bump UPDATED when it changes.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TEMPLATE_PATH = join(__dirname, 'templates', 'note.html');

const SITE = 'https://caseonix.ca';
const UPDATED = '2026-10-30';
const PERSON_ID = `${SITE}/about/#person`;
const ORG_ID = `${SITE}/#org`;
const OG_IMAGE = `${SITE}/og-image-v2.png`;

const POSTS = {
  banks: ['/blog/banks-ai-agents-architecture.html', 'Banks told AI agents to stay out: the agent gateway architecture'],
  consul: ['/blog/why-we-built-consul.html', 'Why we built Consul'],
  orchestration: ['/blog/multi-agent-orchestration-pattern.html', 'Making six models look like one: a multi-agent orchestration pattern'],
  wealth: ['/blog/building-multi-agent-claude-skills-wealth-guide.html', 'Multi-agent Claude Code skills: the wealth-guide pattern'],
  t4: ['/blog/extracting-t4-data-python-canadian-developer-guide.html', 'Extracting T4 data from PDFs in Python'],
  pipeda: ['/blog/building-pipeda-compliant-ai-tools.html', 'Building AI tools for PIPEDA: a developer&rsquo;s guide'],
  finserv: ['/blog/ai-canadian-financial-services-compliance-playbook.html', 'AI for Canadian financial services (OSFI E-23 notes)'],
  lawfirms: ['/blog/chatgpt-vs-self-hosted-ai-law-firms.html', 'ChatGPT vs self-hosted AI for Canadian law firms'],
  ragPipeline: ['/notes/localmind-rag-pipeline.html', 'Lab note 1/3: the LocalMind RAG pipeline'],
  ragQuality: ['/notes/localmind-rag-quality.html', 'Lab note 2/3: how I improved RAG quality'],
  ragNlp: ['/notes/localmind-nlp-layer.html', 'Lab note 3/3: the NLP layer alongside RAG'],
  auditlm: ['/notes/auditlm-ai-governance-gap.html', 'Research note: AuditLM and the AI governance gap'],
  nordid: ['/notes/nordid-canadian-business-identity.html', 'Research note: NordID and Canadian business identity'],
  pega: ['/notes/pega-autopilot-lab-notes.html', 'Pega GenAI Autopilot: what adoption really takes'],
  pegaMcp: ['/notes/pega-mcp-starter-lab-notes.html', 'Starter lab notes: Pega Infinity 26 and MCP'],
  cheque: ['/notes/cheque-fraud-detection-lab-notes.html', 'Research note: cheque image fraud detection on AWS'],
};

const PRODUCTS = [
  {
    slug: 'consul',
    name: 'Consul',
    title: 'Consul: AI portfolio analysis for private investors',
    description: 'Consul is portfolio analysis for private investors. Sharpe ratio, VaR, beta and fee drag are computed in code; Claude writes the plain-language narrative.',
    kind: 'Web app',
    status: 'Live',
    category: 'FinanceApplication',
    os: 'Web',
    summary: 'Portfolio analysis for private investors. Deterministic calculations are paired with Claude-generated narratives, and every calculation is isolated from the model.',
    points: [
      'Claude never does arithmetic. Sharpe ratio, VaR at 95%, beta, HHI concentration, CAGR and 20-year fee drag are computed in code.',
      'Manual entry or CSV import, enriched with live market data via Finnhub.',
      'Educational tool. Not investment advice, and not a registered investment advisor.',
    ],
    stack: 'React 18, Hono 4, Cloudflare Workers, D1, Drizzle, Claude Sonnet 4.6, Finnhub, Clerk',
    link: ['https://consul.caseonix.ca', 'Open consul.caseonix.ca'],
    related: ['consul', 'orchestration'],
  },
  {
    slug: 'localmind',
    name: 'LocalMind',
    title: 'LocalMind: Canadian-edge document intelligence',
    description: 'LocalMind classifies documents, extracts entities, detects PII and runs review workflows, with inference routed through Cloudflare&rsquo;s Canadian region.',
    kind: 'Document intelligence',
    status: 'Live MVP',
    category: 'BusinessApplication',
    os: 'Web',
    summary: 'Canadian-edge document intelligence. Upload documents and LocalMind classifies them, extracts entities, detects PII, runs configurable review workflows, and compares across documents.',
    points: [
      'Inference routed through Cloudflare&rsquo;s Canadian region via AI Gateway.',
      'PII detection and redaction for SIN, credit card and health ID.',
      'Storage in R2, Vectorize and D1, with Workers AI behind the gateway.',
    ],
    stack: 'Cloudflare Workers, R2, Vectorize, D1, AI Gateway, Workers AI',
    link: ['https://localmind.caseonix.ca', 'Open localmind.caseonix.ca'],
    related: ['ragPipeline', 'ragQuality', 'ragNlp', 'pipeda'],
  },
  {
    slug: 'quincena',
    name: 'Quincena',
    title: 'Quincena: semi-monthly invoicing app for iPhone',
    description: 'Quincena is a semi-monthly invoicing app for one-person consulting businesses on iPhone. PDF to OneDrive, email held in Outlook until the invoice date.',
    kind: 'iOS app',
    status: 'In use',
    category: 'BusinessApplication',
    os: 'iOS',
    summary: 'Semi-monthly invoicing for a one-person consulting business. Quincena pre-fills the days worked, adds categorized expenses with receipts, renders the PDF, saves it to OneDrive and hands the email to Outlook.',
    points: [
      'Nothing sends without approval. A reminder the day before, a fallback on the day, and a resumable four-step send that never double-numbers or double-uploads.',
      'No server. It talks only to the owner&rsquo;s own Microsoft account.',
    ],
    stack: 'SwiftUI, SwiftData, MSAL, Microsoft Graph, ImageRenderer',
    link: ['https://github.com/caseonix/Quincena', 'View the repo on GitHub'],
    repo: 'https://github.com/caseonix/Quincena',
    related: [],
  },
  {
    slug: 'odo',
    name: 'Odo',
    title: 'Odo: private on-device mileage logbook for iPhone',
    description: 'Odo is a private, on-device mileage logbook for iPhone. File each trip as Business or Personal with one tap and export a logbook your accountant can open in Excel.',
    kind: 'iOS app',
    status: 'In build',
    category: 'BusinessApplication',
    os: 'iOS',
    summary: 'A private, on-device mileage logbook for iPhone. File each trip as Business or Personal with one tap, and export a logbook your accountant can open in Excel.',
    points: [
      'GPS fixes are written to SQLite on the device. Nothing leaves the iPhone.',
      'No servers and no analytics.',
      'TestFlight is coming soon.',
    ],
    stack: 'Expo SDK 57, expo-location, expo-sqlite',
    related: [],
  },
  {
    slug: 'finlit',
    name: 'FinLit',
    title: 'FinLit: Python extraction for Canadian documents',
    description: 'FinLit is an open-source Python library that extracts structured data from T4s, T5s, SEDAR filings and bank statements, with per-field confidence and traceability.',
    kind: 'Python library',
    status: 'Apache 2.0',
    category: 'DeveloperApplication',
    os: 'Cross-platform',
    license: 'https://www.apache.org/licenses/LICENSE-2.0',
    summary: 'Structured extraction from T4s, T5s, SEDAR filings and bank statements, with per-field confidence and source traceability to page and bounding box.',
    points: ['Install with <code>pip install finlit</code>.', 'Open source under the Apache 2.0 licence.'],
    stack: 'Python',
    link: ['https://github.com/caseonix/FinLit', 'View the repo on GitHub'],
    repo: 'https://github.com/caseonix/FinLit',
    extra: ['https://pypi.org/project/finlit/'],
    related: ['t4'],
  },
  {
    slug: 'wealth-guide',
    name: 'wealth-guide',
    title: 'wealth-guide: multi-agent Claude Code skill',
    description: 'wealth-guide is an open-source Claude Code skill. A 10-question interview sends six specialist agents to work in parallel and produces a 12-section financial plan.',
    kind: 'Claude Code skill',
    status: 'MIT',
    category: 'DeveloperApplication',
    os: 'Cross-platform',
    license: 'https://opensource.org/license/mit',
    summary: 'A six-specialist wealth team for Claude Code. A 10-question interview produces a 12-section financial plan.',
    points: ['Specialist agents analyse the answers in parallel.', 'Educational output, not licensed financial advice.'],
    stack: 'Claude Code',
    link: ['https://github.com/caseonix/wealth-guide', 'View the repo on GitHub'],
    repo: 'https://github.com/caseonix/wealth-guide',
    related: ['wealth', 'orchestration'],
  },
  {
    slug: 'canadian-tax-cra',
    name: 'Canadian Tax & CRA',
    title: 'Canadian Tax & CRA: a plugin for Claude Code',
    description: 'A Claude Code plugin with eight slash commands for Canadian small business obligations, with 2026 rates for all 13 provinces and territories.',
    kind: 'Claude Code plugin',
    status: 'v0.5',
    category: 'DeveloperApplication',
    os: 'Cross-platform',
    summary: 'Eight slash commands for Canadian small business obligations, with 2026 rates for all 13 provinces and territories.',
    points: ['Written in plain language, with no tax background required.', 'Engineering commentary, not tax advice.'],
    stack: 'Claude Code',
    link: ['https://github.com/caseonix/canadian-tax-cra', 'Install from GitHub'],
    repo: 'https://github.com/caseonix/canadian-tax-cra',
    related: ['t4'],
  },
  {
    slug: 'canadian-regulatory-compliance',
    name: 'Canadian Regulatory Compliance',
    title: 'Canadian Regulatory Compliance: Claude Code plugin',
    description: 'A Claude Code plugin with practical guidance across Canadian regulatory areas, from PIPEDA and CASL to FINTRAC notices, inside your developer workflow.',
    kind: 'Claude Code plugin',
    status: 'v0.4',
    category: 'DeveloperApplication',
    os: 'Cross-platform',
    summary: 'Practical guidance across Canadian regulatory areas, from PIPEDA and CASL to FINTRAC notices, inside your developer workflow.',
    points: ['Runs inside Claude Code.', 'Engineering commentary, not legal or compliance advice.'],
    stack: 'Claude Code',
    link: ['https://github.com/caseonix/canadian-regulatory-compliance', 'Install from GitHub'],
    repo: 'https://github.com/caseonix/canadian-regulatory-compliance',
    related: ['pipeda', 'finserv'],
  },
  {
    slug: 'loonielog',
    name: 'LoonieLog',
    title: 'LoonieLog: CRA receipt tracking in Google Sheets',
    description: 'LoonieLog automates receipt hunting and CRA T2125 expense logging inside Google Sheets for Canadian freelancers. No signup and no server.',
    kind: 'Google Sheets',
    status: 'Free',
    category: 'FinanceApplication',
    os: 'Web',
    summary: 'Automated receipt hunting and CRA T2125 expense logging inside Google Sheets. No signup, no server.',
    points: ['Built for Canadian freelancers.', 'Runs inside your own Google account.'],
    stack: 'Google Apps Script, Google Sheets',
    link: ['https://github.com/caseonix/LoonieLog', 'View the repo on GitHub'],
    repo: 'https://github.com/caseonix/LoonieLog',
    related: [],
  },
];

const PROFILE_LINKS = [
  ['LinkedIn', 'https://www.linkedin.com/in/skasagar'],
  ['GitHub', 'https://github.com/caseonix'],
  ['DEV', 'https://dev.to/srivatsakasagar'],
];

function plain(s) {
  return s.replace(/&rsquo;/g, '’').replace(/&amp;/g, '&').replace(/<[^>]+>/g, '');
}

function attr(s) {
  return plain(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function jsonLd(obj) {
  return `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/<\/script/gi, '<\\/script')}\n  </script>`;
}

function breadcrumbs(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
  };
}

function relatedList(keys) {
  if (keys.length === 0) return '';
  const items = keys.map((k) => `<li><a href="${POSTS[k][0]}">${POSTS[k][1]}</a></li>`).join('\n        ');
  return `<h2>Related writing</h2>\n      <ul>\n        ${items}\n      </ul>`;
}

function page(shell, { title, description, path, ogType = 'website', schema, eyebrow, h1, meta, back, body }) {
  const url = `${SITE}${path}`;
  const head = `<title>${attr(title)} | Caseonix</title>
  <meta name="description" content="${attr(description)}" />
  <meta name="author" content="Srivatsa Kasagar" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
  <link rel="canonical" href="${url}" />
  <link rel="alternate" hreflang="en-ca" href="${url}" />
  <link rel="alternate" hreflang="x-default" href="${url}" />

  <meta property="og:title" content="${attr(title)}" />
  <meta property="og:description" content="${attr(description)}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${OG_IMAGE}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="Caseonix" />
  <meta property="og:locale" content="en_CA" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${attr(title)}" />
  <meta name="twitter:description" content="${attr(description)}" />
  <meta name="twitter:image" content="${OG_IMAGE}" />

  ${schema.map(jsonLd).join('\n  ')}`;
  const main = `<main class="note-wrapper">
    <a href="${back[0]}" class="note-back">&larr; ${back[1]}</a>

    <div class="note-eyebrow">&sect; ${eyebrow}</div>
    <h1 class="note-title">${h1}</h1>
    <div class="note-meta">
      ${meta.map((m) => `<span>${m}</span>`).join('\n      ')}
    </div>

    <div class="note-body">
      ${body}
    </div>
  </main>`;
  return shell.before + head + shell.afterHead + main + shell.after;
}

function aboutPage(shell) {
  const links = PROFILE_LINKS.map(([n, u]) => `<li><a href="${u}">${n}</a></li>`).join('\n        ');
  const software = PRODUCTS.map((p) => `<li><a href="/software/${p.slug}.html">${p.name.replace('&', '&amp;')}</a>: ${p.kind}</li>`).join('\n        ');
  return page(shell, {
    title: 'Srivatsa Kasagar: Founder & Principal Architect',
    description: 'Founder of Caseonix. Principal architect for AI, Pega and AWS systems in banking. 25+ years in financial services. Based in Waterloo, Ontario.',
    path: '/about/',
    ogType: 'profile',
    eyebrow: 'About',
    h1: 'Srivatsa Kasagar',
    meta: ['Founder &amp; Principal Architect', 'Waterloo, ON'],
    back: ['/', 'back to caseonix'],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        dateModified: UPDATED,
        mainEntity: {
          '@type': 'Person',
          '@id': PERSON_ID,
          name: 'Srivatsa Kasagar',
          url: `${SITE}/about/`,
          jobTitle: 'Founder & Principal Architect',
          description: 'Founder of Caseonix. Principal architect for AI, Pega and AWS systems in banking. 25+ years in financial services. Based in Waterloo, Ontario.',
          worksFor: { '@id': ORG_ID },
          address: { '@type': 'PostalAddress', addressLocality: 'Waterloo', addressRegion: 'Ontario', addressCountry: 'CA' },
          sameAs: PROFILE_LINKS.map(([, u]) => u),
          knowsAbout: ['Artificial Intelligence', 'Retrieval-Augmented Generation', 'Agentic AI Architectures', 'Multi-Agent Systems', 'Claude Code', 'Claude API', 'Cloudflare Workers AI', 'Financial Services Engineering', 'Banking Systems Architecture', 'Pega Platform', 'Amazon Web Services', 'Python', 'Canadian Data Residency Engineering'],
        },
      },
      breadcrumbs([['Caseonix', `${SITE}/`], ['About', `${SITE}/about/`]]),
    ],
    body: `<p>I&rsquo;m Srivatsa Kasagar, founder and principal architect at <a href="/">Caseonix</a>, based in Waterloo, Ontario.</p>
      <p>I have built systems for banks and financial services firms for 25+ years. Most of that work is case management, cloud platforms and the integrations that connect them. I still do that work as an independent architect.</p>
      <p>Caseonix is my AI lab. I build AI systems for Canadian regulated industries and publish the engineering behind them: what I chose, what it cost, and what broke.</p>
      <h2>What I build</h2>
      <ul>
        ${software}
      </ul>
      <h2>What I write about</h2>
      <p>How AI fits into bank systems: case management on Pega, cloud on AWS, multi-agent architectures, RAG and data residency. Start with <a href="/blog/index.html">the lab notes</a>, or read these:</p>
      <ul>
        ${['banks', 'pegaMcp', 'pega', 'cheque', 'finserv', 'orchestration', 'ragPipeline'].map((k) => `<li><a href="${POSTS[k][0]}">${POSTS[k][1]}</a></li>`).join('\n        ')}
      </ul>
      <h2>Find me elsewhere</h2>
      <ul>
        ${links}
      </ul>
      <p><a href="/#transmittal">Start a thread</a> if you&rsquo;re working on a related problem.</p>`,
  });
}

function softwareIndex(shell) {
  const rows = PRODUCTS.map((p) => `<h2><a href="/software/${p.slug}.html">${p.name.replace('&', '&amp;')}</a></h2>
      <p>${p.summary}</p>`).join('\n      ');
  return page(shell, {
    title: 'Software by Caseonix: AI tools for Canadian work',
    description: 'Nine builds by Srivatsa Kasagar at Caseonix: web apps, iOS apps, Claude Code plugins and open-source Python libraries for Canadian regulated work.',
    path: '/software/',
    eyebrow: 'Software',
    h1: 'Software',
    meta: ['Nine builds', `By <a href="/about/">Srivatsa Kasagar</a>`],
    back: ['/', 'back to caseonix'],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Software by Caseonix',
        url: `${SITE}/software/`,
        dateModified: UPDATED,
        inLanguage: 'en-CA',
        author: { '@id': PERSON_ID },
        publisher: { '@id': ORG_ID },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: PRODUCTS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/software/${p.slug}.html`, name: p.name })),
        },
      },
      breadcrumbs([['Caseonix', `${SITE}/`], ['Software', `${SITE}/software/`]]),
    ],
    body: `<p>Nine builds for Canadian regulated work, each with its own page. Some are live, some are in daily use, and the libraries and plugins are on GitHub.</p>
      ${rows}`,
  });
}

function productPage(shell, p) {
  const url = `${SITE}/software/${p.slug}.html`;
  const sameAs = [p.repo, ...(p.extra ?? [])].filter(Boolean);
  const app = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: p.name,
    url,
    description: plain(p.description),
    applicationCategory: p.category,
    operatingSystem: p.os,
    dateModified: UPDATED,
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
  };
  if (sameAs.length) app.sameAs = sameAs;
  if (p.license) app.license = p.license;
  const points = p.points.map((x) => `<li>${x}</li>`).join('\n        ');
  const cta = p.link ? `<p><a href="${p.link[0]}">${p.link[1]}</a></p>` : '';
  return page(shell, {
    title: p.title,
    description: p.description,
    path: `/software/${p.slug}.html`,
    eyebrow: p.kind,
    h1: p.name.replace('&', '&amp;'),
    meta: [p.status, `By <a href="/about/">Srivatsa Kasagar</a>`],
    back: ['/software/', 'back to software'],
    schema: [app, breadcrumbs([['Caseonix', `${SITE}/`], ['Software', `${SITE}/software/`], [p.name, url]])],
    body: `<p>${p.summary}</p>
      ${cta}
      <h2>How it works</h2>
      <ul>
        ${points}
      </ul>
      <h2>Materials</h2>
      <p>${p.stack}</p>
      ${relatedList(p.related)}`,
  });
}

async function main() {
  const template = await readFile(TEMPLATE_PATH, 'utf8');
  const titleIdx = template.indexOf('<title>');
  const scriptIdx = template.indexOf('<link rel="icon"');
  const mainIdx = template.indexOf('<main class="note-wrapper">');
  const mainEnd = template.indexOf('</main>') + '</main>'.length;
  const shell = {
    before: template.slice(0, titleIdx),
    afterHead: '\n\n  ' + template.slice(scriptIdx, mainIdx).replace(' class="active"', ''),
    after: template.slice(mainEnd).replace('{{mermaid_script}}', ''),
  };

  await mkdir(join(ROOT, 'about'), { recursive: true });
  await mkdir(join(ROOT, 'software'), { recursive: true });
  await writeFile(join(ROOT, 'about', 'index.html'), aboutPage(shell));
  await writeFile(join(ROOT, 'software', 'index.html'), softwareIndex(shell));
  for (const p of PRODUCTS) {
    await writeFile(join(ROOT, 'software', `${p.slug}.html`), productPage(shell, p));
  }
  console.log(`built about, software index and ${PRODUCTS.length} product pages`);
}

main().catch((e) => { console.error(e); process.exit(1); });
