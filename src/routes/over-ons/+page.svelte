<!-- eslint-disable svelte/no-at-html-tags -- static translated copy from messages/*.json, never user input -->
<svelte:head>
	<title>{m.meta_overons_title()}</title>
	<meta name="description" content={m.meta_overons_description()} />
</svelte:head>

<section class="breadcrumb">
	<h1>{m.overons_hero_title()}</h1>
	<p>{m.overons_hero_text()}</p>
</section>

<AboutSection showLink={false} />

<section class="section lessons-info">
	<div class="section-inner">
		<h2>{@html m.overons_lessons_heading()}</h2>
		<div class="lessons-grid">
			<div class="lessons-grid-1">
				<p>
					{@html m.overons_lessons_para1()}
				</p>
				<p>
					{@html m.overons_lessons_para2()}
				</p>
				<p>
					{@html m.overons_lessons_para3()}
				</p>
			</div>

			<div class="lessons-grid-2">
				<article>
					<h3>{m.overons_vision_heading()}</h3>
					<ul>
						<li>{m.overons_vision_1()}</li>
						<li>{m.overons_vision_2()}</li>
						<li>{m.overons_vision_3()}</li>
						<li>{m.overons_vision_4()}</li>
						<li>{m.overons_vision_5()}</li>
						<li>{m.overons_vision_6()}</li>
						<li>{m.overons_vision_7()}</li>
						<li>{m.overons_vision_8()}</li>
					</ul>
				</article>
			</div>
		</div>
	</div>
</section>

<section class="section benefits-container">
	<div class="section-inner">
		<div class="section-heading">
			<h2>{m.home_benefits_heading()}</h2>
			<p>{m.home_benefits_text()}</p>
		</div>
		<BenefitCards />
	</div>
</section>

<section class="section process-steps">
	<div class="section-inner">
		<div class="section-heading">
			<h2>{m.overons_process_heading()}</h2>
			<p>{m.overons_process_text()}</p>
		</div>
		<ProcessSteps showMethodContent={true} isWhite={true} />
	</div>
</section>

<section class="success-stories-container section">
	<div class="section-inner">
		<div class="section-heading">
			<h2>{m.home_success_heading()}</h2>
			<p>{m.home_success_text()}</p>
		</div>
		<SuccessStories />
		<p class="section-footer">
			{@html m.home_success_footer()}
		</p>
	</div>
</section>

<section class="section instructors-container">
	<div class="section-inner">
		<div class="section-heading">
			<h2>{m.overons_instructors_heading()}</h2>
			<p>{m.overons_instructors_text()}</p>
		</div>
		<InstructorTeam />
	</div>
</section>

<CtaSection />

<script>
	import {
		AboutSection,
		BenefitCards,
		ProcessSteps,
		SuccessStories,
		InstructorTeam,
		CtaSection,
	} from '$lib';
	import { m } from '$lib/paraglide/messages.js';
</script>

<style>
	.section-heading h2,
	h2 {
		font-size: var(--fs-hl-lg);
		margin-bottom: var(--space-5);
	}
	.section-heading {
		h2,
		p {
			text-align: center;
		}
	}

	.lessons-info {
		background-color: var(--c-section);
		h2 {
			text-align: center;
		}

		article {
			background-color: var(--c-white);
			padding: var(--space-4);
			border-radius: var(--radius-round);
			margin-bottom: var(--space-6);
			color: var(--c-text-light);
			h3 {
				background-color: var(--c-accent);
				color: var(--c-white);
				padding: var(--space-2);
				margin: var(--space-4);
				border-radius: var(--radius-soft);
				text-align: center;
			}
			ul li {
				margin-bottom: var(--space-4);
			}
		}

		@media (min-width: 1024px) {
			.lessons-grid {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				grid-column-gap: var(--space-6);
				align-items: start;
				.lessons-grid-1 {
					margin-top: var(--space-8);
				}
			}

			.lessons-grid > * {
				width: 100%;
				max-width: 560px;
				margin: 0 auto;
			}

			article ul {
				padding: 0 var(--space-10) 0 var(--space-12);
			}
		}
	}

	.process-steps,
	.instructors-container {
		background-color: var(--c-section);
	}
</style>
