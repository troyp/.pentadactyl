
command! tgroup-moveselected 
    \ -bang 
    \ -nargs=+ 
    \ -description "move tabs matching regex to a given group" 
    \ -js tgroupMoveSelected(args[0], RegExp(args[1]))

js <<EOF
function getPlugin(s) {
    for (x in plugins.contexts) {
        if (x.contains("TabGroupie"))
            return plugins.contexts[x][s];
    }
}

var TabGroupie = getPlugin("TabGroupie");

function matchingTabs(rx) {
    var alltabs = tabs.allTabs;
    var alltabs = gBrowser.getTabsToTheEndFrom(0);
    function matches(t) {
        return rx.test(t.label.toLowerCase());
    }
    var matching = alltabs.filter(matches);
    return matching;
}

function matchingTabsInGroup(rx) {
    var alltabs = gBrowser.getTabsToTheEndFrom(0);
    function matches(t) {
        return rx.test(t.label.toLowerCase());
    }
    var matching = alltabs.filter(matches);
    return matching;
}

function tgroupMoveSelected (targetgrp, rx) {
    var matching = matchingTabs(rx);
    var tgrpId = TabGroupie.getIdByTitle(targetgrp);
    var i, t;
    for (i=0; i<matching.length; ++i) {
        t = matching[i];
        TabView.moveTabTo(t, tgrpId);
    }
    TabView.hide();
}
EOF
