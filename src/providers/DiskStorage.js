const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
  //upload do arquivo
  async saveFile(file) {
    fs.promises.rename(
      //onde o arquivo está path.resovle()
      path.resolve(uploadConfig.TMP_FOLDER, file),
      //onde eu quero mover path.resovle()
      path.resolve(uploadConfig.UPLOAD_FOLDER, file)
    );
    return file;
  }
  //deletando arquivo
  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOAD_FOLDER, file);
    try {
      //stat retorna o status do arquivo
      await fs.promises.stat(filePath);
    } catch (error) {
      return console.log(error);
    }
    //unlink() remove o aquivo
    await fs.promises.unlink(filePath);
  }
}
module.exports = DiskStorage;
