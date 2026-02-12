<div class="process-steps">

    <ol class="steps">
        <li>
            <span class="step-number"></span>
            <div class="step-content">
                <h3>Aanmelden & Kennismaken</h3>
                <p>Boek je gratis proefles online of neem contact met ons op. We plannen een kennismaking en bespreken je doelen en verwachtingen.</p>
            </div>
        </li>
        
        <li>
            <span class="step-number"></span>
            <div class="step-content">
                <h3>Theorie & Rijlessen</h3>
                <p>Begin met je theorie-examen en start tegelijkertijd met je rijlessen. Wij begeleiden je bij beide onderdelen tot je volledig voorbereid bent.</p>
            </div>
        </li>

        <li>
            <span class="step-number"></span>
            <div class="step-content">
                <h3>Voorbereiding Praktijkexamen</h3>
                <p>Je instructeur bepaalt wanneer je klaar bent voor het praktijkexamen. We regelen de aanmelding en begeleiden je volledig op de dag zelf.</p>
            </div>
        </li>

        <li>
            <span class="step-number"></span>
            <div class="step-content">
            <h3>Geslaagd & Rijbewijs!</h3>
            <p>Gefeliciteerd! Je hebt je rijbewijs gehaald. Je ontvangt je rijbewijs binnen enkele dagen en bent klaar om zelfstandig de weg op te gaan.</p>
            </div>
        </li>
    </ol>

</div>    


<style>

.process-steps {
    @media (min-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}

.steps {
    list-style: none;
    text-align: left;
    padding: 0;
    margin: 0;
    counter-reset: step;
    .step-number {
        display: inline-block;
        background-color: var(--c-accent);
        color: var(--c-white);
        padding: var(--space-7) var(--space-8);
        border-radius: var(--radius-round);
        box-shadow: var(--shadow-m);
        margin: var(--space-8) 0 var(--space-6) 0;
    }
    .step-number, h3 {
        font-size: var(--fs-hl-sm-desktop);
        font-weight: var(--fw-bold);
    }
    li {
        counter-increment: step;
    }
    .step-number::before {
        content: counter(step, decimal-leading-zero);
    }
    @media (min-width: 786px) {
        li {
            display: grid;
            grid-template-columns: 96px 1fr;
            column-gap: var(--space-6);
            align-items: center;
        }

        .step-number {
            grid-column: 1;
        }

        .step-content {
            grid-column: 2;
        }

        li h3 {
            padding-top: var(--space-3);
            margin-bottom: var(--space-1);
        }

        li p {
            margin: 0;
            max-width: 65ch;
        }
    }

}

</style>