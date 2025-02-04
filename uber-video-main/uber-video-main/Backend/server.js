const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket");
const port = process.env.PORT || 3000;

const server = http.createServer(app);
//http.createServer(app); is used in Node.js to create an HTTP server. 
//However, its usage depends on whether you're using Express.js or just the built-in http module.

initializeSocket(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
