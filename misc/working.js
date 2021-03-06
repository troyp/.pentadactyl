// jshint esversion: 6

// --------------
// swap ;f and ;F
// --------------

Ci = Components.interfaces;
isScrollable =
    (elem) =>
    isinstance(elem, [Ci.nsIDOMHTMLFrameElement, Ci.nsIDOMHTMLIFrameElement]) ||
    Buffer.isScrollable(elem, 0, true) ||
    Buffer.isScrollable(elem, 0, false);

hints.addMode("F", "Focus frame", elem => dactyl.focus(elem.ownerDocument.defaultView));
hints.addMode("f", "Focus frame or pseudo-frame", buffer.bound.focusElement, isScrollable);

// -------------------------------------------------------------------------------
// ,----------,
// | File I/O |
// '----------'

// FILEPICKER

var nsIFilePicker = Ci.nsIFilePicker;
var fp = XpcInstance("@mozilla.org/filepicker;1", nsIFilePicker);

fp.init(window, title, nsIFilePicker.modeOpen);
// modes: modeGetFolder modeOpen modeOpenMultiple modeSave
fp.defaultExtension=".txt";
var file_chosen = fp.show();

// for nsIFilePicker.modeOpenMultiple:
var files = fp.files;
var results = [];
while (files.hasMoreElements())
    results.push(files.getNext().QueryInterface(Components.interfaces.nsILocalFile));

// -------------------------------------------------------------------------------
// ,-----------------,
// | Insert at Caret |
// '-----------------'

// TODO: try to get insertion into text fields at cursor working
// uses answers from...
// http://stackoverflow.com/questions/1064089

function insertAtCaret(element, text) {
    if (document.selection) {
        element.focus();
        var sel = document.selection.createRange();
        sel.text = text;
        element.focus();
    } else if (element.selectionStart || element.selectionStart === 0) {
        var startPos = element.selectionStart;
        var endPos = element.selectionEnd;
        var scrollTop = element.scrollTop;
        element.value = element.value.substring(0, startPos) + text + element.value.substring(endPos, element.value.length);
        element.focus();
        element.selectionStart = startPos + text.length;
        element.selectionEnd = startPos + text.length;
        element.scrollTop = scrollTop;
    } else {
        element.value += text;
        element.focus();
    }
}
dactyl.insertAtCaret = insertAtCaret;

function insertAtCaret2(areaId, text) {
    var txtarea = content.document.getElementById(areaId);
    var scrollPos = txtarea.scrollTop;
    var caretPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0, caretPos);
    var back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length);
    txtarea.value = front + text + back;
    caretPos = caretPos + text.length;
    txtarea.selectionStart = caretPos;
    txtarea.selectionEnd = caretPos;
    txtarea.focus();
    txtarea.scrollTop = scrollPos;
}

// map -modes insert <C-q> -js insertAtCaret("search", "foo");


// -------------------------------------------------------------------------------
// ,-----------------------,
// | Scrolling to Elements |
// '-----------------------'

function scrollToElement(elt) { content.window.scrollTo(0, elt.offsetTop); }
window.scrollToElement = scrollToElement;

// Comparing document position of nodes
DOCUMENT_POSITION_IS_EARLIER = 0b1010;  // bitmask: PRECEDING|CONTAINS
DOCUMENT_POSITION_IS_LATER =  0b10100;  // bitmask: FOLLOWING|CONTAINED_BY
function documentPositionIsEarlier(a, b) {
    return DOCUMENT_POSITION_IS_EARLIER & b.compareDocumentPosition(a);
}
function documentPositionIsLater(a, b) {
    return DOCUMENT_POSITION_IS_LATER & b.compareDocumentPosition(a);
}
window.DOCUMENT_POSITION_IS_EARLIER = DOCUMENT_POSITION_IS_EARLIER;
window.DOCUMENT_POSITION_IS_LATER = DOCUMENT_POSITION_IS_LATER;
window.documentPositionIsEarlier = documentPositionIsEarlier;
window.documentPositionIsLater = documentPositionIsLater;


// -------------------------------------------------------------------------------
// ,------,
// | Tabs |
// '------'

// Tried to write a backt that's faster in Pale Moon, but about the same
function backt2() {
    var tabstate = JSON.parse(nsISessionStore.getTabState(tabs.getTab()));
    tabstate.index = Math.max(tabstate.index-1, 0);
    var newtabstate = JSON.stringify(tabstate);
    var newtab = gBrowser.addTab('');
    var newtab_pos = newtab._tPos;
    nsISessionStore.setTabState(tabs.getTab(newtab_pos), newtabstate);
    gBrowser.selectedTab = newtab;
}

