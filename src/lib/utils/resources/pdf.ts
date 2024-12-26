export async function loadPDF(url: string) {
	const pdfjsLib = await import('pdfjs-dist');
	pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
	return pdfjsLib.getDocument(url).promise;
}

export function renderPage(page: any, canvas: HTMLCanvasElement, scale = 1.0) {
	const viewport = page.getViewport({ scale });
	canvas.width = viewport.width;
	canvas.height = viewport.height;

	return page.render({
		canvasContext: canvas.getContext('2d'),
		viewport
	}).promise;
}
