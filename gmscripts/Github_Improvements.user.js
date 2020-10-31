// ==UserScript==
// @name        Github Improvements
// @namespace   https://github.com/troyp
// @include     https://*github.com/*
// @version     1
// @grant       none
// ==/UserScript==
var url = document.location.href;

if (url.match(/https:\/\/github\.com\/[^/]+\/[^/]+/)) {
    Array.from(document.links).forEach(
        l=>{
            l.id=l.id.replace("user-content-", "");
            l.name=l.name.replace("user-content-", "");
        }
    );
}
