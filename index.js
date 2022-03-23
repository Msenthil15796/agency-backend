const express =require ("express");
const dotenv =require ("dotenv");
const mongoose =require ("mongoose");
const agencyRoutes =require ('./Routes/agency');

const app = express();
app.use(express.json())
dotenv.config();


app.use('/agency', agencyRoutes);
mongoose
    .connect(process.env.MONGO_URL, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("MongoDb connected");
        }
    });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
