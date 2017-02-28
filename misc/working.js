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
