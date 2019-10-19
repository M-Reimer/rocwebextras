const input_new_url = document.getElementById("input_new_url");
const button_new_url = document.getElementById("button_new_url");
const button_delete = document.getElementById("button_delete");
const list_urls = document.getElementById("list_urls");

async function OnNewUrlClick() {
  // https://bugzil.la/1589758
  // Adding a new origin will *always* throw an exception.
  // This exception can not be prevented with a "try/catch" construct
  try {
    await browser.permissions.request({origins: [input_new_url.value]});
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
