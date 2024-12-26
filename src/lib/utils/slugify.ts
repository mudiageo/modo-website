/**
 * Converts a string to a URL-friendly slug.
 * - Converts to lowercase
 * - Replaces spaces with hyphens
 * - Removes special characters
 * - Handles multiple spaces/hyphens
 * - Trims hyphens from start/end
 *
 * @param str - The string to convert to a slug
 * @returns The slugified string
 * @throws {Error} If input is not a string
 *
 * @example
 * slugify('Hello World!') // 'hello-world'
 * slugify('This is a TEST') // 'this-is-a-test'
 * slugify('Special @#$% Characters') // 'special-characters'
 */
export function slugify(str: string): string {
	if (typeof str !== 'string') {
		throw new Error('Input must be a string');
	}

	return str
		.toLowerCase() // Convert to lowercase
		.trim() // Remove leading/trailing spaces
		.normalize('NFD') // Normalize unicode characters
		.replace(/[\u0300-\u036f]/g, '') // Remove diacritics
		.replace(/[^a-z0-9\s-]/g, '') // Remove special chars
		.replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
		.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
		.replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}
