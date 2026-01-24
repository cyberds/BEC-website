# BEC Artz – Artzy Box Landing Page

## LLM EXECUTION SPEC (ZERO-AMBIGUITY VERSION)

This document is an **implementation-ready specification** intended for direct execution by an LLM or developer.
All behaviors, layouts, and constraints are explicit. Do not infer or add features not stated.

---

## 1. HERO SECTION (ABOVE THE FOLD)

### Layout Structure

* The hero section is **pinned** during the scroll animation on desktop.
* The hero contains **two text strips** and **two box images**.
* Text and visuals are independent layers.

---

### STRIP 1 (INITIAL STATE)

**Content (Visible on initial page load):**

* Headline (H1):
  "Let’s step you up even more."

* Subheadline (paragraph):
  "Artzy box — tamper-proof, previewable food packaging that sells your ad."

* CTA Buttons:

  * Primary: "Advertise on Artzy"
  * Secondary: "Order Artzy Boxes"

**Positioning:**

* Text (headline, subheadline, CTAs) appears on the **left side**.
* Image `food_box back right transparent background.png` appears on the **right side**.

---

### STRIP 2 (TRANSITION + FINAL STATE)

**Content:**

* Headline (H2):
  "Every Artzy box is a mobile billboard — placing your message directly in customers’ hands, eyes, and everyday spaces."

**Positioning:**

* Strip 2 headline and the **same CTA buttons from Strip 1** are positioned on the **right side**.

---

### HERO SCROLL ANIMATION (GSAP + ScrollTrigger)

This animation runs **only on desktop**.

**Timeline (strict order):**

1. Initial state:

   * Box-back image is visible on the right at full scale.
   * Strip 1 text is visible on the left.

2. On scroll start:

   * The hero section becomes pinned.
   * The box-back image:

     * Translates downward and toward the horizontal center.
     * Scales smoothly down to exactly **0.02 (2%)**.

3. At minimum scale (center position):

   * Box-back image fades out.
   * Box-front image (`food_box front left transparent background.png`) appears **at the same center position** at scale **0.02**.

4. Immediately after swap:

   * Box-front image scales up from 0.02 to 1.
   * Simultaneously translates to the **left side** of the hero.

5. Text behavior during transition:

   * Strip 1 text fades out as the box reaches minimum scale.
   * Strip 2 headline and the **same CTA buttons** are visible on the **right side throughout the remainder of the animation**.

6. End state:

   * Box-front image rests on the left at full scale.
   * Strip 2 headline and CTAs remain on the right.
   * Hero unpins after animation completes.

**Constraints:**

* Animate **transform and opacity only**.
* Use GPU-friendly transforms.

---

### MOBILE & ACCESSIBILITY FALLBACKS

* On screens ≤ 720px:

  * Disable pinning.
  * Disable scroll animation.
  * Show static `food_box front left transparent background.png` below text.

* Respect `prefers-reduced-motion`:

  * Skip animation entirely.
  * Render final hero state statically.

---

## 2. THE PROBLEM & OUR SOLUTION

### Section Title

"Polythene is Old. Safer, Smarter Boxes are the New Standard."

### Problem List

* Customers can’t see food before opening.
* Delivery mix-ups cause complaints and refunds.
* Polythene packaging provides zero brand visibility.

### Solution List (Artzy Box)

* Tamper-proof seal visibly indicates interference.
* Transparent front allows order confirmation.
* Premium printable surface turns packaging into advertising inventory.

**UI Rules:**

* Use icon cards.
* Show short text by default.
* Reveal extended explanations on hover (desktop) or tap (mobile).

---

## 3. ADVERTISING THAT ACTUALLY WORKS

### Section Title

"Your ad meets the customer where they are."

### Core Statement

"Every Artzy box is a mobile billboard — placing your message directly in customers’ hands, eyes, and everyday spaces."

### Benefit Points

* Guaranteed viewability before meals.
* Repeated exposure in offices, homes, and public spaces.
* Contextual attention during sharing and recommendation moments.

### CTA Buttons

* "Start a campaign"
* "Request pricing"

### Pricing Modal (Request Pricing Button)

* Opens a small modal.
* Fields:

  * Email
  * Phone number
* Submit button.
* On successful submit:

  * Show success message.
  * Auto-close modal.
* No account creation.
* No verification step.

---

## 4. HOW IT WORKS (3 STEPS)

1. **Fill the form**

   * Collect basic contact details.
   * Purpose: allow campaign insight sharing.

2. **Submit your advert**

   * Upload design OR submit text + images.
   * Design service included at no extra cost.
   * No signup required.

3. **Done**

   * BEC Artz handles production and distribution.
   * Photo evidence is shared via **WhatsApp or email**.

**UI Rules:**

* Horizontal stepper on desktop.
* Stacked cards on mobile.

---

## 5. PRICING — SIMPLE & FAIR

* Regular price: ₦600 per box
* With external advert sponsorship: ₦200 per box

**Conditions:**

* Minimum order: 50 boxes
* Free Lagos delivery: orders of 500+ boxes

---

## 6. PRODUCTION CAPACITY & DELIVERY

* Maximum capacity: 2,000 boxes per day
* Recommended lead time: minimum 2 days

**UI Rules:**

* Use trust indicators or a simple delivery timeline.

---

## 7. ADVERT SUBMISSION (NO LOGIN)

### Required Fields

* Name
* Email
* Target location
* Advert design OR text + images
* Number of boxes
* Website
* WhatsApp phone number

### Target Location Field

* Multi-select
* Searchable dropdown
* Options limited to **Lagos LGAs only**

**Form Rules:**

* Single-column layout
* Large touch-friendly inputs
* Sticky submit button on desktop

---

## 8. FREQUENTLY ASKED QUESTIONS

* Can I upload my own design? → Yes.
* Can I track performance? → Yes (QR codes + UTM links).
* Urgent orders? → Supported via urgency fee; waivers may apply.

**UI Rules:**

* Accordion layout
* All items collapsed by default

---

## 9. FOOTER

* Brand line: "BEC Artz — Safer Packaging, Stronger Brands"
* Location: Lagos, Nigeria
* Email: [Support@BECArtz.com](mailto:Support@BECArtz.com)

---

## 10. GLOBAL UI / UX CONSTRAINTS

* Do not introduce additional sections.
* Do not add authentication.
* Do not add pricing calculators.
* Use progressive disclosure.
* Replace hover-only behavior with tap on mobile.
* Preload hero images.
* Maintain keyboard accessibility and visible focus states.
