const adminBooking = document.getElementById("adminBooking");

const savedBooking = localStorage.getItem("salonBooking");

if (savedBooking && adminBooking) {

    const booking = JSON.parse(savedBooking);

    adminBooking.innerHTML =
        "<div>" +
        "<h3>🟢 Active Appointment</h3>" +
        "<br>" +
        "<p>🆔 Booking ID: " + booking.bookingId + "</p>" +
        "<p>🏪 Salon: " + booking.salon + "</p>" +
        "<p>✂️ Service: " + booking.service + "</p>" +
        "<p>💰 Price: ₹" + (booking.price || "N/A") + "</p>" +
        "<p>📅 Date: " + booking.date + "</p>" +
        "<p>🕐 Time: " + booking.time + "</p>" +
        "<br>" +
        "<p>👥 People Ahead: <span id=\"adminPeopleAhead\">3</span></p>" +
        "<br>" +
        "<button id=\"serveCustomer\" class=\"btn primary\" type=\"button\">" +
        "✅ Serve Customer" +
        "</button>" +
        "</div>";

    const serveButton = document.getElementById("serveCustomer");
    const peopleAhead = document.getElementById("adminPeopleAhead");

    let currentPeopleAhead = 3;

    if (serveButton) {

        serveButton.addEventListener("click", function () {

            if (currentPeopleAhead > 0) {

                currentPeopleAhead--;

                peopleAhead.textContent = currentPeopleAhead;

            }

            if (currentPeopleAhead === 0) {

                serveButton.textContent = "🎉 Customer's Turn";

                serveButton.disabled = true;

            }

        });

    }

} else if (adminBooking) {

    adminBooking.innerHTML =
        "<p>📭 No active appointment.</p>" +
        "<p>Customers will appear here after booking.</p>";

}
