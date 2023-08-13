// sıra önemli req,res,next
module.exports = (req, res, next) => {
  console.log(
    `date: ${new Date().toUTCString()}  - method: ${req.method}  - hostname: ${
      req.hostname
    }  - path: ${req.path}`
  );
  next(); // bunu kaldırırsak sonraki middleware'e geçmez
};
