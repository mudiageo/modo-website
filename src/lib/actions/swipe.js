export function swipe(node, { onSwipeLeft, onSwipeRight, threshold = 50 }) {
	let startX;
	let startY;
	let distX;
	let distY;

	function handleTouchStart(e) {
		startX = e.touches[0].clientX;
		startY = e.touches[0].clientY;
	}

	function handleTouchMove(e) {
		if (!startX || !startY) return;

		distX = e.touches[0].clientX - startX;
		distY = e.touches[0].clientY - startY;
	}

	function handleTouchEnd() {
		if (Math.abs(distX) > threshold && Math.abs(distY) < threshold * 0.5) {
			if (distX > 0) {
				onSwipeRight?.();
			} else {
				onSwipeLeft?.();
			}
		}

		startX = null;
		startY = null;
		distX = null;
		distY = null;
	}

	node.addEventListener('touchstart', handleTouchStart);
	node.addEventListener('touchmove', handleTouchMove);
	node.addEventListener('touchend', handleTouchEnd);

	return {
		destroy() {
			node.removeEventListener('touchstart', handleTouchStart);
			node.removeEventListener('touchmove', handleTouchMove);
			node.removeEventListener('touchend', handleTouchEnd);
		}
	};
}
