const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'clutter');
const daysOld = 0;
const cutoffDate = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);

fs.readdir(directory, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(directory, file);
        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error('Error getting file stats:', err);
                return;
            }

            if (stats.mtime < cutoffDate) {
                fs.unlink(filePath, err => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    } else {
                        console.log(`Deleted old file: ${filePath}`);
                    }
                });
            }
        });
    });
});
