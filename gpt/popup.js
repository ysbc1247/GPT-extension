// Open the extension options page when the icon is clicked
chrome.browserAction.onClicked.addListener(function() {
    chrome.runtime.openOptionsPage();
  });
  