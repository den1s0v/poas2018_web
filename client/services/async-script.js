export function asyncScript(src) {
    return new Promise( (resolve, reject) => {
        const script = document.createElement('script');
        script.acync = true;
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    } );
}