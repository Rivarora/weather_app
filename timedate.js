function updateDateTime() {
    const currentDate = new Date();

    // Get the current date in YYYY-MM-DD format
    const date = currentDate.toLocaleDateString();

    // Get the current time in HH:MM:SS format
    const time = currentDate.toLocaleTimeString();

    // Display the current date and time
    console.log(`Date: ${date} | Time: ${time}`);
}

// Update the time every second
setInterval(updateDateTime, 1000);

// Initial call to display the date and time immediately
updateDateTime();
