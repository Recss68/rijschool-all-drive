<svelte:head>
	<title>Contact Rijschool Amsterdam | Boek een Proefles | Rijschool All Drive</title>
	<meta
		name="description"
		content="Neem contact op met Rijschool All Drive in Amsterdam. Heb je vragen of wil je direct een proefles boeken? Wij helpen je graag met persoonlijke begeleiding en snelle rijlessen in Amsterdam."
	/>
</svelte:head>

<script>
	import 
	{ 
		ContactForm, 
		WhatsappCard, 
		FaqSection
	} 
	from '$lib';
</script>

<section class="breadcrumb">
	<h1>Neem Contact Op</h1>
	<p>Heb je vragen of wil je direct starten? Wij helpen je graag verder!</p>
</section>


<section class="contact-section section">
	<div class="section-inner">

		<div class="contact-grid-left">
			<h2>Stuur ons een bericht</h2>
			<p>Vul het formulier in en we nemen binnen 24 uur contact met je op.</p>
			<ContactForm />
		</div>

		<div class="contact-grid-right">
			<h2>Contactgegevens</h2>
			<p>Je kunt ons ook direct bereiken via telefoon, email of WhatsApp.</p>
				<ul class="contact-info">

					<li>
						<div class="icon">
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>	
						</div>
						<div class="details">
							<strong>Telefoon</strong>
							<a href="tel:+31627824428">+31 6 27 82 44 28</a>
							<span>Ma-Vr: 08:00 - 20:00</span>
							<span>Za: 09:00 - 17:00</span>
						</div>
					</li>

					<li>
						<div class="icon">
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 8L8.44992 11.6333C9.73295 12.4886 10.3745 12.9163 11.0678 13.0825C11.6806 13.2293 12.3194 13.2293 12.9322 13.0825C13.6255 12.9163 14.2671 12.4886 15.5501 11.6333L21 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
						</div>
						<div class="details">
							<strong>E-mail</strong>
							<a href="mailto:info@rijschoolalldrive.nl">info@rijschoolalldrive.nl</a>
							<span>We reageren binnen 24 uur</span>
						</div>
					</li>
					
					<li>
						<div class="icon">
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.4003 18C19.7837 17.2499 20 16.4002 20 15.5C20 12.4624 17.5376 10 14.5 10C11.4624 10 9 12.4624 9 15.5C9 18.5376 11.4624 21 14.5 21L21 21C21 21 20 20 19.4143 18.0292M18.85 12C18.9484 11.5153 19 11.0137 19 10.5C19 6.35786 15.6421 3 11.5 3C7.35786 3 4 6.35786 4 10.5C4 11.3766 4.15039 12.2181 4.42676 13C5.50098 16.0117 3 18 3 18H9.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
						</div>
						<div class="details">
							<strong>Whatsapp</strong>
							<a href="https://wa.me/31627824428">+31 6 27 82 44 28</a>
							<span>Snel en direct contact</span>
						</div>
					</li>

					<li>
						<div class="icon">
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
						</div>
						<div class="details">
							<strong>Werkgebied</strong>
							<span>Amsterdam & Omstreken</span>
							<span>Noord-Holland</span>
						</div>
					</li>

					<li>
						<div class="icon">
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 7V12L9.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
						</div>
						<div class="details">
							<strong>Openingstijden</strong>
							<span>Maandag - Vrijdag: 08:00 - 18:00</span>
							<span>Zaterdag: 08:00 - 18:00</span>
							<span>Zondag: Gesloten</span>
						</div>
					</li>
					
				</ul>
				<WhatsappCard />
		</div>

	</div>
</section>

<section class="section service-area">
	<div class="section-inner">
		<h2>Ons werkgebied</h2>
		<p>Wij verzorgen rijlessen in Amsterdam en directe omgeving</p>
		<div class="service-area-cards">

			<article class="area-card">
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#155DFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#155DFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
				<h3>Amsterdam</h3>
				<p>Rijlessen in Amsterdam West, Rijlessen in Amsterdam Noord, Rijlessen in Amsterdam Zuid en Rijlessen in Amsterdam Zuid.</p>
			</article>

			<article class="area-card">
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#155DFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#155DFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
				<h3>Amsterdam Centrum</h3>
				<p>Ook in Amsterdam Centrum zijn wij actief met onze rijlessen.</p>
			</article>

			<article class="area-card">
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#155DFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#155DFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
				<h3>Omliggende gebieden</h3>
				<p>Rijlessen Diemen, Rijlessen Haarlem, Rijlessen Amstelveen en omstreken.</p>
			</article>

		</div>
		<p class="sub-text">Niet zeker of we in jouw buurt rijden? Neem contact met ons op voor meer informatie!</p>
	</div>
</section>

<FaqSection />

<style>

    .service-area { 
        background-color: var(--c-section);
        text-align: center;
        h2 {
            font-size: var(--fs-hl-lg);
        }
		p {
			font-size: var(--fs-hl-md-mobile);
		}
    }

	.sub-text {
		font-size: var(--fs-label-sm-mobile) !important;
	}

	.contact-section {
		.section-inner {
			@media ( min-width: 1024px ) {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				grid-template-rows: 1fr;
				grid-column-gap: var(--space-12);
				grid-row-gap: 0px;
			}
		}
	}

	.contact-grid-left {
		grid-area: 1 / 1 / 2 / 2; 
	}

	.contact-grid-right {
		grid-area: 1 / 2 / 2 / 3;
	}

	.contact-info {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.contact-info li {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
	}

	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--c-icon-bg);
		width: 50px;
		height: 50px;
		padding: var(--space-1);
		border-radius: var(--radius-soft);
		svg {
			width: 30px;
			stroke: var(--c-accent);
		} 
	}

	.details {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.details strong {
		font-size: var(--fs-label);
		color: var(--c-text);
	}

	.details a {
		color: var(--c-accent);
		font-size: var(--fs-body);
	}

	.details span {
		color: var(--c-text-muted);
		font-size: var(--fs-label-sm);
	}

	.service-area {
		.service-area-cards {
			display: flex;
			flex-direction: column;
			gap: var(--space-8);
			margin: var(--space-8) 0 var(--space-8) 0;
			@media ( min-width: 1024px ) {
				flex-direction: row;
				gap: var(--space-6);
				.area-card {
					flex: 1;
				}
			}
			.area-card {
				background-color: var(--c-white);
				padding: var(--space-6);
				border-radius: var(--radius-soft);
				box-shadow: var(--shadow-m);
				h3 { 
					font-size: var(--fs-label-sm-mobile);
				}
				p {
					font-size: var(--fs-label-s-mobile);
				}
				svg {
					width: 40px;
					margin-bottom: var(--space-3);
				}
			}
		}
	}
</style>