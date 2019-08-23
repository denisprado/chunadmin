const convertFileToBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file.rawFile);

  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});


/**
* For posts update only, convert uploaded image in base 64 and attach it to
* the `picture` sent property, with `src` and `title` attributes.
*/
const addUploadCapabilities = requestHandler => (type, resource, params) => {
  if (type === 'CREATE' && resource === 'files') {
    if (params.data.files && params.data.files.length) {
      // only freshly dropped files are instance of File

      const newFiles = params.data.files.filter(f => f.rawFile instanceof File);


      return Promise.all(newFiles.map(convertFileToBase64))
        .then(base64Files => base64Files.map((picture64, index) => ({
          src: picture64,
          title: `${newFiles[index].title}`,
        })))
        .then(transformedNewFiles => requestHandler(type, resource, {
          ...params,
          data: {
            ...params.data,
            files: new FormData(),
          },
        }));

    }
  }

  return requestHandler(type, resource, params);
};

export default addUploadCapabilities;