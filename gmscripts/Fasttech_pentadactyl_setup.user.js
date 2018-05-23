// ==UserScript==
// @name        Fasttech Pentadactyl Setup
// @namespace   https://github.com/troyp
// @include     https://www.fasttech.com/*
// @description Remove spaces from the top » and « links so Pentadactyl can recognize them
// @version     1
// @grant       none
// ==/UserScript==

var arrows = Array.from(document.querySelectorAll(".ControlArrows>a"));
var leftArrow = arrows.find(e=>e.innerText.match(/«/));
var rightArrow = arrows.find(e=>e.innerText.match(/»/));
leftArrow.innerText = "«";
rightArrow.innerText = "»";
