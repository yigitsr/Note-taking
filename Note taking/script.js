const noteList = document.getElementById('noteList');

function addNote() {
  const noteInput = document.getElementById('noteInput');

  if (noteInput.value !== '') {
    const newNote = document.createElement('li');
    newNote.innerHTML = `
      <span>${noteInput.value}</span>
      <button onclick="editNote(this)">Edit</button>
      <button onclick="deleteNote(this)">Delete</button>
    `;
    noteList.appendChild(newNote);
    noteInput.value = '';
    updateLocalStorage();
  }
}

function editNote(button) {
  const note = button.parentElement.querySelector('span');
  const updatedNote = prompt('Edit your note:', note.textContent);

  if (updatedNote !== null && updatedNote !== '') {
    note.textContent = updatedNote;
    updateLocalStorage();
  }
}

function deleteNote(button) {
  const note = button.parentElement;
  note.parentNode.removeChild(note);
  updateLocalStorage();
}

function updateLocalStorage() {
  const notes = document.querySelectorAll('#noteList li span');
  const notesArray = [];

  notes.forEach(note => {
    notesArray.push(note.textContent);
  });

  localStorage.setItem('notes', JSON.stringify(notesArray));
}

function loadNotesFromLocalStorage() {
  const storedNotes = JSON.parse(localStorage.getItem('notes'));

  if (storedNotes) {
    storedNotes.forEach(note => {
      const newNote = document.createElement('li');
      newNote.innerHTML = `
        <span>${note}</span>
        <button onclick="editNote(this)">Edit</button>
        <button onclick="deleteNote(this)">Delete</button>
      `;
      noteList.appendChild(newNote);
    });
  }
}

// Load notes from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadNotesFromLocalStorage);
