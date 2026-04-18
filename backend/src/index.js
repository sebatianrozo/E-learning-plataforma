import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Configuración de CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares de logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ 
    message: '✅ API de E-learning funcionando',
    environment: NODE_ENV,
    timestamp: new Date()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Backend funcionando correctamente',
    environment: NODE_ENV,
    timestamp: new Date()
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    path: req.path,
    method: req.method
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  res.status(err.status || 500).json({ 
    error: NODE_ENV === 'production' ? 'Error interno del servidor' : err.message,
    status: err.status || 500
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
🚀 Backend iniciado
┌─────────────────────────────────────┐
│ Puerto: ${PORT}
│ Entorno: ${NODE_ENV}
│ URL API: http://localhost:${PORT}
│ Health Check: http://localhost:${PORT}/api/health
└─────────────────────────────────────┘
  `);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('[CRITICAL]', 'Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('[CRITICAL]', 'Uncaught Exception:', error);
  process.exit(1);
});
