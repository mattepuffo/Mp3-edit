const dialog = require('electron');
const ffmetadata = require("ffmetadata");
var notErr = document.getElementById('err_not');
var compErr = document.getElementById('err');
var fileMp3;

module.exports = {
  readMp3: function() {
    document.getElementById('autore').value = '';
    document.getElementById('album').value = '';
    document.getElementById('titolo').value = '';
    document.getElementById('track').value = '';
    document.getElementById('etichetta').value = '';

    ffmetadata.read(fileMp3, function(err, data) {
      if (err) {
        notErr.style.display = 'inherit';
        compErr.innerHTML = err;
      } else {
        document.getElementById('autore').value = data.artist;
        document.getElementById('album').value = data.album;
        document.getElementById('titolo').value = data.title;
        document.getElementById('track').value = data.track;
        document.getElementById('etichetta').value = data.label;
        //console.log(data.date);
        //console.log(data.disc);
      }
    });
  },
  setMp3: function() {
    var data = {
      artist: document.getElementById('autore').value,
      album: document.getElementById('album').value,
      title: document.getElementById('titolo').value
    };

    if (fileMp3) {
      ffmetadata.write(fileMp3, data, function(err) {
        if (err) {
          notErr.style.display = 'inherit';
          compErr.innerHTML = err;
        } else {
          dialog.showMessageBox({
            type: 'info',
            message: 'Salvataggio effettuato!'
          });
          document.getElementById('autore').value = '';
          document.getElementById('album').value = '';
          document.getElementById('titolo').value = '';
          document.getElementById('track').value = '';
          document.getElementById('etichetta').value = '';
          fileMp3 = '';
        }
      });
    } else {
      notErr.style.display = 'inherit';
      compErr.innerHTML = 'Scegliere un file MP3!';
    }
  },
  initDrop: function() {
    var dnd = document.getElementById('body');

    dnd.ondragover = () => {
      return false;
    };

    dnd.ondragleave = () => {
      return false;
    };

    dnd.ondragend = () => {
      return false;
    };

    dnd.ondrop = (e) => {
      e.preventDefault();
      for (let f of e.dataTransfer.files) {
        if (f.type == 'audio/mp3') {
          fileMp3 = f.path;
          funcs.readMp3();
        }
      }

      return false;
    };
  }
}
