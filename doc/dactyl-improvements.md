# hints

## hint modes

* Hint mode: `HintMode(scheme, action, filter=none)`
    * Hint scheme: `HintScheme(selector, filter=none)`
          * `selector` is a CSS or XPath selector
          * `filter` is an optional predicate to filter the elements selected
    * Hint action is simply a function taking an element as its argument
    * Hint Mode filter is an optional predicate to filter the elements selected
      (additional to any filter already in the hint scheme)

## hint mappings

Hints are assigned normally to mappings.

You can either pass a hint mode as the single argument:

    map KEY -js hints.show(hintMode)

Or, if you want to define a hint mode inline, you can use the simplified form:

    map KEY -js hints.show(scheme, action, filter=none)
    /* equivalent to: */
    map KEY -js hints.show(HintMode(scheme, action, filter=none))

