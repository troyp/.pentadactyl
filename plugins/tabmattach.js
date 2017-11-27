group.commands.add(
    ["tabmattach"],
    "Attach matching tabs to another window",
    function (args) {
        // args: matchString winIndex tabIndex
        // dactyl.assert(args.length <= 2 && !args.some(i => !/^\d+(?:$|:)/.test(i)),
        //               _("error.trailingCharacters"));

        let matchString = args[0];
        let winIndex = parseInt(args[1]);
        let tabIndex = parseInt(args[2]);

        let win = dactyl.windows[winIndex - 1];
        let sourceTab = tabs.getTab();

        dactyl.assert(win, _("window.noIndex", winIndex));
        dactyl.assert(win != window, _("window.cantAttachSame"));

        let modules     = win.dactyl.modules;
        let { browser } = modules.config;

        // Not sure what to do about args.count now
        for (let sourceTab of tabs.match(matchString, null, args.bang, true)) {
            let newTab = browser.addTab("about:blank");
            browser.stop();
            // XXX: the implementation of DnD in tabbrowser.xml suggests
            // that we may not be guaranteed of having a docshell here
            // without this reference?
            browser.docShell;

            if (winIndex) {     // was "if (args[1])"; I guess winIndex is right...
                let { visibleTabs, allTabs } = modules.tabs;
                tabIndex = Math.constrain(tabIndex, 1, visibleTabs.length);
                let target = visibleTabs[tabIndex - 1];
                browser.moveTabTo(newTab, Array.indexOf(allTabs, target));
            }

            browser.selectedTab = newTab; // required
            browser.swapBrowsersAndCloseOther(newTab, sourceTab);
        }
    }, {
        argCount: "+",
        bang: true,
        count: true,
        completer: function (context, args) {
            switch (args.completeArg) {  // I guess args.completeArg is the number of args?
            case 0:
                completion.buffer(context);
                break;
            case 1:
                // These are from e.g. completion.buffer and
                // completion.window, replacing a call like
                // completion.buffer(context)
                context.filters.push(context.filter.toLowerCase);  // Not sure if this has any effect or is necessary

                context.filters.push(({ item }) => item != window);
                context.anchored = false;
                context.title = ["Window", "Title"];
                context.keys = { text: win => dactyl.windows.indexOf(win) + 1,
                                 description: win => win.document.title };
                context.completions = dactyl.windows;
                context.filters[0] = CompletionContext.Filter.textDescription;

                break;
            case 2:
                let win = dactyl.windows[Number(args[1]) - 1];
                if (!win || !win.dactyl)
                    context.message = _("Error", _("window.noIndex", winIndex));
                else
                    win.dactyl.modules.commands.get("tabmove").completer(context);
                break;
            }

        },
        literal: 1,
        privateData: true
    },
    true);
