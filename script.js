class FactsApp {
            constructor() {
                this.apiUrl = 'tmzQqPk8v0EuGfP1d7pWBw==sTExHT0IOuEvNul1';
                this.factsContainer = document.getElementById('factsContainer');
                this.fetchBtn = document.getElementById('fetchBtn');
                this.fetchMultipleBtn = document.getElementById('fetchMultipleBtn');
                this.clearBtn = document.getElementById('clearBtn');
                this.factCountEl = document.getElementById('factCount');
                this.totalCharsEl = document.getElementById('totalChars');
                this.avgLengthEl = document.getElementById('avgLength');
                
                this.facts = [];
                this.totalCharacters = 0;
                
                this.init();
            }

            init() {
                this.fetchBtn.addEventListener('click', () => this.fetchSingleFact());
                this.fetchMultipleBtn.addEventListener('click', () => this.fetchMultipleFacts(5));
                this.clearBtn.addEventListener('click', () => this.clearFacts());
            }

            async fetchFacts() {
                try {
                    const response = await fetch(this.apiUrl);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error('Error fetching facts:', error);
                    throw error;
                }
            }

            async fetchSingleFact() {
                this.showLoading();
                try {
                    const facts = await this.fetchFacts();
                    if (facts && facts.length > 0) {
                        this.displayFacts([facts[0]], true);
                    }
                } catch (error) {
                    this.showError('Failed to fetch fact. Please try again.');
                }
            }

            async fetchMultipleFacts(count) {
                this.showLoading();
                try {
                    const allFacts = [];
                    for (let i = 0; i < count; i++) {
                        const facts = await this.fetchFacts();
                        if (facts && facts.length > 0) {
                            allFacts.push(facts[0]);
                        }
                        // Small delay between requests to be respectful to the API
                        if (i < count - 1) {
                            await new Promise(resolve => setTimeout(resolve, 100));
                        }
                    }
                    if (allFacts.length > 0) {
                        this.displayFacts(allFacts, true);
                    }
                } catch (error) {
                    this.showError('Failed to fetch facts. Please try again.');
                }
            }

            displayFacts(newFacts, replace = false) {
                if (replace) {
                    this.facts = [];
                    this.totalCharacters = 0;
                    this.factsContainer.innerHTML = '';
                }

                newFacts.forEach(factObj => {
                    const fact = factObj.fact;
                    this.facts.push(fact);
                    this.totalCharacters += fact.length;

                    const factCard = document.createElement('div');
                    factCard.className = 'fact-card fade-in';
                    factCard.innerHTML = `<div class="fact-text">${fact}</div>`;
                    
                    this.factsContainer.appendChild(factCard);
                });

                this.updateStats();
            }

            showLoading() {
                this.factsContainer.innerHTML = '<div class="loading">Loading amazing facts...</div>';
            }

            showError(message) {
                this.factsContainer.innerHTML = `<div class="error">${message}</div>`;
            }

            clearFacts() {
                this.facts = [];
                this.totalCharacters = 0;
                this.factsContainer.innerHTML = `
                    <div class="fact-card">
                        <div class="fact-text">Click "Get New Fact" to discover amazing facts!</div>
                    </div>
                `;
                this.updateStats();
            }

            updateStats() {
                this.factCountEl.textContent = this.facts.length;
                this.totalCharsEl.textContent = this.totalCharacters;
                this.avgLengthEl.textContent = this.facts.length > 0 
                    ? Math.round(this.totalCharacters / this.facts.length)
                    : 0;
            }
        }

        // Initialize the app when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new FactsApp();
        });
