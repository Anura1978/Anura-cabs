function updateFare() {

    const vehicle =
        document.getElementById("vehicle").value;

    const distance =
        Number(document.getElementById("distance").value);

    const fareElement =
        document.getElementById("fare");


    if (!vehicle || !distance || distance <= 0) {

        fareElement.innerHTML =
            "Estimated Fare: LKR 0";

        return;
    }


    let fare = 0;


    if (vehicle === "Car") {

        fare = distance * 120;

    } else if (vehicle === "Mini Van") {

        fare = distance * 150;

    } else if (vehicle === "Van") {

        if (distance <= 10) {

            fare = 3000;

        } else {

            fare =
                3000 +
                ((distance - 10) * 180);
        }

    } else if (vehicle === "SUV") {

        fare = distance * 200;
    }


    fareElement.innerHTML =
        "💰 Estimated Fare: LKR " +
        fare.toLocaleString();
}


/* =========================
   CALCULATE FARE
========================= */

function calculateFare() {

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const vehicle =
        document.getElementById("vehicle").value;

    const date =
        document.getElementById("date").value;

    const time =
        document.getElementById("time").value;

    const pickup =
        document.getElementById("pickup").value.trim();

    const destination =
        document.getElementById("destination").value.trim();

    const distance =
        document.getElementById("distance").value.trim();


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

        alert(
            "Please fill in all required booking details."
        );

        return;
    }


    const distanceNumber =
        Number(distance);


    if (
        isNaN(distanceNumber) ||
        distanceNumber <= 0
    ) {

        alert(
            "Please enter a valid distance in KM."
        );

        return;
    }


    let fare = 0;


    if (vehicle === "Car") {

        fare = distanceNumber * 120;

    } else if (vehicle === "Mini Van") {

        fare = distanceNumber * 150;

    } else if (vehicle === "Van") {

        if (distanceNumber <= 10) {

            fare = 3000;

        } else {

            fare =
                3000 +
                ((distanceNumber - 10) * 180);
        }

    } else if (vehicle === "SUV") {

        fare = distanceNumber * 200;
    }


    const message =

`🚖 ANURA CABS – TAXI BOOKING

👤 Customer Details
Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}

🚗 Journey Details
Vehicle: ${vehicle}
Date: ${date}
Time: ${time}

📍 Pickup:
${pickup}

📍 Destination:
${destination}

📏 Distance:
${distanceNumber} KM

💰 Estimated Fare:
LKR ${fare.toLocaleString()}

Thank you for choosing Anura Cabs 🇱🇰
Safe & Reliable Taxi Service in Sri Lanka.`;


    const whatsappURL =
        "https://wa.me/94761609536?text=" +
        encodeURIComponent(message);


    window.location.href =
        whatsappURL;
}


/* =========================
   BOOK TAXI
========================= */

function bookTaxi() {

    showConfirmationCard();

}


/* =========================
   LOCATION SEARCH
========================= */

async function getCoordinates(location) {

    const url =
        "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
        encodeURIComponent(
            location + ", Sri Lanka"
        );


    const response =
        await fetch(url, {
            headers: {
                "Accept": "application/json"
            }
        });


    if (!response.ok) {

        throw new Error(
            "Location service unavailable"
        );
    }


    const data =
        await response.json();


    if (
        !data ||
        data.length === 0
    ) {

        return null;
    }


    return {

        lat: Number(data[0].lat),

        lon: Number(data[0].lon)

    };
}

/* =========================
   CALCULATE ROUTE DISTANCE
========================= */

