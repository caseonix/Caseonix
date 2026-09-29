# caseonix

> A solo AI lab building tools for Canadian regulated markets — residency, privilege, audit trails, agentic reliability. Waterloo, ON · Est. 2024.

**Live:** [caseonix.ca](https://caseonix.ca)

This repo is the source of the site: the homepage, the blog, the lab notes, and the small service behind the homepage's Revision block. The site is where I think out loud; `/blog/` and `/notes/` are the public trail.

---

## Builds

Each project has its own repo. They are all tools I use myself or built for real Canadian compliance problems.

| Project | What it is | Where |
|---|---|---|
| **Consul** | AI-assisted portfolio analysis for private investors. Deterministic math (Sharpe, VaR, beta, fee drag) with Claude-written narratives; the model never does the arithmetic | [consul.caseonix.ca](https://consul.caseonix.ca) |
| **Quincena** | Semi-monthly invoicing for a one-person consulting business, on iPhone. Pre-fills days worked, adds categorized expenses with receipts, renders the PDF, saves it to OneDrive and hands the email to Outlook with delivery held until the invoice date. Nothing sends without approval | [Quincena](https://github.com/caseonix/Quincena) |
| **LocalMind Sovereign** | Document intelligence on Cloudflare's Canadian edge: classification, entity extraction, PII redaction, review workflows | [localmind](https://github.com/caseonix/localmind) |
| **Odo** | A private, on-device mileage logbook for iPhone. File each trip as Business or Personal with one tap and export a CRA-shaped logbook | [odo](https://github.com/caseonix/odo) |
| **FinLit** | Python library for extracting structured data from Canadian financial documents (T-slips, SEDAR filings, bank statements) with PII detection | [FinLit](https://github.com/caseonix/FinLit) |
| **wealth-guide** | Claude Code skill that dispatches six specialist agents to produce a 12-section financial plan | [wealth-guide](https://github.com/caseonix/wealth-guide) |
| **Canadian Tax & CRA** | Claude Code plugin: eight slash commands for CRA obligations across 13 provinces and territories | [canadian-tax-cra](https://github.com/caseonix/canadian-tax-cra) |
| **Canadian Regulatory Compliance** | Claude Code plugin covering eleven areas: PIPEDA, CASL, FINTRAC, OSFI, FCAC and more | [canadian-regulatory-compliance](https://github.com/caseonix/canadian-regulatory-compliance) |
| **LoonieLog** | Receipt tracking for Canadian freelancers inside Google Sheets, mapped to the T2125 | [LoonieLog](https://github.com/caseonix/LoonieLog) |

## Writing

- [Blog](https://caseonix.ca/blog/index.html): longer pieces on why each tool exists and what it took to build.
- [Lab notes](https://caseonix.ca/#details): engineering postmortems, one build decision each.

## Why public

Threads land with me directly, with no agency layer and no SDR queue. Keeping the site repo public is part of that. If you want to see how something on the homepage is built, it is here. The mechanics of publishing and deploying are in [`docs/PUBLISHING.md`](docs/PUBLISHING.md).

## Contact

- **Email:** srivatsa.kasagar@gmail.com
- **LinkedIn:** [linkedin.com/in/skasagar](https://linkedin.com/in/skasagar)
- **GitHub:** [github.com/caseonix](https://github.com/caseonix)
