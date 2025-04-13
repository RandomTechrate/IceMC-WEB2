async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        window.location.href = "/dashboard";
    } else {
        alert("Invalid credentials!");
    }
}

async function executeCommand() {
    const command = document.getElementById("command-input").value;
    if (!command) {
        alert("Please enter a command.");
        return;
    }
    await fetch("/command", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: command
    });
    document.getElementById("command-input").value = '';
}

async function stopServer() {
    await fetch("/stop", { method: "POST" });
    alert("Server is stopping...");
}

async function restartServer() {
    await fetch("/restart", { method: "POST" });
    alert("Server is restarting...");
}

async function logout() {
    window.location.href = "/";
}