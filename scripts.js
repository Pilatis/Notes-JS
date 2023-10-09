const notesContainer = document.querySelector("#notes-container");
const noteInput = document.querySelector("#note-content");
const addNoteBtn = document.querySelector(".add-note");

//Funções
function showNotes() {
    cleanNotes();

    getNotes().forEach((note) => {
       const noteElement = createNote(note.id, note.content, note.fixed);

       notesContainer.appendChild(noteElement);
    });
}

function cleanNotes() {
    notesContainer.replaceChildren([]);
}

function addNote() {

    const notes = [];
    
    const noteObject = {
        id: generateId(),
        content: noteInput.value,
        fixed: false,
    };

    const noteElement = createNote(noteObject.id, noteObject.content);

    notesContainer.appendChild(noteElement);

    notes.push(noteObject);

    saveNotes(notes);

    noteInput.value = "";
}

function generateId() {
    return Math.floor(Math.random() * 5000);
}

function createNote(id, content, fixed) {

    const element = document.createElement("div");

    element.classList.add("note");

    const textarea = document.createElement("textarea");

    textarea.value = content;
    textarea.placeholder = "Adicione algum texto...";

    element.appendChild(textarea);

    // 1 Icon
    const pinIcon = document.createElement("i");

    pinIcon.classList.add(...["fa", "fa-thumb-tack"]);

    element.appendChild(pinIcon);
    
    //2 Icon
    const deleteIcon = document.createElement("i");

    deleteIcon.classList.add(...["fa", "fa-times"]);

    element.appendChild(deleteIcon);
    
    //3 Icon
    const duplicateIcon = document.createElement("i");

    duplicateIcon.classList.add(...["fa", "fa-plus-square-o"])
;
    element.appendChild(duplicateIcon);


    if(fixed) {
        element.classList.add("fixed");
    }

    //Eventos dos Elementos
    element.querySelector(".fa-thumb-tack").addEventListener("click", () => {
        ToggleFixNote(id);
    });

    element.querySelector(".fa-times").addEventListener("click", () => {
        deleteNote(id, element)
    });

    element.querySelector(".fa-plus-square-o").addEventListener("click", () => {
         copyNote(id);
    });

    return element;
}

function ToggleFixNote(id) {
    const notes = getNotes()

    const targetNote = notes.filter((note) => note.id === id)[0]

    targetNote.fixed = !targetNote.fixed;

    saveNotes(notes);

    showNotes();
}

function deleteNote(id, element) {

    const notes = getNotes().filter((note) => note.id !== id)

    saveNotes(notes);

    notesContainer.removeChild(element);  
}

function copyNote(id) {
     
    const notes = getNotes()

    const targetNote = notes.filter((note) => note.id === id)[0];

    const noteObject = {
        id: generateId(),
        content: targetNote.content,
        fixed: false,
    };

    const noteElement = createNote(
        noteObject.id,
        noteObject.content,
        noteObject.fixed
        
    );

    notesContainer.appendChild(noteElement);

    notes.push(noteObject);

    saveNotes(notes);
}

// local storage
function getNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    const orderedNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1));

    return orderedNotes;
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

addNoteBtn.addEventListener("click", () => addNote())

// inicializar
showNotes();