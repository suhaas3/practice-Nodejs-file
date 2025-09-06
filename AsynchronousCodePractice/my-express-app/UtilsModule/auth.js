
const adminAuth = (req, res, next) => {
  //Logic for checking if the request is autherized
  const token = 'xyz';
  const isAuthenticate = token === 'xyz';
  if (!isAuthenticate) {
    res.status(404).send("Unautherized request!");
  } else {
    next();
  }
}

module.exports = {
  adminAuth
}