// -------------------------------------------------------------------------------
// ,------------,
// | PageZipper |
// '------------'

// TODO: finish
(function() {
    if (window.pgzp) {
        _pgzpToggleBookmarklet();
    } else {
        window._page_zipper_is_bookmarklet = true;

        window._page_zipper = document.createElement('script');
        window._page_zipper.type='text/javascript';window._page_zipper.src='//www.printwhatyoulike.com/static/pagezipper/pagezipper_10.js';document.getElementsByTagName('head')[0].appendChild(window._page_zipper);}})();


// -------------------------------------------------------------------------------
// ,-----------,
// | Jisho.org |
// '-----------'

// jisho.org: add search links to other sites
// TODO: finish
function processEntries () {
    document.extraSearchEngines = {
        "tangorin search": "http://tangorin.com/dict.php?dict=general&s=%s",
        "Forvo pronunciation": "http://www.forvo.com/search/%s",
        "Tatoeba example sentences": "http://tatoeba.org/eng/sentences/search?query=%s"
    };
    document.verbSearchEngines = {
        "Verbix verb conjugation": "http://www.verbix.com/webverbix/go.php?T1=%s&D1=51&H1=151",
        "Japanese Verb Conjugator": "http://www.japaneseverbconjugator.com/VerbDetails.asp?txtVerb=%s"
    };
    document.kanjiSearchEngines = {
        "SLJFAQ kanji search": "http://kanji.sljfaq.org/soft-keyboard.html#?=%s",
        "Red Finch kanji search": "http://redfinchjapanese.com/?action=kanji_dictionary?=%s"
    };
    document.entryNodes = content.document.getElementsByClassName("concept_light");
    function getEntryName(x) {
        return String.trim(x.getElementsByClassName("text")[0].textContent);
    }
    document.results = map(document.entryNodes, getEntry);
    function getEntryStatusLinks(x) {
        return x.getElementsByClassName("concept_light-status_link");
    }
    function getEntryLinksDropdown(x) {
        var links = getEntryStatusLinks(x);
        var dropdownId;
        for (i=0; i<links.length; ++i) {
            if (links[i].textContent == "Links")
                dropdownId = links[i].getAttribute("data-dropdown");
        return document.getElementById(dropdownId);
        }
    }
}


// -------------------------------------------------------------------------------
// ,----------,
// | PacktPub |
// '----------'

// attempt at no dialogs version
function packtDownloadBooksByName(pattern, format, dir='~/ebook_downloads') {
    formatre = RegExp(format, 'i');
    matching = packtGetBooksByName(pattern);
    matching.forEach(function(e) {
        var div = Array.from(e.getElementsByClassName('download-container'))[1];
        var links = Array.from(div.getElementsByTagName('a'));
        var link = links.find(function(l) {
            var linkformat = l.children[0].getAttribute('format') || "";
            return linkformat.match(formatre);
        });
        if (typeof link == 'undefined') { alert(div); return links; }
        // alert(link.href);
        xhr(link.href, data => {
            Services.prompt.alert(null, 'XHR Success', data);
            var file = OS.Path.join(OS.Constants.Path.homeDir, "ebook_downloads", `{e.title}.{format}`);
            var promised = OS.File.writeAtomic(file, data);
            promised.then(()=>true, ()=>alert('save failed'));
        });
        return null;
    });
}

function xhr(url, cb) {
    // http://stackoverflow.com/a/25112976/1261964
    let xhr = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
    let handler = ev => {
        evf(m => xhr.removeEventListener(m, handler, !1));
        switch (ev.type) {
            case 'load':
                if (xhr.status == 200) {
                    cb(xhr.response);
                }
            break;
            default:
                Services.prompt.alert(null, 'XHR Error', 'Error Fetching Package: ' + xhr.statusText + ' [' + ev.type + ':' + xhr.status + ']');
                break;
        }
    };
    let evf = f => ['load', 'error', 'abort'].forEach(f);
    evf(m => xhr.addEventListener(m, handler, false));
    xhr.mozBackgroundRequest = true;
    xhr.open('GET', url, true);
    xhr.channel.loadFlags |= Ci.nsIRequest.LOAD_ANONYMOUS |
                             Ci.nsIRequest.LOAD_BYPASS_CACHE |
                             Ci.nsIRequest.INHIBIT_PERSISTENT_CACHING;
    /* dont set it, so it returns string, you dont want arraybuffer. you only
       want this if your url is to a zip file or some file you want to download
       and make a nsIArrayBufferInputStream out of it or something */
    xhr.responseType = "arraybuffer";
    xhr.send(null);
}

