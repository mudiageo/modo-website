import { goto } from '$app/navigation';

export function navigateWithParams(path, params = {}) {
	const url = new URL(path, window.location.origin);
	Object.entries(params).forEach(([key, value]) => {
		url.searchParams.set(key, value);
	});
	return goto(url.pathname + url.search);
}
