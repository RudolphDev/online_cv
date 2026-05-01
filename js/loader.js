/**
 * Data Loader Module
 * Handles dynamic loading of JSON data for publications and communications
 */

(function() {
    'use strict';

    const DATA_PATH = 'data';

    /**
     * Format authors list for display
     * @param {Array} authors - Array of author objects or strings
     * @returns {string} Formatted authors string
     */
    function formatAuthors(authors) {
        if (!authors || authors.length === 0) return '';
        
        // Handle different author formats
        const authorNames = authors.map(author => {
            if (typeof author === 'string') {
                return author;
            }
            if (author.literal) {
                return author.literal;
            }
            if (author.family && author.given) {
                return `${author.given} ${author.family}`;
            }
            if (author.family) {
                return author.family;
            }
            if (author.given) {
                return author.given;
            }
            return '';
        }).filter(name => name.trim() !== '');
        
        // Join with commas and highlight Thomas Renne
        return authorNames.map(name => {
            if (name.includes('Thomas Renne') || name.includes('Renne Thomas')) {
                return `<strong>${name}</strong>`;
            }
            return name;
        }).join(', ');
    }

    /**
     * Format publication authors - extract just the names
     * @param {Array} authors - Array of author objects
     * @returns {string} Formatted authors string
     */
    function formatPublicationAuthors(authors) {
        if (!authors || authors.length === 0) return '';
        
        const authorNames = authors.map(author => {
            if (typeof author === 'string') {
                return author;
            }
            if (author.literal) {
                return author.literal;
            }
            if (author.family && author.given) {
                return `${author.given} ${author.family}`;
            }
            if (author.family) {
                return author.family;
            }
            return author.given || '';
        }).filter(name => name.trim() !== '');
        
        // Highlight Thomas Renne
        return authorNames.map(name => {
            if (name.includes('Thomas Renne') || name.includes('Renne Thomas')) {
                return `<strong>${name}</strong>`;
            }
            return name;
        }).join(', ');
    }

    /**
     * Create a publication card element
     * @param {Object} pub - Publication data
     * @returns {HTMLElement} Publication card element
     */
    function createPublicationCard(pub) {
        const card = document.createElement('article');
        card.className = 'publication-card animate-fade-in';
        
        // Extract authors
        const authors = formatPublicationAuthors(pub.author);
        
        // Extract journal info
        const journal = pub['container-title'] || pub.journal || '';
        const year = pub.issued ? pub.issued['date-parts'][0][0] : pub.year || '';
        
        // Extract DOI and links
        const doi = pub.DOI || '';
        const url = pub.URL || pub.url || '';
        
        // Build the card HTML
        let html = `
            <h3 class="publication-title">${pub.title || 'Untitled'}</h3>
        `;
        
        if (authors) {
            html += `<p class="publication-authors">${authors}</p>`;
        }
        
        if (journal) {
            html += `<p class="publication-journal">${journal}</p>`;
        }
        
        // Meta information
        const metaParts = [];
        if (year) {
            metaParts.push(`<span>${year}</span>`);
        }
        
        if (doi) {
            metaParts.push(`<span><a href="https://doi.org/${doi}" target="_blank" rel="noopener noreferrer" class="publication-link">DOI</a></span>`);
        }
        
        if (url) {
            metaParts.push(`<span><a href="${url}" target="_blank" rel="noopener noreferrer" class="publication-link">Link</a></span>`);
        }
        
        if (metaParts.length > 0) {
            html += `<div class="publication-meta">${metaParts.join('')}</div>`;
        }
        
        card.innerHTML = html;
        return card;
    }

    /**
     * Create a communication card element
     * @param {Object} comm - Communication data
     * @returns {HTMLElement} Communication card element
     */
    function createCommunicationCard(comm) {
        const card = document.createElement('article');
        card.className = 'publication-card animate-fade-in';
        
        // Extract authors
        const authors = formatAuthors(comm.author);
        
        // Extract conference info
        const conference = comm['container-title'] || comm.conference || comm['event'] || '';
        const year = comm.issued ? comm.issued['date-parts'][0][0] : comm.year || '';
        const place = comm.publisher || comm.place || '';
        const url = comm.URL || comm.url || comm.link || '';
        
        // Build the card HTML
        let html = `
            <h3 class="publication-title">${comm.title || 'Untitled'}</h3>
        `;
        
        if (authors) {
            html += `<p class="publication-authors">${authors}</p>`;
        }
        
        if (conference) {
            html += `<p class="publication-journal">${conference}</p>`;
        }
        
        // Meta information
        const metaParts = [];
        if (year) {
            metaParts.push(`<span>${year}</span>`);
        }
        
        if (place) {
            metaParts.push(`<span>${place}</span>`);
        }
        
        if (url) {
            metaParts.push(`<span><a href="${url}" target="_blank" rel="noopener noreferrer" class="publication-link">Link</a></span>`);
        }
        
        if (metaParts.length > 0) {
            html += `<div class="publication-meta">${metaParts.join('')}</div>`;
        }
        
        card.innerHTML = html;
        return card;
    }

    /**
     * Load publications from JSON file
     * @param {string} filePath - Path to the JSON file
     * @param {string} containerId - ID of the container element
     */
    function loadPublications(filePath, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container with ID ${containerId} not found`);
            return;
        }
        
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    console.warn('Publications data is not an array');
                    return;
                }
                
                // Clear loading state
                container.innerHTML = '';
                
                // Create cards for each publication
                data.forEach(pub => {
                    const card = createPublicationCard(pub);
                    container.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Error loading publications:', error);
                container.innerHTML = `
                    <div class="alert alert-error">
                        <iconify-icon icon="ph:warning-circle" class="icon"></iconify-icon>
                        <span>Error loading publications. Please try again later.</span>
                    </div>
                `;
            });
    }

    /**
     * Load communications from JSON file
     * @param {string} filePath - Path to the JSON file
     * @param {string} containerId - ID of the container element
     */
    function loadCommunications(filePath, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container with ID ${containerId} not found`);
            return;
        }
        
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    console.warn('Communications data is not an array');
                    return;
                }
                
                // Clear loading state
                container.innerHTML = '';
                
                // Create cards for each communication
                data.forEach(comm => {
                    const card = createCommunicationCard(comm);
                    container.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Error loading communications:', error);
                container.innerHTML = `
                    <div class="alert alert-error">
                        <iconify-icon icon="ph:warning-circle" class="icon"></iconify-icon>
                        <span>Error loading communications. Please try again later.</span>
                    </div>
                `;
            });
    }

    /**
     * Initialize the data loader
     */
    function initLoader() {
        // Load publications if container exists
        const pubContainer = document.getElementById('publication-entries');
        if (pubContainer) {
            // Show loading state
            pubContainer.innerHTML = `
                <div class="text-center py-8">
                    <div class="spinner mx-auto mb-4"></div>
                    <p class="text-muted">Loading publications...</p>
                </div>
            `;
            
            loadPublications(`${DATA_PATH}/publis.json`, 'publication-entries');
        }
        
        // Load communications if container exists
        const commContainer = document.getElementById('communication-entries');
        if (commContainer) {
            // Show loading state
            commContainer.innerHTML = `
                <div class="text-center py-8">
                    <div class="spinner mx-auto mb-4"></div>
                    <p class="text-muted">Loading communications...</p>
                </div>
            `;
            
            loadCommunications(`${DATA_PATH}/communications.json`, 'communication-entries');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoader);
    } else {
        initLoader();
    }

    // Expose API globally
    window.DataLoader = {
        loadPublications,
        loadCommunications,
        createPublicationCard,
        createCommunicationCard,
        init: initLoader
    };
})();
