
const STORAGE_KEY = "requests";

// Storage helpers 

function getRequests() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

function saveRequests(requests) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

function addRequest(request) {
    const requests = getRequests();
    requests.unshift(request); // the newest goes first
    saveRequests(requests);
}

function updateRequestStatus(id, newStatus) {
    const requests = getRequests();
    const target = requests.find((r) => r.id === id);
    if (target) {
        target.status = newStatus;
        saveRequests(requests);
    }
}

// DOM reference

const form = document.getElementById("request-form");
const listEl = document.getElementById("request-list");
const emptyState = document.getElementById("empty-state");
const countPill = document.getElementById("request-count");

const searchInput = document.getElementById("search-input");
const typeFilter = document.getElementById("filter-type");
const statusFilter = document.getElementById("filter-status");

// the search/filter logic
function applyFilters(requests) {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const typeValue = typeFilter.value;
    const statusValue = statusFilter.value;

    return requests.filter((r) => {
        const matchesSearch =
            searchTerm === "" ||
            r.name.toLowerCase().includes(searchTerm) ||
            r.email.toLowerCase().includes(searchTerm);

        const matchesType = typeValue === "all" || r.type === typeValue;
        const matchesStatus = statusValue === "all" || r.status === statusValue;

        return matchesSearch && matchesType && matchesStatus;
    });
}

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function createRequestCard(request) {
    const card = document.createElement("article");
    card.className = "request-card";
    card.dataset.priority = request.priority;

    card.innerHTML = `
    <div class="card-top">
      <div class="card-title">
        <span class="req-name">${escapeHtml(request.name)}</span>
        <span class="req-meta">${escapeHtml(request.email)} &middot; ${formatDate(request.createdAt)}</span>
      </div>
      <div class="tag-row">
        <span class="type-tag">${escapeHtml(request.type)}</span>
        <span class="priority-tag" data-priority="${request.priority}">${request.priority}</span>
      </div>
    </div>

    <p class="req-message">${escapeHtml(request.message)}</p>

    <div class="card-bottom">
      <select class="status-select" data-status="${request.status}" data-id="${request.id}">
        <option value="New">New</option>
        <option value="In Review">In Review</option>
        <option value="Resolved">Resolved</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  `;

    //  preselct the current status from dropdown
    card.querySelector(".status-select").value = request.status;

    return card;
}

// Basic guard against the request text breaking the layout via stray HTML
function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

// Read everthing from storage, filter it and wipe the list container.
function render() {
    const allRequests = getRequests();
    const visibleRequests = applyFilters(allRequests);

    listEl.innerHTML = "";
    visibleRequests.forEach((request) => {
        listEl.appendChild(createRequestCard(request));
    });

    emptyState.hidden = visibleRequests.length !== 0;
    countPill.textContent = allRequests.length;
}

// Event handlers
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const newRequest = {
        id: Date.now().toString(),
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        type: document.getElementById("type").value,
        priority: document.getElementById("priority").value,
        message: document.getElementById("message").value.trim(),
        status: "New",
        createdAt: new Date().toISOString(),
    };

    addRequest(newRequest);
    form.reset();
    render();
});


listEl.addEventListener("change", (event) => {
    if (event.target.classList.contains("status-select")) {
        const id = event.target.dataset.id;
        const newStatus = event.target.value;
        updateRequestStatus(id, newStatus);
        render();
    }
});

searchInput.addEventListener("input", render);
typeFilter.addEventListener("change", render);
statusFilter.addEventListener("change", render);

// Initial render

render();
