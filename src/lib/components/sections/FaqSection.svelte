<script>
    const registry = new Set();
    const DURATION = 300;

    export function detailsToggle(node) {
        if (typeof window === 'undefined') return { destroy() {} };

        registry.add(node);

        function closeItem(target) {
            target.classList.add('is-closing');
            setTimeout(() => {
                target.removeAttribute('open');
                target.classList.remove('is-closing');
            }, DURATION);
        }

        function onSummaryClick(e) {
            e.preventDefault();
            if (node.open) {
                closeItem(node);
            } else {
                registry.forEach((other) => {
                    if (other !== node && other.open) closeItem(other);
                });
                node.open = true;
            }
        }

        const summary = node.querySelector('summary');
        if (summary) summary.addEventListener('click', onSummaryClick);

        return {
            destroy() {
                registry.delete(node);
                if (summary) summary.removeEventListener('click', onSummaryClick);
            }
        };
    }
</script>

<section class="section faq-container">
    <div class="section-inner">
        <h2>Veelgestelde Vragen</h2>

        <details class="faq-item" use:detailsToggle>
            <summary>Hoe snel kan ik mijn rijbewijs halen bij een rijschool in Amsterdam?</summary>
            <p>Bij Rijschool All Drive in Amsterdam kun je vaak al binnen enkele weken starten met rijlessen. Hoe snel je jouw rijbewijs haalt, hangt af van je beschikbaarheid, je leertempo en hoe vaak je rijlessen volgt. Veel leerlingen kiezen voor meerdere rijlessen per week zodat ze sneller klaar zijn voor het praktijkexamen. Onze instructeurs helpen je een persoonlijk lesplan te maken zodat je efficiënt en veilig jouw rijbewijs kunt halen in Amsterdam.</p>
        </details>

        <details class="faq-item" use:detailsToggle>
            <summary>Wat kosten rijlessen in Amsterdam?</summary>
            <p>De kosten voor rijlessen in Amsterdam verschillen per rijschool en pakket. Bij Rijschool All Drive bieden we verschillende rijlespakketten aan die passen bij jouw niveau en budget. Je kunt kiezen voor losse rijlessen of voordelige pakketten inclusief praktijkexamen. Transparante prijzen en duidelijke pakketten helpen je om precies te weten wat je betaalt voor jouw rijopleiding in Amsterdam.</p>
        </details>

        <details class="faq-item" use:detailsToggle>
            <summary>Hoeveel rijlessen heb ik gemiddeld nodig om mijn rijbewijs te halen?</summary>
            <p>Het aantal rijlessen dat je nodig hebt verschilt per persoon. Gemiddeld hebben leerlingen in Nederland ongeveer 35 tot 45 rijlessen nodig voordat ze klaar zijn voor het praktijkexamen. Tijdens een proefles bij onze rijschool in Amsterdam kan de instructeur een betere inschatting maken van hoeveel rijlessen jij ongeveer nodig hebt.</p>
        </details>

        <details class="faq-item" use:detailsToggle>
            <summary>Kan ik eerst een proefles nemen bij jullie rijschool in Amsterdam?</summary>
            <p>Ja, bij Rijschool All Drive kun je beginnen met een proefles in Amsterdam. Tijdens deze rijles maak je kennis met de instructeur, de lesauto en onze manier van lesgeven. De instructeur beoordeelt je rijvaardigheid en geeft advies over hoeveel rijlessen je waarschijnlijk nodig hebt om je rijbewijs te halen.</p>
        </details>  

        <details class="faq-item" use:detailsToggle>
            <summary>Moet ik eerst mijn theorie halen voordat ik rijlessen neem?</summary>
            <p>Je kunt rijlessen in Amsterdam volgen terwijl je nog bezig bent met je theorie. Veel leerlingen kiezen ervoor om hun theorie-examen tegelijk met hun rijlessen voor te bereiden. Wel is het verstandig om je theorie op tijd te halen, omdat je deze nodig hebt voordat je praktijkexamen kunt doen.</p> 
        </details>

        <details class="faq-item" use:detailsToggle>
            <summary>Waar kan ik mijn theorie-examen doen in Amsterdam?</summary>
            <p>Het theorie-examen voor je rijbewijs wordt afgenomen door het CBR. In Amsterdam zijn er meerdere locaties waar je je theorie-examen kunt doen. Bij Rijschool All Drive helpen we je graag met tips, oefenmateriaal en begeleiding zodat je goed voorbereid bent op je theorie-examen in Amsterdam.</p>
        </details>

        <details class="faq-item" use:detailsToggle>
            <summary>Waarom kiezen voor een rijschool in Amsterdam?</summary>
            <p>Een rijschool in Amsterdam heeft ervaring met rijden in druk stadsverkeer. Tijdens je rijlessen leer je omgaan met situaties zoals trams, fietsers, smalle straten en drukke kruispunten. Dit zorgt ervoor dat je zelfverzekerd en veilig leert rijden in Amsterdam en omgeving.</p>
        </details>

        <details class="faq-item" use:detailsToggle>
            <summary>Kan ik rijlessen volgen in de avond of in het weekend?</summary>
            <p>Ja, bij onze rijschool in Amsterdam bieden we flexibele rijlestijden aan. Je kunt vaak ook rijlessen plannen in de avond of in het weekend. Dit maakt het makkelijker om rijlessen te combineren met school, studie of werk.</p>
        </details>

        <details class="faq-item" use:detailsToggle>
            <summary>Hoe plan ik mijn rijlessen in Amsterdam?</summary>
            <p>Je kunt eenvoudig contact met ons opnemen via WhatsApp, telefoon of het contactformulier op de website. Samen plannen we jouw rijlessen in Amsterdam op momenten die voor jou het beste uitkomen. Zo kun je flexibel werken aan het behalen van jouw rijbewijs.</p>
        </details>

        <details class="faq-item" use:detailsToggle>
            <summary>Wat gebeurt er als ik mijn praktijkexamen niet haal?</summary>
            <p>Als je je praktijkexamen niet haalt, bespreken we samen met je instructeur wat er verbeterd kan worden. Daarna plannen we extra rijlessen in zodat je beter voorbereid bent op het volgende examen. Veel leerlingen slagen alsnog snel na een paar extra rijlessen.</p>
        </details>
    </div>
