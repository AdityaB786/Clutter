const fs = require('fs');
const path = require('path');

// Define the source directory (where the files are currently located)
const source = path.join(__dirname, 'clutter');
// Define the target directory (where the files will be organized)
const target = __dirname;

// Check if the source directory exists
if (!fs.existsSync(source)) {
    console.error(`Source directory does not exist: ${source}`);
    process.exit(1); // Exit the script with a non-zero status code
}

fs.readdir(source, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        // Full path of the file
        const filePath = path.join(source, file);
        // Extract file extension
        const extension = path.extname(file).slice(1);
        // Directory path based on file extension
        const directory = path.join(target, extension);

        // Create directory if it does not exist
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        // Move file to the corresponding directory
        const newFilePath = path.join(directory, file);
        fs.renameSync(filePath, newFilePath);
        console.log(`Moved ${file} to ${newFilePath}`);
    });
});
