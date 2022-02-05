const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


const fakeAuthors = ["Kassidy Pham", "Jeffrey Do", "Hanabi Mcgee", "Unknown"] 
let apiQuotes = [];

//Show we are loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Complete loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new quote
function newQuote(){
    loading();
    // Pick a random quote from api quotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // If author is blank, replace with fakeAuthors
    if(!quote.author){
        authorText.textContent = fakeAuthors[Math.floor(Math.random() * fakeAuthors.length)];
    }
    else{
        authorText.textContent = quote.author;
    }
    

    //Check quote length to determine styling
    if(quote.text.length > 100){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
    complete();
};

// Get quotes from API
async function getQuotes(){
    loading();
    const apiURL = "https://type.fit/api/quotes";
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } 
    catch(e){
        alert(e);
    }
};

// Tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; 
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);

twitterBtn.addEventListener('click', tweetQuote);


// ---------------------------------------------------------------------------------
// On Load

getQuotes();