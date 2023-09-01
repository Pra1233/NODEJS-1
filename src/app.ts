import express from 'express';
import bodyParser from 'body-parser';
import todos from './routes/todos';

const app=express();
app.use(bodyParser.json());

app.use(todos);
app.listen(3000);
