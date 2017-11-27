Firefox Devtools Keyboard Shortcuts
-----------------------------------

* The first section lists the shortcut for opening each tool.
* The second section lists shortcuts that are applicable to the Toolbox itself.
* After that there's one section for each tool, listing the shortcuts you can use within that tool.

## Opening and Closing Tools
* These shortcuts work in the main browser window to open the specified tool.
* For tools that are hosted in the Toolbox, they work to close the tool if it is active.
* For tools like the Browser Console that open in a new window, you have to close the window to close the tool.

| Command                                          | Shortcut                    |
|--------------------------------------------------|-----------------------------|
| Open Toolbox (with most recent tool activated)   | Ctrl + Shift + I            |
| Bring Toolbox (in separate window) to foreground | Ctrl + Shift + I            |
|                                                  | F12                         |
| Close Toolbox (in separate window in foreground) | Ctrl + Shift + I            |
|                                                  | F12                         |
| Open Web Console / Focus Web Console Cmd Line    | Ctrl + Shift + K            |
| Toggle Inspector                                 | Ctrl + Shift + I            |
| Open Debugger                                    | Ctrl + Shift + S            |
| Open Style Editor                                | Shift + F7                  |
| Open Profiler                                    | Shift + F5                  |
| Open Network Monitor                             | Ctrl + Shift + E  (FF 55+)  |
|                                                  | Ctrl + Shift + Q  (< FF 55) |
| Toggle Developer Toolbar                         | Shift + F2                  |
| Toggle Responsive Design View                    | Ctrl + Shift + M            |
| Open Browser Console [1]                         | Ctrl + Shift + J            |
| Open Browser Toolbox                             | Ctrl + Alt + Shift + I      |
| Open Scratchpad                                  | Shift + F4                  |
| Open WebIDE                                      | Shift + F8                  |
| Storage Inspector (must be enabled)              | Shift + F9                  |

[1] When the Browser Console is hidden by a normal FF window:
* For FF <38, this key closes the Browser Console
* For FF 38+, this key brings the Browser Console on top and focuses it.

## Toolbox
These shortcuts work whenever the toolbox is open, no matter which tool is active.

