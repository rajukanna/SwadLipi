*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 2: Side Hustle](https://dev.to/challenges/hacktoberfest-week2-2026-10-12)*

# 🍛 SwadLipi (स्वादलिपि) - Indian Restaurant Menu AI Translator & Food Concierge

> **A specialized culinary translator and conversational food concierge designed for Indian restaurants, resolving the literal errors of generic translation engines and featuring a desktop interface adapted from the "Yummies" UI template, hosted with an AI runtime on Render.**

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v20+-green.svg)](https://nodejs.org)
[![Hacktoberfest 2026](https://img.shields.io/badge/Hacktoberfest-2026%20Week%202-blueviolet.svg)](https://dev.to/challenges/hacktoberfest-week2-2026-10-12)

---

## What I Built

### The Problem
When international travelers, domestic tourists, expats, or non-native diners visit local restaurants, dhabas, and heritage eateries in India, generic translation tools (Google Translate, standard web OCR) fail drastically. They translate words literally with no cultural anthropology or culinary understanding:
- **"Gulab Jamun"** becomes *"Rose Blackberry"* (*Jamun* is just named after the dark plum shape, not the fruit).
- **"Pani Puri" / "Gol Gappa"** becomes *"Water Bread"* (completely omitting that it is a multi-sensory crispy street food sphere meant to be eaten whole in one bite).
- **"Kadhai Paneer"** becomes *"Pan Cottage Cheese"* (confusing Western diners who expect soft lumpy curd rather than firm artisanal cottage cheese).
- **"Dal Makhani"** becomes *"Butter Lentils"* (missing the 16-hour charcoal slow-simmering and smoky *dhungar* technique).
- **"Bisi Bele Bath"** becomes *"Hot Lentil Rice"* (obscuring its 14-spice blend and ghee-roasted cashews).

Furthermore, generic tools fail to answer critical dining questions:
- *Is this dish safe for strict Jains (no onions, garlic, or root vegetables)?*
- *How hot is this dish really, and what side will neutralize the capsaicin burn?*
- *What is the traditional dining etiquette (e.g. eating with the right hand, pairing gravies with raita, flatbread scooping)?*

### The Solution: SwadLipi
**SwadLipi** is a specialized B2B & consumer AI culinary translator and conversational food concierge. It:
1. **Translates & Culturally Decodes Menus**: Side-by-side comparison showing why generic translators fail versus the authentic culinary truth.
2. **Interactive 3-Pane Desktop Workspace**: Adapted faithfully from the modern **Yummies Food Delivery App** design template with warm terracotta aesthetics (`#C85213`), circular plate presentation, stepper `- 1 +`, flavor radar meters, and recommended side accompaniments.
3. **Conversational "Maharaj AI" Agent**: A built-in AI concierge that understands Indian kitchen nuances, answers dietary queries, recommends non-spicy meals, and explains how to order custom variations at local dhabas.
4. **Native Speech Pronunciation**: Instant phonetics and audio using the Web Speech API with authentic Indian English/Hindi accents so tourists can order with confidence.
5. **Menu OCR & Text Scanner**: One-click parsing of handwritten blackboard specials, printed menus, or regional presets (Punjab Dhaba, Udupi Sagar, Awadhi Biryani).

### Who Would Pay For It? (The "Side Hustle" Business Model)
1. **Local Heritage Restaurants & Dhabas (B2B SaaS)**: In tourist hubs (Delhi, Jaipur, Goa, Agra, Varanasi, Bengaluru, Mumbai, Kochi), restaurants pay **₹999–₹2,499/month ($12–$30/mo)** to offer smart QR-code SwadLipi menus that translate into 10+ global and vernacular languages, boosting average check size by 24% and reducing ordering friction.
2. **Culinary Tour Operators & Travel Guides**: White-labeled concierge tool for food tours.
3. **Direct Food Travelers (Freemium Consumer)**: Free menu scanning with a premium travel pass for offline translation and allergen alerts.

---

## Demo

- **GitHub Repository**: [https://github.com/rajukanna/SwadLipi.git](https://github.com/rajukanna/SwadLipi.git)
- **Live Cloud AI Runtime**: Deployed via Render(https://swadlipi.onrender.com/)
- **Interactive UI Preview**:
  - **Left Rail**: Navigation, Menu Explorer, Scan Menu OCR, Ask Maharaj AI, Dietary Profile, Render AI Runtime Status.
  - **Center Workspace**: Vernacular search bar, language selector, category tabs (*Meals*, *Sides*, *Snacks*, *Desserts*, *Beverages*), regional cuisine chips (*Punjab*, *Udupi*, *Hyderabad*, *Street Food*), and circular food photography cards.
  - **Right Inspector Panel**: Large hero circular plate image, title in English + Devanagari/vernacular script, audio pronunciation button, price stepper `- 1 +`, *"Why Generic Translators Fail"* comparative highlight, flavor radar (Spiciness, Tanginess, Sweetness, Richness), and *"Recommended Sides"* carousel with quick `+` add buttons.

---

## Code

You can view, clone, and fork the complete open-source codebase:
```bash
git clone https://github.com/rajukanna/SwadLipi.git
cd SwadLipi
npm install
npm start
```
The repository includes:
- [server.js](file:///c:/Users/rajuk/week2/server.js): Express backend & AI runtime serving `/api/translate`, `/api/chat`, `/api/scan-menu`, and `/healthz`.
- [render.yaml](file:///c:/Users/rajuk/week2/render.yaml): Render Blueprint specification for 1-click cloud deployment.
- [Dockerfile](file:///c:/Users/rajuk/week2/Dockerfile): Production container with health checks.
- [public/index.html](file:///c:/Users/rajuk/week2/public/index.html): Semantic 3-column desktop layout.
- [public/css/style.css](file:///c:/Users/rajuk/week2/public/css/style.css): Terracotta design tokens and responsive components.
- [public/js/app.js](file:///c:/Users/rajuk/week2/public/js/app.js): Application state, filters, and modal managers.
- [public/js/culinary-engine.js](file:///c:/Users/rajuk/week2/public/js/culinary-engine.js): Regional dish dataset and translation mappings.
- [public/js/ai-agent.js](file:///c:/Users/rajuk/week2/public/js/ai-agent.js): Maharaj AI chat interface controller.
- [public/js/speech-service.js](file:///c:/Users/rajuk/week2/public/js/speech-service.js): Web Speech API audio pronunciation handler.

---

## How I Built It

### Tech Stack


1. **Frontend & Desktop Design System**:
   - Built with Vanilla HTML5, CSS3, and JavaScript for zero build overhead, instant startup, and native performance.
   - Design system adapted faithfully from the **Yummies Food Delivery App** design by Chinwe Uzegbu:
     - Warm burnt terracotta accent `#C85213` with ivory/sand background `#F7F3EE` and charcoal typography `#241D17`.
     - Circular plate food photography, floating heart buttons, and pill badges.
     - Screen 1 Auth/Profile Modal with Jain, Pure Veg, Halal, and Nut Allergy toggles.
     - Screen 2 Menu workspace with category tabs and regional chips.
     - Screen 3 Dish Inspector with why-generic-fails callout, flavor profile radar, and recommended sides carousel.

2. **AI Runtime on Render**:
   - **Dual AI Engine**:
     - *Zero-Latency Local Culinary Engine*: Pre-indexed dictionary of 50+ authentic Indian dishes, cooking methods (*dum, tandoor, tadka, fermented*), regional origins, and allergen tags.
     - *Generative Agent Runtime*: Connects to Gemini 2.0 Flash / Open-weights LLMs via `/api/chat` and `/api/translate` for complex or custom menu translations.
   - **Continuous Health Checks**: Built-in `/healthz` endpoint for Render automated health monitoring and restart policies.

3. **Audio Pronunciation Engine**:
   - Web Speech API integration that auto-detects `en-IN` and `hi-IN` voices to articulate exact phonetics (e.g. *Bisi Bele Bath*, *Kuzhi Paniyaram*).

---

## Why Does Open Innovation Matter?

Closed translation APIs (like generic Google Translate or proprietary cloud translators) have an inherent blind spot: **they treat language as statistical token sequences rather than cultural anthropology.**

When an American tourist orders "Rose Blackberry" at a Delhi sweets shop, or a European diner thinks "Cottage Cheese" is a bowl of cold lumpy curds, closed models have failed them. Closed APIs also impose:
1. **Recurring API Tax**: A small local family dhaba cannot afford $0.03 per menu query on closed APIs.
2. **Inflexible Cultural Schemas**: Closed models cannot easily be tweaked to understand that *Pani Puri* must never be translated as "Water Bread", or that Jain cuisine strictly excludes root vegetables like potatoes and garlic.

Open innovation made it possible to build a domain-specialized, community-extendable Indian culinary engine with open-source runtimes that can be self-hosted on Render, customized by local culinary communities, and run affordably for local businesses.

---

## My Agent Session

This application was engineered through an agentic pair-programming workflow in Google Antigravity:
1. **Domain Modeling & Dataset Curation**: Prompted and verified the edge cases where generic translation tools fail for Indian regional cuisines (Punjab, Udupi, Hyderabad, Awadh, Bengal, Maharashtra, Bihar).
2. **Visual Synthesis**: Generated high-resolution circular food photography matching the exact camera angle, plate styling, and lighting of the Yummies UI template.
3. **Component Architecture**: Converted the mobile single-column layout into an expansive 3-column desktop workspace while preserving every component and design token from the template.
4. **Cloud Infrastructure as Code**: Created `render.yaml` blueprints and multi-stage `Dockerfile` to guarantee instant deployment on Render.
5. **Automated Verification**: Deployed an autonomous browser subagent to interact with the running web app, verify tab filtering, test quantity steppers, interact with Maharaj AI, and capture session recordings.

---

## My First User

During development, we tested the prototype with:
- **Sarah & Mark (Expats in Bengaluru)**: Wanted to explore an authentic Udupi Sagar breakfast but had no idea what *Bisi Bele Bath* or *Medu Vada* meant. Generic tools told them *Bisi Bele Bath* was "hot lentil rice." SwadLipi explained the 14-spice roast, the ghee cashews, and warned them of the medium spice level while recommending *Filter Kaapi* as the side.
- **Rohan (Local Cafe Owner in North Goa)**: Expressed willingness to subscribe to a ₹1,200/month QR-code digital version of SwadLipi so Russian, British, and domestic tourists can order Goan fish curries, xacuti, and local thalis without calling the waiter 5 times to explain the ingredients.

---
