import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'wwwroot')));

app.get("/", async (req,res) => {
    res.sendFile(path.join(__dirname, 'wwwroot', 'index.html'));
})

app.listen(3000, 'localhost', () => {
    console.log('Example app listening at http://localhost:3000')
})