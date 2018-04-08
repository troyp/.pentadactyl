// ==UserScript==
// @name        StackPrinter Improvements
// @namespace   https://github.com/troyp
// @description Remove cruft from StackPrinter pages
// @include     http://www.stackprinter.com/*
// @version     1
// @grant       none
// ==/UserScript==

// Remove home link, replace page link image with unicode link character
var home = document.getElementById("home");
home.removeChild(home.firstElementChild);
var link = home.lastElementChild;
link.removeChild(link.firstChild);
link.innerText = "🔗";
link.style='text-decoration: none !important;'

// Question title image: set style
var title = document.getElementById("question-title");
var titleImg = title.firstElementChild;
titleImg.style = "height: 32px; margin-right: 10px; vertical-align: bottom; width: 32px; display: inline !important;";
var titleStr = title.innerText;
title.innerHTML = "<h1>"+titleStr+"</h1>";
var newStyle = document.createElement("style");
newStyle.innerText =
    "h1 { font-size: 14pt !important; text-align: center; } " +
    ".question-details { font-weight: bold; font-size: 10pt; } " +
    "#question-block { border-bottom: 1px solid; margin: 0 10%; padding: 5px 0; } " +
    "body { line-height: 17px; } " +
    "p { font-size: 15px; }";
document.head.append(newStyle);
var h1 = title.firstChild;
h1.insertBefore(titleImg, h1.firstChild);

// Remove cruft
var toRemove = ["iframe", "script", "noscript"];
toRemove.forEach(sel=>{
    var elts = Array.from(document.querySelectorAll(sel));
    elts.forEach(e=>e.parentNode.removeChild(e));
});

// Remove all hidden elements
var allElts = Array.from(document.getElementsByTagName("*"));
allElts.forEach(
    (e)=>{
        if (e.style.display=="none" || e.hidden)
            e.parentNode.removeChild(e);
    });
