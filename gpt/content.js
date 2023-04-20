// Listen for a keydown event
document.addEventListener('keydown', function(event) {
    // Check if the user pressed the 'q' key
    if (event.key === 'q') {
      // Get the highlighted text
      const selection = document.getSelection().toString().trim();
      // Send a message to the background script with the selected text
      chrome.runtime.sendMessage({text: selection});
    }
  });
  