// server/server.js
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';


dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json({ limit: '10mb' }));


const GLAM_API_KEY = process.env.GLAM_API_KEY;
if (!GLAM_API_KEY) {
console.warn('[WARN] GLAM_API_KEY no está definido en .env');
}


// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Mock de productos (o podrías servir el archivo directamente)
import fs from 'fs';
const productsPath = path.join(__dirname, '..', 'public', 'products.json');


app.get('/api/products', (req, res) => {
try {
const data = fs.readFileSync(productsPath, 'utf-8');
res.json(JSON.parse(data));
} catch (err) {
console.error(err);
res.status(500).json({ error: 'No se pudieron cargar los productos' });
}
});


// Endpoint de proxy para Try-On de GlamAI
app.post('/api/tryon', async (req, res) => {
try {
const { mask_type = 'overall', media_url, garment_url } = req.body;
if (!media_url || !garment_url) {
return res.status(400).json({ error: 'media_url y garment_url son requeridos' });
}


const url = 'https://api.glam.ai/api/v1/tryon';
const options = {
method: 'POST',
headers: {
accept: 'application/json',
'content-type': 'application/json',
'X-API-Key': GLAM_API_KEY || ''
},
body: JSON.stringify({ mask_type, media_url, garment_url })
};


const r = await fetch(url, options);
const data = await r.json();


if (!r.ok) {
return res.status(r.status).json(data);
}


res.json(data);
} catch (error) {
console.error('Error en el proxy de Try-On:', error);
res.status(500).json({ error: 'Error interno del servidor' });
}
});


app.listen(PORT, () => console.log(`Áurea server escuchando en http://localhost:${PORT}`));