function calculateFare() {

    let distance = document.getElementById("distance").value;

    if (distance === "") {
        alert("Please enter distance");
        return;
    }

    let fare = distance * 120;

    document.getElementById("fare").innerHTML =
        "Estimated Fare: LKR " + fare;function bookTaxi() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let vehicle = document.getElementById("vehicle").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;

  let message =
`🚖 Anura Cabs Booking

Name: ${name}
Phone: ${phone}
Email: ${email}
Vehicle: ${vehicle}
Date: ${date}
Time: ${time}`;

  );
}
