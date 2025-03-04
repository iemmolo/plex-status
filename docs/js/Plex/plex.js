export class Plex {
    constructor() {
        this.contentElement = document.getElementById('content');
        this.serverContent = document.getElementById('server-status');
        this.lastUpdateElement = document.getElementById('last-update');
    }

    async loadData() {
        try {
            const statusResponse = await fetch('data/status.json');
            const statusData = await statusResponse.json();
            this.displayServerStatus(statusData);

            const mediaResponse = await fetch('data/recent.json');
            const mediaData = await mediaResponse.json();
            this.displayMedia(mediaData);
            this.setupRowClicks();
        } catch (error) {
            console.error('Error loading data:', error);
            this.displayServerStatus({status: 'Offline'}, false);
            this.showError();
        }
    }

    displayServerStatus(data) {
        const isOnline = data.status === 'Online';
        let serverName = 'JackFlixs Media Server';
        let version = '';

        if (data.MediaContainer && data.MediaContainer.Server) {
            const server = data.MediaContainer.Server[0];
            serverName = server.name || serverName;
            version = server.version || '';
        }

        const statusHtml = `
            <blockquote>
                The Server is <span class="status-text ${isOnline ? 'status-online' : 'status-offline'}">${isOnline ? 'Online' : 'Offline'}</span>
                <footer>
                    — ${serverName}${version ? ` (v${version})` : ''}
                    ${data.timestamp ? `<br><small>Last checked: ${new Date(data.timestamp * 1000).toLocaleString()}</small>` : ''}
                </footer>
            </blockquote>
        `;
        this.serverContent.innerHTML = statusHtml;
    }

    displayMedia(data) {
        if (!data || !data.MediaContainer || !data.MediaContainer.Metadata) {
            this.showError("No media data available");
            return;
        }

        const items = data.MediaContainer.Metadata || [];

        const html = `
            <div class="sunken-panel" style="height: auto; width: 100%;">
                <table class="interactive">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Added</th>
                            <th>Type</th>
                            <th>Summary</th>
                            <th>Genre</th>
                            <th>Director</th>
                            <th>Cast</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items.map(item => {
                            const title = this.getFullTitle(item);
                            const addedDate = this.formatDate(item.addedAt);
                            const type = this.getMediaType(item);
                            const summary = this.truncateSummary(item.summary || item.parentSummary || '');
                            const genre = this.getTags(item.Genre);
                            const director = this.getTags(item.Director);
                            const cast = this.getTags(item.Role, 3);
                            return `
                                <tr data-type="${item.type || ''}">
                                    <td>${title}</td>
                                    <td>${addedDate}</td>
                                    <td>${type}</td>
                                    <td>${summary}</td>
                                    <td>${genre}</td>
                                    <td>${director}</td>
                                    <td>${cast}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;

        this.contentElement.innerHTML = html;
    }

    getFullTitle(item) {
        let title = '';
        if (item.parentTitle) {
            title += item.parentTitle + ' - ';
        }
        title += item.title || 'Unknown Title';
        return this.escapeHtml(title);
    }

    getMediaType(item) {
        const type = item.type || '';
        return type.charAt(0).toUpperCase() + type.slice(1);
    }

    getTags(tagArray, limit = 0) {
        if (!tagArray || !Array.isArray(tagArray)) {
            return '';
        }

        let tags = tagArray.map(t => t.tag);

        if (limit > 0 && tags.length > limit) {
            tags = tags.slice(0, limit);
            tags.push('...');
        }

        return this.escapeHtml(tags.join(', '));
    }

    formatDate(timestamp) {
        if (!timestamp) return '';

        try {
            const date = new Date(timestamp * 1000);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        } catch (e) {
            return 'Invalid date';
        }
    }

    truncateSummary(summary) {
        const maxLength = 100;
        if (summary.length <= maxLength) return this.escapeHtml(summary);
        return this.escapeHtml(summary.substring(0, maxLength)) + '...';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    setupRowClicks() {
        const rows = document.querySelectorAll('table.interactive tbody tr');
        rows.forEach(row => {
            row.addEventListener('click', () => {
                const previouslyHighlighted = document.querySelector('tr.highlighted');
                if (previouslyHighlighted) {
                    previouslyHighlighted.classList.remove('highlighted');
                }
                row.classList.add('highlighted');
            });
        });
    }

    showError(message = "Error loading Plex data. Please try again later.") {
        this.contentElement.innerHTML = `
            <div class="error">
                ${message}
            </div>
        `;
    }
}
