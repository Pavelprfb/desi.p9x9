const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// MongoDB Connection
const MONGO_URI = 'mongodb+srv://MyDatabase:Cp8rNCfi15IUC6uc@cluster0.kjbloky.mongodb.net/adultLink';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

// Movie Schema & Model
const movieSchema = new mongoose.Schema({
  id: String,
  hadding: String,
  img: String,
  play: String
});

const Movie = mongoose.model('Movie', movieSchema);
movieSchema.index({ hadding: "text" });

// count Schema & Model
const countSchema = new mongoose.Schema({
  random: Number,
  count: Number
});

const CountModel = mongoose.model('CountModel', countSchema);


const url = "https://bd-desi2.onrender.com/";
const hadding = "BD Viral Link, Bangladeshi Viral Video";
const author = "Pabel Islan";
const movieName = "BD Desi";
const img = "https://res.cloudinary.com/dkyrj65dl/image/upload/v1763574451/uploads/a24pqmxwfrswory1zui2.png";
const description = "সাম্প্রতিক সোশ্যাল মিডিয়া ট্রেন্ড এবং ভাইরাল ভিডিও নিয়ে বিস্তারিত তথ্য ও আলোচনা। সর্বশেষ খবর, টিপস এবং ট্রেন্ডি কনটেন্ট এখানে খুঁজে পাবেন।";


app.get('/', async (req, res) => {
  try {
    const query = req.query.q || "";
    let data;

    if (query) {
      // 🔍 Exact text search
      data = await Movie.find(
        { $text: { $search: query } },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } });

      if (data.length === 0) {
        data = await Movie.find({
          hadding: { $regex: query.split(" ")[0], $options: "i" }
        });
      }
    } else {
      // 🎲 সব ডাটা নিয়ে Node.js-এ রেনডমাইজ
      data = await Movie.find({});
      // Fisher-Yates shuffle
      for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
      }
    }

    const latest = await Movie.find({})
      .sort({ _id: -1 })
      .limit(5)
      .select("id hadding");
    
    let countDoc = await CountModel.findOne();
    const randomData = countDoc.random
    const randomCount = countDoc.count
    
    
    res.render('index', {
      data,
      latest,
      query,
      url,
      author,
      movieName,
      hadding,
      img,
      description,
      randomData,
      randomCount
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// ===============================
// ✅ Updated Dynamic Sitemap (SEO Friendly)
// ===============================


app.get('/movie/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Main video
    const data = await Movie.findOne({ id });
    if (!data) return res.status(404).send("Not found");

    // 🔥 Random suggested videos (current video বাদ)
    const suggested = await Movie.aggregate([
      { $match: { id: { $ne: id } } },
      { $sample: { size: 8 } }
    ]);

    const dateArray = [
      "2025-11-22",
      "2025-11-23",
      "2025-11-24",
      "2025-10-22",
      "2025-11-20"
    ];
    const date = dateArray[(parseInt(id) - 1) % dateArray.length];
    
    
    let countDoc = await CountModel.findOne();
    const randomData = countDoc.random
    const randomCount = countDoc.count
    
    
    res.render('movie', {
      data,
      suggested,
      url,
      author,
      movieName,
      date,
      description,
      img,
      query: "",
      randomData,
      randomCount
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
app.get('/api/suggested', async (req, res) => {
  try {
    const { excludeId, skip = 0 } = req.query;

    const videos = await Movie.aggregate([
      { $match: { id: { $ne: excludeId } } },
      { $skip: parseInt(skip) },
      { $limit: 8 }
    ]);

    res.json(videos);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


const axios = require("axios");

app.get("/force-download", async (req, res) => {
  try {
    const videoUrl = req.query.video;
    let name = req.query.name || "video";

    if (!videoUrl) return res.status(400).send("Invalid request");

    name = name.replace(/[^\w\d]/g, "_").substring(0, 40);

    const response = await axios({
      method: "GET",
      url: videoUrl,
      responseType: "stream"
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${name}.mp4"`
    );
    res.setHeader("Content-Type", "video/mp4");

    response.data.pipe(res);

  } catch (err) {
    console.error(err);
    res.status(500).send("Download failed");
  }
});
app.get('/api/count', async (req, res) => {
  
    let countDoc = await CountModel.findOne();
    console.log(
        `
          random = ${countDoc.random}
          count = ${countDoc.count}
        `
      )
      res.send(
          `
            random = ${countDoc.random}
            count = ${countDoc.count}
          `
        )
  
});

// ================= /count POST =================
app.post('/count', async (req, res) => {
  try {
    const count = req.body.count;

    // প্রথমে ডাটাবেস থেকে document নিন
    let doc = await CountModel.findOne();

    if (!doc) {
      // যদি document না থাকে, নতুন create করুন
      doc = new CountModel({ count: count, random: 1 });
    } else {
      // যদি document থাকে, update করুন
      doc.count = count;
      doc.random = doc.random + 1;

      // random 5 হলে আবার 1 থেকে শুরু হবে
      if (doc.random > 5) {
        doc.random = 1;
      }
    }

    await doc.save();

    res.send('Count updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));