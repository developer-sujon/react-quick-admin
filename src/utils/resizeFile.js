//External Lib Import
import Resizer from "react-image-file-resizer";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      140,
      140,
      "PNG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64",
    );
  });
export default resizeFile;
