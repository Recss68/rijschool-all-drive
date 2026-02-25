<script>
  // Waits for the DOM to update after state changes (for example after switching tabs)
  import { tick } from "svelte";

  // Pricing data source (JSON). The fallback supports different bundler import shapes.
  import rawPackages from "$lib/data/pricing-packages.json";

  const packages = rawPackages?.default ?? rawPackages;

  // Tab definitions for the package groups
  const tabs = [
    { id: "extra", label: "Extra" },
    { id: "basis", label: "Basis" },
    { id: "theorie", label: "Theorie" }
  ];

  // Currently selected tab/group
  let activeGroup = "basis";

  // Reactive filtered list based on active tab
  $: filteredPackages = packages.filter((p) => p.group === activeGroup);

  // Reference to the horizontal slider element
  let sliderEl;

  // Current active dot/page index
  let activeIndex = 0;

  // Total number of valid dot positions/pages (depends on viewport width)
  let pageCount = 0;

  // Currency formatters (whole euros and per-lesson decimals)
  const euro0 = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  });

  const euro2 = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Returns the actual rendered width of one slide.
  // This is important because mobile = 1 card visible, tablet = 2 cards visible.
  function getSlideWidth() {
    if (!sliderEl) return 0;

    const firstSlide = sliderEl.querySelector(".slide");
    if (!firstSlide) return 0;

    return firstSlide.getBoundingClientRect().width;
  }

  // Calculates how many slides are visible at once in the current viewport
  function getVisibleSlides() {
    if (!sliderEl) return 1;

    const slideWidth = getSlideWidth();
    if (!slideWidth) return 1;

    const visible = Math.floor(sliderEl.clientWidth / slideWidth) || 1;
    return Math.max(1, visible);
  }

  // Calculates how many valid "start positions" the slider has.
  // Example:
  // 6 cards total, 2 visible => 5 possible positions (1-2, 2-3, 3-4, 4-5, 5-6)
  function getPageCount() {
    const total = filteredPackages.length;
    if (!total) return 0;

    const visible = getVisibleSlides();
    return Math.max(1, total - visible + 1);
  }

  // Syncs pageCount and keeps activeIndex inside valid bounds
  function updatePagerState() {
    pageCount = getPageCount();
    activeIndex = Math.min(activeIndex, Math.max(0, pageCount - 1));
  }

  // Handles tab switch:
  // 1) update active group
  // 2) reset active dot
  // 3) wait for DOM render
  // 4) scroll slider back to start
  // 5) recalculate pager state
  async function setGroup(id) {
    activeGroup = id;
    activeIndex = 0;

    await tick();

    sliderEl?.scrollTo({
      left: 0,
      behavior: "auto"
    });

    updatePagerState();
  }

  // Updates active dot while the user scrolls/swipes manually
  function onScroll() {
    if (!sliderEl) return;

    const slideWidth = getSlideWidth();
    if (!slideWidth) return;

    const maxPageIndex = Math.max(0, pageCount - 1);
    const nextIndex = Math.round(sliderEl.scrollLeft / slideWidth);

    activeIndex = Math.max(0, Math.min(nextIndex, maxPageIndex));
  }

  // Scrolls to a specific dot/page position
  function goTo(i) {
    if (!sliderEl) return;

    const max = Math.max(0, pageCount - 1);
    const next = Math.max(0, Math.min(i, max));
    const slideWidth = getSlideWidth();

    if (!slideWidth) return;

    sliderEl.scrollTo({
      left: slideWidth * next,
      behavior: "smooth"
    });
  }

  // Recalculate pager state on viewport resize (important for mobile <-> tablet)
  function handleResize() {
    updatePagerState();
  }

  // Recalculate pager whenever the filtered package list changes (tab switch / data change)
  // tick() ensures the DOM has updated before measuring widths.
  $: filteredPackages, tick().then(() => updatePagerState());
</script>

<!-- Listen to window resize so dot count stays correct across breakpoints -->
<svelte:window on:resize={handleResize} />

