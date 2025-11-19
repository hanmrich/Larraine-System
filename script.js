const feedbackURL = 'https://script.google.com/macros/s/AKfycbziWUGUlGL9ATws8P5barI2JvIrQnB7XYaWYS3GdPcS89ws1OCXe1L_5sVOfVvVXojE/exec';
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
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    console.log('Response:', result);
    
    if (result.status === 'success') {
      document.getElementById('message').textContent = "✅ Feedback submitted!";
      document.getElementById('message').style.color = "green";
      event.target.reset();
      // Reset stars
      selectedRating = 0;
      updateStars(0);
      ratingText.textContent = '';
      ratingInput.value = '';
    } else {
      document.getElementById('message').textContent = "⚠️ Error: " + result.message;
      document.getElementById('message').style.color = "red";
    }
    
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('message').textContent = "⚠️ Connection error: " + error.message;
    document.getElementById('message').style.color = "red";
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
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    console.log('Response:', result);
    
    if (result.status === 'success') {
      document.getElementById('part-message').textContent = "✅ Part request submitted!";
      document.getElementById('part-message').style.color = "green";
      event.target.reset();
    } else {
      document.getElementById('part-message').textContent = "⚠️ Error: " + result.message;
      document.getElementById('part-message').style.color = "red";
    }
    
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('part-message').textContent = "⚠️ Connection error: " + error.message;
    document.getElementById('part-message').style.color = "red";
  }
});
