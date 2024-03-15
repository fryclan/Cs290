var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var port = 8080;

console.log("Starting server on port " + port);

http.createServer(function (req, res) {
    // It's not normally recommended to have an exit command for our web server, but a student wanted to know how!
    // if(url.parse(req.url, true).pathname == '/exit') {
    //     process.exit();
    // } else 
    if (url.parse(req.url, true).pathname == '/') { // Detect if no specific page is requested.
        req.url = "../Project.html"; // Set the default page to load.
    }

    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    var content_type = 'text/plain'; // Should this instead be plain text? -- It's plain text now

    if (q.pathname.endsWith('.css')) {
        content_type = 'text/css';
    }
    else if (q.pathname.endsWith('.js')) {
        content_type = 'text/javascript';
    }
    else if (q.pathname.endsWith('.html')) {
        content_type = 'text/html';
    }
    else if (q.pathname.endsWith('.jpg')) {
        content_type = 'image/jepg';
    }
    else if (q.pathname.endsWith('.png')) {
        content_type = 'image/png';
    }
    else if (q.pathname.endsWith('.gif')) {
        content_type = 'image/gif';
    }
    else if (q.pathname.endsWith('.svg')) {
        content_type = 'image/svg+xml';
    }

    fs.readFile(filename, function (err, data) {

        let segments = q.path.replaceAll("=", "\n").replaceAll("&", "\n").replaceAll("?", "\n");
        let content = "The current date is: " + new Date() + "\n" + segments + "\n";
        console.log(`q.path: ${q.path}`)

        fs.writeFile("a_file.txt", content, { flag: 'a+' }, (err) => {
            if (err) {
                console.error("n'error something has gone terribly wrong...");
            } else {
                console.log("file write successful!");
            }

        });
        if (err) { // This default 404 error behavior may be misleading; this err error could be a number of different error possibilities, like a 403!
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("<h1>404 Resource Not Found</h1>");
            // return res.end(""); // What if we do not return page contents? The browser often has a default 404 page in it🙂!
        }

        res.writeHead(200, { 'Content-Type': content_type });
        res.write(data);
        return res.end();
    });
}).listen(port);