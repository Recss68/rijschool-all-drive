<script>
    import { Hero, BenefitCards, PriceCards, ProcessSteps, Reviews } from '$lib';
</script>

<Hero />

<section class="benefits-container section">
    <div class="section-inner">
        <h2>Waarom kiezen voor Rijschool All Drive?</h2>
        <p>Ontdek wat ons uniek maakt en waarom leerlingen voor ons kiezen.</p>
        <BenefitCards />
    </div>
</section>

<section class="price-cards-container section">
    <div class="section-inner">
        <h2>Onze Lespakketten</h2>
        <p>Kies het pakket dat bij jou past. Altijd flexibel en op maat aan te passen.</p>
        <PriceCards />
        <p class="cards-footer">Niet zeker welke pakket bij je past? <a href="https://wa.me/31627824428">Neem contact op</a> voor persoonlijk advies!</p>
    </div>        
</section>

<section class="process-steps-container section">
    <div class="section-inner">
        <h2>Hoe het werkt</h2>
        <p>Van aanmelding tot rijbewijs in 4 eenvoudige stappen!</p>
        <ProcessSteps />
    </div>
</section>

<section class="reviews-container section">
    <div class="section-inner">
        <h2>Wat onze leerlingen zeggen</h2>
        <p>Ontdek de ervaringen van onze geslaagde leerlingen!</p>
        <Reviews />
    </div>
</section>

<style> 

    .benefits-container, .price-cards-container, .process-steps-container, .reviews-container{ 
        background-color: var(--c-section);
        text-align: center;
        h2 {
            font-size: var(--fs-hl-lg);
        }
    }

    .price-cards-container, .reviews-container {
        background-color: var(--c-white);
    }

    .price-cards-container {
        .cards-footer {
            margin-top: var(--space-12);
            font-size: var(--fs-body-sm-mobile);
            color: var(--c-text-light);
            a {
                color: var(--c-accent);
                font-weight: var(--fw-semibold);
            }
        }
    }
</style>