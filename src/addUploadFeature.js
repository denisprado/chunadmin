function sendData(data, boundary) {
  const XHR = new XMLHttpRequest();
  const FD = new FormData();

  // Push our data into our FormData object
  // for (let name in data) {
  FD.append("files", new Blob([data], { type: "image" }), "teste");
  // }

  // Define what happens on successful data submission
  XHR.addEventListener("load", function(event) {
    alert("Yeah! Data sent and response loaded.");
  });

  // Define what happens in case of error
  XHR.addEventListener("error", function(event) {
    alert("Oops! Something went wrong.");
  });

  // Set up our request
  XHR.open("POST", "http://localhost:3333/files");
  XHR.setRequestHeader(
    "Content-Type",
    "multipart/form-data; boundary=" + boundary
  );
  XHR.setRequestHeader("X-Api-Authorization", window.access_token);
  // Send our FormData object; HTTP headers are set automatically
  XHR.send(FD);
}

/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */
const addUploadCapabilities = requestHandler => (type, resource, params) => {
  if (type === "CREATE" && resource === "files") {
    if (params.data.files && params.data.files.length) {
      const blob = params.data.files[0].rawFile.preview;
      const boundary = String(Math.random()).slice(2);

      sendData(blob, boundary);
    }
  }

  return requestHandler(type, resource, params);
};

export default addUploadCapabilities;
