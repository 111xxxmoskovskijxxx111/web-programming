let loadedUsers = [];
let editMode = false;

function init() {
    const mainDiv = document.getElementById("main");

    const header = document.createElement("header");
    const main = document.createElement("main");
    const footer = document.createElement("footer");

    mainDiv.append(header, main, footer);

    const leftPanel = document.createElement("div");
    leftPanel.id = "leftPanel";

    const content = document.createElement("div");
    content.id = "content";

    const rightPanel = document.createElement("div");
    rightPanel.id = "rightPanel";

    main.append(leftPanel, content, rightPanel);

    [leftPanel, content, rightPanel].forEach(panel => {
        const loader = document.createElement("div");
        loader.className = "loader";
        panel.append(loader);
    });

    createHeaderButtons(header, content);
    createFooter(footer);

    setTimeout(() => {
        content.innerHTML = "<h2>No users</h2><button id='getUsers'>Get Users</button>";
        document.getElementById("getUsers").onclick = loadUsers;
    }, 1000);

    setTimeout(() => createSearch(leftPanel), 1000);
    setTimeout(() => createRightPanel(rightPanel), 1000);

    loadWeather();
    setInterval(loadWeather, 60000);
}

function createHeaderButtons(header, content) {
    const buttons = ["User Rating", "News", "Contacts", "About", "Gallery"];

    buttons.forEach(name => {
        const btn = document.createElement("button");
        btn.textContent = name;

        btn.onclick = () => {
            if (name === "Gallery") {
                showGallery();
            } else {
                content.innerHTML = `<h2>${name}</h2>`;
            }
        };

        header.append(btn);
    });
}

async function createFooter(footer) {
    const currentUsers = document.createElement("div");
    currentUsers.id = "currentUsers";
    currentUsers.textContent = "Current users: 0";

    const newUsers = document.createElement("div");

    const res = await fetch("/new-users");
    const data = await res.json();

    const list = data.map(u => u.firstname).join(", ");
    newUsers.textContent = "New users: " + list;

    footer.append(currentUsers, newUsers);
}

async function loadUsers() {
    const content = document.getElementById("content");
    content.innerHTML = "<div class='loader'></div>";

    const res = await fetch("/users?sortBy=lastname&order=asc");
    loadedUsers = await res.json();

    renderTable();
    updateFooter();
    updateScore();
}

function renderTable() {
    const content = document.getElementById("content");
    content.innerHTML = "";

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    const thLast = document.createElement("th");
    thLast.textContent = "Lastname";
    thLast.onclick = () => {
        loadedUsers.sort((a, b) => a.lastname.localeCompare(b.lastname));
        renderTable();
    };

    headerRow.innerHTML = `
        <th>Firstname</th>
        <th>Score</th>
    `;

    headerRow.prepend(thLast);
    table.append(headerRow);

    loadedUsers.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.lastname}</td>
            <td>${user.firstname}</td>
            <td>${user.score}</td>
        `;

        if (editMode) {
            const td = document.createElement("td");
            const delBtn = document.createElement("button");
            delBtn.textContent = "Delete";
            delBtn.onclick = () => {
                loadedUsers.splice(index, 1);
                renderTable();
                updateScore();
                updateFooter();
            };
            td.append(delBtn);
            row.append(td);
        }

        table.append(row);
    });

    content.append(table);
}

function createSearch(panel) {
    panel.innerHTML = "";

    const input = document.createElement("input");
    const btn = document.createElement("button");
    btn.textContent = "Search";

    btn.onclick = () => {
        const text = input.value.toLowerCase();
        document.querySelectorAll("table tr").forEach(row => {
            row.classList.remove("highlight");
            if (row.textContent.toLowerCase().includes(text)) {
                row.classList.add("highlight");
            }
        });
    };

    panel.append(input, btn);
}

function createRightPanel(panel) {
    panel.innerHTML = "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const label = document.createElement("label");
    label.textContent = " Edit table";

    checkbox.onchange = () => {
        editMode = checkbox.checked;
        renderTable();
    };

    const scoreDiv = document.createElement("div");
    scoreDiv.id = "totalScore";
    scoreDiv.textContent = "Total score: 0";

    panel.append(checkbox, label, scoreDiv);
}

function updateScore() {
    const sum = loadedUsers.reduce((acc, u) => acc + u.score, 0);
    document.getElementById("totalScore").textContent = "Total score: " + sum;
}

function updateFooter() {
    document.getElementById("currentUsers").textContent =
        "Current users: " + loadedUsers.length;
}

async function showGallery() {
    const content = document.getElementById("content");

    const res = await fetch("/gallery-list");
    const files = await res.json();

    let html = "<div class='gallery'>";
    files.forEach(f => {
        html += `<img src="/gallery/${f}" />`;
    });
    html += "</div>";

    content.innerHTML = html;
}

async function loadWeather() {
    const res = await fetch("/weather");
    const data = await res.json();

    let weatherBlock = document.getElementById("weather");

    if (!weatherBlock) {
        weatherBlock = document.createElement("div");
        weatherBlock.id = "weather";
        document.getElementById("leftPanel").prepend(weatherBlock);
    }

    weatherBlock.textContent = `${data.city}: ${data.temperature}°C`;
}