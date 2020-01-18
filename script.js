document.addEventListener("DOMContentLoaded", function() {
  let board = document.querySelector(".board");
  let addNewNote = document.querySelector(".addNewNotes");
  let arrNewNotes = JSON.parse(localStorage.getItem("notes")) || [];
  let dragNote = null;
  let deltaX = 0;
  let deltaY = 0;
  let zIndexCounter = 0;
 

  function Note(x, y, text) {
    this.posX = x;
    this.posY = y;
    this.text = text;
  }

  let note1 = new Note(20, 20);
  let note2 = new Note(520, 320);


  updateMarkup();

  function updateMarkup() {
    board.innerHTML = "";
   
    arrNewNotes.forEach(function(item, index) {
      let newNote = createMarkupForOneNote(item, index);
      newNote.onmousedown = function(e) {
        
        dragNote = newNote;
        deltaX = e.pageX - newNote.offsetLeft;
        deltaY = e.pageY - newNote.offsetTop;
        zIndexCounter++;
        newNote.style.zIndex = zIndexCounter;
        localStorage.setItem("notes", JSON.stringify(arrNewNotes));
        window.addEventListener("mousemove", setNotePosition);
      };

      newNote.onmouseup = function(e) {
        window.removeEventListener("mousemove", setNotePosition);
        item.posX = dragNote.offsetLeft;
        item.posY = dragNote.offsetTop;
        localStorage.setItem("notes", JSON.stringify(arrNewNotes));
      };

      board.append(newNote);
    });

    localStorage.setItem("notes", JSON.stringify(arrNewNotes));
  }

  function createMarkupForOneNote(object, index) {
    let tempDiv = document.createElement("div");
    tempDiv.className = "note";
    tempDiv.style.top = object.posY + "px";
    tempDiv.style.left = object.posX + "px";

    let deleteNotes = document.createElement("div");
    deleteNotes.textContent = "X";
    deleteNotes.className = "deleteNotes";

    let textArea = document.createElement("textarea");
    textArea.className = "usersText";
    textArea.setAttribute("placeholder", "Enter your note...");
    textArea.setAttribute("maxlength", 190);
    textArea.setAttribute("rows", 10);
    textArea.setAttribute("disabled", "true");
    textArea.textContent = object.text;

    tempDiv.append(deleteNotes, textArea);

    textArea.onkeyup = function() {
      object.text = textArea.value;
      localStorage.setItem('notes', JSON.stringify(arrNewNotes)); 
    };

    tempDiv.ondblclick = function() {
      if (event.target === textArea) textArea.removeAttribute("disabled");
      board.onclick = function() {
        if (event.target === board) {
          textArea.setAttribute("disabled", "true");
        }
      };
    };

    deleteNotes.onclick = function() {
      arrNewNotes.splice(index, 1);
      updateMarkup();
    };

    return tempDiv;
  }

  addNewNote.onclick = function() {
    let newNote = new Note(
      getRandomNumber(0, 1100),
      getRandomNumber(1, 300),
      ""
    );
    arrNewNotes.push(newNote);
    updateMarkup();
  };

  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  function setNotePosition(e) {
    dragNote.style.top = e.pageY - deltaY + "px";
    dragNote.style.left = e.pageX - deltaX + "px";
  }
});
