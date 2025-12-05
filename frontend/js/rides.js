async function bookRide(driverId, cabId) {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8000/rides", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ driver_id: driverId, cab_id: cabId })
    });
    const data = await res.json();
    alert("Ride booked! Ride ID: " + data.id);
}
