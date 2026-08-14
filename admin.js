// SalonFlow Admin Dashboard

function loadBookings() {

    const booking = JSON.parse(localStorage.getItem("salonBooking"));

    const bookingContainer = document.getElementById("adminBooking");

    if (!bookingContainer) return;

    if (!booking) {

        bookingContainer.innerHTML = `
            <p>No appointments found.</p>
        `;

        updateStats(0, 0, 0, 0);
        return;
    }


    bookingContainer.innerHTML = `

        <div style="
            padding:20px;
            border:1px solid #ddd;
            border-radius:12px;
            margin-top:15px;
        ">

            <h3>👤 ${booking.name || "Customer"}</h3>

            <p>
                <strong>Salon:</strong>
                ${booking.salon || "Not specified"}
            </p>

            <p>
                <strong>Service:</strong>
                ${booking.service || "Not specified"}
            </p>

            <p>
                <strong>Date:</strong>
                ${booking.date || "Not specified"}
            </p>

            <p>
                <strong>Time:</strong>
                ${booking.time || "Not specified"}
            </p>

            <br>

            <span>
                🟡 Pending
            </span>

        </div>

    `;


    updateStats(1, 1, 0, 1);
}



function updateStats(total, pending, confirmed, customers) {

    const totalElement =
        document.getElementById("totalBookings");

    const pendingElement =
        document.getElementById("pendingBookings");

    const confirmedElement =
        document.getElementById("confirmedBookings");

    const customersElement =
        document.getElementById("totalCustomers");


    if (totalElement)
        totalElement.textContent = total;

    if (pendingElement)
        pendingElement.textContent = pending;

    if (confirmedElement)
        confirmedElement.textContent = confirmed;

    if (customersElement)
        customersElement.textContent = customers;
}



// Queue system

let queueNumber =
    Number(localStorage.getItem("queueNumber")) || 0;


function nextCustomer() {

    queueNumber++;

    localStorage.setItem(
        "queueNumber",
        queueNumber
    );

    const queueElement =
        document.getElementById("queueNumber");

    if (queueElement)
        queueElement.textContent = queueNumber;
}



// Load dashboard

document.addEventListener("DOMContentLoaded", function () {

    loadBookings();

    const queueElement =
        document.getElementById("queueNumber");

    if (queueElement) {
        queueElement.textContent = queueNumber;
    }

});
