import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([{
    message: "Type your URL: ", 
    name: "URL"
  }])
  .then((answers) => {
    const url = answers.URL;
    fs.readFile('URL.txt', 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error("An error occured while reading the file!");
            console.log('Oops! Something went wrong while reading the file. Please try again later.');
            return
        };
        const URLSave = (data ? data.trim() + '\n': '') + url;
        fs.writeFile('URL.txt', URLSave, (err) => {
            if (err) {
                console.error('An error occurred while writing to the file:', err);
                console.log('Oops! Something went wrong while saving the URL. Please try again later.');
            } else {
                console.log('URL Saved in Text File!');
            }
        }); 
    }); 
    var qr_code = qr.image(url);
    qr_code.pipe(fs.createWriteStream('qr-code.png'));
  })
  .catch((error) => {
    if (error.isTtyError) {
        console.log('Error: Prompt couldn\'t be rendered.');
    } else {
        console.error('An unexpected error occurred:', error);
        console.log('Oops! Something went wrong. Please try again later.');
    }
});