function calculateFare() {

    let distance = document.getElementById("distance").value;

    if (distance === "") {
        alert("Please enter distance");
        return;
    }

    let fare = distance * 120;

    document.getElementById("fare").innerHTML =
        "Estimated Fare: LKR " + fare;