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
const booking = {
    salon: salon,
    service: service,
    date: date,
    time: time
};

localStorage.setItem("salonBooking", JSON.stringify(booking));

alert(
    "✅ Appointment Confirmed!\n\n" +
    "Salon: " + salon + "\n" +
    "Service: " + service + "\n" +
    "Date: " + date + "\n" +
    "Time: " + time
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
            "Salon: " + booking.salon + "<br>" +
            "Service: " + booking.service + "<br>" +
            "Date: " + booking.date + "<br>" +
            "Time: " + booking.time;
    }

    if (queueStatus) {
        queueStatus.style.display = "block";
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
