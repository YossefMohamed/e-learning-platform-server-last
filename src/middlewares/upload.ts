import multer, { FileFilterCallback } from "multer";
import { v4 as uuidv4 } from "uuid";

const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const acceptedTypes = file.mimetype.split("/");

    if (acceptedTypes[0] === "application") {
      cb(null, "public/files");
    } else if (acceptedTypes[0] === "video") {
      cb(null, "public/videos");
    } else if (acceptedTypes[0] === "image") {
      cb(null, "public/images");
    } else {
      cb(new Error(), null);
    }
  },
  filename: function (req, file, cb) {
    const acceptedTypes = file.mimetype.split("/");
    const fileName = uuidv4() + "." + acceptedTypes[1];

    cb(null, fileName);
  },
});

export default multer({
  storage: uploadStorage,
  fileFilter: checkFileType,
});

function checkFileType(
  request: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  cb(null, true);

  // const acceptedTypes = file.mimetype.split("/");
  // console.log(file.fieldname);
  // console.log(file.fieldname);
  // console.log(file.fieldname);
  // if (
  //   file.fieldname === "file" ||
  //   file.fieldname === "assignment" ||
  //   file.fieldname === "image"
  // ) {
  //   if (
  //     file.mimetype === "application/pdf" ||
  //     file.mimetype === "application/msword" ||
  //     file.mimetype ===
  //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
  //     acceptedTypes[0] === "image" // Added image check
  //   ) {
  //     console.log("====================================");
  //     console.log(true);
  //     console.log("====================================");
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //   }
  // } else if (file.fieldname === "video") {
  //   if (acceptedTypes[0] === "video") {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //   }
  // } else {
  // cb(null, false);
  // }
}
