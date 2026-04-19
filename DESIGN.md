# Design Brief

## Direction

Cool Serene E-Commerce — A premium, trustworthy shopping experience combining deep ocean blue authority with warm amber accents for visual focus and call-to-action prominence.

## Tone

Refined minimalism with professional restraint; every element serves information clarity and conversion, avoiding both corporate coldness and consumer frivolity.

## Differentiation

Warm amber reserved exclusively for primary CTAs ("Add to Cart", "Checkout") ensures visual hierarchy and purchase intent focus without overwhelming the interface.

## Color Palette

| Token      | OKLCH           | Role                              |
| ---------- | --------------- | --------------------------------- |
| background | 0.98 0.008 230  | Cool off-white, spacious clarity  |
| foreground | 0.18 0.015 230  | Deep text, high contrast          |
| primary    | 0.42 0.14 240   | Deep ocean blue, trust & authority |
| accent     | 0.72 0.17 70    | Warm amber, CTA focus             |
| muted      | 0.94 0.01 230   | Section separators, soft hierarchy |
| card       | 1.0 0.004 230   | Pure white, product surfaces      |
| border     | 0.9 0.008 230   | Soft teal dividers                |

## Typography

- Display: Space Grotesk — Modern, tech-forward hierarchy for product names, hero text, section headings
- Body: General Sans — Clean, legible body copy, form labels, product descriptions
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-4xl font-bold`, label `text-xs font-semibold uppercase`, body `text-base`

## Elevation & Depth

Subtle shadow hierarchy: `shadow-sm` for cards, `shadow-elevated` for buttons and interactive overlays. Minimal depth reduces visual noise while maintaining surface separation for accessibility.

## Structural Zones

| Zone    | Background       | Border              | Notes                      |
| ------- | ---------------- | ------------------- | -------------------------- |
| Header  | card (white)     | border-b, teal tint | Nav, search, cart icon     |
| Content | background (off) | —                   | Product grid, alternating  |
| Footer  | muted (light)    | border-t, soft gray | Centered company info      |

## Spacing & Rhythm

Spacious density (4rem gaps between sections) with consistent padding (`2rem` on containers). Cards and product items use `1.5rem` internal padding. Mobile-first responsive: `sm:` breakpoints for tablet+, `md:` for desktop.

## Component Patterns

- Buttons: `btn-primary` (deep blue) for secondary actions, `btn-accent` (warm amber) for "Add to Cart" and "Checkout"; `btn-secondary` (light) for tertiary actions
- Cards: `card-base` (white, subtle shadow, rounded) for products and order summary
- Badges: `text-label` (uppercase, small, muted text) for stock status, discounts
- Input: `bg-input` (light gray), `border-border`, `ring-primary` on focus

## Motion

Entrance: Products fade in on page load (200ms stagger). Hover: Buttons gain `opacity-90` on hover, cards lift with `shadow-elevated` on hover. CTA accent buttons pulse subtly on page load to draw attention.

## Constraints

- No gradients except subtle color mixing in OKLCH values
- No rounded corners exceeding `rounded-lg` (8px)
- Accent color reserved for primary CTAs only — no accent backgrounds for secondary content
- Maintain 4.5:1 contrast ratio on all interactive text

## Signature Detail

Warm amber accent exclusive to purchase CTAs creates immediate visual focus without visual chaos — the color coding teaches users that "add to cart" and "checkout" are the intended journey.

