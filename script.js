
function updateFare() {
    let vehicle = document.getElementById("vehicle").value;
    let distance = Number(document.getElementById("distance").value);

    if (!vehicle || !distance || distance <= 0) {
        document.getElementById("fare").innerHTML =
            "Estimated Fare: LKR 0";
        return;
    }

    let fare;

    if (vehicle === "Car") {
        fare = distance * 120;

    } else if (vehicle === "Mini Van") {
        fare = distance * 150;

    } else if (vehicle === "Van") {
        if (distance <= 10) {
            fare = 3000;
        } else {
            fare = 3000 + ((distance - 10) * 180);
        }

    } else if (vehicle === "SUV") {
        fare = distance * 200;
    }

    document.getElementById("fare").innerHTML =
        "Estimated Fare: LKR " + fare.toLocaleString();
}

function calculateFare() {

    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let vehicle = document.getElementById("vehicle").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let pickup = document.getElementById("pickup").value.trim();
    let destination = document.getElementById("destination").value.trim();
    let distance = document.getElementById("distance").value.trim();

    if (
        name === "" ||
        phone === "" ||
        vehicle === "" ||
        date === "" ||
        time === "" ||
        pickup === "" ||
        destination === "" ||
        distance === ""
    ) {
        alert("Please fill in all required booking details.");
        return;
    }

    let distanceNumber = Number(distance);

    if (distanceNumber <= 0 || isNaN(distanceNumber)) {
        alert("Please enter a valid distance in KM.");
        return;
    }

    let fare;

if (vehicle === "Car") {
    fare = distanceNumber * 120;

} else if (vehicle === "Mini Van") {
    fare = distanceNumber * 150;

} else if (vehicle === "Van") {

    if (distanceNumber <= 10) {
        fare = 3000;
    } else {
        fare = 3000 + ((distanceNumber - 10) * 180);
    }

} else if (vehicle === "SUV") {
    fare = distanceNumber * 200;
}

    let message =
`🚖 Anura Cabs Booking

Name: ${name}
Phone: ${phone}
Email: ${email}
Vehicle: ${vehicle}
Date: ${date}
Time: ${time}
Pickup: ${pickup}
Destination: ${destination}
Distance: ${distanceNumber} KM
Estimated Fare: LKR ${fare.toLocaleString()}`;

    let whatsappURL =
        "https://wa.me/94761609536?text=" +
        encodeURIComponent(message);

window.location.href = whatsappURL;
}


function bookTaxi() {
    calculateFare();
}

async function getCoordinates(location) {
    const url =
        "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
        encodeURIComponent(location + ", Sri Lanka");

    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0) {
        return null;
    }

    return {
        lat: Number(data[0].lat),
        lon: Number(data[0].lon)
    };
}async function calculateRouteDistance() {

    const pickup = document.getElementById("pickup").value.trim();
    const destination = document.getElementById("destination").value.trim();

    if (pickup === "" || destination === "") {
        return;
    }

    const pickupCoords = await getCoordinates(pickup);
    const destinationCoords = await getCoordinates(destination);

    if (!pickupCoords || !destinationCoords) {
        alert("Location not found. Please enter a valid Sri Lankan location.");
        return;
    }

    const routeURL =
        "https://router.project-osrm.org/route/v1/driving/" +
        pickupCoords.lon + "," + pickupCoords.lat + ";" +
        destinationCoords.lon + "," + destinationCoords.lat +
        "?overview=false";

    const response = await fetch(routeURL);
    const data = await response.json();

    if (data.code !== "Ok" || !data.routes.length) {
        alert("Route could not be found.");
        return;
    }

    const distanceKM =
        (data.routes[0].distance / 1000).toFixed(1);

    document.getElementById("distance").value = distanceKM;

    updateFare();
}
