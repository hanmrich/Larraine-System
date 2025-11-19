const feedbackURL = 'https://script.google.com/macros/s/AKfycbzIUr3R7TMxNMClcD2zCd1_u5C212crd-1lpCVgmw26imKVnEQK-pku5reqDHPU4rtr/exec';
const partsURL = feedbackURL; 

document.getElementById('feedback-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const rating = document.getElementById('rating').value;
  const comments = document.getElementById('comments').value;
  const data = { type: 'feedback', rating, comments };
  
  console.log('Sending feedback:', data);
  document.getElementById('message').textContent = "⏳ Submitting...";
  
  try {
    const response = await fetch(feedbackURL, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });
    
    console.log('Response received');
    // With no-cors mode, we can't read the response, but if no error thrown, it likely worked
    document.getElementById('message').textContent = "✅ Feedback submitted!";
    event.target.reset();
    
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('message').textContent = "⚠️ Connection error: " + error.message;
  }
});

document.getElementById('part-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const part = document.getElementById('part').value;
  const quantity = document.getElementById('quantity').value;
  const reason = document.getElementById('reason').value;
  const data = { type: 'part_request', name, part, quantity, reason };
  
  console.log('Sending part request:', data);
  document.getElementById('part-message').textContent = "⏳ Submitting...";
  
  try {
    const response = await fetch(partsURL, {
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(data)
    });
    
    console.log('Response received');
    document.getElementById('part-message').textContent = "✅ Part request submitted!";
    event.target.reset();
    
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('part-message').textContent = "⚠️ Connection error: " + error.message;
  }
});
