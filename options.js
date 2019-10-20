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

const input_new_url = document.getElementById("input_new_url");
const button_new_url = document.getElementById("button_new_url");
const button_delete = document.getElementById("button_delete");
const list_urls = document.getElementById("list_urls");

async function OnNewUrlClick() {
  // Get user input and check that it's not empty
  let url = input_new_url.value;
  if (!url)
    return;

  // We don't want the user to have to care about passing a valid match pattern
  // So filter out parts of the URL that are not valid for a match pattern
  url = new URL(url);
  url.hash = "";
  url.port = "";
  url.search = "";
  url.username = "";
  url.password = "";
  url = url.toString();

  // https://bugzil.la/1589758
  // Adding a new origin will *always* throw an exception.
  // This exception can not be prevented with a "try/catch" construct
  try {
    await browser.permissions.request({origins: [url]});
  } catch(e) {}
}

async function OnDeleteClick() {
  if (!list_urls.value)
    return;

  await browser.permissions.remove({origins: [list_urls.value]});
  FillList();
}

// This function is called periodically to keep the list updated
let origins_count = 0;
async function FillList() {
  const permissions = await browser.permissions.getAll();
  if (!permissions.origins)
    return;
  if (permissions.origins.length != origins_count) {
    while (list_urls.firstChild)
      list_urls.removeChild(list_urls.firstChild);

    permissions.origins.forEach((origin) => {
      const option = document.createElement("option");
      option.value = origin;
      option.innerText = origin;
      list_urls.appendChild(option);
    });
    origins_count = permissions.origins.length;
  }
}

function Init() {
  button_new_url.addEventListener("click", OnNewUrlClick);
  button_delete.addEventListener("click", OnDeleteClick);

  // https://bugzil.la/1589758
  // As there is no way to know when a new origin was added (always throws
  // exception) we set up polling here to keep the list updated
  setInterval(FillList, 500);
}

Init();
