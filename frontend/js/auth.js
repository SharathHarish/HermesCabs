async function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if(res.ok){
        localStorage.setItem("token", data.access_token);
        window.location.href = "dashboard.html";
    } else {
        alert(data.detail);
    }
}
