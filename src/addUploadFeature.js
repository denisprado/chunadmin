
const convertFileToBase64 = (file, reader) => new Promise((resolve, reject) => {

  reader.append('files', file.rawFile);

  resolve(reader);

});

/**
* For posts update only, convert uploaded image in base 64 and attach it to
* the `picture` sent property, with `src` and `title` attributes.
*/
const addUploadCapabilities = requestHandler => (type, resource, params) => {
  if (type === 'CREATE' && resource === 'files') {
    if (params.data.files && params.data.files.length) {
      // only freshly dropped files are instance of File
      const formerFiles = params.data.files.filter(p => !(p.rawFile instanceof File));
      const newFiles = params.data.files.filter(p => p.rawFile instanceof File);
      const reader = new FormData(params.data.files);
      return requestHandler(type, resource, {
        ...params,
        data: {
          ...params.data,
          files: reader,
        },
      });
    }
  }

  return requestHandler(type, resource, params);
};

export default addUploadCapabilities;