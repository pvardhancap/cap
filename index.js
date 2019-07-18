const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;
const FAVICON = path.join(__dirname, 'public', 'favicon.ico');
function setcontent(html_header, html_content) {
    return "<!DOCTYPE html><html><head>" + html_header + "<head><body>" + html_content + "</body></html>";
};
const server = http.createServer((req, res) => {
    var pathname = url.parse(req.url).pathname;
    console.log("url : ", pathname);
    console.log("----------------------");
    if (req.method === 'GET' && pathname === '/favicon.ico') {
        res.setHeader('Content-Type', 'image/x-icon');
        fs.createReadStream(FAVICON).pipe(res);
        return;
    }
    if (pathname === "/") {
        res.setHeader("Content-Type", "application/html");
        let html_header = "<title>Basic Server</title>";
        let html_content = "<h1>Basic Server</h1>";
        res.setHeader("Content-Type", "text/html");
        res.write(setcontent(html_header, html_content));
    }
    if (pathname === "/index.html") {
        res.setHeader("Content-Type", "application/html");
        let html_header = "<title>Basic Server</title>";
        let html_content = "<h1>Basic Server</h1>";
        res.setHeader("Content-Type", "text/html");
        res.write(fs.readFileSync(__dirname + '/public' + pathname));
    }
    if (pathname.indexOf("/css/") == 0 && pathname.lastIndexOf(".css") > 0) {
        let cssFile = pathname.split("/css/")[1];
        console.log(cssFile);
        res.setHeader("Content-Type", "text/css");
        res.write(fs.readFileSync(__dirname + '/css/' + cssFile));
    }
    if (pathname.indexOf("/js/") == 0 && pathname.lastIndexOf(".js") > 0) {
        let cssFile = pathname.split("/js/")[1];
        console.log(cssFile);
        res.setHeader("Content-Type", "text/javascript");
        res.write(fs.readFileSync(__dirname + '/js/' + cssFile));
    }
    res.end();
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});