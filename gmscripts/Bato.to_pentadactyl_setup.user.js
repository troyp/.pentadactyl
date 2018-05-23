// ==UserScript==
// @name        Bato.to Pentadactyl Setup
// @namespace   batoto
// @description Add >> and << alt attribute to next/previous links so Pentadactyl can recognize them
// @include     http://bato.to/reader*
// @version     1
// @grant       none
// ==/UserScript==

// jshint esversion: 6

var reader=document.getElementById('reader');
var imgs=Array.from(reader.getElementsByTagName('img'));
var np=imgs.filter(e=>e.title=='Next Page')[0];
// if (np.parentNode.childNodes.length == 1) {
    // var nptext = document.createTextNode(">>");
    // np.parentNode.appendChild(nptext);
// }
np.setAttribute('alt', '>>');
var pp=imgs.filter(e=>e.title=='Previous Page')[0];
// if (pp.parentNode.childNodes.length == 1) {
    // var pptext = document.createTextNode("<<");
    // pp.parentNode.appendChild(pptext);
// }
pp.setAttribute('alt', '<<');
