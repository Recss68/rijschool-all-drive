<script>
    import { Hero, BenefitCards } from '$lib';
</script>

<Hero />

<section class="benefits-container section">
    <div class="section-inner">
        <h2>Waarom kiezen voor Rijschool All Drive?</h2>
        <p>Ontdek wat ons uniek maakt en waarom leerlingen voor ons kiezen.</p>
        <BenefitCards />
    </div>
</section>

<style> 

    .benefits-container { 
        background-color: var(--c-section);
        text-align: center;
        h2 {
            font-size: var(--fs-hl-lg);
        }
        p {
            color: var(--c-text);
        }
    }

</style>