document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('input[type="text"]');
    const searchButton = document.querySelector('.search-button');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (searchInput) {
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            serviceCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                if (searchTerm === '' || cardText.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Search on input
        searchInput.addEventListener('input', function() {
            performSearch();
        });

        // Search on button click
        if (searchButton) {
            searchButton.addEventListener('click', performSearch);
        }

        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function highlightMatches(term) {
        removeHighlights();
        const serviceItems = document.querySelectorAll('.service-item h3, .service-item p');
        serviceItems.forEach(item => {
            const text = item.textContent;
            const regex = new RegExp(term, 'gi');
            const newText = text.replace(regex, match => 
                `<span class="search-highlight">${match}</span>`
            );
            if (newText !== text) {
                item.innerHTML = newText;
            }
        });
    }

    function removeHighlights() {
        document.querySelectorAll('.search-highlight').forEach(highlight => {
            highlight.outerHTML = highlight.innerHTML;
        });
    }
});
