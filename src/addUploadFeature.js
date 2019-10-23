const addUploadCapabilities = requestHandler => (type, resource, params) => {
  if (type === "CREATE" && resource === "files") {
    // console.log(params.data.files);

    if (params.data.files) {
      console.log(params.data);
      const files = params.data.file.map(file => file.rawFile);
      /*const allFiles = files.filter(
        file =>
          file.type === "image/png" ||
          file.type === "image/jpeg" ||
          file.type === "image/jpg"
      );*/

      const file = files[0];
      // console.log(bookFile.preview);

      var formData = new FormData();
      const data = params.data;
      // details

      // files
      formData.append("files", file);
      formData.append("AlbumId", data.AlbumId);

      params.data = formData;
      console.log(params.data);
    }
  }

  return requestHandler(type, resource, params);
};

export default addUploadCapabilities;
