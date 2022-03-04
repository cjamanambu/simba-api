import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import accountRoute from './routes/account.route';

const app = express();
dotenv.config();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 7000;

app.use('/api/v1/account', accountRoute);

app.get('*', (req, res) => {
  res.status(200).send({
    message: 'Welcome to the SimbaWise API.',
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server listening at port ${PORT}`);
});
