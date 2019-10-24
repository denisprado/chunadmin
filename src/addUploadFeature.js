const addUploadCapabilities = requestHandler => (type, resource, params) => {
  if (type === "CREATE" && resource === "files") {
    if (params.data.files) {
      console.log(params.data);
      //const file = params.data.files.rawFile;

      const files = params.data.files.map(file => file.rawFile);

      var formData = new FormData();
      const data = params.data;

      // files
      files.forEach(file => {
        formData.append("files[]", file);
      });
      formData.append("AlbumId", data.AlbumId);

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
