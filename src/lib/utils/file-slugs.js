/**
 * The slugs of the data modules in a lazy `import.meta.glob`: their file names, without index.js.
 * Only the paths are read, so none of the modules is loaded or bundled with the caller.
 * @param {Record<string, unknown>} glob
 */
export function fileSlugs(glob) {
	return new Set(
		Object.keys(glob)
			.map((path) => path.split('/').pop().replace(/\.js$/, ''))
			.filter((slug) => slug !== 'index')
	);
}