// -------------------------------------------------------------------------------
// ,---------------,
// | Exchange Rate |
// '---------------'

function updateUSDAUDexchange() {
    var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20%28%22USDAUD%22%29&env=store://datatables.org/alltableswithkeys&format=json";
    fetch(url)
        .then(response=>response.json())
        .then(obj => {
            alert((parseFloat(x.query.results.rate.Ask)+parseFloat(x.query.results.rate.Bid))/2);
            var rate = x.query.result.rate;
            var ask = parseFloat(x.query.results.rate.Ask);
            var bid = parseFloat(x.query.results.rate.Bid);
            var avg = (ask+bid)/2;
            window.AUDperUSD = avg;
            alert(avg);
        });
}

// -------------------------------------------------------------------------------
// ,--------,
// | Tables |
// '--------'

function deleteCol(cols) {
    var tables = document.getElementsByTagName('table');
    for (var t of Array.from(tables))
        for (var r of Array.from(t.rows))
            for (var i of cols) {
                var cell = r.children[i];
                if (cell) cell.remove();
            }
}

// -------------------------------------------------------------------------------
// ,-----------,
// | Rikaisama |
// '-----------'

window._rikaiPrefService = XpcService("@mozilla.org/preferences-service;1", "nsIPrefBranch");
_rikaiPrefService.setCharPref('extensions.rikaisama.toggle.key', 'F1');
_rikaiPrefService.setCharPref('extensions.rikaisama.toggle.mod', 'accel');
window._rikaiDefaultPrefs = "/home/troy/.moonchild productions/pale moon/n8pdu9nh.default/extensions/{697F6AFE-5321-4DE1-BFE6-4471C3721BD4}/defaults/preferences/rikaichan.js"


// -------------------------------------------------------------------------------
// ,-------,
// | Jisho |
// '-------'
function showDropdown(linkelt) {
    linkelt.style.left = "0px";
}

// -------------------------------------------------------------------------------
// ,------------------,
// | Helper Functions |
// '------------------'

// alternative implementation of removeXPath
function removeXPath(xpathexpr) {
    dactyl.open(`javascript:var elts=document.evaluate(${xpathexpr},document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);for (var i=0; i < elts.snapshotLength; i++){var elt=elts.snapshotItem(i);elt.parentNode.removeChild(elt);}; void(0)`)
}

// Toggle off an URL component where the value is unknown, store value to subsequently toggle back on
function toggleQueryComponentByField(queryField) {
    var url = buffer.URL;
    var newurl;
    var queryRegex = queryField+"=[^?&]+";
    var value = buffer.URL.match(queryRegex)&&buffer.URL.match(queryRegex)[0] || _dactyl_LastQueryField;
    if (!value) return False;
    _dactyl_LastQueryField = value;
    var query = queryField+"="+value;
    var qRegexFinal = RegExp("[?&]"+query+"$");
    var qRegexNonfinal = RegExp(query+"&");
    if (url.match(qRegexFinal))
        newurl = url.replace(qRegexFinal, "");
    else if (url.match(qRegexNonfinal))
        newurl = url.replace(qRegexNonfinal, "");
    else if (url.match(/[?]/))
        newurl = url + "&" + query;
    else
        newurl = url + "?" + query;
    content.window.location = newurl;
}
window.toggleQueryComponentByField = toggleQueryComponentByField;


// -------------------------------------------------------------------------------
// ,-----------,
// | Inoreader |
// '-----------'

// version of inoreaderSubscribe() using window.open(): produces popup window, but won't work if
// browser.link.open_newwindow=3 and browser.link.open_newwindow.restriction=0
// (ie. if dactyl's popup option is 'tab' - without 'resized')

/* adapted from inoreader bookmarklet */
function inoreaderSubscribe(url=buffer.URL){
    var w = 640, h = 400;
    width  = content.window.innerWidth  || content.document.documentElement.clientWidth  || screen.width;
    height = content.window.innerHeight || content.document.documentElement.clientHeight || screen.height;
    var left = ((width/2)-(w/2))+screen.left;
    var top  = ((height/2)-(h/2))+screen.top;
    var float = window.open(
        a,
        new Date().getTime(),
        `width=${width}, height=${height}, top=${top}, left=${left}` +
            'location=yes, resizable=yes ,status=no ,scrollbars=no ,personalbar=no ,toolbar=no ,menubar=no'
    );
    window.focus && float.focus();
}
