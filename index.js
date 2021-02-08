const server = require('./api/server');
const port = 5000;

// START YOUR SERVER HERE

server.listen(port, () => {
  console.log(`Servier is exist? Yes, port: ${port}`);
});
