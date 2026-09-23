# SEO Audit & Action Plan — baskgrowth.xyz
**Prepared for:** BASK Growth Agency (Bangalore)
**Date:** September 2026
**Scope:** Live site audit (baskgrowth.xyz) + competitive research (Bangalore digital marketing agency niche) + prioritized action plan

---

## 1. Data limitations (read this first)

This report is based on:
- A live fetch of baskgrowth.xyz's HTML source
- Live SERP checks for target keywords
- Public research on Bangalore digital marketing agency competitors

It does **not** include: Ahrefs/SEMrush/Moz backlink or Domain Authority data, Google Search Console data, PageSpeed Insights scores, or actual keyword rank tracking. Those require account access this research doesn't have. Recommended free/paid tools to fill these gaps are listed in Section 6.

---

## 2. Critical Finding: No Crawlable Content

When fetched directly, both `https://baskgrowth.xyz/` and `https://www.baskgrowth.xyz/` return **only `<head>` meta tags — no body text, headings, or visible content** in the raw HTML response.

**Likely cause:** The site is built as a client-side rendered JavaScript app (React/Vue/Next.js without server-side rendering or static generation). Content only appears after JS executes in a browser.

**Why this blocks everything else:**
- Googlebot renders JS, but on a delayed "second wave" — slower and weaker indexing than a page serving real HTML immediately.
- Bing and most other crawlers render JS unreliably or not at all.
- AI crawlers that power ChatGPT, Perplexity, and Claude's search (GPTBot, PerplexityBot, ClaudeBot) generally do **not** execute JavaScript — meaning the site is likely invisible to AI-search citations entirely.
- No content = no on-page SEO audit is possible until this is fixed (headings, keyword usage, internal links all live inside that missing body).

**Fix, in order:**
1. Confirm the real-world impact: Google Search Console → URL Inspection → "Live Test" → check the rendered HTML/screenshot.
2. Implement server-side rendering or static generation:
   - Next.js: use `getStaticProps`/`getServerSideProps`, or the App Router's server components.
   - Plain React/Vite: add a prerendering step (static export, or a service like Prerender.io).
   - Webflow/other site builders: usually not an issue — if you're on one of these, the JS-rendering theory may not apply and the cause should be investigated differently.
3. Re-fetch/re-crawl the site after the fix to confirm real text content is present in the raw HTML.

---

## 3. Other On-Page Findings (from available `<head>` data)

| Element | Status | Notes |
|---|---|---|
| Title tag | ✅ Good | "BASK Growth Agency Bangalore \| Performance Marketing & SEO Experts" |
| Meta description | ✅ Good | Keyword-rich, mentions services + CTA, appropriate length |
| Open Graph / Twitter cards | ✅ Present | Well-formed, includes image dimensions |
| Geo meta tags | ✅ Present | `geo.placename`, `geo.position` set to Bangalore coordinates — a nice, uncommon touch |
| `meta-keywords` | ⚠️ Present but irrelevant | Ignored by Google; harmless to keep, not worth maintaining |
| Canonical tag | ✅ Correct | Points to `www` version; both www/non-www resolve without conflict |
| Domain TLD | ⚠️ `.xyz` | Not disqualifying, but historically associated with lower trust/spam in some contexts. B2B buyers may hesitate. Consider a `.com`/`.in` if available. |
| Body content, headings, schema, images, internal links | ❌ Unknown | Cannot audit — invisible until rendering issue is fixed |

---

## 4. Competitive Landscape (Bangalore digital marketing SEO)

Live search for **"SEO company in Bangalore"** (the primary target keyword) surfaced these ranking competitors — BASK did not appear:

- **Carmatec** — claims 17+ years, 1000+ brands, "2000K+ keywords page 1"
- **NOIR & BLANCO** — positions on hyper-local Bangalore-area targeting (Koramangala, Indiranagar, Whitefield, HSR, Electronic City)
- **OneCity Technologies** — 20+ years (since 2004/2006), named-author E-E-A-T strategy, documented case-study numbers
- **Bloom Agency** — intent-based keyword strategy messaging