async function calculateRouteDistance() {

    alert("Calculate Distance button is working!");

    const pickup =
        document.getElementById("pickup").value.trim();

    const destination =
        document.getElementById("destination").value.trim();


    if (
        pickup === "" ||
        destination === ""
    ) {

        alert(
            "Please enter both Pickup Location and Destination."
        );

        return;
    }


    const distanceInput =
        document.getElementById("distance");

    const fareElement =
        document.getElementById("fare");

    const distanceButton =
        document.querySelector(".distance-btn");


    try {

        distanceButton.disabled = true;

        distanceButton.innerHTML =
            "⏳ Calculating Distance...";


        distanceInput.value = "";

        fareElement.innerHTML =
            "📍 Calculating route...";


        /* Find Pickup */

        const pickupCoords =
            await getCoordinates(pickup);


        if (!pickupCoords) {

            throw new Error(
                "Pickup location could not be found."
            );
        }


        /* Find Destination */

        const destinationCoords =
            await getCoordinates(destination);


        if (!destinationCoords) {

            throw new Error(
                "Destination could not be found."
            );
        }


        /* OSRM Route */

        const routeURL =
            "https://router.project-osrm.org/route/v1/driving/" +
            pickupCoords.lon + "," +
            pickupCoords.lat + ";" +
            destinationCoords.lon + "," +
            destinationCoords.lat +
            "?overview=false";


        const response =
            await fetch(routeURL);


        if (!response.ok) {

            throw new Error(
                "Route service unavailable."
            );
        }


        const data =
            await response.json();


        if (
            data.code !== "Ok" ||
            !data.routes ||
            data.routes.length === 0
        ) {

            throw new Error(
                "A driving route could not be found."
            );
        }


        /* Convert metres to KM */

        const distanceKM =
            (
                data.routes[0].distance / 1000
            ).toFixed(1);


        /* Put distance into input */

        distanceInput.value =
            distanceKM;


        /* Calculate fare */

        updateFare();


    } catch (error) {

        console.error(
            "Distance calculation error:",
            error
        );


        alert(
            error.message ||
            "Unable to calculate the distance right now. Please try again."
        );


        distanceInput.value = "";

        fareElement.innerHTML =
            "Estimated Fare: LKR 0";


    } finally {

        distanceButton.disabled = false;

        distanceButton.innerHTML =
            "📍 Calculate Distance";
    }
}


        



/* =========================
   BOOKING CONFIRMATION CARD
========================= */

