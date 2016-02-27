
// --------------
// swap ;f and ;F
// --------------

Ci = Components.interfaces;
isScrollable = (elem) => isinstance(elem, [Ci.nsIDOMHTMLFrameElement, 
                                           Ci.nsIDOMHTMLIFrameElement])
                         || Buffer.isScrollable(elem, 0, true) 
                         || Buffer.isScrollable(elem, 0, false);

js hints.addMode("F", "Focus frame", elem => dactyl.focus(elem.ownerDocument.defaultView));
js hints.addMode("f", "Focus frame or pseudo-frame", buffer.bound.focusElement, isScrollable);

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

map -modes insert <C-q> -js insertAtCaret("search", "foo");


// -------------------------------------------------------------------------------
// ,------------,
// | PageZipper |
// '------------'

// TODO: finish
(function() {
    if (window['pgzp']) { 
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
    }
    document.verbSearchEngines = {
        "Verbix verb conjugation": "http://www.verbix.com/webverbix/go.php?T1=%s&D1=51&H1=151",
        "Japanese Verb Conjugator": "http://www.japaneseverbconjugator.com/VerbDetails.asp?txtVerb=%s"
    }
    document.kanjiSearchEngines = {
        "SLJFAQ kanji search": "http://kanji.sljfaq.org/soft-keyboard.html#?=%s",
        "Red Finch kanji search": "http://redfinchjapanese.com/?action=kanji_dictionary?=%s"
    }
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
