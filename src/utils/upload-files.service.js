import http from "../utils/http-common";



class UploadFilesService {
  upload(FormData) {
    return http.post("/upload", FormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
export default new UploadFilesService();