const lightServer = require('./server/light-server');
const app = lightServer();
const requestParser = require('./server/request-parser');
const validators = require('./services/validators');
const UsersController = require('./controllers/Users');
const verifyToken = require('./services/auth-service').verifyToken;
const apiTest = require('./services/api-test');
// import { GoogleButton } from "  !  ./social-buttons/GoogleButton";

const publicDir = './public';

app.use(lightServer.static(publicDir))

app.use(requestParser);
app.post('/api/signup', validators.signupValidator, UsersController.CreateUser)
app.post('/api/login', validators.loginValidator, UsersController.Login)
// app.get('/api/users/:id/:login?', verifyToken) // localhost/api/users/23/test
app.patch('/api/users/:login', validators.updateValidator, verifyToken, UsersController.UpdateUser)

// app.post('/api/auth/google', xxx)


app.listen(4000);