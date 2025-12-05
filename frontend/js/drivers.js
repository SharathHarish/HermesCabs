async function fetchDrivers() {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8000/drivers", {
        headers: { "Authorization": `Bearer ${token}` }
    });
    const drivers = await res.json();
    const div = document.getElementById("drivers");
    div.innerHTML = "<h3>Drivers</h3>";
    drivers.forEach(d => {
        div.innerHTML += `<p>${d.name} - ${d.car}</p>`;
    });
}

fetchDrivers();
