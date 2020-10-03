// apiServiceBaseUri: "http://consola.activiaweb.com.ar/ecWebApi/",
// apiAuthServiceBaseUri: "http://consola.activiaweb.com.ar/ecAuth/",

var getHostname = function () {
    var l = document.createElement("a");
    l.href = window.location.href;
    var hostNameAndPort = l.protocol + "//" + l.hostname;
    if (l.port) {
        if (l.port != "80") {
            hostNameAndPort = hostNameAndPort + ":" + l.port;
        }
    }    
    return hostNameAndPort;
};
var hostname = getHostname();

// ---------------------------------------
// ---- produccion -----------------------
// ---------------------------------------
//var globalConfig =
//    {
//        apiServiceBaseUri: hostname + "/ecWebApi/",
//        apiAuthServiceBaseUri: hostname + "/ecAuth/"
//    };
// ---------------------------------------


// ---------------------------------------
// desarrollo
// ---------------------------------------
var globalConfig =
    {
        apiServiceBaseUri: "http://localhost:56573/",
        apiAuthServiceBaseUri: "http://localhost:57425/",
        //apligemUrl: "http://apligem.activiaweb.com.ar/"
        apligemUrl: "http://localhost:60194/"
    };
// ---------------------------------------
