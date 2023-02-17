import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import FormData from 'form-data';

const dirname = path.resolve();
const rootPath = `${dirname}/files`;
const uploadUrl = 'https://api-minter.wakeuplabs.link/upload'; //Wakeup API endpoint

const apiKey = process.argv[2]; // assume API key is the first command-line argument

if (!apiKey) {
  console.error('API key missing. Please provide the API key as a command-line argument.');
  process.exit(1);
}

function uploadFilesInDirectory(dirPath) {
  fs.readdir(dirPath, (err, items) => {
    if (err) {
      console.error(`Error reading folder: ${err}`);
      return;
    }

    items.forEach(item => {
      const itemPath = path.join(dirPath, item);

      if (fs.lstatSync(itemPath).isDirectory()) {
        // Recursively upload files in subdirectories
        uploadFilesInDirectory(itemPath);
      } else {
        const fileStream = fs.createReadStream(itemPath);

        const formData = new FormData();
        formData.append('file', fileStream, item);

        const options = {
          method: 'POST',
          headers: {
            apikey: apiKey
          },
          body: formData
        };

        fetch(uploadUrl, options)
          .then(async (res) => {
            if (res.ok) {
              console.log(`File ${item} uploaded successfully: ${JSON.stringify(await res.json())}`);
            } else {
              console.error(`Error uploading file ${item}: ${res.statusText}: ${JSON.stringify(await res.json())}`);
            }
          })
          .catch(err => {
            console.error(`Error catch uploading file ${item}: ${err}`);
          });
      }
    });
  });
}

uploadFilesInDirectory(rootPath);
