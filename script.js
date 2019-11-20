document.addEventListener('DOMContentLoaded', function(){

  var board = document.querySelector('.board');
  var addNewNote = document.querySelector('.addNewNotes');
  var arrNewNotes = [];

  function Note(x, y) {
    this.posX = x;
    this.posY = y; 
  }

  var note1 = new Note(20, 20);
  var note2 = new Note(520, 320);

  // arrNewNotes.push(note1, note2);

  function updateMarkup() {
    board.innerHTML = '';
    arrNewNotes.forEach(function(item) {
      var newNote = createMarkupForOneNote(item);
      board.append(newNote);
    })
  }

  function createMarkupForOneNote(object) {
    var tempDiv = document.createElement('div');
    tempDiv.className = 'note';
    tempDiv.style.top = object.posY + 'px';
    tempDiv.style.left = object.posX + 'px';
    return tempDiv;
  }

  addNewNote.onclick = function() {
    var newNote = new Note (getRandomNumber(0, 1100), getRandomNumber(1, 300));
    arrNewNotes.push(newNote);
    updateMarkup();
  }

  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
})