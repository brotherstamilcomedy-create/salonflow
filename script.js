
// ================================
// SalonFlow Customer Website
// ================================


// =================================
// CONFIRM BOOKING
// =================================

const confirmButton = document.getElementById("confirmBooking");

if (confirmButton) {

    confirmButton.addEventListener("click", function () {

        const salon = document.getElementById("salon").value;
        const service = document.getElementById("service").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        // Validate booking details
        if (!salon || !service || !date || !time) {
            alert("Please select salon, service, date and time.");
            return;
        }


        // Check existing booking
        const existingBooking =
            localStorage.getItem("salonBooking");

        if (existingBooking) {

            const previousBooking =
                JSON.parse(existingBooking);

            if (
                previousBooking.salon === salon &&
                previousBooking.date === date &&
                previousBooking.time === time
            ) {

                alert(
                    "⚠️ Booking Slot Already Used\n\n" +
                    "You already have an appointment at:\n\n" +
                    "🏪 Salon: " + salon + "\n" +
                    "📅 Date: " + date + "\n" +
                    "🕐 Time: " + time + "\n\n" +
                    "Please choose a different time."
                );

                return;
            }
        }


        // Get service price
        const serviceSelect =
            document.getElementById("service");

        let price = "";

        if (
            serviceSelect &&
            serviceSelect.selectedIndex > 0
        ) {

            price =
                serviceSelect.options[
                    serviceSelect.selectedIndex
                ].getAttribute("data-price");
        }


        // Generate booking ID
        const bookingId =
            "SF-" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        // Create booking
        const booking = {

            bookingId: bookingId,

            salon: salon,

            service: service,

            price: price,

            date: date,

            time: time,

            // NEW: Admin status
            status: "Pending",

            // NEW: Booking creation time
            createdAt: new Date().toISOString()
        };


        // Save booking
        localStorage.setItem(
            "salonBooking",
            JSON.stringify(booking)
        );


        // Confirmation message
        alert(
            "✅ Appointment Confirmed!\n\n" +

            "🆔 Booking ID: " +
            bookingId +

            "\n🏪 Salon: " +
            salon +

            "\n✂️ Service: " +
            service +

            "\n💰 Price: ₹" +
            price +

            "\n📅 Date: " +
            date +

            "\n🕐 Time: " +
            time
        );


        // Go back to customer home
        window.location.href = "index.html";

    });
}



// =================================
// DISPLAY SAVED BOOKING
// =================================

const savedBooking =
    localStorage.getItem("salonBooking");

const queueStatus =
    document.getElementById("queueStatus");

const bookingStatus =
    document.getElementById("bookingStatus");

const appointmentDetails =
    document.getElementById("appointmentDetails");


if (savedBooking) {

    const booking =
        JSON.parse(savedBooking);


    // Show booking status
    if (bookingStatus) {
        bookingStatus.style.display = "block";
    }


    // Display appointment details
    if (appointmentDetails) {

        appointmentDetails.innerHTML =

            "<strong>🆔 Booking ID: " +
            booking.bookingId +
            "</strong><br>" +

            "🏪 Salon: " +
            booking.salon +
            "<br>" +

            "✂️ Service: " +
            booking.service +
            "<br>" +

            "💰 Price: ₹" +
            (booking.price || "N/A") +
            "<br>" +

            "📅 Date: " +
            booking.date +
            "<br>" +

            "🕐 Time: " +
            booking.time;
    }


    // Show queue
    if (queueStatus) {

        queueStatus.style.display = "block";

        const peopleAhead = 3;

        const estimatedWait =
            peopleAhead * 10;


        const peopleAheadElement =
            document.getElementById("peopleAhead");

        const waitTimeElement =
            document.getElementById("waitTime");


        if (peopleAheadElement) {
            peopleAheadElement.textContent =
                peopleAhead;
        }


        if (waitTimeElement) {
            waitTimeElement.textContent =
                estimatedWait + " minutes";
        }
    }


} else {

    // No booking
    if (queueStatus) {
        queueStatus.style.display = "none";
    }

    if (bookingStatus) {
        bookingStatus.style.display = "none";
    }

    if (appointmentDetails) {

        appointmentDetails.innerHTML =
            "📭 You don't have an active appointment.<br>" +
            "Book an appointment to see your queue status.";
    }
}



// =================================
// CANCEL APPOINTMENT
// =================================

const cancelButton =
    document.getElementById("cancelAppointment");


if (cancelButton) {

    cancelButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "salonBooking"
            );

            alert(
                "Appointment cancelled successfully."
            );

            window.location.reload();

        }
    );
}



// =================================
// QUEUE COUNTDOWN
// =================================

let currentPeopleAhead = 3;


