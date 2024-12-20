from flask import Flask, render_template, request, jsonify
import csv
import random

app = Flask(__name__)

# Load quotes from the CSV file
def load_quotes():
    with open('quotes.csv', 'r') as file:
        reader = csv.DictReader(file)
        return list(reader)

quotes = load_quotes()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_quote', methods=['POST'])
def get_quote():
    data = request.get_json()
    category = data.get('category', '').lower()
    filtered_quotes = [q for q in quotes if category in q['category'].lower()]
    if filtered_quotes:
        quote = random.choice(filtered_quotes)
    else:
        quote = random.choice(quotes)  # Default to random quote if no match
    return jsonify({'quote': quote['quote'], 'author': quote['author']})

if __name__ == '__main__':
    app.run(debug=True)