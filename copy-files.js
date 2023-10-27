const fs = require('fs-extra');
const path = require('path');

const srcDirectory = path.join(__dirname, 'src');
const publicDirectory = path.join(__dirname, 'public');

const allowedExtensions = ['.png', '.xlsx'];

const copyAllowedFiles = async (sourceDir, destinationDir) => {
  try {
    // Create the destination directory if it doesn't exist
    await fs.ensureDir(destinationDir);

    // Read the source directory
    const files = await fs.readdir(sourceDir);

    // Iterate through the files and copy only allowed extensions
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const destinationPath = path.join(destinationDir, file);
      const fileExtension = path.extname(file).toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        await fs.copy(sourcePath, destinationPath);
        console.log(`Copied: ${file}`);
      }
    }

    console.log('Allowed files copied successfully!');
  } catch (err) {
    console.error('Error copying files:', err);
  }
};

copyAllowedFiles(path.join(srcDirectory, ''), path.join(publicDirectory, ''));
