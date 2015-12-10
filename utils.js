// =============================================================================
//                           _______________________________ 
//                          |                               |
//                          | utils -- Javascript utilities |
//                          |_______________________________|


// Create global `utils' object
var utils = {

// =============================================================================

    tabNumber: function () { 
        return tabs.getTab().dactylOrdinal;
    },   
    
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

    closeTabsFromTo: function (firstSpec, endSpec, spec='') {
	var firstIx = tabs.indexFromSpec(firstSpec);
	var endIx = tabs.indexFromSpec(endSpec);
	var firstTab = tabs.getTab(firstIx);
	var N = endIx - firstIx;
	tabs.remove(firstTab, N);
    return N;
    },
    
    removeTab: function (ord) {
        var currT = gBrowser.selectedTab;
        var altT = tabs.alternate;
        tabs.remove(tabs.getTab(ord-1));
        gBrowser.selectedTab = altT;
        gBrowser.selectedTab = currT;
    },

    withOption: function (opt, val) {
        var origVal = options.get(opt);
    },

    simulateMouseover: function(elem) {
        "Simulate mouseover event (sometimes). Based on code by:";
        "http://stackoverflow.com/users/58659/stephan";
        "At http://stackoverflow.com/questions/911586";
        var evt = elem.ownerDocument.createEvent('MouseEvents');
        evt.initMouseEvent('mouseover',true,true,
                           elem.ownerDocument.defaultView,
                           0,0,0,0,0,false,false,false,false,0,null);
        if (!elem.dispatchEvent(evt))
            commandline.echo('Event Cancelled ('+elem+')',
                             commandline.HL_INFOMSG,
                             commandline.APPEND_TO_MESSAGES);
    },

    undisplay: function(elem) {
        elem.style = "display: none !important;";
    },

    removeFromView: function(elem) {
        elem.style = "left: -99999px !important";
    },

    getPlugin: function(s) {
        for (x in plugins.contexts) {
            if (x.contains(s))
                return plugins.contexts[x][s];
        }
    },

    sourceFromPath: function(s) {
        dactyl.execute("source " + options.runtimepath + "/" + s);
    },

    message: function (s) {
        commandline.echo(s,
                         commandline.HL_INFOMSG,
                         commandline.APPEND_TO_MESSAGES);
    },

    dateToYYMMDD: function (date, sep) {
        if (sep === undefined)
            sep = '-';
        var y = date.getFullYear().toString().slice(-2);
        var m = ('0' + (new Date().getMonth() + 1)).slice(-2)
        var d = ('0' + new Date().getDate()).slice(-2)
        return y + sep + m + sep + d;
    },
	
    loadJQuery: function () {
        var scripttag = content.document.createElement('script');
        scripttag.type = 'text/javascript';
        scripttag.async = true;
        scripttag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js';
        var parent = (    content.document.getElementsByTagName('head')
                       || content.document.getElementsByTagName('body') )[0]
        parent.appendChild(scripttag);
    },


// =============================================================================

};

dactyl.utils = utils;










