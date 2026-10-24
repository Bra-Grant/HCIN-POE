/* ================= ScholarLink Interaction Application Engine ================= */


let academicResources = [
    {
        id: "res-1",
        title: "Information Risk Assessment & Matrix Framework",
        module: "IRMG6222",
        faculty: "Commerce",
        type: "Assignment Guides",
        uploader: "Sipho M.",
        date: "14 May 2026",
        downloads: 42,
        verified: true,
        description: "Comprehensive study metrics explaining information risk registers, asset vulnerabilities, assessment calculations, and business impact matrix formulas matched to recent Rosebank curriculum modules.",
        verifications: ["IIE Harvard Anglia referencing verified", "Meets course structural learning outcomes", "Accurate formula matrix mapping"],
        comments: [
            { author: "Kabelo N.", text: "This made calculating the impact parameters completely straightforward. Perfect outline!", time: "2 days ago" },
            { author: "Amara K.", text: "The references match the 2025 IIE style guide accurately.", time: "1 day ago" }
        ]
    },
    {
        id: "res-2",
        title: "Advanced DOM Operations & Event Listeners Guide",
        module: "WEDE5020",
        faculty: "Information Technology",
        type: "Lecture Summaries",
        uploader: "Jessica W.",
        date: "02 May 2026",
        downloads: 118,
        verified: true,
        description: "Granular summary notes addressing advanced semantic JavaScript node transformations, active DOM tree manipulation patterns, and asynchronous API communication mechanics.",
        verifications: ["Functional tested script code blocks", "Explicit keyboard focus visibility notes", "Clean code commenting syntax"],
        comments: []
    },
    {
        id: "res-3",
        title: "Human Computer Interaction Evaluation Strategy Checklist",
        module: "HCIN6222",
        faculty: "Information Technology",
        type: "Exam Prep",
        uploader: "Ethan J.",
        date: "28 April 2026",
        downloads: 89,
        verified: true,
        description: "Targeted exam prep overview tracking user interface design principles, cognitive walkthrough execution steps, emotional design models, and WCAG 2.0 evaluation guidelines.",
        verifications: ["Accurate usability goals definitions", "Complete taxonomy of interaction formats"],
        comments: [
            { author: "Thabo M.", text: "The breakdown of visibility vs feedback saved me during revision mapping.", time: "1 week ago" }
        ]
    },
    {
        id: "res-4",
        title: "Database Normalization & SQL Query Optimization",
        module: "DATA6211",
        faculty: "Information Technology",
        type: "Exam Prep",
        uploader: "Priya K.",
        date: "10 May 2026",
        downloads: 156,
        verified: true,
        description: "Complete guide to 1NF, 2NF, 3NF normalization with practical SQL examples and query optimization techniques for IIE database modules.",
        verifications: ["Practical SQL examples verified", "Normalization step-by-step guide"],
        comments: []
    }
];

let peerRequests = [
    { id: "req-1", module: "DATA6211", detail: "Seeking comprehensive summaries tracking SQL normalization models, primary key indexing parameters, and relational mapping diagrams.", author: "Michael D.", date: "Just now" },
    { id: "req-2", module: "MANA6222", detail: "Need corporate case studies evaluating strategic change models within local emerging business operations.", author: "Sarah P.", date: "Yesterday" }
];

let activeFilteredResources = [...academicResources];
let activeSearchQuery = "";

let userKarma = 450;
let userUploads = 2;
let targetUploadsForRank = 4;
let userVerifications = 5;
let userTotalDownloads = 42;
let studentsHelped = 47;
let studyHoursSaved = 234;
let peerThanks = 12;

