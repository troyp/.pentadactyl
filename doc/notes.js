/*
-----------------------------------------------------------------------------
,--------------,
| modes._modes |
'--------------'
 0:  [instance Mode("BASE")]
 1:  [instance Mode("MAIN")]
 2:  [instance Mode("COMMAND")]
 3:  [instance Mode("NORMAL")]
 4:  [instance Mode("CARET")]
 5:  [instance Mode("INPUT")]
 6:  [instance Mode("EMBED")]
 7:  [instance Mode("PASS_THROUGH")]
 8:  [instance Mode("QUOTE")]
 9:  [instance Mode("IGNORE")]
 10: [instance Mode("MENU")]
 11: [instance Mode("LINE")]
 12: [instance Mode("OPERATOR")]
 13: [instance Mode("VISUAL")]
 14: [instance Mode("TEXT_EDIT")]
 15: [instance Mode("INSERT")]
 16: [instance Mode("AUTOCOMPLETE")]
 17: [instance Mode("COMMAND_LINE")]
 18: [instance Mode("EX")]
 19: [instance Mode("PROMPT")]
 20: [instance Mode("INPUT_MULTILINE")]
 21: [instance Mode("FILE_INPUT")]
 22: [instance Mode("FIND")]
 23: [instance Mode("FIND_FORWARD")]
 24: [instance Mode("FIND_BACKWARD")]
 25: [instance Mode("REPL")]
 26: [instance Mode("HINTS")]
 27: [instance Mode("OUTPUT_MULTILINE")]
*/
// -------------------------------------------------------------------------------

// use unicode in description:
UTF8("unicode string");

// -------------------------------------------------------------------------------
// ,----------,
// | mappings |
// '----------'
// eg.
bind(["f"],
     "Start Hints mode",
     function () { hints.show("o"); });

// -------------------------------------------------------------------------------
// ,-------,
// | hints |
// '-------'
hints.addMode("tablelink_follow", "Follow table link", elem => buffer.followLink(elem, dactyl.CURRENT_TAB),
              e=>true, ["a strong"]);

// map <site>f -description "Hints mode: follow links in table" -js hints.show("tablelink_follow");

// -------------------------------------------------------------------------------
// ,------------,
// | status bar |
// '------------'
// addon bar
var ab = document.getElementById('dactyl-addon-bar');
// status bar (sole child of ab)
var sb = document.getElementById('dactyl-status-bar');
var sb_tabcount = document.getElementById('dactyl-statusline-field-tabcount').value;
var cli = document.getElementById('dactyl-statusline-field-commandline');

// -------------------------------------------------------------------------------
// ,------------,
// | extensions |
// '------------'
// commands are stored in command nodes inside commandset nodes:
var cmdsets = document.querySelectorAll('commandset');
var cmds = Array.from(document.querySelectorAll('command'));
function doXulCommand(id) {
    var cmd = document.getElementById(id);
    cmd.doCommand();
}
function doXulCommand2(id) {
    var cmd = document.getElementById(id);
    var cmdstr = cmd.getAttribute('oncommand');
    eval(cmdstr);
}

// -------------------------------------------------------------------------------
// ,--------------,
// | context menu |
// '--------------'
var contextmenu = document.getElementById('contentAreaContextMenu');
var contextmenuitems = Array.from(contextmenu.getElementsByTagName('menuitem'));
function chooseItem(id) { document.getElementById(id).click(); }


// -------------------------------------------------------------------------------
// ,--------,
// | Places |
// '--------'
var placesView = content.document.getelementbyid('placesView');           // xul:hbox
var placesDoc = placesView.ownerDocument;                                 // XUL Document
var placesContentView = content.document.getElementById('contentView');   // xul:vbox
var placeContent = content.document.getElementById('placeContent');       // xul:tree
var detailsDeck = content.document.getElementById('detailsDeck');         // xul:deck
var placesViewsDeck = content.document.getElementById('placesViewsDeck'); // xul:deck
