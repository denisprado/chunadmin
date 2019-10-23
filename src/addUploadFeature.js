const addUploadCapabilities = requestHandler => (type, resource, params) => {
  if (type === "CREATE" && resource === "files") {
    // console.log(params.data.files);

    if (params.data.files) {
      console.log(params.data);
      const file = params.data.files.rawFile;
      /*const allFiles = files.filter(
        file =>
          file.type === "image/png" ||
          file.type === "image/jpeg" ||
          file.type === "image/jpg"
      );*/

      // console.log(bookFile.preview);

      var formData = new FormData();
      const data = params.data;
      // details

      // files
      formData.append("files", file);
      formData.append("AlbumId", data.AlbumId);

      //params.data = formData;
      console.log(params.data);

      var request = new XMLHttpRequest();
      request.open(
        "POST",
        "http://ec2-18-218-213-112.us-east-2.compute.amazonaws.com:3333/files"
      );
      request.send(formData);
    }
  }

  return requestHandler(type, resource, params);
};

export default addUploadCapabilities;
