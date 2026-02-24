<script>
  import rawPackages from "$lib/data/pricing-packages.json";

  const packages = rawPackages?.default ?? rawPackages;

  const tabs = [
    { id: "extra", label: "Extra" },
    { id: "basis", label: "Basis" },
    { id: "theorie", label: "Theorie" }
  ];

  let activeGroup = "basis";
  $: filteredPackages = packages.filter((p) => p.group === activeGroup);

  function setGroup(id) {
    activeGroup = id;
  }

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

<section class="pricing-list">
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

    <article class="price-card">
      <header>
        <h3>{pkg.title}</h3>
        {#if pkg.subtitle}<p>{pkg.subtitle}</p>{/if}
      </header>

      <p class="price">{priceText}</p>
      <p class="exam">
        {pkg.includesExam ? "Incl. examen" : "Excl. examen"}
      </p>

      {#if perLessonText}
        <p class="per">{perLessonText}</p>
      {/if}

      <h4>Wat is inbegrepen</h4>
      <ul>
        {#if lessonsLine}
          <li>{lessonsLine}</li>
        {/if}

        {#each includes as item}
          <li>{item}</li>
        {/each}
      </ul>
    </article>
  {/each}
</section>

<style>
  .pricing-tabs-wrap {
  display: flex;
  justify-content: center;
  padding: 1rem 0 1.25rem;
}

.pricing-tabs {
  display: inline-flex;
  gap: 0.75rem;
  padding: 0.35rem;
  border-radius: 999px;
  background: hsl(220, 14%, 96%);
}

.tab {
  border: 0;
  background: transparent;
  border-radius: 999px;
  padding: 0.75rem 1.25rem;
  font-weight: 700;
  cursor: pointer;
  color: hsl(221, 39%, 11%);
  transition: transform 220ms cubic-bezier(0.2, 0.9, 0.2, 1),
  box-shadow 220ms cubic-bezier(0.2, 0.9, 0.2, 1),
  background-color 220ms cubic-bezier(0.2, 0.9, 0.2, 1),
  color 220ms cubic-bezier(0.2, 0.9, 0.2, 1),
  outline-color 220ms cubic-bezier(0.2, 0.9, 0.2, 1);
}

.tab.active {
  background: hsl(0, 0%, 100%);
  box-shadow: 0 1px 8px #00000014;
  outline: 4px solid hsl(219, 100%, 56%);
  outline-offset: 0;
  transform: translateY(-2px) scale(1.03);
}


</style>