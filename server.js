var path = require('path');
var open = require('open');
var express = require('express');

var port = 6001;
var distPath = path.join(__dirname, 'dist');
var app = express();

// Serve dist with no-cache headers so dev always gets fresh CSS/JS
app.use(express.static(distPath, {
  setHeaders: function (res) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

// 404 → serve 404.html
app.get('*', function (req, res) {
  res.status(404).sendFile(path.join(distPath, '404.html'));
});

app.listen(port, function () {
  var url = 'http://localhost:' + port;
  console.log('Server started at', url);
  console.log('Cache disabled for dev — CSS/JS will not be cached.');
  open(url).catch(function () {
    console.log('(Could not open browser — open the URL above.)');
  });
});
