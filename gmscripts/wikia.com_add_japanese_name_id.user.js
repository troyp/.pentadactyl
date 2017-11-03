// ==UserScript==
// @name         Wikia Japanese Name id
// @namespace    wikia
// @description  Add #japanese-name id to Japanese Name field
// @include      http://*.wikia.com/wiki/*
// @version      1
// @run-at       document-end
// @grant        none
// ==/UserScript==

var jNameField = document.querySelector('#mw-content-text>aside>section>div:first-of-type');
if (jNameField.innerText.startsWith('Japanese Name') || jNameField.innerText.startsWith('Kanji')) {
    var jName = jNameField.lastElementChild;
    jName.id = 'japanese-name';
} else {
    console.log('Japanese Name field not found.');
}
