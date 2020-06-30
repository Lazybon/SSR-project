import app from './app';
const port = 8080;


app.listen(port, () => {
    console.info(`Listening on 0.0.0.0:${port}`);
})
