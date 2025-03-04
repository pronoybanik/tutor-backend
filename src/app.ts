import express, { Application } from 'express';
import cors from 'cors';
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorhandler';
import NotFound from './middlewares/notFound';
const app: Application = express();

//parsers
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to the server 5000',
  });
});

// Global error handling
app.use(globalErrorHandler);

app.use(NotFound);

export default app;
