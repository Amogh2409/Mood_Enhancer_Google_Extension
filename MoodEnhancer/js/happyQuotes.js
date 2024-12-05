document.addEventListener("DOMContentLoaded", function () {
    let data = []; // Global data storage
    let front = true; // To toggle between front and back display

    // DOM elements
    const authors = document.querySelectorAll(".author");
    const texts = document.querySelectorAll(".text");
    const blockFront = document.querySelector(".block__front");
    const blockBack = document.querySelector(".block__back");

    const authorFront = authors[0];
    const authorBack = authors[1];
    const textFront = texts[0];
    const textBack = texts[1];

    // Function to display a random quote
    const displayQuote = () => {
        if (data.length === 0) {
            console.log("No data available");
            return; // Ensure data exists
        }

        // Generate a random index
        let index = Math.floor(Math.random() * data.length);
        console.log(data[index]); // Log the random quote object

        // Extract quote and author
        let quote = data[index].text || data[index].quote || "No quote available";
        let author = data[index].author || "Anonymous";

        // Update the front or back side of the card
        if (front) {
            textFront.innerHTML = quote;
            authorFront.innerHTML = author;
        } else {
            textBack.innerHTML = quote;
            authorBack.innerHTML = author;
        }
        front = !front; // Toggle front/back
    };

    // Function to fetch quotes from APIs
    const fetchQuotes = () => {
        // Primary API: API Ninjas
        $.ajax({
            method: "GET",
            url: "https://api.api-ninjas.com/v1/quotes?category=happiness",
            headers: { "X-Api-Key": "fqDjsAR7q0uz6rgvnHPPdA==8YUWPHhsMAF0U8Mp" },
            success: function (result) {
                data = result; // Store result
                console.log("API Ninjas Data:", data); // Log the fetched data
                displayQuote(); // Display a random quote
            },
            error: function () {
                console.error("API Ninjas failed. Falling back to TypeFit API.");
                // Fallback API: TypeFit
                fetch("https://type.fit/api/quotes")
                    .then((response) => response.json())
                    .then((result) => {
                        data = result; // Store result
                        console.log("Fallback API Data:", data); // Log the fetched data
                        displayQuote(); // Display a random quote
                    })
                    .catch((err) => console.error("Fallback API failed:", err));
            },
        });
    };

    // Function to handle new quote button click
    function newQuote() {
        console.log("New Quote Button Clicked");
        if (blockBack && blockFront) {
            // Toggle the rotation
            blockBack.classList.toggle("rotateB");
            blockFront.classList.toggle("rotateF");
        }
        displayQuote(); // Display a new random quote
    }

    // Initialize the application
    fetchQuotes();

    // Add event listeners to the buttons (remove the inline `onclick`)
    const quoteButtons = document.querySelectorAll(".new-quote");
    quoteButtons.forEach((button) => {
        button.addEventListener("click", function () {
            console.log("Button clicked"); // Check if button click is detected
            newQuote(); // Trigger the new quote function on click
        });
    });
});
