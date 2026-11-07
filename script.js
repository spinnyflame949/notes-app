// 1. Grab all the elements we need
const homeScreen = document.getElementById('home-screen');
const notesScreen = document.getElementById('notes-screen');
const noteInput = document.getElementById('note-input');

const btnHome = document.getElementById('btn-home');
const btnNotes = document.getElementById('btn-notes');
const btnSave = document.getElementById('btn-save');
const btnBack = document.getElementById('btn-back');
const notesList = document.getElementById('notes-list');

// 2. Load saved notes from memory (or start with an empty list)
let notes = JSON.parse(localStorage.getItem('oasisNotes')) || [];

// 3. SAVE NOTE FUNCTION
btnSave.addEventListener('click', () => {
    const text = noteInput.value.trim();
    
    if (text !== "") {
        notes.push(text); // Add to list
        localStorage.setItem('oasisNotes', JSON.stringify(notes)); // Save to browser
        noteInput.value = ''; // Clear the box
        alert('Note saved to The Oasis! 🌴');
    } else {
        alert('Type something first, bro!');
    }
});

// 4. SHOW NOTES FUNCTION (When clicking "Notes" button)
btnNotes.addEventListener('click', () => {
    homeScreen.style.display = 'none'; // Hide home
    notesScreen.style.display = 'block'; // Show notes
    
    renderNotes(); // Draw the notes on the screen
});

// 5. GO HOME FUNCTION (When clicking "Home" or "Back")
function goHome() {
    notesScreen.style.display = 'none';
    homeScreen.style.display = 'block';
}

btnHome.addEventListener('click', goHome);
btnBack.addEventListener('click', goHome);

// 6. DRAW THE NOTES ON THE SCREEN
function renderNotes() {
    notesList.innerHTML = ''; 
    
    notes.forEach((note, index) => {
        // Create a box for each note
        const noteBox = document.createElement('div');
        noteBox.className = 'note-card';
        
        noteBox.innerHTML = `
            <p>${note}</p>
            <button onclick="deleteNote(${index})">Delete</button>
        `;
        
        notesList.appendChild(noteBox);
    });
}

// 7. DELETE NOTE FUNCTION
function deleteNote(index) {
    notes.splice(index, 1); // Remove from list
    localStorage.setItem('oasisNotes', JSON.stringify(notes)); // Update memory
    renderNotes(); // Redraw the list
}