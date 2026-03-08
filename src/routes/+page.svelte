<svelte:head>
	<title>Rijschool in Amsterdam | Rijschool All Drive</title>
	<meta
		name="description"
		content="Op zoek naar een rijschool in Amsterdam? Rijschool All Drive biedt betaalbare rijlessen, persoonlijke begeleiding en hoge slagingskansen."
	/>
	<link rel="icon" href="/images/favicon_white.jpg" />
</svelte:head>

<script>
    import 
    { 
        Hero, 
        BenefitCards, 
        RecommendedPriceCards as PriceCards, 
        ProcessSteps, 
        Reviews, 
        SuccessStories, 
        AboutSection,
        CtaSection
        } from '$lib';
</script>

<Hero />

<section class="benefits-container section">
    <div class="section-inner">
        <div class="section-heading">
            <h2>Waarom kiezen voor Rijschool All Drive?</h2>
            <p>Ontdek wat ons uniek maakt en waarom leerlingen voor ons kiezen.</p>
        </div>
        <BenefitCards />
    </div>
</section>

<section class="price-cards-container section">
    <div class="section-inner">
        <div class="section-heading">
            <h2>Onze Lespakketten</h2>
            <p>Kies het pakket dat bij jou past. Altijd flexibel en op maat aan te passen.</p>
        </div>
        <PriceCards />
        <p class="section-footer">Niet zeker welke pakket bij je past? <a href="https://wa.me/31627824428">Neem contact op</a> voor persoonlijk advies!</p>
    </div>        
</section>

<section class="process-steps-container section">
    <div class="section-inner">
        <div class="section-heading">
            <h2>Hoe het werkt</h2>
            <p>Van aanmelding tot rijbewijs in 4 eenvoudige stappen!</p>
        </div>
        <ProcessSteps />
    </div>
</section>

<section class="reviews-container section">
    <div class="section-inner">
        <div class="section-heading">
            <h2>Wat onze leerlingen zeggen</h2>
            <p>Ontdek de ervaringen van onze geslaagde leerlingen!</p>
        </div>
        <Reviews />
    </div>
</section>

<section class="success-stories-container section">
    <div class="section-inner">
        <div class="section-heading">
            <h2>Geslaagd bij Rijschool All Drive!</h2>
            <p>Ontmoet ekele van onze trotse geslaagde leerlingen!</p>
        </div> 
        <SuccessStories />
        <p class="section-footer">Wil jij ook je rijbewijs halen? <a href="https://wa.me/31627824428">Neem dan nu contact op!</a></p>
    </div>
</section>

<AboutSection />

<CtaSection />

<style> 

    .benefits-container, 
    .price-cards-container, 
    .process-steps-container, 
    .reviews-container, 
    .success-stories-container { 
        background-color: var(--c-section);
        text-align: center;
        h2 {
            font-size: var(--fs-hl-lg);
        }
    }

    .price-cards-container, .reviews-container {
        background-color: var(--c-white);
    }

</style>