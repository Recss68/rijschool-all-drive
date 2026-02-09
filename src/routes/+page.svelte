<script>
    import { Hero, BenefitCards, PriceCards } from '$lib';
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
    </div>        
</section>

<style> 

    .benefits-container, .price-cards-container{ 
        background-color: var(--c-section);
        text-align: center;
        h2 {
            font-size: var(--fs-hl-lg);
        }
        p {
            color: var(--c-text);
        }
    }

    .price-cards-container {
        background-color: var(--c-white);
    }
</style>