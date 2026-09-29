<p align="center">
  <a href="https://caseonix.ca"><img src="og-image-v2.png" width="720" alt="caseonix — a solo AI lab, Waterloo, ON" /></a>
</p>

<p align="center">
  <b>Tools for Canadian regulated work.</b> Residency, privilege, audit trails, agentic reliability.<br/>
  Built and run by one person in Waterloo, Ontario, and used on real books, real portfolios and real drives.
</p>

<p align="center">
  <a href="https://caseonix.ca"><img src="https://img.shields.io/badge/caseonix.ca-site-7FCBB0?style=flat-square&labelColor=0E1B2B" alt="Site" /></a>
  <a href="https://caseonix.ca/blog/index.html"><img src="https://img.shields.io/badge/blog-lab%20notes-7FCBB0?style=flat-square&labelColor=0E1B2B" alt="Blog" /></a>
  <a href="https://linkedin.com/in/skasagar"><img src="https://img.shields.io/badge/LinkedIn-skasagar-7FCBB0?style=flat-square&labelColor=0E1B2B" alt="LinkedIn" /></a>
  <a href="mailto:srivatsa.kasagar@gmail.com"><img src="https://img.shields.io/badge/email-start%20a%20thread-7FCBB0?style=flat-square&labelColor=0E1B2B" alt="Email" /></a>
</p>

<br/>

## Now building

- **[Quincena](https://github.com/caseonix/Quincena)** · iPhone · Semi-monthly invoicing for a one-person consulting business. Pre-fills the days worked, adds categorized expenses with receipts, renders the PDF, saves it to OneDrive and hands the email to Outlook with delivery held until 8:00 on the invoice date. Nothing sends without approval.
- **[Odo](https://github.com/caseonix/odo)** · iPhone · A private, on-device mileage logbook. File each trip as Business or Personal with one tap; export a logbook your accountant can open. No account, no server, location never leaves the phone.

## Builds

| | Project | What it does | Status |
|:-:|---|---|:--|
| 🧮 | **[Consul](https://consul.caseonix.ca)** | Portfolio analysis for private investors. Sharpe, VaR, beta, concentration and fee drag are computed in code; Claude writes the narrative and never does the arithmetic. | `live` |
| 🧾 | **[Quincena](https://github.com/caseonix/Quincena)** | Semi-monthly consulting invoices from days worked: PDF to OneDrive, deferred email through Microsoft Graph, receipts zipped alongside, payment tracking. | `in use` |
| 🍁 | **[LocalMind](https://github.com/caseonix/localmind)** | Document intelligence on Cloudflare's Canadian edge: classification, entity extraction, PII redaction, review workflows. Inference pinned to the Canadian region. | `live` |
| 🚗 | **[Odo](https://github.com/caseonix/odo)** | On-device mileage logbook for the CRA. GPS to SQLite, Business or Personal with one tap, CSV export. | `in build` |
| 📄 | **[FinLit](https://github.com/caseonix/FinLit)** | Python library that extracts structured data from T-slips, SEDAR filings and bank statements, with per-field confidence and PII detection. | `library` |
| 🧭 | **[wealth-guide](https://github.com/caseonix/wealth-guide)** | Claude Code skill: six specialist agents turn a 10-question interview into a 12-section financial plan. | `skill` |
| 🏛️ | **[Canadian Tax & CRA](https://github.com/caseonix/canadian-tax-cra)** | Claude Code plugin: eight slash commands for CRA obligations across all 13 provinces and territories. | `plugin` |
| ⚖️ | **[Canadian Regulatory Compliance](https://github.com/caseonix/canadian-regulatory-compliance)** | Claude Code plugin across eleven areas: PIPEDA, CASL, FINTRAC, OSFI, FCAC and more. | `plugin` |
| 🧾 | **[LoonieLog](https://github.com/caseonix/LoonieLog)** | Receipt tracking for Canadian freelancers inside Google Sheets, mapped to the T2125. | `free` |

## How I build

- **Numbers in code, prose from the model.** Anything with a dollar sign or a tax rate is a pure function with tests. The model explains; it never calculates.
- **Data stays where it belongs.** On the device, on the owner's own cloud account, or on Canadian infrastructure. No analytics, no crash reporting, no third-party SDK without a reason.
- **Nothing irreversible without a tap.** Invoices, emails and exports go out only after an explicit approval, and every multi-step flow can be retried without doing anything twice.
- **Ship, then write it down.** Each build gets a lab note on what it took and what went wrong.

## Writing

- [Making six models look like one: a multi-agent orchestration pattern](https://caseonix.ca/blog/multi-agent-orchestration-pattern.html)
- [Why we built Consul: private wealth intelligence for the people who manage their own money](https://caseonix.ca/blog/why-we-built-consul.html)
- [Research note: cheque image fraud detection on AWS](https://caseonix.ca/notes/cheque-fraud-detection-lab-notes.html)
- [Lab note: the LocalMind RAG pipeline](https://caseonix.ca/notes/localmind-rag-pipeline.html)

More at [caseonix.ca](https://caseonix.ca#details).

## Stack

`Swift` `SwiftUI` `TypeScript` `Python` `Cloudflare Workers` `D1` `R2` `Vectorize` `Workers AI` `Hono` `Claude` `MCP` `Microsoft Graph`

---

<p align="center">
  <sub>This repo is also the source of <a href="https://caseonix.ca">caseonix.ca</a>. How the site is built and published is in <a href="docs/PUBLISHING.md">docs/PUBLISHING.md</a>.</sub>
</p>
