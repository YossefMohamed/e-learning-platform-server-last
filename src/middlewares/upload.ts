import multer, { FileFilterCallback } from "multer";
import { v4 as uuidv4 } from "uuid";

const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const acceptedTypes = file.mimetype.split("/");
    if (acceptedTypes[0] === "application") {
      cb(null, "public/files");
    } else if (acceptedTypes[0] === "video") {
      cb(null, "public/videos");
    } else {
      cb(new Error(), null);
    }
  },
  filename: function (req, file, cb) {
    const acceptedTypes = file.mimetype.split("/");
    cb(null, uuidv4() + "." + acceptedTypes[1]);
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
  const acceptedTypes = file.mimetype.split("/");

  if (file.fieldname === "file") {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // check file type to be pdf, doc, or docx
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  } else if (file.fieldname === "assignment") {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // check file type to be pdf, doc, or docx
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  } else if (file.fieldname === "video") {
    if (acceptedTypes[0] === "video") {
      // check file type to be pdf, doc, or docx
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  }
}
