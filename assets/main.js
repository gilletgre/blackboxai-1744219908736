document.addEventListener('DOMContentLoaded', function() {
    // Initialize video autoplay
    const initVideo = () => {
        const video = document.querySelector('video');
        if (video) {
            video.playsInline = true;
            video.muted = true;
            
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    video.controls = true;
                });
            }
        }
    };

    // Enhanced search functionality
    const initSearch = () => {
        const searchInput = document.querySelector('input[type="text"]');
        const searchButton = document.querySelector('.search-button');
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (!searchInput) return;

        const performSearch = () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            serviceCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    highlightMatches(card, searchTerm);
                } else {
                    card.style.display = 'none';
                }
            });
        };

        const highlightMatches = (card, term) => {
            if (!term) return;
            
            const elements = card.querySelectorAll('h3, p');
            elements.forEach(el => {
                const text = el.textContent;
                const regex = new RegExp(term, 'gi');
                el.innerHTML = text.replace(regex, match => 
                    `<span class="bg-yellow-200 rounded px-1">${match}</span>`
                );
            });
        };

        // Event listeners
        searchInput.addEventListener('input', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
        
        if (searchButton) {
            searchButton.addEventListener('click', performSearch);
        }
    };

    // Initialize all features
    initVideo();
    initSearch();
});
