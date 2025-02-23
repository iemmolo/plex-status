class PlexDisplay {
    constructor() {
        this.contentElement = document.getElementById('content');
        this.serverContent = document.getElementById('server-status');
    }

    async loadData() {
        try {
            const statusResponse = await fetch('data/status.json');
            const statusData = await statusResponse.json();
            this.displayServerStatus(statusData, true);

            const mediaResponse = await fetch('data/recent.json');
            const mediaData = await mediaResponse.json();
            this.displayMedia(mediaData);
            this.setupRowClicks();
        } catch (error) {
            console.error('Error loading data:', error);
            this.displayServerStatus(null, false);
            this.showError();
        }
    }

    displayServerStatus(data, isOnline) {
        let serverName = 'Unknown';
        let version = '';

        if (data && data.MediaContainer && data.MediaContainer.Server) {
            const server = data.MediaContainer.Server[0];
            serverName = server.name;
            version = server.version;
        }

        const statusHtml = `
            <blockquote>
                The Server is <span class="status-text ${isOnline ? 'status-online' : 'status-offline'}">${isOnline ? 'Online' : 'Offline'}</span>
                <footer>
                    — ${serverName}${version ? ` (v${version})` : ''}
                </footer>
            </blockquote>
        `;
        this.serverContent.innerHTML = statusHtml;
    }

    displayMedia(data) {
        const items = data.MediaContainer.Metadata || [];
        
        const html = `
            <div class="sunken-panel" style="height: auto; width: 100%;">
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