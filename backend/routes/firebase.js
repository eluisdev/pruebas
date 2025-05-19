// routes/tasks.js
import { Router } from 'express';
const router = Router();

// Obtener todas las tareas
router.get('/', (req, res) => {
    console.log("Se envio la petcicion");
    res.json({
        apiKey: "AIzaSyDcW8eA-Z2RHV9ZJCHbV9sx0F79Wyw9p1w",
        authDomain: "paleta-io-production.firebaseapp.com",
        databaseURL: "https://paleta-io-production-default-rtdb.firebaseio.com",
        projectId: "paleta-io-production",
        storageBucket: "paleta-io-production.firebasestorage.app",
        messagingSenderId: "179059572953",
        appId: "1:179059572953:web:7f6b59c5701ff5598bbec8",
        measurementId: "G-BZ96MXRVZX"
    });
});

export default router;
