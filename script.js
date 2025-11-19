  <script>
    const feedbackURL = 'https://script.google.com/macros/s/AKfycbxcP2QTUCBBn3HTLxXUi0VKFQyWNEWkdFTLF1kw-VNbXQSbNdYMsJCKA69wQGDcrP1s/exec';
    const partsURL = feedbackURL; 

    document.getElementById('feedback-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const rating = document.getElementById('rating').value;
      const comments = document.getElementById('comments').value;
      const data = { type: 'feedback', rating, comments };

      try {
        const response = await fetch(feedbackURL, {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data)
        });

        if (response.ok) {
          document.getElementById('message').textContent = "✅ Feedback submitted!";
          event.target.reset();
        } else {
          document.getElementById('message').textContent = "⚠️ Error submitting feedback.";
        }
      } catch (error) {
        document.getElementById('message').textContent = "⚠️ Connection error.";
        console.error(error);
      }
    });

    document.getElementById('part-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const part = document.getElementById('part').value;
      const quantity = document.getElementById('quantity').value;
      const reason = document.getElementById('reason').value;
      const data = { type: 'part_request', name, part, quantity, reason };

      try {
        const response = await fetch(partsURL, {
          method: 'POST',
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          document.getElementById('part-message').textContent = "✅ Part request submitted!";
          event.target.reset();
        } else {
          document.getElementById('part-message').textContent = "⚠️ Error submitting request.";
        }
      } catch (error) {
        document.getElementById('part-message').textContent = "⚠️ Connection error.";
        console.error(error);
      }
    });
