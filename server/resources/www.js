// This will be the application's entry. I'll setup my server here.
import http from 'http';
import app from './app';

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
