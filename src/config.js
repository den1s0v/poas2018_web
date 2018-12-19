const config = {
  google: {
    clientID: '360027286907-a1chj04esb60melg74tarqt00d0ejv8n.apps.googleusercontent.com'
  },
	vk: {
		// https://vk.com/editapp?id=6789817&section=options
		vkUrl: "https://oauth.vk.com/authorize?client_id=6789817&display=popup&redirect_uri=http://localhost:3000/api/auth/vk&scope=friends,email&response_type=code&v=5.92",
		
	}
}

export default config;