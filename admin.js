
// ========================================
// SalonFlow Admin Dashboard
// ========================================


// Load booking data
function loadBookings() {

    const bookingContainer =
        document.getElementById("adminBooking");

    if (!bookingContainer) return;


    const savedBooking =
        localStorage.getItem("salonBooking");


    // No booking
    if (!savedBooking) {

        bookingContainer.innerHTML = `
            <div style="padding:20px;">
                <p>📭 No appointments found.</p>
            </div>
        `;

        updateStats(0, 0, 0, 0);

        return;
    }


    const booking =
        JSON.parse(savedBooking);


    // Get status
    const status =
        booking.status || "Pending";


    // Statistics
    let pending = 0;
    let confirmed = 0;


    if (status === "Pending") {
        pending = 1;
    }


    if (status === "Confirmed") {
        confirmed = 1;
    }


    updateStats(
        1,
        pending,
        confirmed,
        1
    );


    // Status display
    let statusHTML = "";


    if (status === "Confirmed") {

        statusHTML = `
            <span style="
                padding:6px 12px;
                border-radius:20px;
                background:#d4edda;
                color:#155724;
                font-weight:bold;
            ">
                ✅ Confirmed
            </span>
        `;

    } else if (status === "Cancelled") {

        statusHTML = `
            <span style="
                padding:6px 12px;
                border-radius:20px;
                background:#f8d7da;
                color:#721c24;
                font-weight:bold;
            ">
                ❌ Cancelled
            </span>
        `;

    } else {

        statusHTML = `
            <span style="
                padding:6px 12px;
                border-radius:20px;
                background:#fff3cd;
                color:#856404;
                font-weight:bold;
            ">
                ⏳ Pending
            </span>
        `;
    }


    // Display booking
    bookingContainer.innerHTML = `

        <div style="
            padding:20px;
            border:1px solid #ddd;
            border-radius:15px;
            margin-top:20px;
        ">

            <h3>
                👤 Customer Appointment
            </h3>

            <br>

            <p>
                <strong>🆔 Booking ID:</strong>
                ${booking.bookingId}
            </p>

            <p>
                <strong>🏪 Salon:</strong>
                ${booking.salon}
            </p>

            <p>
                <strong>✂️ Service:</strong>
                ${booking.service}
            </p>

            <p>
                <strong>💰 Price:</strong>
                ₹${booking.price || "N/A"}
            </p>

            <p>
                <strong>📅 Date:</strong>
                ${booking.date}
            </p>

            <p>
                <strong>🕐 Time:</strong>
                ${booking.time}
            </p>

            <p>
                <strong>Status:</strong>
                ${statusHTML}
            </p>

            <br>

            <div style="
                display:flex;
                gap:10px;
                flex-wrap:wrap;
            ">

                <button
                    onclick="confirmBooking()"
                    style="
                        padding:10px 18px;
                        cursor:pointer;
                    "
                >
                    ✅ Confirm
                </button>


                <button
                    onclick="cancelBooking()"
                    style="
                        padding:10px 18px;
                        cursor:pointer;
                    "
                >
                    ❌ Cancel
                </button>

            </div>

        </div>
    `;
}



// ========================================
// UPDATE STATISTICS
// ========================================

function updateStats(
    total,
    pending,
    confirmed,
    customers
) {

    const totalElement =
        document.getElementById(
            "totalBookings"
        );


    const pendingElement =
        document.getElementById(
            "pendingBookings"
        );


    const confirmedElement =
        document.getElementById(
            "confirmedBookings"
        );


    const customersElement =
        document.getElementById(
            "totalCustomers"
        );


    if (totalElement) {

        totalElement.textContent =
            total;
    }


    if (pendingElement) {

        pendingElement.textContent =
            pending;
    }


    if (confirmedElement) {

        confirmedElement.textContent =
            confirmed;
    }


    if (customersElement) {

        customersElement.textContent =
            customers;
    }
}



// ========================================
// CONFIRM BOOKING
// ========================================

function confirmBooking() {

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


    booking.status =
        "Confirmed";


    localStorage.setItem(
        "salonBooking",
        JSON.stringify(booking)
    );


    alert(
        "✅ Booking confirmed successfully!"
    );


    loadBookings();
}



// ========================================
// CANCEL BOOKING
// ========================================

function cancelBooking() {

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


    booking.status =
        "Cancelled";


    localStorage.setItem(
        "salonBooking",
        JSON.stringify(booking)
    );


    alert(
        "❌ Booking cancelled."
    );


    loadBookings();
}



// ========================================
// QUEUE CONTROL
// ========================================

let queueNumber =
    Number(
        localStorage.getItem(
            "queueNumber"
        )
    ) || 0;



function nextCustomer() {

    queueNumber++;


    localStorage.setItem(
        "queueNumber",
        queueNumber
    );


    const queueElement =
        document.getElementById(
            "queueNumber"
        );


    if (queueElement) {

        queueElement.textContent =
            queueNumber;
    }


    alert(
        "➡️ Next customer called!"
    );
}



// ========================================
// LOAD DASHBOARD
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadBookings();


        const queueElement =
            document.getElementById(
                "queueNumber"
            );


        if (queueElement) {

            queueElement.textContent =
                queueNumber;
        }

    }
);

