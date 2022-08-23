const net = require("net");

let sever = net.createServer();
sever.on('connection',handleConnection);

let messsage = "<h1>Hello From Node.js Sever</h1>"

 let httpResponse = `HTTP\\1.1 200 OK
 Connection :close
 Content-Type: text/html
 Content-Length:${messsage.length}

 ${messsage}
 `

function handleConnection(conn)
{
    var remoteAddress = conn.remoteAddress + ':' +conn.remotePort;
    console.log("new client connection from %s",remoteAddress);

    conn.on('data',onConnData);
    conn.once('close',onConnClose);
    conn.on('error',onConnError);

    function onConnData(d){
        console.log("connection data from %s:",remoteAddress);
        //console.log(d.toString().toUpperCase());
        conn.write(httpResponse)//user output

    }

    function onConnClose(){
        console.log('connection from %s closed',remoteAddress)
    }

    function onConnError(err){
        console.log('connection %s error: %s',remoteAddress,err.messsage);
    }
}

sever.listen(8080,function(){
    console.log('sever listening to %j',sever.address())
});