# -*- Mode: Makefile -*-
#
# Makefile for RocWeb Extras
#

FILES = manifest.json \
        background.js \
        contentscript.js \
        features/keyboard.js \
        options.html \
        options.js

ADDON = rocwebextras

VERSION = $(shell sed -n  's/^  "version": "\([^"]\+\).*/\1/p' manifest.json)

ANDROIDDEVICE = $(shell adb devices | cut -s -d$$'\t' -f1 | head -n1)

trunk: $(ADDON)-trunk.xpi

release: $(ADDON)-$(VERSION).xpi

%.xpi: $(FILES)
	@zip -9 - $^ > $@

clean:
	rm -f $(ADDON)-*.xpi

# Starts local debug session
run:
	web-ext run --pref=devtools.browserconsole.contentMessages=true --bc

# Starts debug session on connected Android device
arun:
	@if [ -z "$(ANDROIDDEVICE)" ]; then \
	  echo "No android devices found!"; \
	else \
	  web-ext run --target=firefox-android --android-device="$(ANDROIDDEVICE)"; \
	fi
