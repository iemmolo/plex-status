class PlexDisplay {
    constructor() {
        this.contentElement = document.getElementById('content');
    }

    async loadData() {
        try {
            const response = await fetch('data/recent.json');
            const data = await response.json();
            this.displayMedia(data);
            this.setupRowClicks();
        } catch (error) {
            console.error('Error loading data:', error);
            this.showError();
        }
    }

    displayMedia(data) {
        const items = data.MediaContainer.Metadata || [];
        
        const html = `
            <style>
                tr.highlighted {
                    background-color: #000080 !important;
                    color: white !important;
                }
                table.interactive tbody tr {
                    cursor: pointer;
                }
            </style>
            <div class="sunken-panel" style="height: 120px; width: 100%;">
                <table class="interactive">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Added</th>
                            <th>Year</th>
                            <th>Summary</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items.map(item => `
                            <tr>
                                <td>${(item.parentTitle ? item.parentTitle + ' ' : '') + (item.title || '')}</td>
                                <td>${item.addedAt ? new Date(item.addedAt * 1000).toLocaleString() : 'Unknown'}</td>
                                <td>${item.year || item.parentYear || 'No idea'}</td>
                                <td>${item.summary || item.parentSummary || 'Roll the dice'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        this.contentElement.innerHTML = html;
    }

    setupRowClicks() {
        const rows = document.querySelectorAll('table.interactive tbody tr');
        rows.forEach(row => {
            row.addEventListener('click', () => {
                // Remove highlight from any previously highlighted row
                const previouslyHighlighted = document.querySelector('tr.highlighted');
                if (previouslyHighlighted) {
                    previouslyHighlighted.classList.remove('highlighted');
                }
                // Add highlight to clicked row
                row.classList.add('highlighted');
            });
        });
    }

    showError() {
        this.contentElement.innerHTML = `
            <div class="error">
                Error loading Plex data. Please try again later.
            </div>
        `;
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const plex = new PlexDisplay();
    plex.loadData();
});