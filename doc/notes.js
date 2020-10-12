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
// ,----------,
// | commands |
// '----------'
// eg.
commands.add(["tabopen", "t[open]", "tabnew"],
             "Open one or more URLs in a new tab",
             function (args) {
                 dactyl.open(args[0] || "about:blank",
                             { from: "tabopen", where: dactyl.NEW_TAB, background: args.bang });
             }, {
                 bang: true,
                 completer: function (context) {
                     completion.url(context);
                 },
                 domains: function (args) {
                     return commands.get("open").domains(args);
                 },
                 literal: 0,
                 privateData: true
             });


// -------------------------------------------------------------------------------
// ,-------,
// | hints |
// '-------'
hints.addMode("tablelink_follow", "Follow table link", elem => buffer.followLink(elem, dactyl.CURRENT_TAB),
              e=>true, ["a strong"]);

// map <site>f -description "Hints mode: follow links in table" -js hints.show("tablelink_follow");

Hints.translitTable; // transliterates unicode characters into ASCII

// -------------------------------------------------------------------------------
// ,-----------,
// | documents |
// '-----------'
gBrowser == top.document.getElementById('content');
content.document == gBrowser.contentDocument == gBrowser.selectedBrowser.contentDocument;

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

/* -------------------------------------------------------------------------------------------------------- */
/*                                           _________________                                              */
/*                                          |                 |                                             */
/*                                          | USEFUL COMMANDS |                                             */
/*                                          |_________________|                                             */
/*                                                                                                          */
/* call function defined in document: content.wrappedJSObject.page_func()                                   */
/* alternative to :execute: :js CommandExMode().open(exCommandString)                                       */
/* echo in dactyl status bar: dactyl.echo('');                                                              */
/* current browser     getBrowser().selectedBrowser                                                         */
/* current document    getBrowser().selectedBrowser.contentDocument                                         */
/*                     content.document                                                                     */
/* current tab:        tabs.getTab()                                                                        */
/* current selection:  buffer.currentWord                                                                   */
/* current URL:        buffer.URL                                                                           */
/* get tab with index i:  tabs.getTab(i)                                                                    */
/* number of tabs:        tabs.count                                                                        */
/* ordinal (one-based) of tab:   t.dactylOrdinal                                                            */
/* index of tab (zero-based):    t._tPos                                                                    */
/* capture output of shell command:    io.system('command').output                                          */
/* simulate mouse event: elt.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}))      */
/* to override user agent for specific domain, use general.useragent.override.example.com                   */
/* check if window is private: PrivateBrowsingUtils.isContentWindowPrivate(aContentWin)                     */
/*                                                                                                          */
/* ======================================================================================================== */
/* ,----------------------------,                                                                           */
/* | PENTADACTYL/JS/XPCOM NOTES |                                                                           */
/* '----------------------------'                                                                           */
/* * If we want to pass a count to a javascript mapping, it will be null if no                              */
/*   count is provided. Eg.:                                                                                */
/*       map x -count -js myFunc(count)                                                                     */
/*   A default argument isn't enough, since it only handles missing (undefined)                             */
/*   arguments.We can handle this with:                                                                     */
/*       function myFunc(n='default') {                                                                     */
/*           n = n || 'default';                                                                            */
/*           // ....                                                                                        */
/*       }                                                                                                  */
/*   This also redefines the argument when zero is passed, but if it's only meant                           */
/*   to take a count, it's okay, since counts can't be zero.                                                */
/* * When defining a command, if | cannot be used, you can use a new command on each line                   */
/*   (using the line continuation character \).                                                             */
/*       command! foo feedkeys l                                                                            */
/*           \ feedkeys l                                                                                   */
/*           \ feedkeys l                                                                                   */
/*   * The downside is that sometimes a single command cannot be split. Eg.:                                */
/*           command! librarysticky silent library |                                                        */
/*               \ silent ! wmctrl -F -r 'Library' -e 0,1081,216,812,815;                                   */
/*               \          wmctrl -F -a 'Library' -r 'Library' -b add,above,sticky;                        */
/*     gives a 'not a pentadactyl command' error. You must use a single line, or (when possible,            */
/*     as in this case) split it into two individual commands.                                              */
/* * io.run(prog, [arg1, ...]) will run an external program.                                                */
/* * io.system(cmd, input='', async=false) will run a command in a subshell and return output.              */
/*   * prog can be a string or an array of strings [prog, arg1, ...].                                       */
/*   * input is sent on stdin.                                                                              */
/*   * async may be a callback to be run when command returns or boolean (whether to return a promise).     */
/* * Error reporting: use dactyl.reportError(e) in catch block.                                             */
/* * buffer.followLink(elem, where): simulates click on element                                             */
/* * completers for commands: you can examine existing completers using eg `commands.get('back').completer` */
/* * get tab 24 history entry 2:                                                                            */
/*     tabs.getTab(24).linkedBrowser.sessionHistory.getEntryAtIndex(2,false).URI.asciiSpec                  */
/* * get tab 24 history list:                                                                               */
/*     var tabHist = tabs.getTab(24).linkedBrowser.sessionHistory;                                          */
/*     var tabHistEntries =                                                                                 */
/*             [...Array(tabHist.count).keys()].map(i=>tabHist.getEntryAtIndex(i,false).URI.asciiSpec);     */
