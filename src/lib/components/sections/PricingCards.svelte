<script>
  import { onMount } from "svelte";
  import rawPackages from "$lib/data/pricing-packages.json";

  /* Data source */
  const packages = rawPackages?.default ?? rawPackages;

  /* Tab configuration */
  const tabs = [
    { id: "extra", label: "Extra" },
    { id: "basis", label: "Basis" },
    { id: "theorie", label: "Theorie" }
  ];

  /* Packages grouped by tab */
  const groups = tabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    pkgs: packages.filter((pkg) => pkg.group === tab.id)
  }));

  /* Slider element references per group */
  let sliderEls = {};

  /* Active dot index per group */
  let activeIndexes = Object.fromEntries(tabs.map((tab) => [tab.id, 0]));

  /* Total page count per group */
  let pageCounts = Object.fromEntries(tabs.map((tab) => [tab.id, 1]));

  /* Currency formatting */
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

  /* Get the width of a single slide */
  function getSlideWidth(el) {
    return el?.querySelector(".slide")?.getBoundingClientRect().width ?? 0;
  }

  /* Calculate how many slides are visible at once */
  function getVisibleSlides(el) {
    if (!el || el.clientWidth === 0) return 1;

    const slideWidth = getSlideWidth(el);

    return slideWidth
      ? Math.max(1, Math.floor(el.clientWidth / slideWidth))
      : 1;
  }

  /* Recalculate pager values for one group */
  function updatePager(groupId) {
    const el = sliderEls[groupId];
    if (!el || el.clientWidth === 0) return;

    const totalSlides =
      groups.find((group) => group.id === groupId)?.pkgs.length ?? 0;

    const visibleSlides = getVisibleSlides(el);
    const pages = Math.max(1, totalSlides - visibleSlides + 1);

    pageCounts[groupId] = pages;
    activeIndexes[groupId] = Math.min(activeIndexes[groupId], pages - 1);

    pageCounts = { ...pageCounts };
    activeIndexes = { ...activeIndexes };
  }

  /* Update the active dot from the current scroll position */
  function onScroll(groupId) {
    const el = sliderEls[groupId];
    if (!el) return;

    const slideWidth = getSlideWidth(el);
    if (!slideWidth) return;

    const maxIndex = Math.max(0, (pageCounts[groupId] ?? 1) - 1);

    activeIndexes[groupId] = Math.max(
      0,
      Math.min(Math.round(el.scrollLeft / slideWidth), maxIndex)
    );

    activeIndexes = { ...activeIndexes };
  }

  /* Scroll to a specific slide */
  function goTo(groupId, index) {
    const el = sliderEls[groupId];
    if (!el) return;
    if ((pageCounts[groupId] ?? 1) <= 1) return;

    const slideWidth = getSlideWidth(el);
    if (!slideWidth) return;

    el.scrollTo({
      left: slideWidth * index,
      behavior: "smooth"
    });
  }

  /* Reset slider state when the active tab changes */
  function handleTabChange(groupId) {
    requestAnimationFrame(() => {
      const el = sliderEls[groupId];
      if (!el) return;

      el.scrollTo({ left: 0, behavior: "auto" });
      activeIndexes[groupId] = 0;
      activeIndexes = { ...activeIndexes };

      updatePager(groupId);
    });
  }

  /* Recalculate all pagers on resize */
  function handleResize() {
    for (const group of groups) {
      updatePager(group.id);
    }
  }

  /* Initial pager calculation after mount */
  onMount(() => {
    requestAnimationFrame(() => {
      updatePager("basis");
    });
  });
</script>

<svelte:window on:resize={handleResize} />

