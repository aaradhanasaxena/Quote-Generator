const quoteContainer=document.getElementById('quote-generator');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

let apiQuotes = [];
//Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Show complete function
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
 }
//Show New Quote
function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    quoteText.textContent=quote.text;
    authorText.textContent=quote.author;
    // Check quote length to determine styling.
    if(quote.text.length>150){
        quoteText.classList.add("long-quote")
    }
    else{
        quoteText.classList.remove("long-quote")
    }
   complete(); 
}
function tweetQuote(){
    const twitterUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// Get Quotes from API
async function getQuotes(){
    loading();
   
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch(error){
        // Catch Error Here

       console.log("error")
    }
   
}
getQuotes();