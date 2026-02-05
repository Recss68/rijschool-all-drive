<section class="section gradient hero-section">
    <div class="section-inner">
        <span class="sub-title">
            <svg
            viewBox="0 0 24 24"
            width="15"
            aria-hidden="true"
            class="icon"
            >
            <path
                d="M20 6L9 17l-5-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            </svg>
            Officieel erkende rijschool</span>
        <h1>Jouw rijbewijs, Ons succes</h1>
        <p>Leer rijden met ervaren instructeurs in een veilige en professionele omgeving. Start vandaag nog met jouw eerste proefles.</p>
        <div class="hero-buttons">
            <button class="btn-white">Proefles boeken<span class="arrow">→</span></button>
            <button class="btn-outline">Bekijk prijzen</button>
        </div>
        <hr class="divider-blue">
        <ul>
            <li><span class="t-highlight">85%</span> Slagingspercentage</li>
            <li><span class="t-highlight">500+</span> Geslaagden</li>
            <li><span class="t-highlight">4.9/5</span> Beoordeling</li>
        </ul>
    </div>
</section>

<style>
    .hero-section{
        color: var(--c-white);
        background: linear-gradient(to bottom right, var(--g-0), var(--g-50), var(--g-100));
        h1, p {
            margin-top: var(--space-8);
        }
        h1 {
            color: var(--c-white);
        }
        ul {
            padding: 0;
            margin: 0;
            margin-top: var(--space-8);
            list-style: none;
            display: flex;
            gap: var(--space-6);
            justify-content: center;
            li {
                font-size: var(--fs-body-sm);
            }
        }
    }

    .hero-buttons {
        margin-top: var(--space-10);
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
    }

</style>