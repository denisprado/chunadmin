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
      const files = params.data.files.filter(
        file => file.rawFile instanceof File
      );

      const formData = convertFileToBase64(files);

      //formData.append("AlbumId", params.AlbumId);
      return requestHandler(type, resource, {
        ...params,
        data: {
          ...params.data,
          files: formData
        }
      });
    }
  }

  return requestHandler(type, resource, params);
};

export default addUploadCapabilities;
