import { promises as fs } from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/site/', express.static(path.join(__dirname, 'wwwroot')));

app.get('/', (req, res) => {
    res.redirect('/site/');
});

app.get('/site', (req, res) => {
    res.sendFile(path.join(__dirname, 'wwwroot', 'index.html'));
});

app.get('/api/animals', async (req, res) => {
    const searchAnimal = req.query.animal;
    const imgsDir = path.join(__dirname, 'wwwroot', 'imgs');
    const files = await fs.readdir(imgsDir);
    const filteredFiles = files.filter(file => file.includes(searchAnimal));
    res.send(filteredFiles);
});

app.listen(3000, 'localhost', () => {
    console.log('Example app listening at http://localhost:3000')
})