<!-- Tab navigation (changes visible package group) -->
<nav class="pricing-tabs-wrap">
  <div class="pricing-tabs">
    {#each tabs as tab (tab.id)}
      <button
        type="button"
        class="tab"
        class:active={activeGroup === tab.id}
        on:click={() => setGroup(tab.id)}
      >
        {tab.label}
      </button>
    {/each}
  </div>
</nav>

<!-- Slider wrapper -->
<section class="pricing-slider-wrap">
  <!-- Horizontal slider:
       - mobile: 1 card visible
       - tablet: 2 cards visible (via CSS)
       Dots and JS adapt automatically based on measured slide width -->
  <section class="pricing-slider" bind:this={sliderEl} on:scroll={onScroll} tabindex="0">
    {#each filteredPackages as pkg (pkg.id)}
      <!-- Compute display values per package so the markup stays readable -->
      {@const hasLessons = typeof pkg.lessons === "number" && pkg.lessons > 0}
      {@const priceText = typeof pkg.price === "number" ? euro0.format(pkg.price) : ""}
      {@const perLesson =
        hasLessons && typeof pkg.price === "number" ? pkg.price / pkg.lessons : null}
      {@const perLessonText = perLesson !== null ? `${euro2.format(perLesson)} per les` : null}
      {@const lessonsLine =
        hasLessons && typeof pkg.lessonMinutes === "number"
          ? `${pkg.lessons} rijlessen van ${pkg.lessonMinutes} minuten`
          : null}
      {@const includes = Array.isArray(pkg.includes) ? pkg.includes : []}

      <!-- One slide = one package card -->
      <div class="slide">
        <article class="price-card">
          <header class="card-head">
            <div>
              <h3 class="title">{pkg.title}</h3>
              {#if pkg.subtitle}
                <p class="subtitle">{pkg.subtitle}</p>
              {/if}
            </div>
          </header>

          <div class="price-wrap">
            <p class="price">{priceText}</p>
            <p class="exam">{pkg.includesExam ? "Incl. examen" : "Excl. examen"}</p>

            {#if perLessonText}
              <p class="per">{perLessonText}</p>
            {/if}
          </div>

          <hr class="divider" />

          <h4 class="includes-title">Wat is inbegrepen:</h4>

          <ul class="includes">
            {#if lessonsLine}
              <li class="inc">
                <img class="inc-icon" src="/icons/list-bullet.svg" alt="" />
                <span>{lessonsLine}</span>
              </li>
            {/if}

            {#each includes as item (item)}
              <li class="inc">
                <img class="inc-icon" src="/icons/list-bullet.svg" alt="" />
                <span>{item}</span>
              </li>
            {/each}
          </ul>

          <button class="cta" type="button">Kies dit pakket!</button>
        </article>
      </div>
    {/each}
  </section>

  <!-- Dots represent valid slider positions, not raw package count.
       This prevents broken dots when 2 cards are visible at once on tablet. -->
  {#if pageCount > 1}
    <div class="dots">
      {#each Array.from({ length: pageCount }) as _, i}
        <button
          type="button"
          class="dot"
          class:active={i === activeIndex}
          on:click={() => goTo(i)}
        >
          <span class="dot-visual"></span>
        </button>
      {/each}
    </div>
  {/if}
</section>

<style>
  .pricing-tabs-wrap {
    display: flex;
    justify-content: center;
    padding: var(--space-4) 0 var(--space-5);

    .pricing-tabs {
      display: inline-flex;
      gap: var(--space-3);
      padding: 0.35rem;
      border-radius: 999px;
      background: var(--c-btn-bg-main);
      border: 1px solid var(--c-border-light);
    }

    .tab {
      border: 0;
      background: transparent;
      border-radius: 999px;
      padding: var(--space-3) var(--space-5);
      font-weight: var(--fw-bold);
      cursor: pointer;
      color: var(--c-navy-900);
      transition: background-color 150ms ease, transform 150ms ease;

      &.active {
        background: var(--c-white);
        outline: 4px solid color-mix(in srgb, var(--c-accent) 55%, transparent);
        outline-offset: 2px;
        transform: translateY(-1px);
      }
    }
  }

  .pricing-slider-wrap {
    max-width: 520px;
    margin: 0 auto;
  }

  .pricing-slider {
    max-width: 520px;
    margin: 0 auto;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    overscroll-behavior-x: contain;
    touch-action: pan-x pan-y;
    padding-bottom: 0.25rem;

    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .pricing-slider:focus-visible {
    outline: 4px solid color-mix(in srgb, var(--c-accent) 55%, transparent);
    outline-offset: 4px;
    border-radius: 16px;
  }

  .pricing-slider::-webkit-scrollbar {
    display: none;
  }

  .slide {
    scroll-snap-align: start;
    scroll-snap-stop: always;
    padding: 0 clamp(var(--space-4), 6vw, 50px);
  }

  .price-card {
    max-width: 420px;
    margin: 0 auto;
    background: var(--c-white);
    border: 3px solid var(--c-border-light);
    border-radius: 28px;
    padding: 22px;
    box-shadow: var(--shadow-s);

    .title {
      margin: 0;
      font-family: var(--font-heading);
      font-size: var(--fs-hl-sm);
      line-height: var(--lh-heading);
      font-weight: 800;
      color: var(--c-navy-900);
    }

    .subtitle {
      margin: var(--space-1) 0 0;
      font-size: var(--fs-body-sm);
      color: var(--c-text-light);
    }

    .price-wrap {
      margin-top: var(--space-6);
    }

    .price {
      margin: 0;
      font-size: var(--fs-highlighted-mobile);
      line-height: 1;
      font-weight: 900;
      letter-spacing: -0.03em;
      color: var(--c-navy-900);
    }

    .exam,
    .per {
      margin: var(--space-1) 0 0;
      font-size: var(--fs-body-sm);
      color: var(--c-text-light);
    }

    .divider {
      border: 0;
      height: 2px;
      background: var(--c-border-light);
      margin: var(--space-10) 0 var(--space-4);
      border-radius: var(--radius-round);
    }

    .includes-title {
      margin: 0 0 var(--space-3);
      font-size: var(--fs-label-md);
      font-weight: 800;
      color: var(--c-navy-900);
    }

    .includes {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: var(--space-3);

      .inc {
        display: grid;
        grid-template-columns: 22px 1fr;
        gap: var(--space-3);
        align-items: start;
        color: var(--c-text);
        font-size: var(--fs-body-sm);
        line-height: 1.35;

        .inc-icon {
          width: 22px;
          height: 22px;
          margin-top: 2px;
        }
      }
    }

    .cta {
      margin: var(--space-5) auto 0;
      display: block;
      width: 70%;
      border: 0;
      border-radius: var(--radius-round);
      padding: var(--space-4);
      font-weight: 800;
      font-size: var(--fs-label-sm);
      color: var(--c-white);
      background: var(--c-accent);
      cursor: pointer;
      transition: background-color 150ms ease, transform 150ms ease;

      &:hover {
        background: var(--c-span);
        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(0);
      }

      &:focus-visible {
        outline: 4px solid color-mix(in srgb, var(--c-accent) 55%, transparent);
        outline-offset: 4px;
      }
    }
  }

  .dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: var(--space-4);
  }

  .dot {
    border: 0;
    background: transparent;
    padding: 0.25rem;
    border-radius: 999px;
    cursor: pointer;
  }

  .dot-visual {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--c-navy-900) 20%, white);
    transition: transform 150ms ease, background-color 150ms ease;
  }

  .dot.active .dot-visual {
    background: var(--c-accent);
    transform: scale(1.2);
  }

  .dot:focus-visible {
    outline: 4px solid color-mix(in srgb, var(--c-accent) 55%, transparent);
    outline-offset: 2px;
  }

  @media (min-width: 768px) {
    .pricing-slider-wrap {
      width: 100%;
      max-width: none;
      margin: 0 auto;
      padding-inline: 0.5rem;
    }

    .pricing-slider {
      width: 100%;
      max-width: none;
      margin: 0 auto;
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 50%;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      gap: 0;
      padding-bottom: 0.25rem;
    }

    .slide {
      scroll-snap-align: start;
      scroll-snap-stop: always;
      padding: 0 0.35rem;
    }

.price-card {
  width: 92%;
  max-width: 430px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}

    .price-card .includes {
      margin-bottom: var(--space-5);
    }

.price-card .cta {
  margin-top: auto;
  width: 58%;
}
  }

@media (min-width: 1024px) {
  .pricing-slider-wrap {
    width: 100%;
    max-width: none;
    margin: 0 auto;
    padding-inline: 0.75rem;
  }

  .pricing-slider {
    width: 100%;
    max-width: none;
    margin: 0 auto;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 33.3333%;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    gap: 0;
    padding-bottom: 0.25rem;
  }

  .slide {
    scroll-snap-align: start;
    scroll-snap-stop: always;
    padding: 0 0.10rem;
  }

.price-card {
 width: 80%;        /* was 80% */
  max-width: 900px;  /* was 900px */
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}

  .price-card .cta {
    margin-top: auto;
    margin-inline: auto;
    width: 80%;
  }
}

 .dot {
    padding: 0.35rem;
  }

  .dot-visual {
    width: 14px;
    height: 14px;
  }
</style>