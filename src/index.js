import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import accountRoute from './routes/account.route';

const app = express();
dotenv.config();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 7000;

app.use('/api/v1/account', accountRoute);

app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Welcome to this API.',
  })
);

app.listen(PORT, () => {
  console.log(`server listen at port ${PORT}`);
});
