# -*- Mode: Makefile -*-
#
# Makefile for VDR-Portal Mobile
#

.PHONY: xpi

xpi: clean
	zip -r9 vdrportalmobile-trunk.xpi manifest.json \
                                 resource \
                                 background.js
clean:
	rm -f vdrportalmobile-trunk.xpi
