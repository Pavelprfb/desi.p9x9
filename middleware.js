// middleware.js
module.exports = function(req, res, next) {
  // আগের সমস্ত logic থাকছে কিন্তু global variable নয়
  res.locals.url = `https://${req.headers.host}`;
  res.locals.hadding = "BD Viral Link, Bangladeshi Viral Video";
  res.locals.author = "Pabel Islan";
  res.locals.movieName = "Viral Link";
  res.locals.img = "https://i.postimg.cc/KzKbCSqs/1768441412180.png";
  res.locals.description = "ভিডিও তে ক্লিক করার পর অন্য কোনো জায়গায় নিয়ে গেলে ফিরে আসে আবার ক্লিক করলে ভিডিও চলবে";
  res.locals.moreWebsite = "https://p9x9.com";
  res.locals.telegramLink = "https://telegram.p9x9.com/AuDDLZklB";
  res.locals.keywords = "Bangla Sex Video, Bangladeshi Sex Video, Viral Link, Tiktoker Viral Link, Bhabi Sex, Vabi Sex";
  res.locals.smartLink = "https://superioroptionaleveryone.com/n7zjq0qcp?key=f4ce1616a0dbd6e606504b1fa58b7fb1";

  next();
};