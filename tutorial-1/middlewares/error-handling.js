// sıralama önemli err,req,res,next
// hatalar için kullanılır

module.exports = (err, req, res, next) => {
  res.status(err.statusCode).json(err);
};
