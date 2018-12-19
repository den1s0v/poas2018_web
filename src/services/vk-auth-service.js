const url = require('url');

function vkAuth(request, response, next) {
	const query = url.parse(request.url, true).querys;
	if (query.code) {
		requestClient.get(`https://oauth.vk/com/access_token?...${query_code}` , (error, response, body) => {
			if (error) {
				console.error(error);
				return;
			}
			request.userOAuthInfo = body;
		})
	}
}

function sendFakeVkPage(request, response, next) {
	const fakePage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Regexp tester</title> 
	<script>
		if (window.opener) {
			window.opener.postMessage('${request.userOAuthInfo}', window.location.origin);
			window.close();
		}
	</script>
</head>
<body>
</body>
</html>`;

response.setHeader('Content-Type' ,'text/html');
response.end(fakePage);
next();
}

module.exports = {
	
}

