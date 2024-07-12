const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

function createRoutes(dir, routePrefix = '') {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      createRoutes(fullPath, `${routePrefix}/${file}`);
    } else {
      const route = `${routePrefix}/${file.replace('.js', '')}`;
      const cleanRoute = route === '/index' ? '/' : route;

      const dynamicRoute = cleanRoute.replace(/\[(.+?)\]/g, ':$1');

      const routeHandler = require(fullPath);

      app.get(dynamicRoute, routeHandler);
    }
  });
}

createRoutes(path.join(__dirname, 'pages'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
