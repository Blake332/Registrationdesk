document.addEventListener("DOMContentLoaded", () => {
    // Auth Elements
    const lockScreen = document.getElementById("admin-lock-screen");
    const dashboardContainer = document.getElementById("admin-dashboard-container");
    const loginForm = document.getElementById("admin-login-form");
    const loginPassInput = document.getElementById("login-password");
    const logoutBtn = document.getElementById("btn-admin-logout");

    // Change Password Elements
    const passwordForm = document.getElementById("password-change-form");
    const currPassInput = document.getElementById("password-current");
    const newPassInput = document.getElementById("password-new");

    // Settings Elements
    const titleInput = document.getElementById("settings-title");
    const dateInput = document.getElementById("settings-date");
    const settingsForm = document.getElementById("settings-form");

    // Metrics Elements
    const metricTotal = document.getElementById("metric-total");
    const metricChecked = document.getElementById("metric-checked");
    const metricRate = document.getElementById("metric-rate");

    // Table Elements
    const tableBody = document.getElementById("admin-table-body");
    const tableSearch = document.getElementById("admin-search");

    // Utilities
    const addMockBtn = document.getElementById("btn-add-mock");
    const clearDbBtn = document.getElementById("btn-clear-db");
    const exportCsvBtn = document.getElementById("btn-export-csv");
    const importJsonInput = document.getElementById("import-json-file");

    // Modal
    const editModal = document.getElementById("edit-modal");
    const editForm = document.getElementById("edit-form");
    const editIdInput = document.getElementById("edit-id");
    const editNameInput = document.getElementById("edit-name");
    const editCompanyInput = document.getElementById("edit-company");
    const editEmailInput = document.getElementById("edit-email");
    const editPhoneInput = document.getElementById("edit-phone");
    const editSectorSelect = document.getElementById("edit-sector");
    const modalCloseX = document.getElementById("modal-close-x");
    const modalCancelBtn = document.getElementById("modal-cancel-btn");

    // Check session authentication status
    function checkAuthentication() {
        const isAuth = sessionStorage.getItem("admin_session_auth") === "true";
        if (isAuth) {
            lockScreen.style.display = "none";
            dashboardContainer.style.display = "block";
            initializeDashboard();
        } else {
            lockScreen.style.display = "flex";
            dashboardContainer.style.display = "none";
        }
    }

    // Login Form Submit
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const enteredPassword = loginPassInput.value;
        const correctPassword = Storage.getSettings().adminPassword;

        if (enteredPassword === correctPassword) {
            sessionStorage.setItem("admin_session_auth", "true");
            lockScreen.style.display = "none";
            dashboardContainer.style.display = "block";
            initializeDashboard();
            loginPassInput.value = "";
            Toast.show(Storage.getCurrentLanguage() === 'zh' ? "欢迎回来，管理员！" : "Access granted. Welcome back!", "success");
        } else {
            loginPassInput.value = "";
            Toast.show(Storage.t('err_wrong_pass'), "error");
        }
    });

    // Logout
    logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("admin_session_auth");
        location.reload();
    });

    // Change Password Form Submit
    passwordForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const currPass = currPassInput.value;
        const newPass = newPassInput.value;
        const settings = Storage.getSettings();

        if (currPass !== settings.adminPassword) {
            Toast.show(Storage.t('err_curr_pass'), "error");
            currPassInput.value = "";
            return;
        }

        if (newPass.trim() === "") {
            Toast.show("Password cannot be blank", "error");
            return;
        }

        // Save password update in settings
        settings.adminPassword = newPass;
        Storage.saveSettings(settings);

        Toast.show(Storage.t('msg_pass_changed'), "success");
        passwordForm.reset();
    });

    // Helper: format ISO date to Local input string YYYY-MM-DDTHH:MM
    function formatDateToInputString(dateStr) {
        const d = new Date(dateStr);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    // Dashboard initialization
    function initializeDashboard() {
        loadSettings();
        updateMetrics();
        renderTable();
    }

    function loadSettings() {
        const settings = Storage.getSettings();
        titleInput.value = settings.eventTitle;
        dateInput.value = formatDateToInputString(settings.countdownDate);
    }

    // Update Dashboard Metrics (Arabic numerals are NOT translated)
    function updateMetrics() {
        const attendees = Storage.getAttendees();
        const total = attendees.length;
        const checked = attendees.filter(a => a.checkedIn).length;
        const rate = total > 0 ? Math.round((checked / total) * 100) : 0;

        metricTotal.textContent = total;
        metricChecked.textContent = checked;
        metricRate.textContent = rate + "%";
    }

    // Render Attendees Table List
    function renderTable() {
        const query = tableSearch.value.trim().toLowerCase();
        const attendees = Storage.getAttendees();

        // Filter list
        const filtered = attendees.filter(a => {
            return (
                a.name.toLowerCase().includes(query) ||
                a.company.toLowerCase().includes(query) ||
                a.email.toLowerCase().includes(query) ||
                a.phone.toLowerCase().includes(query)
            );
        });

        tableBody.innerHTML = "";

        if (filtered.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; color: var(--text-secondary); padding: 3rem;">
                        No attendee records found.
                    </td>
                </tr>
            `;
            return;
        }

        filtered.forEach(attendee => {
            const tr = document.createElement("tr");

            // Status Badge
            const statusBadgeClass = attendee.checkedIn ? "badge badge-checked" : "badge badge-pending";
            const statusText = Storage.t(attendee.checkedIn ? "checkedin_status" : "not_checkedin_status");

            // Sector translation
            const sectorObj = SECTORS_LIST.find(s => s.value === attendee.sector);
            const sectorText = sectorObj ? Storage.t(sectorObj.key) : attendee.sector;

            tr.innerHTML = `
                <td><strong>${escapeHTML(attendee.name)}</strong><br><small style="color: var(--text-secondary);">${attendee.id}</small></td>
                <td>${escapeHTML(attendee.company)}</td>
                <td><span style="background: rgba(139, 92, 246, 0.1); color: var(--primary); padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.8rem; border: 1px solid rgba(139, 92, 246, 0.15);">${escapeHTML(sectorText)}</span></td>
                <td>${escapeHTML(attendee.email)}</td>
                <td>${escapeHTML(attendee.phone)}</td>
                <td><span class="${statusBadgeClass}">${statusText}</span></td>
                <td class="td-actions">
                    <button class="btn btn-sm btn-secondary edit-row-btn" data-id="${attendee.id}">
                        ${Storage.t('btn_edit')}
                    </button>
                    <button class="btn btn-sm btn-danger delete-row-btn" data-id="${attendee.id}">
                        ${Storage.t('btn_delete')}
                    </button>
                </td>
            `;

            // Bind Actions
            tr.querySelector(".edit-row-btn").addEventListener("click", () => openEditModal(attendee));
            tr.querySelector(".delete-row-btn").addEventListener("click", () => deleteAttendeeRow(attendee.id, attendee.name));

            tableBody.appendChild(tr);
        });
    }

    // Modal Dropdown population
    function populateModalSectors() {
        editSectorSelect.innerHTML = "";
        SECTORS_LIST.forEach(sector => {
            const opt = document.createElement("option");
            opt.value = sector.value;
            opt.textContent = Storage.t(sector.key);
            editSectorSelect.appendChild(opt);
        });
    }

    // Modal Edit dialog open
    function openEditModal(attendee) {
        populateModalSectors();
        editIdInput.value = attendee.id;
        editNameInput.value = attendee.name;
        editCompanyInput.value = attendee.company;
        editEmailInput.value = attendee.email;
        editPhoneInput.value = attendee.phone;
        editSectorSelect.value = attendee.sector;

        editModal.classList.add("active");
    }

    // Modal close
    function closeEditModal() {
        editModal.classList.remove("active");
        editForm.reset();
    }

    modalCloseX.addEventListener("click", closeEditModal);
    modalCancelBtn.addEventListener("click", closeEditModal);
    
    // Close modal clicking backdrop
    window.addEventListener("click", (e) => {
        if (e.target === editModal) {
            closeEditModal();
        }
    });

    // Save Edit Form
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const id = editIdInput.value;
        const name = editNameInput.value.trim();
        const company = editCompanyInput.value.trim();
        const email = editEmailInput.value.trim();
        const phone = editPhoneInput.value.trim();
        const sector = editSectorSelect.value;

        if (!name || !company || !email || !phone || !sector) {
            Toast.show("Please fill in all fields", "error");
            return;
        }

        const success = Storage.updateAttendee(id, { name, company, email, phone, sector });
        if (success) {
            Toast.show(Storage.getCurrentLanguage() === 'zh' ? "参会者信息修改成功！" : "Attendee details updated successfully!", "success");
            closeEditModal();
            renderTable();
            updateMetrics();
        } else {
            Toast.show("Error updating attendee details.", "error");
        }
    });

    // Delete Row
    function deleteAttendeeRow(id, name) {
        const confirmMsg = Storage.getCurrentLanguage() === 'zh' ? 
            `您确定要删除参会者 "${name}" 吗？此操作无法撤销。` : 
            `Are you sure you want to delete attendee "${name}"? This action cannot be undone.`;
        
        if (confirm(confirmMsg)) {
            Storage.deleteAttendee(id);
            Toast.show(Storage.getCurrentLanguage() === 'zh' ? "参会者记录已成功删除。" : "Attendee deleted successfully.", "success");
            renderTable();
            updateMetrics();
        }
    }

    // Settings Submit handler
    settingsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const eventTitle = titleInput.value.trim();
        const countdownDate = new Date(dateInput.value).toISOString();

        const currentSettings = Storage.getSettings();
        Storage.saveSettings({
            ...currentSettings,
            eventTitle,
            countdownDate
        });

        Toast.show(Storage.getCurrentLanguage() === 'zh' ? "倒计时配置更新成功！" : "Countdown configurations saved!", "success");
    });

    // Table search triggers
    tableSearch.addEventListener("input", renderTable);

    // Seed mock records
    addMockBtn.addEventListener("click", () => {
        Storage.generateMockData();
        renderTable();
        updateMetrics();
        Toast.show(Storage.getCurrentLanguage() === 'zh' ? "已成功导入 10 条模拟记录！" : "Successfully added 10 mock attendee records!", "success");
    });

    // Wipe Database records
    clearDbBtn.addEventListener("click", () => {
        const step1 = Storage.getCurrentLanguage() === 'zh' ? 
            "警告：您确定要清空整个数据库吗？" : 
            "WARNING: Are you sure you want to clear the entire database?";
        
        const step2 = Storage.getCurrentLanguage() === 'zh' ? 
            "请再次确认：此操作将永久抹除所有注册和签到数据。" : 
            "FINAL CONFIRMATION: This will permanently wipe all registrations and logs.";

        if (confirm(step1)) {
            if (confirm(step2)) {
                Storage.clearAll();
                renderTable();
                updateMetrics();
                Toast.show(Storage.getCurrentLanguage() === 'zh' ? "数据库已完全清空。" : "Database has been completely wiped.", "error");
            }
        }
    });

    // Export CSV utility
    exportCsvBtn.addEventListener("click", () => {
        const attendees = Storage.getAttendees();
        if (attendees.length === 0) {
            Toast.show(Storage.getCurrentLanguage() === 'zh' ? "没有可导出的数据。" : "No data available to export.", "error");
            return;
        }

        // CSV Header
        let csvContent = "Pass ID,Full Name,Company,Sector,Email,Phone,Check-In Status,Registered Time,Checked-In Time\n";

        attendees.forEach(a => {
            const sectorObj = SECTORS_LIST.find(s => s.value === a.sector);
            const sectorText = sectorObj ? Storage.t(sectorObj.key) : a.sector;
            const statusStr = a.checkedIn ? "Checked-In" : "Pending";

            // Escape fields with quotes or commas
            const name = `"${a.name.replace(/"/g, '""')}"`;
            const company = `"${a.company.replace(/"/g, '""')}"`;
            const email = `"${a.email.replace(/"/g, '""')}"`;
            const phone = `"${a.phone.replace(/"/g, '""')}"`;
            const sector = `"${sectorText.replace(/"/g, '""')}"`;

            csvContent += `${a.id},${name},${company},${sector},${email},${phone},${statusStr},${a.registeredAt},${a.checkedInAt || ''}\n`;
        });

        // Trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `expo_attendees_export_${Date.now()}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        Toast.show(Storage.getCurrentLanguage() === 'zh' ? "CSV 数据包生成成功，开始下载..." : "CSV Export started...", "success");
    });

    // Import JSON utility
    importJsonInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(evt) {
            try {
                const imported = JSON.parse(evt.target.result);
                
                // Basic array check
                if (!Array.isArray(imported)) {
                    throw new Error("Invalid structure: File must contain a JSON array of attendees.");
                }

                // Simple check fields in first element if exists
                if (imported.length > 0) {
                    const first = imported[0];
                    if (!first.id || !first.name || !first.company || !first.email || !first.phone) {
                        throw new Error("Invalid schema: Object is missing required attributes.");
                    }
                }

                // Confirm import overwrite
                const overwriteMsg = Storage.getCurrentLanguage() === 'zh' ? 
                    `警告：这将覆盖您当前包含 ${Storage.getAttendees().length} 条记录的整个数据库。是否继续？` : 
                    `WARNING: This will overwrite your entire active database of ${Storage.getAttendees().length} records. Proceed?`;
                
                if (confirm(overwriteMsg)) {
                    Storage.saveAttendees(imported);
                    if (imported.length > 0) {
                        Storage.logActivity('welcome', imported[0]);
                    }
                    
                    renderTable();
                    updateMetrics();
                    Toast.show(Storage.getCurrentLanguage() === 'zh' ? "JSON 数据成功还原！" : "JSON Database restored successfully!", "success");
                }
            } catch (err) {
                alert("Import failed: " + err.message);
                Toast.show("Import failed", "error");
            }
            // Reset value so change triggers again
            importJsonInput.value = "";
        };
        reader.readAsText(file);
    });

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

    // Initialize check auth
    checkAuthentication();

    // Listeners for updates across tabs
    window.addEventListener("expo_db_update", () => {
        const isAuth = sessionStorage.getItem("admin_session_auth") === "true";
        if (isAuth) {
            updateMetrics();
            renderTable();
        }
    });

    window.addEventListener("expo_settings_update", () => {
        Storage.translatePage();
        const isAuth = sessionStorage.getItem("admin_session_auth") === "true";
        if (isAuth) {
            loadSettings();
            updateMetrics();
            renderTable();
        }
    });
});