</section>

<style>
    .faq-container {
        text-align: center;
        h2 {
            font-size: var(--fs-hl-lg);
            margin-bottom: var(--space-12);
        }

        .faq-item {
            text-align: left;
            padding: var(--space-3);
            margin-bottom: var(--space-6);
            border-radius: var(--radius-soft);
            background-color: var(--c-section);
            @media (min-width: 1024px) {
                padding: var(--space-6);
            }

            summary {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: var(--space-4);
                list-style: none;
                cursor: pointer;
                font-weight: var(--fw-semibold);
                padding: 0.25rem 0;
            }

            summary::-webkit-details-marker {
                display: none;
            }

            summary::after {
                content: '\203A';
                font-size: 1.25rem;
                line-height: 1;
                transition: transform 220ms ease;
                transform-origin: center;
                color: var(--c-slate-700);
            }

            &:where([open]) summary::after,
            &[open] summary::after {
                transform: rotate(90deg);
            }

            p {
                interpolate-size: allow-keywords;
                overflow: hidden;
                height: 0;
                opacity: 0;
                margin: 0;
                padding-top: 0;
                transition:
                    height 300ms ease,
                    opacity 300ms ease,
                    padding-top 300ms ease;
            }

            &[open] p {
                height: auto;
                opacity: 1;
                padding-top: 0.5rem;
            }

            &:global(.is-closing) p {
                height: 0;
                opacity: 0;
                padding-top: 0;
            }

            @media (prefers-reduced-motion: reduce) {
                p { transition: none; }
            }
        }
    }
</style>