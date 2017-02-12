/*
* I used the following setup to direct everything on /rest to my backend server (on port 8080),
* and all other requests to the frontend server (a webpack server on port 3001).
* It supports all HTTP-methods, doesn't lose any request meta-info and supports websockets
* (which I need for hot reloading)
* */

//http://stackoverflow.com/questions/10435407/proxy-with-express-js

var express  = require('express');
var app      = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var backend = 'http://localhost:8080',
	frontend = 'http://localhost:3001';

app.all("/rest/*", function(req, res) {
	apiProxy.web(req, res, {target: backend});
});

app.all("/*", function(req, res) {
	apiProxy.web(req, res, {target: frontend});
});

var server = require('http').createServer(app);
server.on('upgrade', function (req, socket, head) {
	apiProxy.ws(req, socket, head, {target: frontend});
});
server.listen(3000);