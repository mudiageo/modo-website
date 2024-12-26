// lib/actions/clickOutside.ts
export function clickOutside(node: HTMLElement, callback: () => void) {
	function onClick(event: MouseEvent) {
		const target = event.target as Node;
		const dropdownButton = node.previousElementSibling;
		if (dropdownButton && dropdownButton.contains(target)) return;

		if (node && !node.contains(target) && target !== node) {
			callback();
		}
	}

	document.addEventListener('click', onClick, true);

	return {
		destroy() {
			document.removeEventListener('click', onClick, true);
		}
	};
}
