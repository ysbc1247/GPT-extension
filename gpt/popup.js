document.getElementById('generateQuestion').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      tabs[0].id,
      { code: 'window.getSelection().toString()' },
      (result) => {
        const highlightedText = result[0];
        if (highlightedText) {
          generateQuestion(highlightedText);
        } else {
          document.getElementById('response').innerText = 'No text selected.';
        }
      }
    );
  });
});

async function generateQuestion(text) {
  const response = await callOpenAI(text);
  document.getElementById('response').innerText = response;
}

async function callOpenAI(text) {
  const apiKey = 'your_openai_api_key';
  const url = 'https://api.openai.com/v1/engines/davinci-codex/completions';

  try {
    const prompt = `Generate a question based on the following text: "${text}"`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 50,
        n: 1,
        stop: null,
        temperature: 0.5
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].text.trim();
    } else {
      return 'No question generated. Please try again.';
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return 'Error generating question. Please check the console for details.';
  }
}
