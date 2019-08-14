// in addUploadFeature.js
/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    //reader.readAsDataURL(file.rawFile);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */
const addUploadFeature = requestHandler => (type, resource, params) => {
  if (type === "UPDATE" && resource === "posts") {
    // notice that following condition can be true only when `<ImageInput source="files" />` component has parameter `multiple={true}`
    // if parameter `multiple` is false, then data.files is not an array, but single object
    if (params.data.files && params.data.files.length) {
      // only freshly dropped files are instance of File
      const formerPictures = params.data.files.filter(
        p => !(p.rawFile instanceof File)
      );
      const newPictures = params.data.files.filter(
        p => p.rawFile instanceof File
      );

      return Promise.all(newPictures.map(convertFileToBase64))
        .then(base64Pictures =>
          base64Pictures.map((picture64, index) => ({
            src: picture64,
            title: `${newPictures[index].title}`
          }))
        )
        .then(transformedNewPictures =>
          requestHandler(type, resource, {
            ...params,
            data: {
              ...params.data,
              files: [...transformedNewPictures, ...formerPictures]
            }
          })
        );
    }
  }
  // for other request types and resources, fall back to the default request handler
  return requestHandler(type, resource, params);
};

export default addUploadFeature;
