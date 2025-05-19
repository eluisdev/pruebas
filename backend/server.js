// server.js
import express from 'express';
import bodyParser from 'body-parser';
import firebaseRoute from './routes/firebase.js';
import cors from "cors"
const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}))
app.use(bodyParser.json());
app.use('/api/firebase', firebaseRoute);

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
