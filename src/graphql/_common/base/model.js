import path from 'path';
import fs from 'fs';
import getFieldNames from 'graphql-list-fields';

export default class BaseModel {
  getProjection(fieldASTs) {
    return getFieldNames(fieldASTs).reduce(
      (p, c) => {
        let obj = {};
        obj[c] = 1;
        return Object.assign(p, obj);
      },
      {}
    );
  }
  handleGallery(id, gallery) {
    const uploadDir = path.resolve(__dirname, 'uploads', 'gallery', id);
    const uploadedImages = gallery.map(image => image.name);
    // recursively creating directories if it doesn't exist
    uploadDir.split('/').forEach((dir, index, splits) => {
      const parent = splits.slice(0, index).join('/');
      const dirPath = path.resolve(parent, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
    });
    let files = [];
    gallery.map((file, index) => {
      const newPath = path.join(uploadDir, file.name);
      if (fs.existsSync(file.path)) {
        fs.renameSync(file.path, newPath);
        file.path = newPath;
        files.push(file);
      }
    });
    // Remove old files
    fs.readdirSync(uploadDir).map(image => {
      if (!uploadedImages.includes(image)) fs.unlinkSync(path.resolve(uploadDir, image));
    });
    return files;
  }
}
