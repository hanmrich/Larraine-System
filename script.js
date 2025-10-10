document.getElementById('feedback-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const rating = document.getElementById('rating').value;
  const comments = document.getElementById('comments').value;
  
  const data = { rating, comments };
  
  // 🚨 Replace this with your own Google Apps Script URL when you set it up
  const url = 'https://script.google.com/macros/s/AKfycbxAmiVfqm_0LlEES-dvGY29abnlVHL3l1cnALGrbCgO85d2xHSWz4OkKbUGycF335zY/exec';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      document.getElementById('message').textContent = "✅ Feedback submitted!";
      document.getElementById('feedback-form').reset();
    } else {
      document.getElementById('message').textContent = "⚠️ Error submitting feedback.";
    }
  } catch (error) {
    document.getElementById('message').textContent = "⚠️ Connection error.";
    console.error(error);
  }
});
