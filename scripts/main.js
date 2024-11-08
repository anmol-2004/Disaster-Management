document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '7c7ceab30c0f456a9a09bf43c9ad841e';
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const newsCardsContainer = document.getElementById('news-cards');
    const fromDateInput = document.getElementById('from-date');
    const toDateInput = document.getElementById('to-date');
    
    let search = "disaster events india"; // Initial search query
    let fromDate = getDateNdaysAgo(10);
    let toDate = getCurrentDate();
    
    // Set default values for date inputs
    fromDateInput.value = fromDate;
    toDateInput.value = toDate;

    // Function to get the current date in YYYY-MM-DD format
    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Function to get a date N days ago in YYYY-MM-DD format
    function getDateNdaysAgo(days) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Function to fetch data from the API
    async function getData(query, from, to) {
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=${from}&to=${to}&apiKey=${API_KEY}`);
            const jsonData = await response.json();
            const articles = jsonData.articles.slice(0, 9); // Get the top 10 articles
            displayNews(articles);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Function to display news articles in cards
    function displayNews(articles) {
        newsCardsContainer.innerHTML = ''; // Clear previous news
        articles.forEach(article => {
            const card = document.createElement('div');
            card.classList.add('news-card');
            card.innerHTML = `
                <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" alt="${article.title}">
                <div class="news-card-content">
                    <h3>${article.title}</h3>
                    <p>${article.description || 'No description available'}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                </div>
            `;
            newsCardsContainer.appendChild(card);
        });
    }

    // Event listener for the search button
    searchButton.addEventListener('click', () => {
        search = searchInput.value;
        fromDate = fromDateInput.value;
        toDate = toDateInput.value;
        getData(search, fromDate, toDate);
    });

    // Fetch initial data on page load
    getData(search, fromDate, toDate);
});

//Guidelines
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close modal when clicking outside of the modal content
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

const chatbotToggler = document.querySelector(".chatbot-toggler");
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"))

var style = document.createElement('style');
var position = 'right';

style.innerHTML = `@keyframes my-animation{
    0%{${position}:-${document.querySelector(".text").offsetWidth + 10}px;}
    100%{${position}: 100%;}
}`;
document.head.append(style)