function showConfirmationCard() {

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const vehicle =
        document.getElementById("vehicle").value;

    const date =
        document.getElementById("date").value;

    const time =
        document.getElementById("time").value;

    const pickup =
        document.getElementById("pickup").value.trim();

    const destination =
        document.getElementById("destination").value.trim();

    const distance =
        Number(
            document.getElementById("distance").value
        );


    if (
        name === "" ||
        phone === "" ||
        vehicle === "" ||
        date === "" ||
        time === "" ||
        pickup === "" ||
        destination === "" ||
        !distance ||
        distance <= 0
    ) {

        alert(
            "Please complete the booking details first."
        );

        return;
    }


    /* Calculate fare */

    let fare = 0;


    if (vehicle === "Car") {

        fare = distance * 120;

    } else if (vehicle === "Mini Van") {

        fare = distance * 150;

    } else if (vehicle === "Van") {

        if (distance <= 10) {

            fare = 3000;

        } else {

            fare =
                3000 +
                ((distance - 10) * 180);
        }

    } else if (vehicle === "SUV") {

        fare = distance * 200;
    }


    /* Generate Booking ID */

    const bookingId =
        "AC-" +
        new Date().getFullYear() +
        "-" +
        Math.floor(
            10000 + Math.random() * 90000
        );


    /* Confirmation Card */

    document.getElementById(
        "confirmBookingId"
    ).textContent =
        bookingId;


    document.getElementById(
        "confirmStatus"
    ).textContent =
        "PENDING";


    document.getElementById(
        "confirmName"
    ).textContent =
        name;


    document.getElementById(
        "confirmPhone"
    ).textContent =
        phone;


    document.getElementById(
        "confirmVehicle"
    ).textContent =
        vehicle;


    document.getElementById(
        "confirmDate"
    ).textContent =
        date;


    document.getElementById(
        "confirmTime"
    ).textContent =
        time;


    document.getElementById(
        "confirmPickup"
    ).textContent =
        pickup;


    document.getElementById(
        "confirmDestination"
    ).textContent =
        destination;


    document.getElementById(
        "confirmDistance"
    ).textContent =
        distance + " KM";


    document.getElementById(
        "confirmFare"
    ).textContent =
        fare.toLocaleString();


    /* Show Card */

    const card =
        document.getElementById(
            "confirmationCard"
        );


    card.style.display =
        "block";


    card.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


/* =========================
   SEND BOOKING TO ANURA CABS
========================= */

function sendBookingWhatsApp() {

    const bookingId =
        document.getElementById(
            "confirmBookingId"
        ).textContent;

    const name =
        document.getElementById(
            "confirmName"
        ).textContent;

    const phone =
        document.getElementById(
            "confirmPhone"
        ).textContent;

    const vehicle =
        document.getElementById(
            "confirmVehicle"
        ).textContent;

    const date =
        document.getElementById(
            "confirmDate"
        ).textContent;

    const time =
        document.getElementById(
            "confirmTime"
        ).textContent;

    const pickup =
        document.getElementById(
            "confirmPickup"
        ).textContent;

    const destination =
        document.getElementById(
            "confirmDestination"
        ).textContent;

    const distance =
        document.getElementById(
            "confirmDistance"
        ).textContent;

    const fare =
        document.getElementById(
            "confirmFare"
        ).textContent;


    const message =

`🚖 ANURA CABS – NEW TAXI BOOKING

🆔 Booking ID:
${bookingId}

📌 Status:
PENDING

👤 CUSTOMER DETAILS

Name: ${name}
Phone: ${phone}

🚗 JOURNEY DETAILS

Vehicle: ${vehicle}
Date: ${date}
Time: ${time}

📍 Pickup:
${pickup}

📍 Destination:
${destination}

📏 Distance:
${distance}

💰 Estimated Fare:
LKR ${fare}

⚠️ Please review this booking and assign a driver.

Anura Cabs 🇱🇰
Safe & Reliable Taxi Service in Sri Lanka.`;


    const whatsappURL =
        "https://wa.me/94761609536?text=" +
        encodeURIComponent(message);


    window.location.href =
        whatsappURL;
}


/* =========================
   SEND CONFIRMATION
========================= */

function sendConfirmationWhatsApp() {

    const name =
        document.getElementById(
            "confirmName"
        ).textContent;

    const phone =
        document.getElementById(
            "confirmPhone"
        ).textContent;

    const vehicle =
        document.getElementById(
            "confirmVehicle"
        ).textContent;

    const date =
        document.getElementById(
            "confirmDate"
        ).textContent;

    const time =
        document.getElementById(
            "confirmTime"
        ).textContent;

    const pickup =
        document.getElementById(
            "confirmPickup"
        ).textContent;

    const destination =
        document.getElementById(
            "confirmDestination"
        ).textContent;

    const distance =
        document.getElementById(
            "confirmDistance"
        ).textContent;

    const fare =
        document.getElementById(
            "confirmFare"
        ).textContent;


    const message =

`🚖 ANURA CABS – BOOKING CONFIRMED ✅

👤 Customer: ${name}

📱 Phone: ${phone}

🚗 Vehicle: ${vehicle}

📅 Date: ${date}

⏰ Time: ${time}

📍 Pickup:
${pickup}

📍 Destination:
${destination}

📏 Distance:
${distance}

💰 Confirmed Fare:
LKR ${fare}

Thank you for choosing Anura Cabs 🇱🇰

Safe & Reliable Taxi Service in Sri Lanka.`;


    const whatsappURL =
        "https://wa.me/94761609536?text=" +
        encodeURIComponent(message);


    window.location.href =
        whatsappURL;
}

/* =========================
   ASSIGN DRIVER
========================= */

function assignDriver() {

    const driverName =
        document.getElementById(
            "driverName"
        ).value.trim();

    const driverPhone =
        document.getElementById(
            "driverPhone"
        ).value.trim();

    const vehicleNumber =
        document.getElementById(
            "vehicleNumber"
        ).value.trim();


    if (
        driverName === "" ||
        driverPhone === "" ||
        vehicleNumber === ""
    ) {

        alert(
            "Please enter Driver Name, Driver Phone and Vehicle Number."
        );

        return;
    }


    /* Change booking status */

    document.getElementById(
        "confirmStatus"
    ).textContent =
        "DRIVER ASSIGNED";


    /* Change confirmation badge */

    const badge =
        document.querySelector(
            ".confirmed-badge"
        );


    if (badge) {

        badge.textContent =
            "🚖 DRIVER ASSIGNED";
    }


    /* =========================
       CUSTOMER DRIVER DISPLAY
    ========================= */

    document.getElementById(
        "customerDriverName"
    ).textContent =
        driverName;

    document.getElementById(
        "customerDriverPhone"
    ).textContent =
        driverPhone;

    document.getElementById(
        "customerVehicleNumber"
    ).textContent =
        vehicleNumber;


    /* Show Customer Driver Card */

    const customerDriverCard =
        document.getElementById(
            "customerDriverCard"
        );


    if (customerDriverCard) {

        customerDriverCard.style.display =
            "block";
    }


    /* Success message */

    alert(
        "Driver assigned successfully!\n\n" +
        "Driver: " +
        driverName +
        "\nPhone: " +
        driverPhone +
        "\nVehicle: " +
        vehicleNumber
    );
}


/* =========================
   SEND BOOKING TO DRIVER
========================= */

function sendDriverWhatsApp() {

    const driverPhone =
        document.getElementById("driverPhone").value.trim();

    const driverName =
        document.getElementById("driverName").value.trim();

    const vehicleNumber =
        document.getElementById("vehicleNumber").value.trim();

    const bookingId =
        document.getElementById("confirmBookingId").textContent;

    const date =
        document.getElementById("confirmDate").textContent;

    const time =
        document.getElementById("confirmTime").textContent;

    const pickup =
        document.getElementById("confirmPickup").textContent;

    const destination =
        document.getElementById("confirmDestination").textContent;

    const distance =
        document.getElementById("confirmDistance").textContent;


    if (
        driverName === "" ||
        driverPhone === "" ||
        vehicleNumber === ""
    ) {

        alert(
            "Please assign a driver first."
        );

        return;
    }


let cleanPhone =
    driverPhone.replace(/\D/g, "");

if (cleanPhone.startsWith("0")) {
    cleanPhone =
        "94" + cleanPhone.substring(1);
}


    const message =

`🚖 ANURA CABS – DRIVER ASSIGNMENT

🆔 Booking ID:
${bookingId}

👤 Driver:
${driverName}

🚗 Vehicle:
${vehicleNumber}

📅 Date:
${date}

⏰ Time:
${time}

📍 Pickup:
${pickup}

📍 Destination:
${destination}

📏 Distance:
${distance}

Please accept this booking and contact the customer if necessary.

Anura Cabs 🇱🇰`;


    const whatsappURL =
        "https://wa.me/" +
        cleanPhone +
        "?text=" +
        encodeURIComponent(message);


    window.location.href =
        whatsappURL;
}


/* =========================
   SEND DRIVER DETAILS TO CUSTOMER
========================= */

function sendDriverDetailsToCustomer() {

    const customerPhone =
        document.getElementById("confirmPhone").textContent.trim();

    const driverName =
        document.getElementById("driverName").value.trim();

    const driverPhone =
        document.getElementById("driverPhone").value.trim();

    const vehicleNumber =
        document.getElementById("vehicleNumber").value.trim();

    const bookingId =
        document.getElementById("confirmBookingId").textContent;

    const date =
        document.getElementById("confirmDate").textContent;

    const time =
        document.getElementById("confirmTime").textContent;

    const pickup =
        document.getElementById("confirmPickup").textContent;

    const destination =
        document.getElementById("confirmDestination").textContent;


    if (
        driverName === "" ||
        driverPhone === "" ||
        vehicleNumber === ""
    ) {

        alert(
            "Please assign a driver first."
        );

        return;
    }


    if (customerPhone === "") {

        alert(
            "Customer phone number is missing."
        );

        return;
    }


let cleanPhone =
    customerPhone.replace(/\D/g, "");

if (cleanPhone.startsWith("0")) {
    cleanPhone =
        "94" + cleanPhone.substring(1);
}


    const message =

`🚖 ANURA CABS – DRIVER DETAILS

✅ Your driver has been assigned.

🆔 Booking ID:
${bookingId}

👨‍✈️ Driver Name:
${driverName}

📱 Driver Phone:
${driverPhone}

🚗 Vehicle Number:
${vehicleNumber}

📅 Date:
${date}

⏰ Time:
${time}

📍 Pickup:
${pickup}

📍 Destination:
${destination}

Your Anura Cabs driver is ready for your journey.

Thank you for choosing Anura Cabs 🇱🇰
Safe & Reliable Taxi Service in Sri Lanka.`;


    const whatsappURL =
        "https://wa.me/" +
        cleanPhone +
        "?text=" +
        encodeURIComponent(message);


    window.location.href =
        whatsappURL;
}
