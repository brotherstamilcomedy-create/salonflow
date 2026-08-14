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
            "Appointment Confirmed! 🎉\n\n" +
            "Salon: " + salon + "\n" +
            "Service: " + service + "\n" +
            "Date: " + date + "\n" +
            "Time: " + time
        );
    });
}
