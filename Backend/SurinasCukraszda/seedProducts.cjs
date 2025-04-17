require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./src/models/Product");

// Ha a products fájl ES modulként exportálja a tömböt,
// akkor a require() által visszakapott objektum tartalmaz egy default property-t.
const products =
  require("../../Frontend/SurinasCukraszda/src/data/products").default;

const formattedProducts = products.map(({ id, ...rest }) => rest);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected, seeding products...");
    await Product.deleteMany({});
    const created = await Product.insertMany(formattedProducts);
    console.log("Products seeded:", created);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
