const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

// Habilita CORS para permitir que tu sitio web llame a esta función
app.use(cors({ origin: true }));
app.use(express.json());

const API_KEY = "XXVcS-uh74S0UXVSfa_2rA"; // Tu API Key de Glam.ai
const API_URL = "https://api.glam.ai/api/v1/tryon";

// Ruta para iniciar la generación del probador virtual
app.post("/tryon", async (req, res) => {
  try {
    const { media_url, garment_url, mask_type } = req.body;

    if (!media_url || !garment_url) {
      return res.status(400).send({ error: "Faltan media_url o garment_url" });
    }

    const options = {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "X-API-Key": API_KEY,
      },
      body: JSON.stringify({
        mask_type: mask_type || "overall",
        media_url: media_url,
        garment_url: garment_url,
      }),
    };

    const apiResponse = await fetch(API_URL, options);
    const data = await apiResponse.json();

    if (!apiResponse.ok) {
        // Si la API externa da un error, lo pasamos al cliente
        return res.status(apiResponse.status).send(data);
    }
    
    res.status(200).send(data);
  } catch (error) {
    console.error("Error en el proxy de /tryon:", error);
    res.status(500).send({ error: "Error interno del servidor." });
  }
});

// Ruta para verificar el resultado de la generación
app.get("/tryon/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
        return res.status(400).send({ error: "Falta el eventId" });
    }

    const options = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'X-API-Key': API_KEY
        }
    };

    const apiResponse = await fetch(`${API_URL}/${eventId}`, options);
    const data = await apiResponse.json();

     if (!apiResponse.ok) {
        return res.status(apiResponse.status).send(data);
    }

    res.status(200).send(data);
  } catch (error) {
    console.error(`Error en el proxy de /tryon/${req.params.eventId}:`, error);
    res.status(500).send({ error: "Error interno del servidor." });
  }
});

// Exporta la app de Express como una Cloud Function llamada 'api'
exports.api = functions.https.onRequest(app);
