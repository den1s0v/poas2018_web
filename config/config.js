module.exports = {
  secret: "supersecretpassword",
  mongoURL: ((process.env.NODE_ENV === 'production') ?         
    'mongodb://test:test123456@ds249623.mlab.com:49623' :
    // 'mongodb://localhost'
    'mongodb://vds84.server-1.biz:21'
	),
  mongodbName: ((process.env.NODE_ENV === 'production') ? 
    'heroku_prt0vjhf' :
    'web_regexp'),
  port: process.env.PORT || 4000,
  production: ((process.env.NODE_ENV === 'production') ? true : false),
		
	google: {
		clientID:  '289814883390-vqr4kc66i7e4n5urmahi4orl79ppdrhs.apps.googleusercontent.com'
	},
	vk: {
		// https://vk.com/editapp?id=6789817&section=options
		vkUrl: "https://oauth.vk.com/authorize?client_id=6789817&display=popup&redirect_uri=http://localhost:3000/api/auth/vk&scope=friends,email&response_type=code&v=5.92",
		
	}
}