const bookingButton = document.querySelector(".primary");

if (bookingButton) {
    bookingButton.addEventListener("click", function (event) {
        event.preventDefault();

        window.location.href = "booking.html";
    });
}


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

        alert(
            "Appointment confirmed!\\n\\n" +
            "Salon: " + salon + "\\n" +
            "Service: " + service + "\\n" +
            "Date: " + date + "\\n" +
            "Time: " + time
        );
    });
}
