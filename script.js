const searchCode = "%s"
console.log("hello world");

const addButton = document.getElementById('addButton');
const searchInput = document.getElementById('search');
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const searchValue = searchInput.value;
        console.log(searchValue);
        
        const words = searchValue.split(' ');
        let firstWord = words[0];
        let restOfText = words.slice(1).join(' ');
        console.log(firstWord);
        console.log(restOfText);

        const existingData = JSON.parse(localStorage.getItem('shortcuts')) || {};

        let prefix = existingData[firstWord];
        console.log(prefix);
        if (prefix) {
            // restOfText = restOfText.replace(' ', '+');
            restOfText = restOfText.replace(/\s+/g, '+');
            prefix = prefix.replace(searchCode, restOfText);
            window.location.href = prefix
        }

    }
});

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