<section class="pricing">
  <h2 class="sr-only">Pakketten</h2>

  <!-- Radios store the real tab state so tab switching still works without JavaScript -->
  {#each tabs as tab (tab.id)}
    <input
      type="radio"
      class="sr-only tab-radio"
      name="pricing-group"
      id={"tab-" + tab.id}
      value={tab.id}
      checked={tab.id === "basis"}
      on:change={() => handleTabChange(tab.id)}
    />
  {/each}

  <!-- Fieldset is semantic here because the user selects one option from one group -->
  <fieldset class="pricing-tabs-wrap">
    <legend class="sr-only">Choose a package group</legend>

    <ul class="pricing-tabs">
      {#each tabs as tab (tab.id)}
        <li class="pricing-tabs-item">
          <label for={"tab-" + tab.id} class="tab">
            {tab.label}
          </label>
        </li>
      {/each}
    </ul>
  </fieldset>

  <!-- Each group renders its own slider -->
  {#each groups as group (group.id)}
    <section class="pricing-slider-wrap" data-group={group.id}>
      <h3 class="sr-only">{group.label}</h3>

      <!-- The slider is a list of cards -->
      <ul
        class="pricing-slider"
        bind:this={sliderEls[group.id]}
        on:scroll={() => onScroll(group.id)}
      >
        {#each group.pkgs as pkg (pkg.id)}
          {@const hasLessons = typeof pkg.lessons === "number" && pkg.lessons > 0}
          {@const priceText = typeof pkg.price === "number" ? euro0.format(pkg.price) : ""}
          {@const perLesson = hasLessons && typeof pkg.price === "number" ? pkg.price / pkg.lessons : null}
          {@const perLessonText = perLesson !== null ? `${euro2.format(perLesson)} per les` : null}
          {@const lessonsLine = hasLessons && typeof pkg.lessonMinutes === "number"
            ? `${pkg.lessons} rijlessen van ${pkg.lessonMinutes} minuten`
            : null}
          {@const includes = Array.isArray(pkg.includes) ? pkg.includes : []}

          <li class="slide">
            <article class="price-card">
              <header class="card-head">
                <h4 class="title">{pkg.title}</h4>

                {#if pkg.subtitle}
                  <p class="subtitle">{pkg.subtitle}</p>
                {/if}
              </header>

              <p class="price-wrap">
                <span class="price">{priceText}</span>
                <span class="exam">{pkg.includesExam ? "Incl. examen" : "Excl. examen"}</span>

                {#if perLessonText}
                  <span class="per">{perLessonText}</span>
                {/if}
              </p>

              <hr class="divider" />

              <section class="card-body">
                <h5 class="includes-title">Wat is inbegrepen</h5>

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
              </section>

              <footer class="card-foot">
                <button class="cta" type="button">
                  Kies dit pakket!
                </button>
              </footer>
            </article>
          </li>
        {/each}
      </ul>

      <!-- Only show dot navigation when there is more than one page -->
      {#if pageCounts[group.id] > 1}
        <div class="dots">
          <ul class="dots-list">
            {#each Array.from({ length: pageCounts[group.id] }) as _, index}
              <li>
                <button
                  type="button"
                  class="dot"
                  class:active={index === activeIndexes[group.id]}
                  on:click={() => goTo(group.id, index)}
                >
                  <span class="dot-visual"></span>
                  <span class="sr-only">Ga naar slide {index + 1}</span>
                </button>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </section>
  {/each}
</section>

<style>
  /* Hide all groups by default and reveal the selected one through the checked radio */
  .pricing-slider-wrap {
    display: none;
  }

  #tab-extra:checked ~ .pricing-slider-wrap[data-group="extra"],
  #tab-basis:checked ~ .pricing-slider-wrap[data-group="basis"],
  #tab-theorie:checked ~ .pricing-slider-wrap[data-group="theorie"] {
    display: block;
  }

  .pricing-tabs-wrap {
    display: flex;
    justify-content: center;
    padding: var(--space-4) 0 var(--space-5);
  }

  .pricing-tabs {
    display: inline-flex;
    gap: var(--space-3);
    padding: 0.35rem;
    margin: 0;
    list-style: none;
    border-radius: 999px;
    background: var(--c-btn-bg-main);
    border: 1px solid var(--c-border-light);
  }

  .tab {
    display: inline-block;
    border: 0;
    background: transparent;
    border-radius: 999px;
    padding: var(--space-3) var(--space-5);
    font-weight: var(--fw-bold);
    cursor: pointer;
    color: var(--c-navy-900);
    transition: background-color 150ms ease, transform 150ms ease;
  }

  /* Visual active state for the selected tab */
  #tab-extra:checked ~ .pricing-tabs-wrap .pricing-tabs label[for="tab-extra"],
  #tab-basis:checked ~ .pricing-tabs-wrap .pricing-tabs label[for="tab-basis"],
  #tab-theorie:checked ~ .pricing-tabs-wrap .pricing-tabs label[for="tab-theorie"] {
    background: var(--c-white);
    outline: 4px solid color-mix(in srgb, var(--c-accent) 55%, transparent);
    outline-offset: 2px;
    transform: translateY(-1px);
  }

  .pricing-slider-wrap {
    max-width: 520px;
    margin: 0 auto;
  }

  /* Horizontal scroll slider with snap behavior */
  .pricing-slider {
    max-width: 520px;
    margin: 0 auto;
    padding: 0;
    list-style: none;
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

  /* Card layout and entrance animation */
  .price-card {
    max-width: 420px;
    margin: 0 auto;
    background: var(--c-white);
    border: 3px solid var(--c-border-light);
    border-radius: 28px;
    padding: 22px;
    box-shadow: var(--shadow-s);
    display: flex;
    flex-direction: column;
    height: 100%;
    opacity: 0;
    transform: translateY(18px) scale(0.98);
    animation: card-enter 1600ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .slide:nth-child(1) .price-card {
    animation-delay: 0ms;
  }

  .slide:nth-child(2) .price-card {
    animation-delay: 280ms;
  }

  .slide:nth-child(3) .price-card {
    animation-delay: 560ms;
  }

  .slide:nth-child(4) .price-card {
    animation-delay: 840ms;
  }

  .slide:nth-child(5) .price-card {
    animation-delay: 1120ms;
  }

  .slide:nth-child(6) .price-card {
    animation-delay: 1400ms;
  }

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
    display: block;
    font-size: var(--fs-highlighted-mobile);
    line-height: 1;
    font-weight: 900;
    letter-spacing: -0.03em;
    color: var(--c-navy-900);
  }

  .exam,
  .per {
    margin: var(--space-1) 0 0;
    display: block;
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
  }

  .inc {
    display: grid;
    grid-template-columns: 22px 1fr;
    gap: var(--space-3);
    align-items: start;
    color: var(--c-text);
    font-size: var(--fs-body-sm);
    line-height: 1.35;
  }

  .inc-icon {
    width: 22px;
    height: 22px;
    margin-top: 2px;
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
  }

  .cta:hover {
    background: var(--c-span);
    transform: translateY(-1px);
  }

  .cta:active {
    transform: translateY(0);
  }

  .cta:focus-visible {
    outline: 4px solid color-mix(in srgb, var(--c-accent) 55%, transparent);
    outline-offset: 4px;
  }

  /* Dot navigation for slider pages */
  .dots {
    display: flex;
    justify-content: center;
    margin-top: var(--space-4);
  }

  .dots-list {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .dot {
    position: relative;
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

  /* Utility class to visually hide content but keep it available for screen readers */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }

  @keyframes card-enter {
    from {
      opacity: 0;
      transform: translateY(18px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .price-card {
      opacity: 1;
      transform: none;
      animation: none;
    }

    .tab,
    .cta,
    .dot-visual {
      transition: none;
    }

    .pricing-slider {
      scroll-behavior: auto;
    }
  }

  /* Tablet layout: show two cards at a time */
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
      grid-auto-columns: 50%;
      padding-bottom: 0.25rem;
    }

    .slide {
      padding: 0 0.35rem;
    }

    .price-card {
      width: 92%;
      max-width: 430px;
    }

    .includes {
      margin-bottom: var(--space-5);
    }

    .cta {
      margin-top: auto;
      width: 58%;
    }
  }

  /* Desktop layout: show three cards at a time */
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
      grid-auto-columns: 33.3333%;
      padding-bottom: 0.25rem;
    }

    .slide {
      padding: 0 0.1rem;
    }

    .price-card {
      width: 80%;
      max-width: 900px;
    }

    .cta {
      margin-top: auto;
      margin-inline: auto;
      width: 50%;
    }

    .dot {
      padding: 0.35rem;
    }

    .dot-visual {
      width: 14px;
      height: 14px;
    }
  }
</style>