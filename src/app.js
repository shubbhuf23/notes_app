// Fetching the DOM
const notesContainer = document.getElementById("app");
const addNoteBtn = notesContainer.querySelector(".add-note");

// Displaying the notes to UI
getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);

  notesContainer.insertBefore(noteElement, addNoteBtn);
});

// Adding a new note when clicked on button
addNoteBtn.addEventListener("click", () => addNote());

// Function to get notes
function getNotes() {
  return JSON.parse(localStorage.getItem("user-notes") || "[]");
}

// Function to save new notes to localstorage in client's browser
function saveNotes(notes) {
  localStorage.setItem("user-notes", JSON.stringify(notes));
}

// Function to create note element by using it's id and insert the content
function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  // Adding some attributes to the element
  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Sticky Note...";

  // Adding some event listeners to the element
  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Are you sure you wish to delete this sticky note?"
    );

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

// Function to add and save a note to localstorage
function addNote() {
  const notes = getNotes();
  const notesObj = {
    id: Math.floor(Math.random() * 10000),
    content: "",
  };

  const noteElement = createNoteElement(notesObj.id, notesObj.content);
  notesContainer.insertBefore(noteElement, addNoteBtn);

  notes.push(notesObj);
  saveNotes(notes);
}

// Function to update a note using it's id and insert new note content
function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

// Function to delete a note using it's id and particular element
function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNotes(notes);
  notesContainer.removeChild(element);
}
