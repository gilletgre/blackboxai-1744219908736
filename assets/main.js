document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('input[type="text"]');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput) {
        // Search on input
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            if (searchTerm.length > 2) {
                highlightMatches(searchTerm);
            } else {
                removeHighlights();
            }
        });

        // Search on button click
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                const searchTerm = searchInput.value.toLowerCase();
                if (searchTerm.length > 0) {
                    highlightMatches(searchTerm);
                }
            });
        }

        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.toLowerCase();
                if (searchTerm.length > 0) {
                    highlightMatches(searchTerm);
                }
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
