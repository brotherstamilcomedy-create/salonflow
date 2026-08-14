const confirmButton = document.getElementById("confirmBooking");

if (confirmButton) {
    confirmButton.addEventListener("click", function () {

        const salon = document.getElementById("salon").value;
        const service = document.getElementById("service").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        if (!salon || !service || !date || !time) {
            alert("Please select salon, service, date and time.");
            return;
        }
        const existingBooking = localStorage.getItem("salonBooking");

if (existingBooking) {
    const previousBooking = JSON.parse(existingBooking);

    if (
        previousBooking.salon === salon &&
        previousBooking.date === date &&
        previousBooking.time === time
    ) {
        alert(
            "⚠️ You already have an appointment at this salon, date and time."
        );
        return;
    }
}
const bookingId =
    "SF-" + Math.floor(100000 + Math.random() * 900000);

const booking = {
    bookingId: bookingId,
    salon: salon,
    service: service,
    date: date,
    time: time
};
localStorage.setItem("salonBooking", JSON.stringify(booking));

alert(
    "✅ Appointment Confirmed!\n\n" +
    "🆔 Booking ID: " + bookingId + "\n" +
    "🏪 Salon: " + salon + "\n" +
    "✂️ Service: " + service + "\n" +
    "📅 Date: " + date + "\n" +
    "🕐 Time: " + time
);

window.location.href = "index.html";
    });
}
const savedBooking = localStorage.getItem("salonBooking");

const queueStatus = document.getElementById("queueStatus");

if (savedBooking) {
    const booking = JSON.parse(savedBooking);

    const appointmentDetails =
        document.getElementById("appointmentDetails");

   if (appointmentDetails) {
    appointmentDetails.innerHTML =
        "🆔 Booking ID: " + booking.bookingId + "<br>" +
        "🏪 Salon: " + booking.salon + "<br>" +
        "✂️ Service: " + booking.service + "<br>" +
        "📅 Date: " + booking.date + "<br>" +
        "🕐 Time: " + booking.time;
}
if (queueStatus) {
    queueStatus.style.display = "block";

    const peopleAhead = 3;
    const estimatedWait = peopleAhead * 10;

    document.getElementById("peopleAhead").textContent = peopleAhead;
    document.getElementById("waitTime").textContent =
        estimatedWait + " minutes";
}

} else {

    if (queueStatus) {
        queueStatus.style.display = "none";
    }
}
const cancelButton = document.getElementById("cancelAppointment");

if (cancelButton) {
    cancelButton.addEventListener("click", function () {

        localStorage.removeItem("salonBooking");

        alert("Appointment cancelled successfully.");

        window.location.reload();
    });
}
// Queue countdown simulation
// Queue countdown simulation
// Queue countdown with turn notification
let currentPeopleAhead = 3;

const peopleAheadElement = document.getElementById("peopleAhead");
const waitTimeElement = document.getElementById("waitTime");
const turnNotification = document.getElementById("turnNotification");

if (peopleAheadElement && waitTimeElement && savedBooking) {

    peopleAheadElement.textContent = currentPeopleAhead;
    waitTimeElement.textContent =
        (currentPeopleAhead * 10) + " minutes";

    setInterval(function () {

        if (currentPeopleAhead > 0) {
            currentPeopleAhead--;

            peopleAheadElement.textContent = currentPeopleAhead;
            waitTimeElement.textContent =
                (currentPeopleAhead * 10) + " minutes";

            if (currentPeopleAhead === 1 && turnNotification) {
                turnNotification.textContent =
                    "🔔 Your turn is near! Please get ready.";
            }

            if (currentPeopleAhead === 0 && turnNotification) {
                turnNotification.textContent =
                    "🎉 It's your turn! Please visit the salon.";
            }
        }

    }, 60000);
}
// Booking summary
const salonInput = document.getElementById("salon");
const serviceInput = document.getElementById("service");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const bookingSummary = document.getElementById("bookingSummary");

function updateBookingSummary() {

    if (!bookingSummary) return;

    const salon = salonInput ? salonInput.value : "";
    const service = serviceInput ? serviceInput.value : "";
    const date = dateInput ? dateInput.value : "";
    const time = timeInput ? timeInput.value : "";

    if (!salon || !service || !date || !time) {
        bookingSummary.innerHTML =
            "<h3>Booking Summary</h3>" +
            "<p>Please select your salon, service, date and time.</p>";
        return;
    }

    bookingSummary.innerHTML =
        "<h3>Booking Summary</h3>" +
        "<p>🏪 Salon: " + salon + "</p>" +
        "<p>✂️ Service: " + service + "</p>" +
        "<p>📅 Date: " + date + "</p>" +
        "<p>🕐 Time: " + time + "</p>";
}

if (salonInput) salonInput.addEventListener("change", updateBookingSummary);
if (serviceInput) serviceInput.addEventListener("change", updateBookingSummary);
if (dateInput) dateInput.addEventListener("change", updateBookingSummary);
if (timeInput) timeInput.addEventListener("change", updateBookingSummary);

updateBookingSummary();
// Prevent past booking dates
const datePicker = document.getElementById("date");

if (datePicker) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const todayString = year + "-" + month + "-" + day;

    datePicker.min = todayString;
}
const copyBookingButton = document.getElementById("copyBookingId");

if (copyBookingButton) {
    copyBookingButton.addEventListener("click", function () {

        const savedBooking = localStorage.getItem("salonBooking");

        if (!savedBooking) {
            alert("No booking found.");
            return;
        }

        const booking = JSON.parse(savedBooking);

        if (!booking.bookingId) {
            alert("Booking ID not found.");
            return;
        }

        navigator.clipboard.writeText(booking.bookingId);

        alert("✅ Booking ID copied!");
    });
}
