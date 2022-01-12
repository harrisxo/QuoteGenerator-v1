const quoteContainer = document.getElementById("qoute-quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");


let apiQuotes = [];

// Show Loading 
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading 
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quotes
function newQuote() {
    // Pick a random Quote from apiQuotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author exists
    if (!quote.author) {
        authorText.textContent = "Unbekannt.";
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote lenght for style
    if (quote.text.length > 20) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = quote.text;
}

// Get Quotes from API Reference
async function getQuotes() {
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here!
    }
}

// Tweet den shit
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Loading
getQuotes();