| Command                                                                 | Shortcut         |
|-------------------------------------------------------------------------|------------------|
| Cycle through tools left to right                                       | Ctrl + ]         |
| Cycle through tools right to left                                       | Ctrl + [         |
| Toggle between active tool and settings                                 | Ctrl + Shift + O |
| Toggle between active tool and settings (new in Firefox 43)             | F1               |
| Toggle toolbox between the last 2 docking modes (new in Firefox 41)     | Ctrl + Shift + D |
| Toggle split console (except if console is the currently selected tool) | Esc              |

### Global shortcuts
These shortcuts work in all tools that are hosted in the toolbox.

| Command            | Shortcut |
|--------------------|----------|
| Increase font size | Ctrl + + |
| Decrease font size | Ctrl + - |
| Reset font size    | Ctrl + 0 |

## Source Editor
This table lists the default shortcuts for the source editor.
* You can also choose Vim, Emacs or Sublime Text bindings.
* In `about:config`, for `devtools.editor.keymap`, set "vim", "emacs" or "sublime".
* Alternatively, set it in `Dev Tools Settings > Editor Preferences`.
* The selected bindings will be used for all the developer tools that use the source editor.
* You need to reopen the editor for the change to take effect.

| Command                   | Shortcut         |
|---------------------------|------------------|
| Go to line                | Ctrl + J         |
| Find in file              | Ctrl + F         |
| Find again                | Ctrl + G         |
| Select all                | Ctrl + A         |
| Cut                       | Ctrl + X         |
| Copy                      | Ctrl + C         |
| Paste                     | Ctrl + V         |
| Undo                      | Ctrl + Z         |
| Redo                      | Ctrl + Shift + Z |
|                           | Ctrl + Y         |
| Indent                    | Tab              |
| Unindent                  | Shift + Tab      |
| Move line(s) up           | Alt + Up         |
| Move line(s) down         | Alt + Down       |
| Comment/uncomment line(s) | Ctrl + /         |

## Page Inspector
| Command         | Shortcut         |
|-----------------|------------------|
| Inspect Element | Ctrl + Shift + C |

### Node Picker
| Command                                                                        | Shortcut      |
|--------------------------------------------------------------------------------|---------------|
| Select the element under the mouse and cancel picker mode                      | click         |
| Select the element under the mouse and stay in picker mode (new in Firefox 52) | Shift + click |

### HTML Pane
| Command                                                       | Shortcut         |
|---------------------------------------------------------------|------------------|
| Delete selected node                                          | Delete           |
| Undo delete node                                              | Ctrl + Z         |
| Redo delete node                                              | Ctrl + Shift + Z |
|                                                               | Ctrl + Y         |
| Move to next node (expanded nodes only)                       | Down arrow       |
| Move to previous node                                         | Up arrow         |
| Expand currently selected node                                | Right arrow      |
| Collapse currently selected node                              | Right arrow      |
| Step forward through attributes of a node                     | Tab              |
| Step backward through attributes of a node                    | Shift + Tab      |
| Start editing selected attribute                              | Enter            |
| Hide/show selected node                                       | H                |
| Focus on the search box in HTML pane                          | Ctrl + F         |
| Edit as HTML                                                  | F2               |
| Stop editing HTML                                             | F2               |
|                                                               | Ctrl +Enter      |
| Copy selected node's outer HTML (new: FF42)                   | Ctrl + C         |
| Scroll selected node into view (new: FF44)                    | S                |
| Find next match in markup, when search active                 | Enter            |
| Find previous match in markup, when search active (new: FF48) | Shift + Enter    |
|                                                               |                  |

### Breadcrumbs bar
These shortcuts work when the breadcrumbs bar is focused.

| Command                                     | Shortcut    |
|---------------------------------------------|-------------|
| Move to previous element in breadcrumbs bar | Left arrow  |
| Move to next element in breadcrumbs bar     | Right arrow |
| Focus the HTML pane                         | Shift + Tab |
| Focus the CSS pane                          | Tab         |

### CSS pane
These shortcuts work when you're in the Inspector's CSS pane.

| Command                                                                           | Shortcut       |
|-----------------------------------------------------------------------------------|----------------|
| Focus on the search box in the CSS pane                                           | Ctrl + F       |
| Clear search box content (search box focused, content entered)                    | Esc            |
| Step forward through properties and values                                        | Tab            |
| Step backward through properties and values                                       | Shift + Tab    |
| Edit property/value (Rules view, property/value selected)                         | Enter          |
|                                                                                   | Space          |
| Cycle through auto-complete entries (Rules view, property/value being edited)     | Up/Down        |
| Choose current auto-complete entry (Rules view, property/value being edited)      | Enter          |
|                                                                                   | Tab            |
| Increment selected value by 1                                                     | Up             |
| Decrement selected value by 1                                                     | Down           |
| Increment selected value by 100                                                   | Shift + PgUp   |
| Decrement selected value by 100                                                   | Shift + PgDown |
| Increment selected value by 10                                                    | Shift + Up     |
| Decrement selected value by 10                                                    | Shift + Down   |
| Increment selected value by 0.1                                                   | Alt + Up       |
| Decrement selected value by 0.1                                                   | Alt + Down     |
| Show/hide more info on property (computed view, property selected, new: FF49) [1] | Enter          |
|                                                                                   | Space          |
| Open MDN page about current property (computed view, propert selected, new: FF49) | F1             |

[1] When more info is shown for property and a CSS file reference is focused, open CSS file with Enter.

## Debugger
| Command                                 | Shortcut         |
|-----------------------------------------|------------------|
| Open the Debugger                       | Ctrl + Shift + S |
| Search for a string in the current file | Ctrl + F         |
| Find next in the current file           | Ctrl + G         |
| Search for scripts by name              | Ctrl + P         |
| Resume execution when at a breakpoint   | F8               |
| Step over                               | F10              |
| Step into                               | F11              |
| Step out                                | Shift + F11      |

## Debugger (Before Firefox 52)
| Command                                                     | Shortcut         |
|-------------------------------------------------------------|------------------|
| Open the Debugger                                           | Ctrl + Shift + S |
| Search current source using the script filter               | Ctrl + F         |
| Find next current source                                    | Enter            |
|                                                             | Up               |
| Find previous current source                                | Shift + Enter    |
|                                                             | Down             |
| Search all sources using the script filter                  | Ctrl + Alt + F   |
| Search for scripts by name                                  | Ctrl + P         |
|                                                             | Ctrl + O         |
| Search for function definitions                             | Ctrl + D         |
| Filter variables when execution is paused                   | Ctrl + Alt + V   |
| Resume execution when at a breakpoint                       | F8               |
| Step over                                                   | F10              |
| Step into                                                   | F11              |
| Step out                                                    | Shift + F11      |
| Toggle breakpoint on the currently selected line            | Ctrl + B         |
| Toggle conditional breakpoint on currently selected line    | Ctrl + Shift + B |
| Add selected text to Watch expressions                      | Ctrl + Shift + E |
| Go to line using the script filter                          | Ctrl + L         |
| Command                            | Shortcut                  |
|------------------------------------|---------------------------|
| Open the Web Console               | Ctrl + Shift + K          |
| Search in the message display pane | Ctrl + F                  |
| Clear the object inspector pane    | Esc                       |
| Focus on the command line          | Ctrl + Shift + K          |
| Clear output                       | Ctrl + L                  |
|                                    | Ctrl + Shift + L (FF 44+) |
                                                                         
### Command line interpreter
| Command                                              | Shortcut             |
|------------------------------------------------------|----------------------|
| Scroll to start of console output (if cmdline empty) | Home                 |
| Scroll to end of console outputut (if cmdline empty) | End                  |
| Page up through console output                       | Page up              |
| Page down through console output                     | Page down            |
| Go backward through command history                  | Up arrow             |
| Go forward through command history                   | Down arrow           |
| Move to the beginning of the line                    | Home (windows)       |
|                                                      | Ctrl + A (linux/osx) |
| Move to end of line                                  | End (windows)        |
|                                                      | Ctrl + E (linux/osx) |
| Execute current expression                           | Enter                |
| Add a new line (for entering multiline expressions)  | Shift + Enter        |

### Autocomplete popup
| Command                                     | Shortcut   |
|---------------------------------------------|------------|
| Choose current autocomplete suggestion      | Tab        |
| Cancel autocomplete popup                   | Esc        |
| Move to previous autocomplete suggestion    | Up arrow   |
| Move to next autocomplete suggestion        | Down arrow |
| Page up through autocomplete suggestions    | Page up    |
| Page down through autocomplete suggestions  | Page down  |
| Scroll to start of autocomplete suggestions | Home       |
| Scroll to end of autocomplete suggestions   | End        |

## Style Editor
| Command                 | Shortcut     |
|-------------------------|--------------|
| Open the Style Editor   | Shift + F7   |
| Open autocomplete popup | Ctrl + Space |

## Scratchpad
| Command                                                 | Shortcut             |
|---------------------------------------------------------|----------------------|
| Open the Scratchpad                                     | Shift + F4           |
| Run Scratchpad code                                     | Ctrl + R             |
| Run Scratchpad code, display result in object inspector | Ctrl + I             |
| Run Scratchpad code, insert result as comment           | Ctrl + L             |
| Re-evaluate current function                            | Ctrl + E             |
| Reload the current page, then run Scratchpad code       | Ctrl + Shift + R     |
| Save the pad                                            | Ctrl + S             |
| Open an existing pad                                    | Ctrl + O             |
| Create a new pad                                        | Ctrl + N             |
| Close Scratchpad                                        | Ctrl + W             |
| Pretty print the code in Scratchpad                     | Ctrl + P             |
| Show autocomplete suggestions                           | Ctrl + Space         |
| Show inline documentation                               | Ctrl + Shift + Space |

## Eyedropper
| Command                  | Shortcut           |
|--------------------------|--------------------|
| Select the current color | Enter              |
| Dismiss the Eyedropper   | Esc                |
| Move by 1 pixel          | Arrow keys         |
| Move by 10 pixels        | Shift + arrow keys |
