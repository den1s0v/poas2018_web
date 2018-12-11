// <script src="" async defer></script>
export function asyncScript(src) {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.async = true;
		script.src = src;
		script.onload = resolve;
		script.onerror = reject;
	})
}
