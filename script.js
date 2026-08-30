
// ========================================
// SalonFlow Customer Website
// ========================================


// ========================================
// CONFIRM BOOKING
// ========================================

const confirmButton =
    document.getElementById("confirmBooking");

if (confirmButton) {

    confirmButton.addEventListener("click", function () {

        const salon =
            document.getElementById("salon").value;

        const service =
            document.getElementById("service").value;

        const date =
            document.getElementById("date").value;

        const time =
            document.getElementById("time").value;


        // Validate
        if (!salon || !service || !date || !time) {

            alert(
                "Please select salon, service, date and time."
            );

            return;
        }


        // ========================================
        // GET EXISTING BOOKINGS
        // ========================================

        let bookings =
            JSON.parse(
                localStorage.getItem("salonBookings")
            ) || [];


        // ========================================
        // CHECK SLOT
        // ========================================

        const slotUsed =
            bookings.some(function (booking) {

                return (
                    booking.salon === salon &&
                    booking.date === date &&
                    booking.time === time &&
                    booking.status !== "Cancelled"
                );

            });


        if (slotUsed) {

            alert(
                "⚠️ Booking Slot Already Used\n\n" +

                "🏪 Salon: " + salon + "\n" +

                "📅 Date: " + date + "\n" +

                "🕐 Time: " + time + "\n\n" +

                "Please choose a different time."
            );

            return;
        }


        // ========================================
        // GET PRICE
        // ========================================

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


        // ========================================
        // CREATE BOOKING ID
        // ========================================

        const bookingId =
            "SF-" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        // ========================================
        // CREATE BOOKING
        // ========================================

        const booking = {

            bookingId: bookingId,

            salon: salon,

            service: service,

            price: price,

            date: date,

            time: time,

            status: "Pending",

            createdAt:
                new Date().toISOString()

        };


        // ========================================
        // ADD BOOKING
        // ========================================

        bookings.push(booking);


        // Save all bookings

        localStorage.setItem(
            "salonBookings",
            JSON.stringify(bookings)
        );


        // ========================================
        // REMOVE OLD SINGLE BOOKING
        // ========================================

        localStorage.removeItem(
            "salonBooking"
        );


        // ========================================
        // CONFIRMATION
        // ========================================

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


        window.location.href =
            "index.html";

    });

}



// ========================================
// CUSTOMER ACTIVE BOOKING
// ========================================

let allBookings =
    JSON.parse(
        localStorage.getItem("salonBookings")
    ) || [];


let savedBooking =
    allBookings.length > 0
        ? allBookings[allBookings.length - 1]
        : null;


const queueStatus =
    document.getElementById("queueStatus");

const bookingStatus =
    document.getElementById("bookingStatus");

const appointmentDetails =
    document.getElementById("appointmentDetails");


// ========================================
// DISPLAY LATEST BOOKING
// ========================================

if (savedBooking) {

    if (bookingStatus) {

        bookingStatus.style.display =
            "block";

    }


    if (appointmentDetails) {

        appointmentDetails.innerHTML =

            "<strong>🆔 Booking ID: " +
            savedBooking.bookingId +
            "</strong><br>" +

            "🏪 Salon: " +
            savedBooking.salon +
            "<br>" +

            "✂️ Service: " +
            savedBooking.service +
            "<br>" +

            "💰 Price: ₹" +
            (savedBooking.price || "N/A") +
            "<br>" +

            "📅 Date: " +
            savedBooking.date +
            "<br>" +

            "🕐 Time: " +
            savedBooking.time;

    }


    // Queue

    if (queueStatus) {

        queueStatus.style.display =
            "block";


        const peopleAhead = 3;

        const estimatedWait =
            peopleAhead * 10;


        const peopleAheadElement =
            document.getElementById(
                "peopleAhead"
            );


        const waitTimeElement =
            document.getElementById(
                "waitTime"
            );


        if (peopleAheadElement) {

            peopleAheadElement.textContent =
                peopleAhead;

        }


        if (waitTimeElement) {

            waitTimeElement.textContent =
                estimatedWait +
                " minutes";

        }

    }


} else {

    if (queueStatus) {

        queueStatus.style.display =
            "none";

    }


    if (bookingStatus) {

        bookingStatus.style.display =
            "none";

    }


    if (appointmentDetails) {

        appointmentDetails.innerHTML =

            "📭 You don't have an active appointment.<br>" +

            "Book an appointment to see your queue status.";

    }

}



// ========================================
// CANCEL CUSTOMER BOOKING
// ========================================

const cancelButton =
    document.getElementById(
        "cancelAppointment"
    );


if (cancelButton) {

    cancelButton.addEventListener(
        "click",
        function () {

            let bookings =
                JSON.parse(
                    localStorage.getItem(
                        "salonBookings"
                    )
                ) || [];


            if (bookings.length === 0) {

                alert(
                    "No booking found."
                );

                return;

            }


            // Cancel latest booking

            bookings[
                bookings.length - 1
            ].status = "Cancelled";


            localStorage.setItem(
                "salonBookings",
                JSON.stringify(bookings)
            );


            alert(
                "Appointment cancelled successfully."
            );


            window.location.reload();

        }
    );

}



// ========================================
// QUEUE COUNTDOWN
// ========================================

let currentPeopleAhead = 3;


const peopleAheadElement =
    document.getElementById(
        "peopleAhead"
    );


const waitTimeElement =
    document.getElementById(
        "waitTime"
    );


const turnNotification =
    document.getElementById(
        "turnNotification"
    );


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


            if (
                currentPeopleAhead === 1 &&
                turnNotification
            ) {

                turnNotification.textContent =
                    "🔔 Your turn is near! Please get ready.";

            }


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



// ========================================
// BOOKING SUMMARY
// ========================================

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



// ========================================
// PREVENT PAST DATES
// ========================================

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


    datePicker.min =
        todayString;


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



// ========================================
// COPY BOOKING ID
// ========================================

const copyBookingButton =
    document.getElementById(
        "copyBookingId"
    );


if (copyBookingButton) {

    copyBookingButton.addEventListener(
        "click",
        function () {

            const bookings =
                JSON.parse(
                    localStorage.getItem(
                        "salonBookings"
                    )
                ) || [];


            if (bookings.length === 0) {

                alert(
                    "No booking found."
                );

                return;

            }


            const booking =
                bookings[
                    bookings.length - 1
                ];


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

