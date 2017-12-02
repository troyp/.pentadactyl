# source this file to search Pentadactyl source

export PENTADACTYL_SOURCE_DIR='/home/troy/Documents/source/extensions/firefox/dactyl';
export filelist="modules/buffer.jsm modules/commands.jsm modules/finder.jsm content/bookmarks.js content/browser.js content/commandline.js content/dactyl.js content/editor.js content/events.js content/hints.js content/mappings.js content/marks.js content/modes.js content/mow.js content/quickmarks.js content/tabs.js";

findmapping() {
    (
	cd $PENTADACTYL_SOURCE_DIR/common/;
	for f in $filelist; do
            grep -Hn "\"$1\"" $f;
	done
    )
}

findoption() {
    (
	cd $PENTADACTYL_SOURCE_DIR/common/;
	for f in $filelist; do
            grep -Hn "\"$1\"" $f;
	done
    )
}

findcommand() {
    (
	cd $PENTADACTYL_SOURCE_DIR/common/;
	for f in $filelist; do
            grep -Hn "\"$1" $f;
	done
    )
}
