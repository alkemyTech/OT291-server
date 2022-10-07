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

  static async createFile(payload, extension, name) {
    try {
      await FileManager.createDir();
    } catch (error) {
      throw new Error('Could not create a new directory');
    }
    try {
      await fs.writeFile(
        path.resolve('tempFiles', `${name}.${extension}`),
        payload
      );
    } catch (error) {
      return error.message;
    }
    try {
      await FileManager.uploadToS3(name);
    } catch (error) {
      return error;
    }
  }

  static async uploadToS3(name) {
    try {
      await Sdk3.uploadFile({
        filename: `${Date().split(' ').slice(0, 5).join(' ')}.jpg`,
        path: `../tempFiles/${name}.jpg`,
      });
    } catch (error) {
      return error;
    }
    try {
      await fs.unlink(path.resolve('tempFiles', `${new Date()}.jpg`));
    } catch (error) {
      return error;
    }
  }
}

module.exports = FileManager;
