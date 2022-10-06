const fs = require('fs').promises;
const path = require('path');
const Sdk3 = require('../services/awsServices');
const UploadFiles = require('./UploadFiles.js');

class FileManager {
  static async createDir() {
    try {
      await fs.mkdir(path.join(__dirname, '../', 'tempFiles'));
    } catch (error) {
      return `Could not create a dir: ${error.message}`;
    }
  }

  static async createFile(payload, extension) {
    try {
      await FileManager.createDir();
    } catch (error) {
      throw new Error('Could not create a new directory');
    }
    try {
      if (extension) {
        return await fs.writeFile(
          path.resolve('tempFiles', `test.${extension}`),
          payload
        );
      }
      throw new Error('A file extension is required');
    } catch (error) {
      console.error(`Could not create a file: ${error.message}`);
    }
    try {
      await FileManager.uploadToS3();
    } catch (error) {
      return error;
    }
  }

  static async uploadToS3() {
    try {
      await Sdk3.uploadFile({
        filename: 'pichicho.jpg',
        path: '../tempFiles/test.jpg',
      });
    } catch (error) {
      return error;
    }
    try {
      await fs.unlink(path.resolve('tempFiles', 'test.jpg'));
    } catch (error) {
      return error;
    }
  }
}

module.exports = FileManager;
