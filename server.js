const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Check the environment
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Start the server
app.prepare().then(() => {
  const server = createServer((req, res) => {
    // Parse the incoming request URL
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/custom-route') {
      // Example of a custom route
      app.render(req, res, '/custom-page', query);
    } else {
      // Handle all other routes
      handle(req, res, parsedUrl);
    }
  });

  // Listen on port 3000 or the environment's specified port
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
