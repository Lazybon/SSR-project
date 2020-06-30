import express from 'express';
import router from './router';

const app = express();

app.use(express.static('public'));

app.get('*', router)

export default app;
