const testFunc() = async => {
	const message = await (new Promise(resolve,reject) => {
		setTimeout(() => {
			resolve('Finish')
		}, 2000);
	})
	return message;
}

testFunc().then(console.log);