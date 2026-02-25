<script>
  import { tick } from "svelte";
  import rawPackages from "$lib/data/pricing-packages.json";

  const packages = rawPackages?.default ?? rawPackages;

  const tabs = [
    { id: "extra", label: "Extra" },
    { id: "basis", label: "Basis" },
    { id: "theorie", label: "Theorie" }
  ];

  let activeGroup = "basis";
  $: filteredPackages = packages.filter((p) => p.group === activeGroup);

  let sliderEl;
  let activeIndex = 0;

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

  async function setGroup(id) {
    activeGroup = id;
    activeIndex = 0;
    await tick();

    sliderEl?.scrollTo({
      left: 0,
      behavior: "auto"
    });
  }

  function onScroll() {
    if (!sliderEl) return;

    const slideWidth = sliderEl.clientWidth;
    if (!slideWidth) return;

    activeIndex = Math.round(sliderEl.scrollLeft / slideWidth);
  }

  function goTo(i) {
    if (!sliderEl) return;

    const max = Math.max(0, filteredPackages.length - 1);
    const next = Math.max(0, Math.min(i, max));

    sliderEl.scrollTo({
      left: sliderEl.clientWidth * next,
      behavior: "smooth"
    });
  }
</script>

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

<section class="pricing-slider-wrap">
  <section class="pricing-slider" bind:this={sliderEl} on:scroll={onScroll} tabindex="0">
    {#each filteredPackages as pkg (pkg.id)}
      {@const hasLessons = typeof pkg.lessons === "number" && pkg.lessons > 0}
      {@const priceText = typeof pkg.price === "number" ? euro0.format(pkg.price) : ""}
      {@const perLesson =
        hasLessons && typeof pkg.price === "number"
          ? pkg.price / pkg.lessons
          : null}
      {@const perLessonText =
        perLesson !== null ? `${euro2.format(perLesson)} per les` : null}
      {@const lessonsLine =
        hasLessons && typeof pkg.lessonMinutes === "number"
          ? `${pkg.lessons} rijlessen van ${pkg.lessonMinutes} minuten`
          : null}
      {@const includes = Array.isArray(pkg.includes) ? pkg.includes : []}

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

  {#if filteredPackages.length > 1}
    <div class="dots">
      {#each filteredPackages as _, i}
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
  flex: 0 0 100%;
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
</style>