const peopleAheadElement =
    document.getElementById("peopleAhead");

const waitTimeElement =
    document.getElementById("waitTime");

const turnNotification =
    document.getElementById("turnNotification");


if (
    peopleAheadElement &&
    waitTimeElement &&
    savedBooking
) {

    peopleAheadElement.textContent =
        currentPeopleAhead;

    waitTimeElement.textContent =
        (currentPeopleAhead * 10) +
        " minutes";


    setInterval(function () {

        if (currentPeopleAhead > 0) {

            currentPeopleAhead--;


            peopleAheadElement.textContent =
                currentPeopleAhead;


            waitTimeElement.textContent =
                (currentPeopleAhead * 10) +
                " minutes";


            // Turn is near
            if (
                currentPeopleAhead === 1 &&
                turnNotification
            ) {

                turnNotification.textContent =
                    "🔔 Your turn is near! Please get ready.";
            }


            // Turn reached
            if (
                currentPeopleAhead === 0 &&
                turnNotification
            ) {

                turnNotification.textContent =
                    "🎉 It's your turn! Please visit the salon.";
            }

        }

    }, 60000);
}



// =================================
// BOOKING SUMMARY
// =================================

const salonInput =
    document.getElementById("salon");

const serviceInput =
    document.getElementById("service");

const dateInput =
    document.getElementById("date");

const timeInput =
    document.getElementById("time");

const bookingSummary =
    document.getElementById("bookingSummary");


function updateBookingSummary() {

    if (!bookingSummary) return;


    const salon =
        salonInput ?
        salonInput.value :
        "";


    const service =
        serviceInput ?
        serviceInput.value :
        "";


    const date =
        dateInput ?
        dateInput.value :
        "";


    const time =
        timeInput ?
        timeInput.value :
        "";


    // Get price
    let price = "";


    if (
        serviceInput &&
        serviceInput.selectedIndex > 0
    ) {

        const selectedOption =
            serviceInput.options[
                serviceInput.selectedIndex
            ];


        price =
            selectedOption.getAttribute(
                "data-price"
            );
    }


    // Incomplete booking
    if (
        !salon ||
        !service ||
        !date ||
        !time
    ) {

        bookingSummary.innerHTML =

            "<h3>Booking Summary</h3>" +

            "<p>" +
            "Please select your salon, service, " +
            "date and time." +
            "</p>";

        return;
    }


    // Complete booking
    bookingSummary.innerHTML =

        "<h3>Booking Summary</h3>" +

        "<p>🏪 Salon: " +
        salon +
        "</p>" +

        "<p>✂️ Service: " +
        service +
        "</p>" +

        "<p class=\"booking-price\">" +
        "💰 Total Price: ₹" +
        price +
        "</p>" +

        "<p>📅 Date: " +
        date +
        "</p>" +

        "<p>🕐 Time: " +
        time +
        "</p>";
}



// Summary event listeners
if (salonInput) {

    salonInput.addEventListener(
        "change",
        updateBookingSummary
    );
}


if (serviceInput) {

    serviceInput.addEventListener(
        "change",
        updateBookingSummary
    );
}


if (dateInput) {

    dateInput.addEventListener(
        "change",
        updateBookingSummary
    );
}


if (timeInput) {

    timeInput.addEventListener(
        "change",
        updateBookingSummary
    );
}


updateBookingSummary();



// =================================
// PREVENT PAST BOOKING DATES
// =================================

const datePicker =
    document.getElementById("date");


if (datePicker) {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    const todayString =
        year +
        "-" +
        month +
        "-" +
        day;


    // Minimum date = today
    datePicker.min =
        todayString;


    // Default date = today
    datePicker.value =
        todayString;


    datePicker.addEventListener(
        "change",
        function () {

            if (
                datePicker.value <
                todayString
            ) {

                alert(
                    "⚠️ Please select today or a future date."
                );


                datePicker.value =
                    todayString;
            }

        }
    );
}



// =================================
// COPY BOOKING ID
// =================================

const copyBookingButton =
    document.getElementById("copyBookingId");


if (copyBookingButton) {

    copyBookingButton.addEventListener(
        "click",
        function () {

            const savedBooking =
                localStorage.getItem(
                    "salonBooking"
                );


            if (!savedBooking) {

                alert(
                    "No booking found."
                );

                return;
            }


            const booking =
                JSON.parse(savedBooking);


            if (!booking.bookingId) {

                alert(
                    "Booking ID not found."
                );

                return;
            }


            navigator.clipboard.writeText(
                booking.bookingId
            );


            alert(

                "✅ Booking ID copied!\n\n" +

                "Your Booking ID is:\n" +

                booking.bookingId

            );

        }
    );
}
