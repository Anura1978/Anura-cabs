function calculateFare() {

  let distance = document.getElementById("distance").value;

  if (distance === "") {
    alert("Please enter distance");
    return;
  }

  let fare = distance * 120;

  document.getElementById("fare").innerHTML =
    "Estimated Fare: LKR " + fare;

  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let vehicle = document.getElementById("vehicle").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;
  let pickup = document.getElementById("pickup").value;
  let destination = document.getElementById("destination").value:
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
let whatsappURL =
  "https://wa.me/94761609536?text=" + encodeURIComponent(message);

window.open(whatsappURL, "_blank");
Distance: ${distance} KM
Estimated Fare: LKR ${fare}`;

let whatsappURL = "https://wa.me/94761609536?text=" + encodeURIComponent(message);

window.location.href = whatsappURL;
}
