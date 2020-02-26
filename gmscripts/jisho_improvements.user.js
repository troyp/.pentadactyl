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


// add similar kanji link
var kanjiDetails = Array.from(document.getElementsByClassName("kanji details"));
for (var kanjidiv of kanjiDetails) {
    var links = kanjidiv.getElementsByClassName("inline-list")[0];
    var kanji = kanjidiv.getElementsByClassName('character')[0].innerText;
    var new_li = document.createElement("li");
    var new_a = document.createElement("a");
    new_a.href = `http://similarity.gakusha.info/?kanji=${kanji}`;
    new_a.innerText = `Similar to ${kanji}`;
    new_li.appendChild(new_a);
    links.appendChild(new_li);
}

// links to current wikipedia revision
var links = page.getElementsByTagName('a');
var wikiregex = /(^\w+:\/\/\w+\.wikipedia\.org\/.*)\?oldid=\d+$/;
for (var l of links) {
    var match = l.href.match(wikiregex);
    if (match) l.href = match[1];
}

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
