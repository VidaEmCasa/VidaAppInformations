// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize FAQ functionality
    initializeFAQ();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize responsive logo
    initializeResponsiveLogo();
    
    // Initialize scroll animations
    initializeScrollAnimations();
});

// FAQ Accordion functionality
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = this.classList.contains('active');
            
            // Close all other FAQ items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.parentElement.querySelector('.faq-answer').classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            if (isActive) {
                this.classList.remove('active');
                answer.classList.remove('active');
            } else {
                this.classList.add('active');
                answer.classList.add('active');
                
                // Smooth scroll to question
                setTimeout(() => {
                    this.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 300);
            }
            
            // Analytics tracking
            const questionText = this.querySelector('span').textContent;
            console.log(`FAQ ${isActive ? 'closed' : 'opened'}: ${questionText}`);
        });
        
        // Keyboard navigation
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');
    const faqCategories = document.querySelectorAll('.faq-category');
    const noResults = document.getElementById('noResults');
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        // Show/hide clear button
        if (searchTerm) {
            clearButton.style.display = 'block';
        } else {
            clearButton.style.display = 'none';
        }
        
        // Debounce search
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(searchTerm);
        }, 300);
    });
    
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        searchInput.focus();
        this.style.display = 'none';
        performSearch('');
    });
    
    function performSearch(searchTerm) {
        let hasResults = false;
        
        faqCategories.forEach(category => {
            const categoryTitle = category.querySelector('.category-title').textContent.toLowerCase();
            const faqItems = category.querySelectorAll('.faq-item');
            let categoryHasResults = false;
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (!searchTerm || 
                    question.includes(searchTerm) || 
                    answer.includes(searchTerm) || 
                    categoryTitle.includes(searchTerm)) {
                    
                    item.classList.remove('hidden');
                    categoryHasResults = true;
                    hasResults = true;
                    
                    // Highlight search terms
                    if (searchTerm) {
                        highlightSearchTerm(item, searchTerm);
                    } else {
                        removeHighlight(item);
                    }
                } else {
                    item.classList.add('hidden');
                }
            });
            
            // Show/hide entire category
            if (categoryHasResults) {
                category.classList.remove('hidden');
            } else {
                category.classList.add('hidden');
            }
        });
        
        // Show/hide no results message
        if (hasResults || !searchTerm) {
            noResults.style.display = 'none';
        } else {
            noResults.style.display = 'block';
        }
    }
    
    function highlightSearchTerm(item, searchTerm) {
        const questionSpan = item.querySelector('.faq-question span');
        const answerDiv = item.querySelector('.faq-answer');
        
        // Remove existing highlights
        removeHighlight(item);
        
        // Highlight in question
        const questionText = questionSpan.textContent;
        const highlightedQuestion = questionText.replace(
            new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi'),
            '<span class="highlight">$1</span>'
        );
        questionSpan.innerHTML = highlightedQuestion;
        
        // Highlight in answer
        const answerText = answerDiv.innerHTML;
        const highlightedAnswer = answerText.replace(
            new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi'),
            '<span class="highlight">$1</span>'
        );
        answerDiv.innerHTML = highlightedAnswer;
    }
    
    function removeHighlight(item) {
        const highlights = item.querySelectorAll('.highlight');
        highlights.forEach(highlight => {
            highlight.outerHTML = highlight.innerHTML;
        });
    }
    
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

// Responsive logo functionality
function initializeResponsiveLogo() {
    const logoFull = document.getElementById('logo-full');
    const logoToggle = document.getElementById('logo-toggle');
    
    function updateLogo() {
        if (window.innerWidth <= 767) {
            logoFull.style.display = 'none';
            logoToggle.style.display = 'block';
        } else {
            logoFull.style.display = 'block';
            logoToggle.style.display = 'none';
        }
    }
    
    // Initial check
    updateLogo();
    
    // Update on resize
    window.addEventListener('resize', updateLogo);
}

// Scroll animations
function initializeScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe FAQ categories
        const categories = document.querySelectorAll('.faq-category');
        categories.forEach((category, index) => {
            category.style.opacity = '0';
            category.style.transform = 'translateY(20px)';
            category.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(category);
        });
    }
}

// Utility function to get URL parameters (for deep linking to specific questions)
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Auto-open FAQ item if specified in URL
document.addEventListener('DOMContentLoaded', function() {
    const questionParam = getUrlParameter('question');
    if (questionParam) {
        const targetQuestion = document.querySelector(`[data-question="${questionParam}"]`);
        if (targetQuestion) {
            setTimeout(() => {
                targetQuestion.click();
                targetQuestion.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 500);
        }
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput.value) {
            searchInput.value = '';
            document.getElementById('clearSearch').click();
        }
    }
});