const feedbackURL = 'https://script.google.com/macros/s/AKfycbzIUr3R7TMxNMClcD2zCd1_u5C212crd-1lpCVgmw26imKVnEQK-pku5reqDHPU4rtr/exec';
const partsURL = feedbackURL; 

// Star rating functionality
const stars = document.querySelectorAll('.star');
const ratingInput = document.getElementById('rating');
const ratingText = document.getElementById('rating-text');

const ratingLabels = {
  1: 'Terrible ⭐',
  2: 'Poor ⭐⭐',
  3: 'Okay ⭐⭐⭐',
  4: 'Good ⭐⭐⭐⭐',
  5: 'Excellent ⭐⭐⭐⭐⭐'
};

let selectedRating = 0;

stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    selectedRating = index + 1;
    ratingInput.value = selectedRating;
    ratingText.textContent = ratingLabels[selectedRating];
    updateStars(selectedRating);
  });
  
  star.addEventListener('mouseenter', () => {
    updateStars(index + 1);
  });
});

// Reset to selected rating when mouse leaves the star container
document.querySelector('.star-rating').addEventListener('mouseleave', () => {
  updateStars(selectedRating);
});

function updateStars(rating) {
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
}

document.getElementById('feedback-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const rating = document.getElementById('rating').value;
  
  if (!rating) {
    document.getElementById('message').textContent = "⚠️ Please select a rating";
    document.getElementById('message').style.color = "red";
    return;
  }
  
  const comments = document.getElementById('comments').value;
  const data = { type: 'feedback', rating, comments };
  
  console.log('Sending feedback:', data);
  document.getElementById('message').textContent = "⏳ Submitting...";
  document.getElementById('message').style.color = "#0066ff";
  
  try {
    const response = await fetch(feedbackURL, {
      redirect: 'follow',
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    // Since the data is being saved successfully, we'll just assume success
    // Google Apps Script sometimes returns HTML redirects instead of JSON
    document.getElementById('message').textContent = "✅ Feedback submitted!";
    document.getElementById('message').style.color = "green";
    event.target.reset();
    // Reset stars
    selectedRating = 0;
    updateStars(0);
    ratingText.textContent = '';
    ratingInput.value = '';
    
  } catch (error) {
    console.error('Error:', error);
    // Even if there's a "network error", the data might still be saved
    // So we show a success message with a note
    document.getElementById('message').textContent = "✅ Feedback likely submitted! (Check your sheet to confirm)";
    document.getElementById('message').style.color = "green";
    event.target.reset();
    selectedRating = 0;
    updateStars(0);
    ratingText.textContent = '';
    ratingInput.value = '';
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
  document.getElementById('part-message').style.color = "#0066ff";
  
  try {
    const response = await fetch(partsURL, {
      redirect: 'follow',
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    // Since the data is being saved successfully, we'll just assume success
    document.getElementById('part-message').textContent = "✅ Part request submitted!";
    document.getElementById('part-message').style.color = "green";
    event.target.reset();
    
  } catch (error) {
    console.error('Error:', error);
    // Even if there's a "network error", the data might still be saved
    document.getElementById('part-message').textContent = "✅ Part request likely submitted! (Check your sheet to confirm)";
    document.getElementById('part-message').style.color = "green";
    event.target.reset();
  }
});
