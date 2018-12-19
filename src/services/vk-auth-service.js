const url = require('url');

function vkAuth(request, response, next) {
	const query = url.parse(request.url, true);
	if (query.code) {
		
	}
}

function sendFakeVkPage(request, response, next) {

}

module.exports = {
	
}


/* 
const {OAuth2Client} = require('google-auth-library');
import config from "../../config/config";


const client = new OAuth2Client(CLIENT_ID);


module.exports = async function verify(req, res, next) {
	// let token = ...
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
}
// verify().catch(console.error); */