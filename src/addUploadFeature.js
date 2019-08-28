const convertFileToBase64 = files => {
  const reader = new FormData();
  files.map(file => reader.append("files[]", file.preview));
  return reader;
};

/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */
const addUploadCapabilities = requestHandler => (type, resource, params) => {
  if (type === "CREATE" && resource === "files") {
    if (params.data.files && params.data.files.length) {
      // only freshly dropped files are instance of File

      let form = new FormData()
      //the params contain the image as a fileInstance
      form.append('files', params.data.files[0].rawFile.preview);

      const res = fetch('http://localhost:3333/files', {
        method: 'POST',
        body: form
      }).then(res => { return requestHandler(type, resource, res) })
      return res;
    }
  }

  return requestHandler(type, resource, params);
};

export default addUploadCapabilities;
