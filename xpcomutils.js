function err(s) {
    commandline.echo(s,
                     commandline.HL_ERRORMSG,
                     commandline.APPEND_TO_MESSAGES);
}

var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;

function XpcService(url, ifc) {
    try {
        var interface = Ci[ifc];
        return Cc[url].getService(interface);
    } catch(e) {
        err("XpcService: Cannot get service " + url + ", " + ifc + "\n" + e);
        return null;
    }
}

function XpcInstance(url, ifc) {
    try {
        var interface = Ci[ifc];
        return Cc[url].createInstance(interface);
    } catch(e) {
        err("XpcInstance: Cannot create instance " + url + ", " + ifc + "\n" + e);
        return null;
    }
}

function XpcQueryInterface(elt, ifc) {
    try {
        var interface = Ci[ifc];
        return elt.QueryInterface(interface);
    } catch(e) {
        err("XpcQueryInterface: Cannot query interface " + ifc + " of " + elt + "\n" + e);
	      return null;
    }
}
