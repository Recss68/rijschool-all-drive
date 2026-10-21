// Options for the optional "How did you find us?" question in the sign-up and contact forms.
// The school's emails show the Dutch label; unknown values are ignored.
export const foundViaOptions = [
	{ id: 'google', nl: 'Google (zoeken)', en: 'Google search' },
	{ id: 'google-maps', nl: 'Google Maps', en: 'Google Maps' },
	{ id: 'ai-chat', nl: 'AI-chat (zoals ChatGPT)', en: 'AI chat (like ChatGPT)' },
	{ id: 'instagram', nl: 'Instagram', en: 'Instagram' },
	{ id: 'tiktok', nl: 'TikTok', en: 'TikTok' },
	{ id: 'facebook', nl: 'Facebook', en: 'Facebook' },
	{ id: 'aanbeveling', nl: 'Via vrienden of familie', en: 'Friends or family' },
	{ id: 'anders', nl: 'Anders', en: 'Other' },
];

/** Dutch label for a submitted value, or '' when empty or unknown. */
export const foundViaLabel = (id) => foundViaOptions.find((o) => o.id === id)?.nl ?? '';
