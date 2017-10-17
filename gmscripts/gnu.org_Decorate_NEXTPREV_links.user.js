// ==UserScript==
// @name        GNU.org: Decorate NEXT/PREV links
// @namespace   gnu
// @description Add >> and << to next/previous links so Pentadactyl can recognize them
// @include     https://www.gnu.org/software/*/manual/*
// @version     1
// @grant       none
// ==/UserScript==

// jshint esversion: 6

var header = document.getElementsByClassName("header")[0];
var headerchildnodes = header.getElementsByTagName('p')[0].childNodes;
var headerlinks = Array.from(headerchildnodes).filter((_)=>_.tagName=='A');
for (var l of headerlinks) {
    switch (l.getAttribute("rel")) {
    case "next":
        l.innerText = ">> " + l.innerText;
        break;
    case "prev":
        l.innerText = "<< " + l.innerText;
        break;
    }
}