**Also researched: DigiMark Agency** (digimarkagency.com), a Bangalore agency with 11+ years, strong FAQ/schema-ready content, but weaknesses in stale/contradictory copy and keyword-stuffed alt text. Full audit available separately if useful for competitive benchmarking.

**Takeaway:** This is one of the most contested local SEO niches in India. Every serious competitor leads with years-in-business, named case studies/numbers, and increasingly, named authors for E-E-A-T. A new domain competing purely on-page won't out-rank 10–20 year old sites on the head term alone — content depth, local proof, and backlinks over time are what close the gap.

---

## 5. Full Action Plan

### Phase 0 — Foundation (blocking, do first)
- [ ] Fix JS-rendering issue (Section 2) — get real HTML content into the page source
- [ ] Set up Google Search Console, verify domain, submit sitemap
- [ ] Set up Bing Webmaster Tools
- [ ] Set up GA4 for measurement
- [ ] Add/verify `robots.txt` with a `Sitemap:` directive pointing to an absolute sitemap URL
- [ ] Generate and submit an XML sitemap

### Phase 1 — Technical SEO
- [ ] Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Compress images to WebP, lazy-load below-the-fold content, minimize JS bundle size
- [ ] Test actual mobile rendering on a real phone, not just responsive breakpoints
- [ ] Clean URL structure (`/services/seo-company-bangalore`, not query strings)
- [ ] Run a full crawl (Screaming Frog or similar) once rendering is fixed — check for broken links, duplicate titles, missing alt text
- [ ] Add structured data: `LocalBusiness` + `Organization` schema (geo coordinates already exist in meta — reuse them), `FAQPage` schema if you add an FAQ section, `Service` schema per service page

### Phase 2 — On-Page & Content Architecture
- [ ] Build one dedicated landing page per service + city combo:
  - SEO Company in Bangalore
  - Google Ads Agency Bangalore
  - Meta Ads Agency Bangalore
  - (repeat pattern per service)
- [ ] Each page: unique H1, 800–1,500 words of genuinely useful (non-templated) content, its own internal links
- [ ] Target long-tail/intent keywords alongside head terms: "SEO pricing Bangalore," "best Google Ads agency for D2C Bangalore," etc. — less contested, higher conversion intent
- [ ] Build a blog/resource section: case studies, cost guides, industry-specific SEO breakdowns (real estate, healthcare, D2C, etc.)
- [ ] Internal-link every blog post to relevant service pages with descriptive (not exact-match spammy) anchor text

### Phase 3 — Local SEO
- [ ] Fully build out Google Business Profile: correct category, service areas, weekly posts, seeded Q&A, photos
- [ ] Actively collect Google reviews — recency and volume are major local-pack ranking factors
- [ ] Get listed with identical NAP (name/address/phone) on: Justdial, Sulekha, IndiaMART, Clutch, GoodFirms, DesignRush
- [ ] Embed Google Map on the site if there's a physical office; confirm address matches GBP exactly

### Phase 4 — Off-Page / Authority
- [ ] Guest posts on Indian marketing/business blogs
- [ ] Get included in "best agencies in Bangalore" roundup articles — find who publishes these and pitch inclusion
- [ ] Founder interviews / local podcast appearances
- [ ] Speak at or sponsor local startup/marketing meetups for event-page backlinks
- [ ] Publish one original data-driven study per year (e.g. "State of Digital Marketing Spend in Bangalore Startups 2026") — this is what earns organic press links
- [ ] Avoid bought links / link farms — Google's spam systems catch this and recovery is costly

### Phase 5 — AI Search / GEO
- [ ] Once content is crawlable, structure key pages with clear, quotable, factual answers near the top (definitions, pricing ranges, direct comparisons) — this is what AI Overviews/ChatGPT/Perplexity pull from
- [ ] Build a well-formed FAQ section with specific, non-generic Q&As

---

## 6. Recommended Tools (to fill the data gaps in this report)

