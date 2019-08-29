const axios = require('axios')

const convertFileToBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file.rawFile);

  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

function convertToMultPart(filesCode64) {

  let fileMultPart = filesCode64.map(code64 => {
    const boundary = '------multipartformboundary' + (new Date()).getTime(),
      dashdash = '--',
      crlf = '\r\n';

    return dashdash + boundary + crlf +
      'Content-Disposition: form-data; name="files";' + crlf + crlf + code64.src + crlf + dashdash + boundary + dashdash + crlf;

  });

  alert(fileMultPart)

  return (fileMultPart);
}


function sendData(data) {
  const XHR = new XMLHttpRequest();
  var boundary = '------multipartformboundary' + (new Date()).getTime()

  XHR.open("POST", "http://localhost:3333/files");
  // Define what happens on successful data submission
  XHR.addEventListener("load", function (event) {
    alert("Yeah! Data sent and response loaded.");
  });

  // Define what happens in case of error
  XHR.addEventListener("error", function (event) {
    alert("Oops! Something went wrong.");
  });
  XHR.setRequestHeader("Content-type", "multipart/form-data; boundary=" + boundary);
  XHR.setRequestHeader("Content-length", data.length);
  XHR.setRequestHeader("Connection", "close");
  // Set up our request

  //XHR.setRequestHeader("X-Api-Authorization", window.access_token);
  // Send our FormData object; HTTP headers are set automatically
  XHR.send(data);
  alert("SendData: " + XHR.readyState)
  return XHR.readyState;
}

const addUploadFeature = requestHandler => (type, resource, params) => {
  if (type === 'CREATE' && resource === 'files') {
    // notice that following condition can be true only when `<ImageInput source="files" />` component has parameter `multiple={true}`
    // if parameter `multiple` is false, then data.files is not an array, but single object
    if (params.data.files && params.data.files.length) {
      // only freshly dropped files are instance of File
      const newFiles = params.data.files.filter(p => p.rawFile instanceof File);

      return Promise.all(newFiles.map(convertFileToBase64))
        .then(base64Files => base64Files.map((picture64, index) => ({
          src: picture64,
          title: `${newFiles[index].title}`,
        })))
        .then(convertedFilesCode64 =>
          convertToMultPart(convertedFilesCode64)
        )
        .then((multFormDataFiles) =>
          sendData(multFormDataFiles)
        )
        .then(resFormData => requestHandler(type, resource, params));
    }
  }
  // for other request types and resources, fall back to the default request handler
  return requestHandler(type, resource, params);
};

export default addUploadFeature;