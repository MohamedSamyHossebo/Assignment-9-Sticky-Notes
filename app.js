import express from 'express';
import dotenv from 'dotenv';
import bootstrap from './src/app.controller.js';
dotenv.config({ path: './Config/.env.secrets' });
const app = express();
const port = process.env.PORT;

await bootstrap(app, express);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));

export default app;