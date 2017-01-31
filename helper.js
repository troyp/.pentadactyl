// ********************
// *                  *
// * Helper Functions *
// *                  *
// ********************
// Helper functions for interacting with Pentadactyl and example code

function getNormalBinding(key) {
    return dactyl.modules.mappings.get(modes.NORMAL, key);
}
function listNormalMappings(filter) {
    dactyl.modules.mappings.list([modes.NORMAL],
                                 filter,
                                 dactyl.modules.mappings.allHives);
}
function getMappings(hive, modes) { return iter.toArray(hive.iterate(modes)); }
function matchMappingName(mapping, filter) {
    for (name of mapping.names)
        if (name.match(filter)) return true;
    return false;
}
