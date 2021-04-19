const fs = require('fs');
const path = require('path');

async function storeFiles(files, hash) {
    if (files && files.length) {
        const upload_dir = path.join(process.env.UPLOAD_DIRECTORY, hash);
        await fs.promises.mkdir(upload_dir, { recursive: true })
        for (let file of files) {
            const base64data = file.content.replace(/^data:.*,/, '');
            fs.writeFile(path.join(upload_dir, file.filename), base64data, 'base64', (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
    }
}

module.exports = { storeFiles };