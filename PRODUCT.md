# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: engineers and technical leads at Canadian financial institutions, law firms, and regulated startups who are evaluating AI tooling. They already know PIPEDA, OSFI E-23, RAG, and JSON Schema. Secondary: other AI builders looking for engineering references specific to Canada. Buyers who want to hand off their compliance work to a vendor are not the audience. The site should turn them away, not try to win them.

## Product Purpose
Caseonix is a one-person AI lab run by Srivatsa Kasagar out of Waterloo, ON. It builds AI tools for regulated work in Canada and publishes the engineering behind them. The homepage should get a visitor to **try the products**: Consul, LocalMind, Odo, LoonieLog, FinLit, wealth-guide, and the Canadian Tax & CRA and Canadian Regulatory Compliance Claude Code plugins.

## Positioning
The work is built for regulated contexts in Canada by one operator with 25 years in financial services, and it is built in public. Every project has a repo with real commit history, and lab notes read like engineering postmortems. A studio or a generic AI vendor couldn't honestly show the same live commit and deploy trail.

## Operating Context
Static single-file homepage (index.html) with vanilla CSS/JS on Cloudflare. log.json is generated automatically and feeds the homepage log rows. Blog posts live in /blog and lab notes in /notes. Project details open in an in-page modal.

## Capabilities and Constraints
- Homepage is redesigned first. Blog and notes adopt the system later.
- Stack stays static HTML/CSS/JS. No framework migration.
- Must keep: the live log / deploy / repos widget (proof of work), teal as the brand accent, dark mode as the default (light theme toggle exists).

## Brand Commitments
Voice and terminology come from docs/BRAND.md, which is binding: specific over sweeping, engineering-first, sentence case, no exclamation marks, one emoji max (🇨🇦 on LocalMind). Wordmark is lowercase `caseonix`. Everywhere else it's `Caseonix`.

## Evidence on Hand
Real projects with real metrics (in the PROJECTS object in index.html), log.json entries, repo commit counts, lab notes in /notes, blog posts in /blog. No testimonials, client logos, or customer counts exist, and none may be made up.

## Product Principles
1. Show the build instead of claiming it.
2. Every product is one click from being tried.
3. Turn away buyers who want a compliance vendor. Speak to engineers.
4. Solo is a feature: direct access to the operator.
