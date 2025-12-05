async function fetchCabs() {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8000/cabs", {
        headers: { "Authorization": `Bearer ${token}` }
    });
    const cabs = await res.json();
    const div = document.getElementById("cabs");
    div.innerHTML = "<h3>Cabs</h3>";
    cabs.forEach(c => {
        div.innerHTML += `<p>${c.name} - ${c.number_plate}</p>`;
    });
}

fetchCabs();