function navigateTo(viewId) {
    document.querySelectorAll('.app-view').forEach(view => {
        view.classList.remove('active-view');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.add('active-view');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const linkMap = {
        'home-view': 'nav-home',
        'dashboard-view': 'nav-dashboard',
        'search-view': 'nav-search',
        'social-view': 'nav-social',
        'profile-view': 'nav-profile',
        'help-view': 'nav-help',
        'feedback-view': 'nav-feedback'
    };
    if (linkMap[viewId]) {
        document.getElementById(linkMap[viewId]).classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderHomeUploads();
    renderSearchCards();
    renderRequestsBoard();
    initAccessibilityFeatures();
    updateEmotionalTracker();
    updateBadges();
    updateImpactStats();
    updateMotivationMessage();
});

function renderHomeUploads() {
    const container = document.getElementById('recent-uploads-container');
    if (!container) return;
    
    container.innerHTML = academicResources.slice(0, 2).map(item => `
        <div class="resource-card" style="margin-bottom: 1rem;">
            <div class="card-header-row">
                <span class="module-badge">${item.module}</span>
                <span class="verify-badge"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Peer Verified</span>
            </div>
            <h3>${item.title}</h3>
            <div class="card-action-row">
                <span style="font-size: 0.8rem; color: var(--text-muted);">Shared by ${item.uploader}</span>
                <button class="view-details-btn" onclick="openResourceDetail('${item.id}')">Examine Guide</button>
            </div>
        </div>
    `).join('');
}

function handleGlobalSearch(event) {
    event.preventDefault();
    const queryInput = document.getElementById('header-search-input');
    activeSearchQuery = queryInput.value.trim().toLowerCase();
    executeFilterRules();
    navigateTo('search-view');
}

function triggerFacultySearch(facultyName) {
    document.getElementById('filter-faculty').value = facultyName;
    activeSearchQuery = "";
    executeFilterRules();
    navigateTo('search-view');
}

function applyFilters() {
    executeFilterRules();
}

function executeFilterRules() {
    const selectedFaculty = document.getElementById('filter-faculty').value;
    const selectedType = document.getElementById('filter-type').value;
    const sortBy = document.getElementById('sort-results')?.value || 'relevance';

    activeFilteredResources = academicResources.filter(item => {
        const matchesQuery = item.module.toLowerCase().includes(activeSearchQuery) || 
                             item.title.toLowerCase().includes(activeSearchQuery) ||
                             item.description.toLowerCase().includes(activeSearchQuery);
        const matchesFaculty = (selectedFaculty === 'all' || item.faculty === selectedFaculty);
        const matchesType = (selectedType === 'all' || item.type === selectedType);
        return matchesQuery && matchesFaculty && matchesType;
    });

    if (sortBy === 'downloads') {
        activeFilteredResources.sort((a, b) => b.downloads - a.downloads);
    } else if (sortBy === 'newest') {
        activeFilteredResources.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'oldest') {
        activeFilteredResources.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    renderSearchCards();
}

function renderSearchCards() {
    const grid = document.getElementById('main-results-grid');
    const counter = document.getElementById('search-results-counter');
    if (!grid) return;

    counter.textContent = `Showing ${activeFilteredResources.length} verified academic reference packages`;

    if (activeFilteredResources.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem; color: var(--text-muted);">
                <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 0.75rem;" aria-hidden="true"></i>
                <p>No verified summaries found matching your search parameters yet.</p>
                <button class="view-details-btn" style="margin-top: 1rem;" onclick="resetSearchFilters()">Clear Search Parameters</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = activeFilteredResources.map(item => `
        <div class="resource-card">
            <div class="card-header-row">
                <span class="module-badge">${item.module}</span>
                <span class="verify-badge"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Verified</span>
            </div>
            <h3>${item.title}</h3>
            <p class="card-meta-desc">${item.description.substring(0, 85)}...</p>
            <div class="card-action-row">
                <span style="font-size: 0.8rem; color: var(--text-muted);"><i class="fa-solid fa-download" aria-hidden="true"></i> ${item.downloads} downloads</span>
                <button class="view-details-btn" onclick="openResourceDetail('${item.id}')">View Details</button>
            </div>
        </div>
    `).join('');
}

function resetSearchFilters() {
    document.getElementById('header-search-input').value = "";
    document.getElementById('filter-faculty').value = "all";
    document.getElementById('filter-type').value = "all";
    if (document.getElementById('sort-results')) {
        document.getElementById('sort-results').value = "relevance";
    }
    activeSearchQuery = "";
    activeFilteredResources = [...academicResources];
    renderSearchCards();
}

function openResourceDetail(id) {
    const resource = academicResources.find(r => r.id === id);
    if (!resource) return;

    const canvas = document.getElementById('active-detail-content');
    if (!canvas) return;

    canvas.innerHTML = `
        <div class="detail-main-info">
            <span class="module-badge" style="font-size: 0.85rem; padding: 0.3rem 0.8rem;">${resource.module}</span>
            <h2 style="margin-top: 0.75rem; font-size: 1.6rem;">${resource.title}</h2>
            
            <div class="badge-row" style="margin: 0.75rem 0 1.25rem 0;">
                <span class="badge badge-gold">Author: ${resource.uploader}</span>
                <span class="badge badge-blue">Shared: ${resource.date}</span>
            </div>

            <p style="font-size: 1rem; line-height: 1.6; margin-bottom: 1.5rem;">${resource.description}</p>
            
            <button class="download-master-btn" onclick="executeMockDownload('${resource.title}')">
                <i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i> Grab Material Summary (PDF Pack)
            </button>

            <div class="social-comment-system">
                <h3><i class="fa-solid fa-comments" aria-hidden="true"></i> Peer Discussions (${resource.comments.length})</h3>
                <div class="comment-input-box">
                    <textarea id="active-comment-input" rows="2" placeholder="Ask a question or review this reference guide..."></textarea>
                    <button class="comment-post-btn" onclick="commitComment('${resource.id}')">Post</button>
                </div>
                <div class="comments-render-stack">
                    ${resource.comments.length === 0 ? '<p style="color:var(--text-muted); font-size:0.85rem;">No questions posted yet. Start the conversation!</p>' : resource.comments.map(c => `
                        <div class="comment-bubble">
                            <div class="comment-author-line">
                                <span><i class="fa-solid fa-user-circle" aria-hidden="true"></i> ${c.author}</span>
                                <span style="font-weight:normal; color:var(--text-muted); font-size:0.75rem;">${c.time}</span>
                            </div>
                            <p style="margin-top: 0.2rem;">${c.text}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <aside class="verification-status-panel" aria-label="Peer verification matrix">
            <h3><i class="fa-solid fa-shield-halved" aria-hidden="true"></i> Review Status</h3>
            <p style="font-size: 0.8rem; margin-bottom: 0.75rem; color: var(--text-muted);">Verified against institutional tracking standards:</p>
            <div class="checklist-stack">
                ${resource.verifications.map(v => `
                    <div class="checklist-item">
                        <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
                        <span>${v}</span>
                    </div>
                `).join('')}
            </div>
        </aside>
    `;

    navigateTo('detail-view');
}

function executeMockDownload(title) {
    userTotalDownloads++;
    updateImpactStats();
    triggerToastNotification(`📥 Downloaded: ${title}. You've now helped save ${studyHoursSaved + 10} study hours!`, "success");
}

function commitComment(id) {
    const box = document.getElementById('active-comment-input');
    const msg = box.value.trim();
    if (!msg) return;

    const resource = academicResources.find(r => r.id === id);
    if (resource) {
        resource.comments.unshift({ author: "You (Scholar)", text: msg, time: "Just now" });
        peerThanks++;
        updateImpactStats();
        triggerToastNotification("💬 Comment posted! +1 Peer Thank You for engaging with the community!", "success");
        openResourceDetail(id);
    }
}

function toggleModal(id, open) {
    const modal = document.getElementById(id);
    if (!modal) return;
    if (open) {
        modal.classList.remove('hidden');
        modal.querySelector('input')?.focus();
    } else {
        modal.classList.add('hidden');
    }
}

function handleRequestSubmission(event) {
    event.preventDefault();
    const mod = document.getElementById('req-module').value.toUpperCase();
    const details = document.getElementById('req-details').value;

    peerRequests.unshift({ id: `req-${Date.now()}`, module: mod, detail: details, author: "You", date: "Just now" });
    
    userKarma += 10;
    updateEmotionalTracker();
    animateKarmaDisplay();
    
    document.getElementById('peer-request-form').reset();
    toggleModal('request-modal', false);
    triggerToastNotification(`🤝 Request for ${mod} posted! +10 Karma for reaching out to your academic community!`, "success");
    renderRequestsBoard();
}

function renderRequestsBoard() {
    const space = document.getElementById('requests-board-container');
    if (!space) return;

    space.innerHTML = peerRequests.map(req => `
        <div class="request-card">
            <div>
                <div class="card-header-row">
                    <span class="module-badge" style="background:#fef3c7; color:#92400e;">${req.module}</span>
                    <span style="font-size: 0.75rem; color:var(--text-muted);">${req.date}</span>
                </div>
                <p class="request-body-text">"${req.detail}"</p>
            </div>
            <div style="margin-top: 0.75rem; border-top:1px solid var(--border-color); padding-top:0.5rem;">
                <div style="font-size:0.8rem; color:var(--text-muted);">Posted by student ${req.author}</div>
                <button class="fulfill-intent-btn" onclick="fulfillRequestDirectly('${req.module}')">✨ Fulfill Request ✨</button>
            </div>
        </div>
    `).join('');
}

function fulfillRequestDirectly(moduleCode) {
    userKarma += 15;
    userUploads = Math.min(userUploads + 1, targetUploadsForRank);
    studentsHelped += 3;
    studyHoursSaved += 15;
    updateEmotionalTracker();
    updateImpactStats();
    updateBadges();
    animateKarmaDisplay();
    
    triggerToastNotification(`🎉 EMOTIONAL BOOST! +15 Karma for helping a peer with ${moduleCode}! You're making a difference!`, "success");
    navigateTo('profile-view');
}

function handleFeedbackSubmission(event) {
    event.preventDefault();
    const sentiment = document.getElementById('feedback-sentiment').value;
    
    userKarma += 25;
    updateEmotionalTracker();
    animateKarmaDisplay();
    
    let emotionalMessage = '';
    switch(sentiment) {
        case 'Motivated':
            emotionalMessage = '🔥 AMAZING ENERGY! Your motivation fuels this community! +25 Karma! 🔥';
            break;
        case 'Supported':
            emotionalMessage = '💙 We\'re so glad you feel supported! That\'s exactly what ScholarLink is for! +25 Karma! 💙';
            break;
        case 'Confused':
            emotionalMessage = '🤔 Thank you for your honesty! We\'ll use your feedback to improve. Here\'s +25 Karma for your courage! 🤔';
            break;
        default:
            emotionalMessage = '💪 Thank you for sharing! Your voice matters. +25 Karma points! 💪';
    }
    
    document.getElementById('system-feedback-form').reset();
    triggerToastNotification(emotionalMessage, "success");
    navigateTo('profile-view');
}

function updateEmotionalTracker() {
    const progressPercent = (userUploads / targetUploadsForRank) * 100;
    const progressBar = document.querySelector('.progress-bar-fill');
    const encouragementElement = document.querySelector('.emotional-encouragement');
    const karmaElement = document.getElementById('profile-karma-points');
    
    if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
        progressBar.textContent = `${Math.round(progressPercent)}% Complete`;
        progressBar.setAttribute('aria-valuenow', Math.round(progressPercent));
    }
    
    if (karmaElement) {
        karmaElement.textContent = userKarma;
    }
    
    if (encouragementElement) {
        const uploadsNeeded = targetUploadsForRank - userUploads;
        if (uploadsNeeded <= 0) {
            encouragementElement.innerHTML = '"🎉 CONGRATULATIONS! You have achieved KNOWLEDGE GUARDIAN rank! Your contributions are inspiring the entire community! 🎉"';
            encouragementElement.style.color = '#D4A017';
            encouragementElement.style.fontWeight = 'bold';
        } else if (uploadsNeeded === 1) {
            encouragementElement.innerHTML = `"✨ ONE more upload and you reach KNOWLEDGE GUARDIAN rank! Your dedication is transforming peer learning! ✨"`;
        } else {
            const randomHelp = Math.floor(Math.random() * 20) + 10;
            encouragementElement.innerHTML = `"📚 Only ${uploadsNeeded} more approved upload${uploadsNeeded > 1 ? 's' : ''} until KNOWLEDGE GUARDIAN rank! Every share helps ${randomHelp} fellow students! 📚"`;
        }
    }
}

function updateMotivationMessage() {
    const messageElement = document.getElementById('motivation-message');
    if (!messageElement) return;
    
    const messages = [
        "🌟 Your contributions change lives. Keep going!",
        "💪 Every share makes our community stronger!",
        "🎓 Together we achieve more. You're crushing it!",
        "❤️ Someone out there is grateful for your help today!",
        "📚 Knowledge shared is knowledge multiplied!"
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    messageElement.textContent = messages[randomIndex];
    
    setInterval(() => {
        const newIndex = Math.floor(Math.random() * messages.length);
        messageElement.textContent = messages[newIndex];
    }, 30000);
}

function updateImpactStats() {
    const helpedElement = document.getElementById('students-helped');
    const hoursElement = document.getElementById('study-hours-saved');
    const thanksElement = document.getElementById('peer-thanks');
    
    if (helpedElement) helpedElement.textContent = studentsHelped;
    if (hoursElement) hoursElement.textContent = studyHoursSaved;
    if (thanksElement) thanksElement.textContent = peerThanks;
}

function animateKarmaDisplay() {
    const karmaDisplay = document.getElementById('profile-karma-points');
    if (karmaDisplay) {
        karmaDisplay.classList.add('karma-animate');
        setTimeout(() => {
            karmaDisplay.classList.remove('karma-animate');
        }, 300);
    }
}

function updateBadges() {
    const badgeSupporter = document.getElementById('badge-supporter');
    const badgeGuardian = document.getElementById('badge-guardian');
    const badgeVerifier = document.getElementById('badge-verifier');
    const badgePopular = document.getElementById('badge-popular');
    
    if (peerThanks >= 5) {
        badgeSupporter?.classList.remove('locked');
        badgeSupporter?.classList.add('unlocked');
    }
    
    if (userUploads >= 4) {
        badgeGuardian?.classList.remove('locked');
        badgeGuardian?.classList.add('unlocked');
    }
    
    if (userVerifications >= 10) {
        badgeVerifier?.classList.remove('locked');
        badgeVerifier?.classList.add('unlocked');
    }
    
    if (userTotalDownloads >= 100) {
        badgePopular?.classList.remove('locked');
        badgePopular?.classList.add('unlocked');
    }
}

function initAccessibilityFeatures() {
    const contrastBtn = document.getElementById('contrast-toggle');
    const fontBtn = document.getElementById('font-increase-toggle');

    if (contrastBtn) {
        contrastBtn.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast-mode');
            const state = document.body.classList.contains('high-contrast-mode');
            contrastBtn.setAttribute('aria-pressed', state ? "true" : "false");
            triggerToastNotification(state ? "🌓 High Contrast Mode active. WCAG 2.0 compliant." : "🌓 Standard contrast restored.", "success");
        });
    }

    if (fontBtn) {
        fontBtn.addEventListener('click', () => {
            document.body.classList.toggle('large-font-mode');
            const state = document.body.classList.contains('large-font-mode');
            fontBtn.setAttribute('aria-pressed', state ? "true" : "false");
            triggerToastNotification(state ? "🔍 Large Text Mode enabled (WCAG 2.0 compliant)." : "🔍 Standard text size restored.", "success");
        });
    }
}

function triggerToastNotification(message, classification = "success") {
    const alertBox = document.getElementById('toast-notification');
    if (!alertBox) return;

    alertBox.textContent = message;
    alertBox.className = `toast-popup status-intent-${classification}`;
    alertBox.classList.remove('hidden');

    setTimeout(() => {
        alertBox.classList.add('hidden');
    }, 4500);
}
