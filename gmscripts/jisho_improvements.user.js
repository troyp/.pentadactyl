// ==UserScript==
// @name        Jisho Improvements
// @namespace   jisho
// @description Jisho Improvements
// @include     https://jisho.org/*
// @version     1
// @grant       none
// ==/UserScript==

// jshint esversion: 6

var REMOVE_ADS = false;

var page = document.getElementById('page_container');


// -------------------------------------------------------------------------------
// ,-------------,
// | Word Search |
// '-------------'

}

// -------------------------------------------------------------------------------
// ,-------------------,
// | Word Details Page |
// '-------------------'

// links to current wikipedia revision
var links = page.getElementsByTagName('a');
var wikiregex = /(^\w+:\/\/\w+\.wikipedia\.org\/.*)\?oldid=\d+$/;
for (var l of links) {
    var match = l.href.match(wikiregex);
    if (match) l.href = match[1];
}

// -------------------------------------------------------------------------------
// ,-----,
// | Ads |
// '-----'

// move/remove sidebar ad
var sidebar = document.getElementById('secondary');
var sidebar_ad = sidebar && sidebar.querySelector('.search-results__sidebar-ad');
if (sidebar_ad) {
    sidebar_ad.remove();
    if (!REMOVE_ADS) sidebar.appendChild(sidebar_ad);
}

// remove footer ad
if (REMOVE_ADS) {
    var footer_ad = document.querySelector('.footer-ad');
    footer_ad && footer_ad.remove();
}

// -------------------------------------------------------------------------------
// ,-------,
// | Kanji |
// '-------'

var kanjiDetails = Array.from(document.getElementsByClassName("kanji details"));
for (var i=0; i<kanjiDetails.length; ++i) {
    var kanjiDiv = kanjiDetails[i];
    var kanji = kanjiDiv.getElementsByClassName('character')[0].innerText;

    var kanjiDefnDiv = document.querySelectorAll(
        "#result_area>.kanji.details>.row:first-of-type>.columns:last-of-type"
    )[i];

    // inline list of links
    var inlineList = kanjiDiv.getElementsByClassName("inline-list")[0];
    var inlineLinks = Array.from(inlineList.children);

    // add custom items
    var li_similar = document.createElement("li");
    var new_a = document.createElement("a");
    // new_a.href = `http://similarity.gakusha.info/?kanji=${kanji}`;
    new_a.href = `https://thekanjimap.com/index.html?k=${kanji}`;
    new_a.innerText = `Similar to ${kanji}`;
    li_similar.appendChild(new_a);
    inlineList.appendChild(li_similar);

    // dropdown list of links
    var dropdownList = document.getElementsByClassName("f-dropdown")[i];
    var dropdownLinks = Array.from(dropdownList.children);

    // move items from dropdown-list to inline list
    dropdownLinks.forEach(e=>inlineList.appendChild(e));
    // remove dropdown list and its link in the inline list
    inlineLinks.find(e=>e.textContent.match(/external links/i)).remove();
    dropdownList.remove();
}
