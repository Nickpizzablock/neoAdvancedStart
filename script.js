const searchCode = "%s"
console.log("hello world");

// Search Bar
const addButton = document.getElementById('addButton');
const searchInput = document.getElementById('search');
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const searchValue = searchInput.value;
        console.log(searchValue);
        
        // 1st word = search engine
        // 2nd word = query
        const words = searchValue.split(' ');
        let firstWord = words[0];
        let restOfText = words.slice(1).join(' ');
        console.log("first word: ", firstWord);
        console.log("restOfText: ", restOfText);

        const existingData = JSON.parse(localStorage.getItem('shortcuts')) || {};

        let prefix = existingData[firstWord];
        console.log(prefix);
        if (prefix) {
            // Manipulate URL for adding search
            // restOfText = restOfText.replace(' ', '+');
            restOfText = restOfText.replace(/\s+/g, '+');
            prefix = prefix.replace(searchCode, restOfText);
            console.log(prefix);
            window.location.href = prefix; // Current tab
            // window.open(prefix); // New tab, requires pop-up removal
        }

    }
});

// Unnecessary i think
function openInNewTab(url) {
    let link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}

addButton.addEventListener('click', function() {
    console.log("added");
    const shortcutField = document.getElementById('shortcut').value;
    const websiteField = document.getElementById('website').value;

    // Get the existing data from local storage
    const existingData = JSON.parse(localStorage.getItem('shortcuts')) || {};

    // Add the new shortcut and website to the existing data
    existingData[shortcutField] = websiteField;

    // Store the updated data back to local storage
    localStorage.setItem('shortcuts', JSON.stringify(existingData));
    populateDropdown();
});

window.onload = function() {
    document.getElementById('search').value = '';
    populateDropdown();
};
// populateDropdown();

function populateDropdown() {
    console.log("populated");
    // Get the select element
    // const selectElement = document.querySelector('select');
    const selectElement = document.getElementById('selectDelete');

    // Get the existing data from local storage
    const existingData = JSON.parse(localStorage.getItem('shortcuts')) || {};

    // Clear the select options
    selectElement.innerHTML = '';
    
    // Populate the select options
    for (let shortcut in existingData) {
        let option = document.createElement('option');
        option.text = shortcut;
        option.value = shortcut;
        selectElement.add(option);
    }

    // Get the table element
    const table = document.getElementById('shortcutsTable');
    // Clear the table body
    table.innerHTML = '';

    // Populate the table with data from local storage
    let row = table.insertRow();
    let shortcutCell = row.insertCell();
    let websiteCell = row.insertCell();
    shortcutCell.innerHTML = "<b>shortcut</b>";
    websiteCell.innerHTML = "<b>website</b>";

    for (let shortcut in existingData) {
        let row = table.insertRow();
        let shortcutCell = row.insertCell();
        let websiteCell = row.insertCell();

        shortcutCell.textContent = shortcut;
        websiteCell.textContent = existingData[shortcut];
    }
}

// Get the delete button element
const deleteButton = document.getElementById('deleteButton');

// Add event listener to the button
deleteButton.addEventListener('click', function() {
    console.log("deleted");
    // Get the select element
    const selectElement = document.getElementById('selectDelete');

    // Get the selected shortcut
    const selectedShortcut = selectElement.value;

    // Get the existing data from local storage
    let existingData = JSON.parse(localStorage.getItem('shortcuts')) || {};

    // Remove the selected shortcut from the existing data
    delete existingData[selectedShortcut];

    // Store the updated data back to local storage
    localStorage.setItem('shortcuts', JSON.stringify(existingData));

    // Remove the selected option from the dropdown
    selectElement.remove(selectElement.selectedIndex);

    // Prevent form submission
    event.preventDefault();
});

document.body.addEventListener('dblclick', function() {
    // Code to be executed when the background is double clicked
    console.log("Background double clicked");
    // Add your logic here
    if (document.body.style.backgroundColor == "black") {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    }
    else {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";

    }
});
// // Get the "Add Shortcut" button element
// const addButton = document.getElementById('addShortcutButton');

// // Add event listener to the button
// addButton.addEventListener('click', function() {
//     // Get the shortcut field and website input values
//     const shortcutField = document.getElementById('shortcutField').value;
//     const website = document.getElementById('website').value;

//     // Store the shortcut field and website in local storage
//     localStorage.setItem(shortcutField, website);
// });