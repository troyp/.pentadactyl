* Keybinding
    * A heirarchy of modes, with 18 "leaf" modes plus parent modes.
      Can be used to define keys in a wide variety of contexts.

          base (
            main (
              command (
                normal (caret, output multiline), text edit, visual),
                embed,
                input (
                  command-line (
                    ex, file input, find (find backward, find forward), hints, prompt, repl),
                insert (autocomplete, input multiline),
                menu)),
            pass through,
            quote),
          operator

    * Ability to define pseudokeys, eg. `<mypseudokey>`.
      Useful for abstraction and composition
    * Passthrough: `<pass-next-key>`, `<pass-all-keys>`
    * Access builtin dactyl bindings: `<pass-next-key-builtin>`
    * Can take a `<count>` before the key and/or an `<arg>` after it.
    * Bindings can have a description.
    * Definition may be:
        * a sequence of keys
          (with `-builtin` switch, will ignore user-defined bindings)
        * an ex command (`-ex`)
        * a javascript command (`-js`)
    * May be mode-specific.

* Completion
    * Customizable completion engine: user can define their own completion
      functions for commands.
    * Javascript completion:
        * Completes on dynamic results, eg.
          `content.document.getElementsByTagName('div')[2].` will trigger
          completion.
        * Completion list includes the values of members.

* Javascript
    * Javascript can access plugin APIs, as well as web page DOM
      (via `content` object).
    * Can be defined within heredocs for convenience.
    * Can be evaluated:
        * using commands `:echo`, `:js`, etc.
        * using the Javascript REPL (`:js!`)
            * Completion.
            * Can be started within a specified context
    * Javascript (at the ex prompt and repl) features sophisticated completion,
      as well as parenthesis matching and syntax error highlighting.
    * Javascript can be used to dynamically generate an ex command to execute.
        * using the ex command `:execute <javascript-expression>`
        * or using the javascript call `dactyl.execute(expression)`
    * Each group has its own javascript context. This includes groups
      associated with a config file or plugin.
        * In particular, the .pentadactylrc file has its own context, so
          javascript can be evaluated in it (eg in here-docs) and then used
          in other javascript expressions elsewhere in the file. So functions
          and variables can be defined and used in mappings, commands or other
          functions.
    * A file can conditionally execute ex commands based on the value of a
      javascript expression using `:if`, `:else`, `elseif` and `:endif`.

