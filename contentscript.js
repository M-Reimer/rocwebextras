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

// Even a change of the hash in the URL triggers a "complete" event.
// So we have to get sure our code is injected only once for the first
// "Complete" event for this page.
// We can do this with some custom property to the "window" object as reloading
// the page resets the window object.
if (!window.addon_rwe_loaded) {
  var script = document.createElement("script");
  // Add additional features here
  if (KeyboardFeature !== undefined)
    script.textContent += "(" + KeyboardFeature.toString() + ")();";
  document.documentElement.appendChild(script);
  document.documentElement.removeChild(script);
  window.addon_rwe_loaded = true;
}
