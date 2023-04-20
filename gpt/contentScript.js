function getSelectedText() {
  return window.getSelection().toString();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSelectedText') {
    sendResponse({ selectedText: getSelectedText() });
  }
});
