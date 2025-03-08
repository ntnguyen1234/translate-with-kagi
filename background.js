/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

browser.menus.create({
  id: "translate-kagi",
  title: "Translate with Kagi...",
  contexts: ["all"],
  icons: {
    "32": "icons/favicon-32x32.png"
  }
}, onCreated);

browser.menus.onClicked.addListener((info, tab) => {
  console.log(info, tab);
  const selectedText = info.selectionText;
  browser.tabs.create({
    "url": "https://translate.kagi.com/" + (selectedText ? "?text=" + encodeURIComponent(selectedText) : encodeURIComponent(info.pageUrl))
  })
});