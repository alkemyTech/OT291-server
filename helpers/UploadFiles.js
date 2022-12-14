const FileManager = require('./FileManager.js');

class UploadFiles {
  static fromBase64ToBuffer(base64) {
    const buffer = Buffer.from(base64, 'base64');
    return buffer;
  }

  static getExtensions(file) {
    let [extension, decodedFile] = file.split(';base64,');
    extension = extension.split('/').pop();
    return { decodedFile, extension };
  }

  static async decodeImage(image, name) {
    try {
      if (image.startsWith('data:')) {
        const decodedImageWithExtension = UploadFiles.getExtensions(image);
        const imageFromB64toBuffer = UploadFiles.fromBase64ToBuffer(
          decodedImageWithExtension.decodedFile
        );
        const createdFileWithExtension = FileManager.createFile(
          imageFromB64toBuffer,
          decodedImageWithExtension.extension,
          name
        );
        return { createdFileWithExtension, name };
      }
      throw Error('Image must have an extension');
    } catch (error) {
      return error;
    }
  }
}

module.exports = UploadFiles;
