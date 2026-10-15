---
name: web-interface-guidelines
description: Vercel's Web Interface Guidelines for building and reviewing frontend/UI code — covering interactions, animations, layout, content & accessibility, forms, performance, and visual design, plus Vercel's own copywriting conventions. Use this skill proactively any time Claude is writing, editing, or generating frontend/UI code — React, Next.js, HTML, CSS, JS/TS components, pages, forms, modals, buttons, etc. — even if the user never says "guidelines" or "best practices"; apply the relevant rules as the code is written. Also use whenever the user asks to review, audit, critique, "check", or improve existing UI/frontend code, a component, a page, or a design against best practices or accessibility standards.
---

# Web Interface Guidelines

A distilled, practical checklist of the decisions that make web interfaces good — sourced from [Vercel's Web Interface Guidelines](https://vercel.com/design/guidelines). Most of it is framework-agnostic; a few items are React/Next.js-specific and are marked as such.

## Why this matters

Interfaces succeed or fail because of hundreds of small choices — focus rings, loading states, hit target sizes, error copy. Most of these are easy to get right and easy to forget under time pressure. This checklist exists so none of them get skipped by default.

## Two ways to use this

**1. While building or editing UI (default, proactive).** As you write or modify frontend code, apply the relevant rules below without being asked — treat them as defaults, the same way you'd default to semantic HTML. You don't need to mention every rule you followed; just follow them. Not every rule applies to every task (a static marketing page doesn't need drag-interaction guidance) — use judgment about what's relevant to the code at hand.

**2. When asked to review or audit existing UI code.** Go through the categories below systematically against the code/component/page in question. For each violation found, report:
- **Rule broken** (name + category)
- **Where** (file/line or component)
- **Why it matters** (one line)
- **Fix** (concrete change)

Group findings by severity if there are many: accessibility & keyboard issues first (these block real users), then interaction/forms bugs, then polish (animation, layout, visual detail). Don't manufacture violations to pad a report — if a section doesn't apply or the code already handles it well, say so briefly and move on.

---

## Interactions

- **Keyboard works everywhere.** Every flow is operable via keyboard alone, following [WAI-ARIA Authoring Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/).
- **Clear focus.** Every focusable element has a visible, unobscured focus ring. Prefer `:focus-visible` over `:focus` (avoids showing rings on mouse clicks); use `:focus-within` for grouped controls. Sticky headers/footers/overlays must never cover the focused element.
- **Manage focus.** Use focus traps and move/return focus per the WAI-ARIA patterns (e.g. return focus to the trigger when a dialog closes).
- **Match visual and hit targets.** If a visual target is under 24px, expand its hit area to at least 24px (44px minimum on mobile).
- **Mobile input size.** `<input>` font-size ≥ 16px on mobile, or iOS Safari will auto-zoom on focus. (Alternative: `maximum-scale=1` in the viewport meta tag, though this trades off pinch-zoom.)
- **Respect zoom.** Never disable browser pinch-zoom.
- **Hydration-safe inputs.** Inputs must not lose focus or value when the page hydrates (React/Next.js).
- **Don't block paste.** Never disable paste in `<input>` or `<textarea>`.
- **Loading buttons.** Show a loading indicator while keeping the button's original label visible.
- **Minimum loading-state duration.** If you show a spinner/skeleton, delay showing it by ~150–300ms and keep it visible at least ~300–500ms once shown, to avoid flicker on fast responses. React's `<Suspense>` does this automatically.
- **URL as state.** Persist filters, tabs, pagination, and other `useState`-driven UI in the URL so share/refresh/back-forward all work (e.g. via [nuqs](https://nuqs.dev)).
- **Optimistic updates.** Update the UI immediately when success is likely, reconcile with the server response, and on failure show an error with a rollback or Undo.
- **Ellipsis for further input.** Menu items that open a follow-up ("Rename…") and in-progress states ("Loading…", "Saving…") end with an ellipsis.
- **Confirm destructive actions.** Require confirmation, or provide Undo with a safe window.
- **Prevent double-tap zoom on controls.** Set `touch-action: manipulation` on interactive elements.
- **Tap highlight follows design.** Set `-webkit-tap-highlight-color` intentionally instead of leaving the browser default.
- **Design forgiving interactions.** Generous hit targets, clear affordances, predictable behavior — minimize finickiness.
- **Tooltip timing.** Delay the first tooltip in a group; once one is open, subsequent tooltips in the same group show with no delay.
- **Overscroll behavior.** Set `overscroll-behavior: contain` intentionally in modals/drawers so scroll doesn't leak to the page behind them.
- **Scroll positions persist.** Back/forward navigation restores the prior scroll position.
- **Autofocus for speed.** Autofocus the primary input on desktop when there's a single obvious one. Avoid autofocus on mobile — the keyboard opening can cause layout shift.
- **No dead zones.** If part of a control looks interactive, it must be interactive — never leave users guessing where to click.
- **Deep-link everything.** Filters, tabs, pagination, expanded panels — anywhere `useState` drives visible UI, make it linkable.
- **Clean drag interactions.** Disable text selection and apply the `inert` attribute to the dragged element so hover/selection don't fire simultaneously with the drag.
- **Gestures have alternatives.** Every drag/swipe/pinch/path-based action also works via tap/click + keyboard, unless the gesture is truly essential.
- **Links are links.** Use `<a>`/`<Link>` for navigation, never a styled `<button>` or `<div>`, so Cmd/Ctrl-click, middle-click, and right-click "open in new tab" all keep working.
- **Announce async updates.** Use polite `aria-live` regions for toasts and inline validation messages.
- **Locale-aware keyboard shortcuts.** Account for non-QWERTY layouts and show platform-specific symbols (⌘ vs Ctrl).

## Animations

- **Honor `prefers-reduced-motion`.** Always provide a reduced-motion variant.
- **Prefer CSS.** Preference order: CSS > Web Animations API > JS libraries (e.g. [motion](https://www.npmjs.com/package/motion)). Avoid main-thread JS-driven animation when CSS can do it.
- **Compositor-friendly properties.** Animate `transform` and `opacity` (GPU-accelerated); avoid animating `width`, `height`, `top`, `left` (they trigger layout/reflow).
- **Necessity check.** Only animate when it clarifies cause-and-effect or adds deliberate delight — not by default.
- **Easing fits the subject.** Choose easing based on what's changing (size, distance, what triggered it) rather than one easing curve everywhere.
- **Interruptible.** Animations must be cancelable by further user input, not force the user to wait them out.
- **Input-driven, not autoplay.** Avoid autoplay except for muted, non-essential loops. Any autoplaying motion lasting more than 5 seconds needs pause/stop/hide controls.
- **Correct transform origin.** Anchor motion to where it visually "starts from."
- **Never `transition: all`.** List only the properties you intend to animate (typically `opacity`, `transform`) — `all` risks animating layout properties and causing jank.
- **Cross-browser SVG transforms.** Apply transforms to a `<g>` wrapper with `transform-box: fill-box; transform-origin: center;` to avoid Safari's transform-origin bugs on raw SVG shapes.

## Layout

- **Optical alignment.** When geometric centering looks off, nudge by a pixel or two to match perception.
- **Deliberate alignment.** Every element aligns to something on purpose — a grid, baseline, edge, or optical center. No accidental positioning.
- **Balance contrast in lockups.** When icon and text sit side by side, adjust weight/size/spacing/color so neither clashes (a thin icon next to medium-weight text often needs a bolder stroke).
- **Responsive coverage.** Check mobile, laptop, and ultra-wide (zoom out to ~50% to simulate ultra-wide).
- **Respect safe areas.** Account for notches/insets using `env(safe-area-inset-*)`.
- **No excessive scrollbars.** Fix overflow so scrollbars only appear where genuinely needed. On macOS, test with "Show scroll bars: Always" to see what Windows users see by default.
- **Let the browser size things.** Prefer flex/grid/intrinsic sizing over measuring in JS; avoid layout thrash.

## Content & accessibility

- **Inline help first.** Prefer inline explanations over tooltips; tooltips are a last resort.
- **Stable skeletons.** Loading skeletons mirror the real content's shape so nothing shifts once it loads.
- **Accurate page titles.** `<title>` reflects current context/page.
- **No dead ends.** Every screen offers a next step or a recovery path.
- **All states designed.** Empty, sparse, dense, and error states are all considered — not just the "happy path" with ideal data.
- **Typographic quotes.** Use curly quotes ("…") rather than straight quotes.
- **Avoid widows/orphans.** Watch line breaks and rag.
- **Tabular numbers for comparisons.** Use `font-variant-numeric: tabular-nums` (or a monospace like Geist Mono) so stacked numbers align.
- **Redundant status cues.** Never rely on color alone — pair it with a text label or icon.
- **Icons have labels.** Give icon-only elements a text equivalent for non-sighted users.
- **Accessible names exist even when visually omitted.** A layout can hide a visible label, but the accessible name/label must still exist for assistive tech.
- **Use the ellipsis character `…`,** not three periods `...`.
- **Anchored headings.** Set `scroll-margin-top` on headings that are link targets, so they don't end up hidden under a sticky header.
- **Resilient to user content.** Layouts handle short, average, and very long real content — not just placeholder text.
- **Locale-aware formatting.** Dates, times, numbers, and currency follow the user's locale.
- **Prefer language settings over location.** Detect language via `Accept-Language` / `navigator.languages`; never infer language from IP/GPS.
- **Shield verbatim content from translation.** Wrap brand names, product names, code tokens, and identifiers in `translate="no"`.
- **Verify accessible names.** Set accurate `aria-label`s, hide decoration with `aria-hidden`, and check the accessibility tree.
- **Icon-only buttons are named.** Always give them a descriptive `aria-label`.
- **Semantics before ARIA.** Prefer native elements (`button`, `a`, `label`, `table`) over recreating their behavior with `aria-*` on a `div`.
- **Headings & skip link.** Use a proper hierarchical `<h1>`–`<h6>` structure and provide a "Skip to content" link.
- **Accessible media.** Caption speech and meaningful sounds, provide transcripts for audio-only content, describe essential visual information, hide purely decorative media from assistive tech, and keep media controls keyboard-operable.
- **Non-breaking spaces for glued terms.** Keep units, shortcuts, and names from breaking across lines: `10 MB` → `10&nbsp;MB`, `⌘ + K` → `⌘&nbsp;+&nbsp;K`.

## Forms

- **Enter submits.** With one control focused, Enter submits the form if it's the only control; with several controls, Enter on the last one submits.
- **Textarea behavior.** In a `<textarea>`, ⌘/Ctrl+Enter submits; plain Enter inserts a new line.
- **Labels everywhere.** Every control has an associated `<label>` (or equivalent) for assistive tech.
- **Label activation.** Clicking a `<label>` focuses its control.
- **Submission rule.** Keep submit enabled until the request starts, then disable it, show a spinner, and include an idempotency key so retries/double-submits are safe.
- **Don't block typing.** Even for a numbers-only field, allow any keystroke and validate after — blocking keystrokes silently confuses users.
- **Don't pre-disable submit.** Let incomplete forms be submitted so validation feedback can surface.
- **No dead zones on controls.** Checkboxes and radios share one generous hit target with their label.
- **Error placement.** Show errors next to their field; on submit, move focus to the first error.
- **Autocomplete & names.** Set meaningful `autocomplete` and `name` attributes so autofill works.
- **Spellcheck selectively.** Turn it off for emails, codes, usernames, and similar fields.
- **Correct types & inputmode.** Use the right `type`/`inputmode` so mobile keyboards and native validation match the field.
- **Placeholders signal emptiness, not labels.** They end with an ellipsis and show an example value/pattern, e.g. `+1 (123) 456-7890` or `sk-012345679…`.
- **Warn on unsaved changes.** Prompt before navigating away when data could be lost.
- **Password managers & 2FA.** Ensure compatibility, and allow pasting one-time codes.
- **Don't trigger password managers on non-auth fields.** Avoid reserved names like `password` for things like search; use `autocomplete="off"` or `autocomplete="one-time-code"` for OTP inputs.
- **Trim invisible whitespace.** Some input methods append trailing spaces — trim before validating so users don't see a confusing error.
- **Windows `<select>` styling.** Explicitly set `background-color` and `color` on native `<select>` elements to avoid dark-mode contrast bugs on Windows.

## Performance

- **Test the real device/browser matrix.** Including iOS Low Power Mode and macOS Safari.
- **Measure reliably.** Disable browser extensions that add overhead when profiling.
- **Track re-renders.** Minimize them and keep the ones you do have fast (React DevTools, React Scan).
- **Throttle when profiling.** Test under CPU and network throttling, not just a fast dev machine.
- **Minimize layout work.** Batch DOM reads/writes; avoid unnecessary reflow/repaint.
- **Network latency budgets.** `POST`/`PATCH`/`DELETE` should complete in under 500ms.
- **Keystroke cost.** Prefer uncontrolled inputs where possible; keep any controlled-input render loop cheap.
- **Virtualize large lists.** Use a virtualization library (e.g. [virtua](https://github.com/inokawa/virtua)) or `content-visibility: auto`.
- **Preload wisely.** Preload only above-the-fold images; lazy-load the rest.
- **No image-caused layout shift.** Always set explicit image dimensions and reserve their space.
- **Preconnect to origins.** Use `<link rel="preconnect">` for asset/CDN domains.
- **Preload critical fonts** to avoid a flash of unstyled text and layout shift.
- **Subset fonts.** Ship only the code points/scripts actually used, via `unicode-range`.
- **Offload expensive work.** Move long-running tasks off the main thread with Web Workers.
- **Video over animated GIF** for looping animation — modern video is typically far smaller. Use `<video autoplay muted loop playsinline>`, provide a still fallback, and honor `prefers-reduced-motion`.

## Visual design

- **Layered shadows.** Combine at least two shadow layers to mimic ambient + direct light, rather than one flat shadow.
- **Crisp borders.** Combine a border with a shadow; a semi-transparent border reads more crisply than an opaque one.
- **Nested radii.** A child's border-radius should be ≤ its parent's and share the same center, so the curves stay concentric.
- **Hue consistency.** On non-neutral backgrounds, tint borders/shadows/text toward the background's hue rather than using neutral gray.
- **Accessible charts.** Use color-blind-friendly palettes.
- **Contrast.** Prefer [APCA](https://apcacontrast.com/) over WCAG 2 contrast math where you can — it's a more accurate perceptual model.
- **Interactive states increase contrast.** `:hover`, `:active`, `:focus` should read as higher-contrast than the resting state.
- **Match browser chrome to background.** Set `<meta name="theme-color" content="...">` to align the browser UI with the page background.
- **Set `color-scheme`.** Style `<html>` with `color-scheme: dark` (or light) so native scrollbars/UI get proper contrast.
- **Careful with text transforms.** Scaling text can change antialiasing — prefer animating a wrapper element instead of the text node itself; if artifacts persist, promote it to its own layer (`translateZ(0)` or `will-change: transform`).
- **Avoid gradient banding.** A CSS mask fading to a dark color can band visibly — use a background image instead where this happens.

---

## Vercel's copywriting conventions (optional brand voice, not universal)

The rest of this file is framework/interaction-agnostic and should basically always apply. This section is different: it's *Vercel's own brand voice*, not a universal rule of good UI. Apply it when the user is building something in a Vercel-like voice, hasn't specified another voice, or explicitly asks for it — but defer to an established product voice or explicit instructions if the user has one.

- **Active voice.** "Install the CLI," not "The CLI will be installed."
- **Title Case for headings & buttons** (Chicago style); sentence case on marketing pages.
- **Be clear and concise.** Use as few words as possible.
- **Prefer `&` over `and`** in UI copy.
- **Action-oriented language.** "Install the CLI…" not "You will need the CLI…".
- **Keep nouns consistent.** Don't introduce a new term for something already named.
- **Second person, not first person.** "Your account," not "my account."
- **Consistent placeholders.** Strings: `YOUR_API_TOKEN_HERE`. Numbers: `0123456789`.
- **Numerals for counts.** "8 deployments," not "eight deployments."
- **Consistent currency formatting.** Within one context, always 0 or always 2 decimal places — never mixed.
- **Space between number and unit.** `10 MB`, not `10MB` (non-breaking space: `10&nbsp;MB`).
- **Default to positive framing**, even for errors. "Something went wrong — try again or contact support," not "Your deployment failed."
- **Error messages guide the exit.** State what went wrong *and* how to fix it: "Your API key is incorrect or expired. Generate a new key in your account settings," not just "Invalid API key."
- **Avoid ambiguous labels.** "Save API Key," not "Continue."

---

## Scope notes

- Most rules above are framework-agnostic. Items explicitly tied to React/Next.js (hydration-safe inputs, `<Suspense>` for loading-state timing) are called out inline — don't force them onto non-React code.
- When reviewing code that's clearly a prototype, internal tool, or early draft, mention which violations are launch-blocking (accessibility, keyboard, broken forms) versus polish (shadows, easing, copy tone) so the user can triage.
- Source: [vercel.com/design/guidelines](https://vercel.com/design/guidelines). Guidelines evolve — if something in a review seems to have changed or you're unsure, say so rather than asserting confidently.
