import { m } from '$lib/paraglide/messages.js';

/**
 * Builds the sourced pass-rate sentence, e.g. "85% geslaagd (bij eerste examen), periode 2025. Bron: CBR".
 * @param {{ value: number, period: string, firstAttempt: boolean }} passRate
 * @returns {string}
 */
export function passRateNote(passRate) {
	return m.pass_rate_note({
		value: passRate.value,
		attempt: passRate.firstAttempt ? m.pass_rate_first() : m.pass_rate_all(),
		period: passRate.period,
	});
}
