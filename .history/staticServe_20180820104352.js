var PORT = 3000;//端口号

var http = require('http');//协议
var url=require('url');//读取路径模块
var fs=require('fs');//引入文件读取模块
var mine={
  "css": "text/css",
  "gif": "image/gif",
  "html": "text/html",
  "ico": "image/x-icon",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "pdf": "application/pdf",
  "png": "image/png",
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "tiff": "image/tiff",
  "txt": "text/plain",
  "wav": "audio/x-wav",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "xml": "text/xml"
};//引入的上面头部文件模块并取到types对象
var path=require('path');//资源路径，符合web服务器路由约定即可

var server = http.createServer(function (request, response) {
    //request用来接收客服端数据，response用来向客服端发送服务器数据
    var pathname = url.parse(request.url).pathname;//解析路径名
    pathname=decodeURI(pathname);//路径解码--可能隐式编码
    var realPath = path.join(__dirname, pathname);//实际路径--绝对路径
    var ext = path.extname(realPath);//.htmlJ
    ext = ext ? ext.slice(1) : 'unknown';

    console.log(realPath);
    //exists目标是否存在--true，false
    fs.exists(realPath, function (exists) {
        console.log(exists);//false;
        if (!exists) {
            response.writeHead(404, {//响应写入头部，状态码404--无法找到指定位置的资源
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin':'*',
            });;

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {//状态码500--服务器遇到了意料不到的情况，不能完成客户的请求
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {//状态码200--OK  一切正常，对GET和POST请求的应答文档跟在后面
                        'Content-Type': contentType,
                        'Access-Control-Allow-Origin':'*',
                    });
                    response.write(file, "binary");//服务器返回给我们的，并写入文件
                    response.end();
                }
            });
        }
    });
});
server.listen(8000);
console.log("Server runing at port: " + 8000 + ".");
