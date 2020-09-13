// =============================================================================
//                           _______________________________
//                          |                               |
//                          | utils -- Javascript utilities |
//                          |_______________________________|
// jshint esversion: 6


// Create global `utils' object
var utils = {

// =============================================================================

    tabNumber: function () { return tabs.getTab().dactylOrdinal; },

    // closes tab spec and all to left
    closeTabsTo: function (spec='') {
        //spec = (typeof(spec)==="undefined") ? '' : tabs.getTab(spec);
        var targetIx = tabs.indexFromSpec(spec);
        var firstTab = tabs.getTab(0);
        var numToClose = targetIx + 1;
        tabs.remove(firstTab, numToClose);
    },

    // closes tab spec and all to right
    closeTabsFrom: function (spec='') {
        //spec = (typeof(spec)==="undefined") ? '' : tabs.getTab(spec);
        var targetIx = tabs.indexFromSpec(spec);
        var target = tabs.getTab(targetIx);
        var N = tabs.allTabs.length;
        var numToClose = N - targetIx;
        tabs.remove(target, numToClose);
    },

    closeTabsFromTo: function (firstSpec, endSpecExc, spec='') {
	      var firstIx = tabs.indexFromSpec(firstSpec);
	      var endIx = tabs.indexFromSpec(endSpecExc);
	      var firstTab = tabs.getTab(firstIx);
	      var N = endIx - firstIx;
	      tabs.remove(firstTab, N);
        return N;
    },

    numberOfTabs: function () { return tabs.allTabs.length; },

    removeTab: function (ord) {
        var currT = gBrowser.selectedTab;
        var altT = tabs.alternate;
        tabs.remove(tabs.getTab(ord-1));
        gBrowser.selectedTab = altT;
        gBrowser.selectedTab = currT;
    },

    removeNTabsByOrd: function (ord, n) { tabs.remove(tabs.getTab(ord-1), n); return n; },

    moveTab: function (fromOrd, toOrd) { tabs.move(tabs.getTab(fromOrd-1), toOrd); },

    withOption: function (opt, val) { var origVal = options.get(opt); },

    simulateMouseover: function(elem) {
        // Simulate mouseover event (sometimes). Based on code by:;
        // http://stackoverflow.com/users/58659/stephan;
        // At http://stackoverflow.com/questions/911586;
        var evt = elem.ownerDocument.createEvent('MouseEvents');
        evt.initMouseEvent('mouseover',true,true,
                           elem.ownerDocument.defaultView,
                           0,0,0,0,0,false,false,false,false,0,null);
        if (!elem.dispatchEvent(evt))
            commandline.echo('Event Cancelled ('+elem+')',
                             commandline.HL_INFOMSG,
                             commandline.APPEND_TO_MESSAGES);
    },

    undisplay: function(elem) { elem.style = "display: none !important;"; },

    removeFromView: function(elem) { elem.style = "left: -99999px !important"; },

    getPlugin: function(fname, objname=fname) {
        for (var x in plugins.contexts) {
            if (x.indexOf(fname) !== -1)    // if x contains s
                return plugins.contexts[x][objname];
        }
        return null;
    },

    sourceFromPath: function(s) { dactyl.execute("source " + options.runtimepath + "/" + s); },

    message: function (s, hlType=commandline.HL_INFOMSG) {
        s = String(s);
        commandline.echo(s,
                         hlType,
                         commandline.APPEND_TO_MESSAGES);
        return s;
    },

    messageWithLineLimit: function(s, maxL=30) {
        s = String(s);
        var lines = s.split('\n');
        if (lines.length < maxL) {
            utils.message(s);
        }
        else {
            var msg = lines.slice(0, maxL).join('\n') + "\n....<clip>";
            utils.message(msg);
        }
        return s;
    },

    tempmessage: function (s) {
        commandline.echo(s,
                         commandline.HL_INFOMSG,
                         commandline.APPEND_TO_MESSAGES);
        setTimeout(function(){
            commandline.echo('', commandline.HL_INFOMSG);
        }, 500);
        return s;
    },

    dateToYYMMDD: function (date, sep) {
        if (sep === undefined)
            sep = '-';
        var y = date.getFullYear().toString().slice(-2);
        var m = ('0' + (new Date().getMonth() + 1)).slice(-2);
        var d = ('0' + new Date().getDate()).slice(-2);
        return y + sep + m + sep + d;
    },

    loadJQuery: function () {
        var scripttag = content.document.createElement('script');
        scripttag.type = 'text/javascript';
        scripttag.async = true;
        scripttag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js';
        var parent = ( content.document.getElementsByTagName('head') ||
                       content.document.getElementsByTagName('body') )[0];
        parent.appendChild(scripttag);
    },

    togglePref: function (pref) {
        var prefManager =
            Components.classes["@mozilla.org/preferences-service;1"].getService(
                Components.interfaces.nsIPrefBranch);
        var currentval = prefManager.getBoolPref(pref);
        prefManager.setBoolPref(pref, !currentval);
        this.message(`${pref}=${!currentval}`);
    },

    toggleCharPref: function (pref, s) {
        var prefManager =
            Components.classes["@mozilla.org/preferences-service;1"].getService(
                Components.interfaces.nsIPrefBranch);
        var currentVal = prefManager.getCharPref(pref);
        var newVal = currentVal==='' ? s : '';
        prefManager.setCharPref(pref, newVal);
        this.message(`${pref}=${newVal}`);
    },

    getCharPref: function (pref) {
        var prefManager =
            Components.classes["@mozilla.org/preferences-service;1"].getService(
                Components.interfaces.nsIPrefBranch);
        return prefManager.getCharPref(pref);
    },

    getBoolPref: function (pref) {
        var prefManager =
            Components.classes["@mozilla.org/preferences-service;1"].getService(
                Components.interfaces.nsIPrefBranch);
        return prefManager.getBoolPref(pref);
    },

    getIntPref: function (pref) {
        var prefManager =
            Components.classes["@mozilla.org/preferences-service;1"].getService(
                Components.interfaces.nsIPrefBranch);
        return prefManager.getIntPref(pref);
    },

    toggleIntPrefBetween: function (pref, val1, val2) {
        // if preference is val1, set to val2, else set to val1
        var prefManager =
            Components.classes["@mozilla.org/preferences-service;1"].getService(
                Components.interfaces.nsIPrefBranch);
        var currentval = prefManager.getIntPref(pref);
        var newval;
        if (prefManager.getIntPref(pref) == val1)
            newval = val2;
        else
            newval = val1;
        prefManager.setIntPref(pref, newval);
        this.message(`${pref}=${newval}`);
    },

    toggleNsISupportStrPref: function (pref, s, s2="") {
        var prefManager =
            Components.classes["@mozilla.org/preferences-service;1"].getService(
                Components.interfaces.nsIPrefBranch);
        var currentVal = prefManager.getComplexValue(pref, Components.interfaces.nsISupportsString).data;
        var nsiStrCls = Components.classes["@mozilla.org/supports-string;1"];
        var nsiStr = nsiStrCls.createInstance(Components.interfaces.nsISupportsString);
        nsiStr.data = s;
        var nsiAltStr = nsiStrCls.createInstance(Components.interfaces.nsISupportsString);
        nsiAltStr.data = s2;
        var newVal = currentVal==nsiAltStr ? nsiStr : nsiAltStr;
        prefManager.setComplexValue(pref, Components.interfaces.nsISupportsString, newVal);
        this.message(`${pref}=${newVal}`);
    },

    toggleOption: function (optname) {
        var opt = options.get(optname);
        opt.value = !opt.value;
        this.message(`${opt.name}=${opt.value}`);
    },

    cbRead: function (options={}) {
        if (options.index)
            var s = io.system(`copyq read ${options.index}`);
        else
            var s = readFromClipboard();
        if (!options.notrim) s = s.trim();
        if (options.tolowercase) s = s.toLowerCase();
        return s;
    },

    cbWrite: function (s, messagePrefix="Copied: ") {
        if (!messagePrefix) messagePrefix = "";
        dactyl.clipboardWrite(s);
        return utils.message(messagePrefix+s);
    },

    cbWriteWithMessageLimit: function (s) {
        dactyl.clipboardWrite(s);
        return utils.messageWithLineLimit(s);
    },

    cbWriteCollection: function (coll) {
        s = Array.from(coll).reduce((s,i)=>`${s}\n${i}`);
        dactyl.clipboardWrite(s);
        utils.messageWithLineLimit(s);
        return s;
    },

    yankWithMsg: function (s, messagePrefix="Copied: ") {
        if (!messagePrefix) messagePrefix = "";
        editor.setRegister("*+", s, false);
        utils.message(messagePrefix+s);
        return s;
    },

    cbAppend: function (s) {
        io.system(`echo "\n"; | xsel -aif`);
        io.system(`echo "\n"; echo -n '${s}' | xsel -aif`);
        var cbContents = io.system(`xsel -o`);
        return utils.message(cbContents);
    }

// =============================================================================

};

dactyl.utils = utils;
