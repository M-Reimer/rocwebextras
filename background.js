/*
    Firefox addon "RocWeb Extras"
    Copyright (C) 2019  Manuel Reimer <manuel.reimer@gmx.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// We can't just register a content script as this doesn't work well with
// optional_permissions and dynamic permissions requests. So we are forced to
// use the tabs.onUpdated listener to try to execute a script in the given tab
// This will fail for all pages where we don't have the host permission but
// succeeds for all pages that were "whitelisted" in the Addon settings.
async function handleUpdated(tabId, changeInfo, tabInfo) {
  if (changeInfo.status && changeInfo.status == "complete") {
    try {
      await browser.tabs.executeScript({file: "features/keyboard.js"});
      await browser.tabs.executeScript({file: "contentscript.js"});
    } catch(e) {}
    console.log("Tab: " + tabId + " complete");
  }
}

browser.tabs.onUpdated.addListener(handleUpdated);
