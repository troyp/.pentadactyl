// ==UserScript==
// @name       MathJax for Reddit (fixed)
// @namespace  
// @author     /u/amdpox
// @version    0.4
// @description Enables MathJax on reddit for the TeXtheWorld delimiters [; ... ;].
// @match      *://*.reddit.com/*
// @copyright
// ==/UserScript==

// http://a.carapetis.com/mathjax_for_reddit.user.js
// fixed by adding 'https:' to script src

if (window.MathJax === undefined) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML";
    var config = 'MathJax.Hub.Config({ ' + 'extensions: ["tex2jax.js"], ' + 'tex2jax: { skipTags: ["script","noscript","style","textarea"],inlineMath: [ ["[;", ";]"] ], displayMath: [["[(;",";)]"]], processEscapes: true }, ' + 'jax: ["input/TeX", "output/HTML-CSS"] ' + ' }); ' + 'MathJax.Hub.Startup.onload(); ';
    if (window.opera) {
        script.innerHTML = config;
    } else {
        script.text = config;
    }
    document.getElementsByTagName("head")[0].appendChild(script);
    (doMathJax = function () {
        window.setTimeout(doMathJax, 1000);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        $('.MathJax').parent().css('border','none').css('background','none');
    })();

} else {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}
