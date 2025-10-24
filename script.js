document.getElementById('feedback-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const rating = document.getElementById('rating').value;
  const comments = document.getElementById('comments').value;
  
  const data = { rating, comments };

  const url = 'https://script.google.com/macros/s/AKfycbx5k27NC_pJvbhQwnPI1_u9HkLVHpyDKpTmo_M8r6p6rpbWtrC8xm4VIh5UL2Ny6s8Y/exec';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
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
