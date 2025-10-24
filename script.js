document.getElementById('feedback-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const rating = document.getElementById('rating').value;
  const comments = document.getElementById('comments').value;
  
  const data = { rating, comments };

  const url = 'https://script.google.com/macros/s/AKfycbwOgvWyPcY4L2PaBZ5cSDMxlCix6w3Y2Vwfl7z5aV4/dev';
  
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
