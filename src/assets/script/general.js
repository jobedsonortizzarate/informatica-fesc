$(function (e) {
  var error = '';
  if (error != '' || error.length != 0) {
    if (
      new String(error).valueOf() ==
      new String('Certificado Revocado').valueOf()
    ) {
      error =
        'No se puede acceder al aplicativo porque su E.FIRMA está revocada.';
    }

    if (
      new String(error).valueOf() == new String('Certificado Caduco').valueOf()
    ) {
      error =
        'No se puede acceder al aplicativo porque su E.FIRMA no está vigente.';
    }

    showMsgError(error);
  }

  if (window.File && window.FileReader && window.FileList && window.Blob) {
    document
      .getElementById('fileCertificate')
      .addEventListener('change', handleFileSelect, false);
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }
});
function despliega(error) {
  showMsgError(error);
}

function uint8ToString(buf) {
  var i,
    length,
    out = '';
  for (i = 0, length = buf.length; i < length; i += 1) {
    out += String.fromCharCode(buf[i]);
  }
  return out;
}

function handleFileSelect(evt) {
  var f = evt.target.files[0];
  var reader = new FileReader();

  if (!FileReader.prototype.readAsBinaryString) {
    FileReader.prototype.readAsBinaryString = function (fileData) {
      var binary = '';
      var pt = this;
      var reader = new FileReader();
      reader.onload = function (e) {
        var bytes = new Uint8Array(reader.result);
        var length = bytes.byteLength;
        for (var i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        pt.content = binary;
        $(pt).trigger('onload');
      };
      reader.readAsArrayBuffer(fileData);
    };
  }

  var reader = new FileReader();
  reader.readAsBinaryString(f);
  reader.onload = function (e) {
    if (reader.result) reader.content = reader.result;
    var base64Data = btoa(reader.content);

    cerBase64 = base64Data;
  };
}

var respuesta = validate();

function firmar(event) {
  if (validate()) {
    var rfc = document.getElementById('rfc').value;

    alert('RFC: ' + rfc);
    var numSerie = obtieneNumSerie();

    alert('Numero de serie:: ' + numSerie);

    var co = 'qsedwfwqswwadfasd';
    var laFirma = generaFirma(
      document.getElementById('privateKeyPassword').value,
      '',
      co,
    );

    alert('FORMA ELECTRONIOCA: ' + laFirma);
    if (laFirma != 'SIN_FIRMA') {
    }
  } else {
    event.preventDefault();
    showMsgError(
      '<strong>¡Error!</strong> no ha llenado varios campos requeridos. Por favor verifique.',
    );
  }
}

/**
 * Funcion para mostrar mensaje de error.
 * */
function showMsgError(mensaje) {
  $('#divError').html(mensaje);
  $('#divError').show();
  document.getElementById('submit').disabled = true;
}

function limpiarMsgs() {
  $('#divError').html('');
  $('#divError').hide();
  document.getElementById('submit').disabled = false;
}

$('#contrasena').click(function () {
  $(location).attr('href', jsurlciec);
});