| Need | Tool |
|---|---|
| Backlinks / Domain Authority | Ahrefs, SEMrush, or free Moz Link Explorer |
| Keyword rank tracking | Google Search Console (free), Ahrefs/SEMrush (paid) |
| Page speed / Core Web Vitals | Google PageSpeed Insights (free), GTmetrix |
| Site crawl / technical audit | Screaming Frog (free up to 500 URLs) |
| Schema validation | Google Rich Results Test, Schema.org validator |

---

## 7. Realistic Timeline

- **4–8 weeks:** Technical + on-page fixes show measurable indexing/crawlability improvement
- **6–12 months:** Meaningful ranking movement on competitive terms like "SEO company in Bangalore" — even executed well, this is a slow-authority-building niche
- Be skeptical of anyone (including any vendor) promising page-1 rankings on competitive terms in 30 days

---

## Appendix: Prompt Templates

**1. Keyword research & content gap**
```
Act as an SEO strategist for [BASK Growth Agency, a digital marketing 
agency in Bangalore, India]. Generate 30 keyword ideas across three 
buckets: (1) high-intent commercial terms like "[SEO company Bangalore]", 
(2) long-tail cost/comparison terms like "[SEO pricing Bangalore]", and 
(3) informational terms my target clients search before hiring an agency. 
For each keyword, estimate search intent (informational/commercial/
transactional) and suggest which page type should target it (service 
page, blog post, FAQ). Prioritize terms a newer domain can realistically 
compete for in 6-12 months, not just the highest-volume head terms.
```

**2. Full content brief for a landing page**
```
Write a content brief for a landing page targeting the keyword 
"[Google Ads agency Bangalore]" for [BASK Growth Agency]. Include: 
target word count, a unique H1 (not generic), an H2/H3 outline, 
3 FAQ questions with concise draft answers suitable for FAQPage 
schema, 5 internal linking opportunities to other service pages, 
and one differentiated angle competitors like Carmatec/OneCity/
NOIR & BLANCO are NOT using. Avoid generic filler ("we help you 
grow your business") — every section must contain a specific claim, 
number, or process detail.
```

**3. On-page audit of a specific page**
```
Here is the full text and HTML structure of [URL/paste content]. 
Audit it as an SEO specialist: check title/meta length, H1-H3 
hierarchy, keyword placement without stuffing, internal/external 
link quality, E-E-A-T signals (author, credentials, specificity), 
and readability. Flag anything that looks templated or duplicated 
elsewhere on the site. Give a prioritized fix list, not just 
observations.
```

**4. Schema markup generator**
```
Generate valid JSON-LD schema for a [LocalBusiness] in [Bangalore, 
India] named [BASK Growth Agency], offering [SEO, Google Ads, Meta 
Ads, web development]. Include geo coordinates [lat, long], 
aggregateRating if I provide review count/score, and areaServed. 
Also generate FAQPage schema for these Q&As: [paste your FAQ text]. 
Output only valid, ready-to-paste JSON-LD.
```

**5. Competitor gap analysis**
```
Compare my site's homepage content [paste text] against these 
competitors' equivalent pages: [paste competitor text/URLs]. 
Identify: (1) claims/proof points they use that I don't (years in 
business, client count, named case studies), (2) keywords they 
target that I'm missing, (3) content structure choices (FAQ length, 
author bylines, pricing transparency) that likely help their E-E-A-T 
or conversion. Give me 5 concrete changes ranked by expected impact.
```

**6. Google Business Profile post generator**
```
Write 4 Google Business Profile posts for [BASK Growth Agency, 
Bangalore] to publish this month. Each post: under 1500 characters, 
includes a clear CTA, references a specific service or result 
(not generic "we're the best" language), and is written to also 
work as a snippet an AI search tool could cite directly.
```

**7. Backlink outreach email**
```
Write a short, non-spammy outreach email pitching [BASK Growth 
Agency] for inclusion in a "best digital marketing agencies in 
Bangalore" roundup article. Reference the specific publication's 
existing list style, keep it under 120 words, lead with one 
specific proof point, and make the ask easy to say yes to.
```
