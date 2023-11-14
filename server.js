const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
console.log(process.env.DATABASE);
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// console.log(db);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('Established a DB Connection....');
  })
  .catch((err) => console.log('Error: ', err));

//SERVER AND PORT
const port = 8800;
app.listen(port, () => {
  console.log(`Accessing Via Port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
