/*
 * Private web app server
 *  
 *  Author: Mofi Sylar
 *  Date: 2014-11-20 
 *  version: 1.0 Build
 *
 */
var http = require("http"),
	url = require("url"),
	fs = require("fs"),
	path = require('path'),
	reqtype = require('./reqtype').reqtypes;

var _staticPath='';

http.createServer(function (req,res){  
	
	var urlpath = url.parse(req.url).pathname;

	//set web application deployment path: ./apps/your_app_content/...
	var apppath = './apps';

	

	
	
	

	

	var ftype=path.extname(urlpath);
	

	if(ftype==''){
		ftype='html';
		_staticPath+=urlpath;
		(urlpath.charAt(urlpath.length-1)!='/')&&(urlpath+='/');
		apppath+=urlpath+'index.html';
	}
	else{
		ftype=ftype.split('.')[1];
		apppath+=urlpath;
	}

	console.log("apppath:"+apppath+',type:'+ftype); 

	fs.exists(apppath,function (e){
        if(!e){
            res.writeHead(404,{
                'Content-Type':'text/plain'
            });
            res.write("This request URL " + urlpath + " was not found on this server.");
            res.end();
        } 
        else{
            fs.readFile(apppath,"binary",function (e, f){
            	if(e){
                    res.writeHead(500,{
                        'Content-Type':'text/plain'
                    });
                    res.end(e);
                }
                else{
                    var contentType = reqtype[ftype]||"text/plain";
                    res.writeHead(200,{
                        'Content-Type': contentType
                    });
                    res.write(f,"binary");
                    res.end();
                }
            });
        }
    });

	console.log('\n'); 

}).listen(8888);

var mydate=new Date();
console.log("Server has started at "+mydate.toString()+" ...");  


