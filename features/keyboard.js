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

// Keyboard handler for RocWeb.
// So far only basic features. This handler is meant to be used with an
// Arduino-based hardware rotary encoder device which needs to be programmed
// to send the keys "+", "-" and "*"
function KeyboardFeature() {
  function OnKeyPress(aEvent) {
    var popup = document.getElementById("popupThrottle-popup");
    if (!popup.classList.contains("ui-popup-active"))
      return;

    switch(aEvent.code) {
    case "NumpadAdd":
      //console.log("Rechts");
      onVUp();
      break;
    case "NumpadSubtract":
      //console.log("Links");
      onVDown();
      break;
    case "NumpadMultiply":
      //console.log("Druck");
      onDirection();
      break;
    }
  }

  document.addEventListener("keypress", OnKeyPress);
}
