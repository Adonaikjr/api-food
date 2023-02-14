const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

//CONSIGURANDO UPLOAD DE IMAGENS
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, "uploads");
//BIBLIOTECA MULTER fazer upload
const MULTER = {
  //envio do arquivo
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    //nome do arquivo
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
};
module.exports = {
  TMP_FOLDER,
  UPLOAD_FOLDER,
  MULTER,
};
