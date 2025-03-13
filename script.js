const searchInput = document.getElementById("searchInput");
const suggestionsList = document.getElementById("suggestions");

// Sample data for suggestions
const suggestions = [
    "Apple", "Banana", "Blueberry", "Cherry", "Grapes", "Mango", "Orange", "Pineapple", "Strawberry", "Watermelon"
];

let selectedIndex = -1;

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    selectedIndex = -1; // Reset selection

    if (query) {
        const filtered = suggestions.filter(item => item.toLowerCase().includes(query));
        displaySuggestions(filtered);
    } else {
        suggestionsList.innerHTML = "";
        suggestionsList.style.display = "none";
    }
});

// Display Suggestions
function displaySuggestions(filtered) {
    suggestionsList.innerHTML = "";
    
    if (filtered.length > 0) {
        filtered.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = item;
            li.addEventListener("click", () => selectSuggestion(item));
            suggestionsList.appendChild(li);
        });
        suggestionsList.style.display = "block";
    } else {
        suggestionsList.style.display = "none";
    }
}

// Select Suggestion
function selectSuggestion(value) {
    searchInput.value = value;
    suggestionsList.innerHTML = "";
    suggestionsList.style.display = "none";
}

// Keyboard Navigation
searchInput.addEventListener("keydown", (e) => {
    const items = suggestionsList.getElementsByTagName("li");

    if (e.key === "ArrowDown" && selectedIndex < items.length - 1) {
        selectedIndex++;
    } else if (e.key === "ArrowUp" && selectedIndex > 0) {
        selectedIndex--;
    } else if (e.key === "Enter" && selectedIndex > -1) {
        e.preventDefault();
        selectSuggestion(items[selectedIndex].textContent);
        return;
    }

    // Remove previous selection
    for (let item of items) {
        item.classList.remove("selected");
    }

    if (selectedIndex > -1) {
        items[selectedIndex].classList.add("selected");
    }
});

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
        suggestionsList.style.display = "none";
    }
});
