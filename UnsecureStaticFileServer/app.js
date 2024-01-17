import { promises as fs } from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'wwwroot')));

function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    
    if (ext === '.html') {
        return 'text/html';
    } else if (ext === '.css') {
        return 'text/css';
    } else if (ext === '.jpg' || ext === '.jpeg') {
        return 'image/jpeg';
    } else if (ext === '.png') {
        return 'image/png';
    } else if (ext === '.txt') {
        return 'text/plain';
    } else {
        return 'application/octet-stream';
    }
}

app.get("/", async (req, res) => {
    const html = path.join(__dirname, 'wwwroot', 'index.html');
    let fileContents = await fs.readFile(html);
    const contentType = getContentType(html);
    res.type(contentType);
    res.send(fileContents);
})

app.get('*', async (req, res) => {
    let filePath = path.join(__dirname, req.path);
    let fileContent = await fs.readFile(filePath);
    const contentType = getContentType(filePath);
    res.type(contentType);
    res.send(fileContent);
  });

app.listen(3000, 'localhost', () => {
    console.log('Example app listening at http://localhost:3000')
})