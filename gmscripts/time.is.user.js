// ==UserScript==
// @name        time.is
// @namespace   troyp7@gmail.com
// @include     https://time.is/Sydney
// @version     1
// @grant       none
// ==/UserScript==

function removeSelectors(...sels) {
    sels.forEach(sel=>{
        var elts = Array.from(document.querySelectorAll(sel));
        elts.forEach(e=>e.remove && e.remove());
    });
}
function blankSelectors(...sels) {
    var doc = content.document;
    sels.forEach(sel=>{
        var elts = Array.from(doc.querySelectorAll(sel));
        elts.forEach(e=>{
            var css = e.getAttribute('style') || '';
            e.setAttribute('style', css+" visibility: hidden !important;");
        });
    });
}

var toDelete = [
    '#time_zone', '#time_difference', '#map', '#restaurants',
    '#largest_cities', '#menupositioner'
];
removeSelectors.call(null, ...toDelete);

var toBlank = ['#top'];
blankSelectors.call(null, ...toBlank);

var w90 = Array.from(document.querySelectorAll('div .w90.tr'));
var anon_w90 = w90.filter(e=>!e.hasAttribute('id'));
var timezonerow = anon_w90[anon_w90.length-1];
timezonerow.parentNode.removeChild(timezonerow);
