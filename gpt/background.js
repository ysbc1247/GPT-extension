// Listen for messages from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Check if the message contains text
    if (request.text && request.text.length > 0) {
      // Make a request to the OpenAI API
      fetch('https://api.openai.com/v1/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          question: request.text,
          model: 'davinci',
          examples_context: 'I need help with the following problem:',
        })
      })
        .then(response => response.json())
        .then(data => {
          // Get the first answer text
          const answerText = data.answers[0].text;
          // Copy the answer text to the clipboard
          navigator.clipboard.writeText(answerText)
            .then(() => {
              console.log(`Copied "${answerText}" to the clipboard.`);
            })
            .catch(error => {
              console.error(`Failed to copy text: ${error}`);
            });
        })
        .catch(error => {
          console.error(`Failed to get answer: ${error}`);
        });
    }
  });
  