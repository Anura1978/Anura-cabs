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
