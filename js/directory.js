document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("directory-search");
    const totalCountText = document.getElementById("directory-total-count");
    const gridContainer = document.getElementById("directory-grid-container");

    // Fetch and render directory
    function renderDirectory() {
        const query = searchInput.value.trim().toLowerCase();
        const attendees = Storage.getAttendees();
        
        // Update database count indicator (digits remain untranslated)
        totalCountText.textContent = attendees.length;

        // Filter list (privacy: hides phone/email searches to avoid leak, only name/company/sector)
        const filtered = attendees.filter(attendee => {
            const sectorObj = SECTORS_LIST.find(s => s.value === attendee.sector);
            const sectorText = sectorObj ? Storage.t(sectorObj.key).toLowerCase() : attendee.sector.toLowerCase();
            
            return (
                attendee.name.toLowerCase().includes(query) ||
                attendee.company.toLowerCase().includes(query) ||
                sectorText.includes(query)
            );
        });

        gridContainer.innerHTML = "";

        if (filtered.length === 0) {
            gridContainer.innerHTML = `
                <div class="glass-card" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; color: var(--text-secondary);">
                    <p data-i18n="search_no_results">${Storage.t('search_no_results')}</p>
                </div>
            `;
            return;
        }

        filtered.forEach(attendee => {
            const card = document.createElement("div");
            card.className = "glass-card directory-card";

            const statusBadgeClass = attendee.checkedIn ? "badge badge-checked" : "badge badge-pending";
            const statusText = Storage.t(attendee.checkedIn ? "checkedin_status" : "not_checkedin_status");

            // Sector translation
            const sectorObj = SECTORS_LIST.find(s => s.value === attendee.sector);
            const sectorText = sectorObj ? Storage.t(sectorObj.key) : attendee.sector;

            // Formulate date string
            const regDate = new Date(attendee.registeredAt);
            const timeStr = regDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' ' +
                            String(regDate.getHours()).padStart(2, '0') + ':' + 
                            String(regDate.getMinutes()).padStart(2, '0');

            card.innerHTML = `
                <div>
                    <div class="directory-card-header">
                        <span class="directory-name">${escapeHTML(attendee.name)}</span>
                        <span class="attendee-code" style="font-size: 0.75rem;">${attendee.id}</span>
                    </div>
                    <div class="directory-company">
                        <svg viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
                        <span>${escapeHTML(attendee.company)}</span>
                    </div>
                </div>
                <div class="directory-footer">
                    <span class="sector-tag">${escapeHTML(sectorText)}</span>
                    <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.25rem;">
                        <span class="${statusBadgeClass}">${statusText}</span>
                        <span style="font-size: 0.7rem; opacity: 0.7;">${timeStr}</span>
                    </div>
                </div>
            `;

            gridContainer.appendChild(card);
        });
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // Input listener
    searchInput.addEventListener("input", renderDirectory);

    // Initial render
    renderDirectory();

    // Event updates
    window.addEventListener("expo_db_update", renderDirectory);
    window.addEventListener("expo_settings_update", () => {
        Storage.translatePage();
        renderDirectory();
    });
});
