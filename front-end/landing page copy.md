# BEC Artz – Artzy Box Landing Page Copy

---

## HERO SECTION (Above the Fold)

**Strip 1:**

**Headline (H1)**
Let’s step you up even more.

**Subheadline (p)**
Artzy box — tamper-proof, previewable food packaging that *sells* your ad.

**Primary CTA**
Advertise on Artzy

**Secondary CTA**
Order Artzy Boxes

**Strip 2:**

**Headline (H2)**

Every Artzy box is a mobile billboard — placing your message directly in customers’ hands, eyes, and everyday spaces.

**Hero Visual Behaviour (UI Instruction)**

* Show `food_box back right transparent background.png` on the right side and strip 1 subheadline and CTA buttons on the left.

* On scroll (GSAP + ScrollTrigger):

  * Box moves downward and toward the center while scaling down to ~2%.
  * At the smallest scale, fade it out.
  * Instantly swap to `food_box front left transparent background.png` at ~2% scale in the same center position.
  * Scale the new box up to full size while moving it to the left side 
  * Strip 2 headline the CTA buttons stay on the right side throughout this transition.

* Mobile fallback: no pinning; show a static front box below text.

* Respect `prefers-reduced-motion`.

---

## THE PROBLEM & OUR SOLUTION

**Section Title**
Polythene is Old. Safer, Smarter Boxes are the New Standard.

**The Problem**

* Customers can’t see their food before opening.
* Delivery mix-ups cause complaints and refunds.
* Polythene packaging offers zero brand visibility.

**The Artzy Box Solution**

* Tamper-proof seal clearly shows if food has been opened.
* Transparent front allows instant order confirmation.
* Premium surface turns every delivery into a branded moment.

*Every order leaves your kitchen protected — and promoted.*

**UI Note**
Use icon cards with short text. Reveal more details on hover (desktop) or tap (mobile).

---

## ADVERTISING THAT ACTUALLY WORKS

**Section Title**
Your ad meets the customer where they are.

**Why It Works**

* **Guaranteed viewability** — customers inspect packaging before eating.
* **Repeated exposure** — seen at offices, homes, and public spaces.
* **Contextual attention** — ads viewed during moments of sharing and recommendation.

** CTA Buttons**
Start a campaign →

Request for pricing 

**UI Note**
Use animated counters or subtle number reveals. Hide deeper explanations behind tooltips or expandable info rows.

"Request for pricing" button should open up a small modal with email and phone number fields and a submit button. Once successfully submitted, it should show a success message and close automatically).

---

## HOW IT WORKS (3 SIMPLE STEPS)

1. **Fill the form**
   Fill basic contact details  so we will be able to share insights on how your campaigns are doing.

2. **Submit your advert**
   Upload your design or send text and images and we'll design for you — no signup required, no extra cost.

3. **Done**
   We do all the heavy-liftings from there and share you photo evidence of your designs going out.

**UI Note**
Display as a horizontal stepper on desktop and stacked cards on mobile.

---

## **Pricing — Simple & Fair**

**Regular Price:** ₦600 / box
**With External Ad:** **₦200 / box** 💡

**Why this matters**
✔ Save big on ads
✔ Turn packaging into a revenue driver
✔ Get prestige visibility *every delivery*

**Order Minimum:** 50 boxes
**Free Lagos Delivery:** On orders **500+**

---

## PRODUCTION CAPACITY & DELIVERY

* Daily capacity: **2,000 boxes**
* Recommended lead time: **Order at least 2 days ahead**

Fast, reliable production designed for busy kitchens and active campaigns.

**UI Note**
Use trust badges or simple timeline visuals.

---

## ADVERT SUBMISSION (NO LOGIN REQUIRED)

Advertisers can get started in minutes.

**Required details**

* Name & Email
* Target location 
* Advert design (or text + images)
* Number of boxes
* Website
* WhatsApp phone number

*A representative will reach out shortly after submission.*

**UI Note**
Single-column form, large inputs, sticky submit button on desktop.

The target location should be a multi-select searchable dropdown of the LGAs within Lagos.

---

## FREQUENTLY ASKED QUESTIONS

**Can I upload my own design?**
Yes — upload directly or send content for us to design.

**Can I track performance?**
Yes — QR codes and UTM links are supported.

**What if I need boxes urgently imprompto?**
Although we encourage our clients to order 2 days ahead, we do our best to ensure no business is left hanging, therefore we have an urgency fee. Some clients may qualify for a waiver.

**UI Note**
Accordion-style FAQs. Collapsed by default.

---

## FOOTER

BEC Artz — Safer Packaging, Stronger Brands
Lagos, Nigeria
[Support@BECArtz.com](mailto:Support@BECArtz.com)

---

## GLOBAL UI / UX GUIDELINES

* Use progressive disclosure to keep text short and engaging.
* Replace hover-only interactions with tap-to-expand on mobile.
* Preload hero images for smooth animation.
* Animate transforms only (scale, translate) for performance.
* Ensure keyboard accessibility and focus states for all CTAs.
