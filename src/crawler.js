require("dotenv/config");
const PageSummary = require("./models/PageSummary");
const rp = require("request-promise");
const mongoose = require("mongoose");
const url = "https://en.wikipedia.org/wiki/Main_Page";
const $ = require("cheerio");

async function getWikipediaSource() {
  try {
    const html = await rp(url);

    const tfa = $("#mp-tfa", html)
      .find("p")
      .html()
      .split("/wiki/")
      .join("https://en.wikipedia.org/wiki/");

    const tfaImage = $("#mp-tfa", html)
      .find("img")[0]
      .attribs.src.replace("//", "https://");

    const dyk = $("#mp-dyk", html)
      .find("ul")
      .html()
      .split("/wiki/")
      .join("https://en.wikipedia.org/wiki/");

    const dykImage = $("#mp-dyk", html)
      .find("img")[0]
      .attribs.src.replace("//", "https://");

    const pageSummary = {
      todayFeaturedArticle: tfa,
      todayFeaturedImageSrc: tfaImage,
      didYouKnow: dyk,
      didYouKnowImage: dykImage,
      unique: true,
    };

    return pageSummary;
  } catch (err) {
    console.error(err);
  }
}

async function sendSummaryToDatabase() {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const pageSummary = await getWikipediaSource();

    await PageSummary.findOneAndUpdate({ unique: true }, pageSummary);
  } catch (err) {
    console.error(err);
  }
}

sendSummaryToDatabase();
