// ==UserScript==
// @name        Jisho Improvements
// @namespace   jisho
// @description Jisho Improvements
// @include     http://jisho.org/*
// @version     1
// @grant       none
// ==/UserScript==

// jshint esversion: 6

var page = document.getElementById('page_container');

// fix details links
//var links = document.getElementsByClassName("light-details_link")
//for (i=0; i<links.length; ++i)
//    links[i].textContent = links[i].textContent.slice(0, -2);

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

