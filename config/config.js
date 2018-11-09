module.exports = {
  secret: "supersecretpassword",
  mongoURL: ((process.env.NODE_ENV === 'production') ?         
    'mongodb://test:test123456@ds249623.mlab.com:49623' :
    'mongodb://localhost'),
  mongodbName: ((process.env.NODE_ENV === 'production') ? 
    'heroku_prt0vjhf' :
    'web_regexp'),
  port: process.env.PORT || 4000,
  production: ((process.env.NODE_ENV === 'production') ? true : false)
}