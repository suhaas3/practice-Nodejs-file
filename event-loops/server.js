const http = require("node:http");

const server = http.createServer((req,res) => {

  if (req.url === "/secretData") {
    res.end("there is no secret Data");
  }

  res.end("hello node.js welcome");
});

server.listen(3030)