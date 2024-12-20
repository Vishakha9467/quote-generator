document.getElementById('quote-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const category = document.getElementById('category').value;

    const response = await fetch('/get_quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category }),
    });

    const data = await response.json();
    document.getElementById('quote-box').style.display = 'block';
    document.getElementById('quote').innerText = data.quote;
    document.getElementById('author').innerText = `- ${data.author}`;
});