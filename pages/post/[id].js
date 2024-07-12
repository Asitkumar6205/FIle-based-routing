module.exports = (req, res) => {
  const { id } = req.params; 
  res.render('post/post', { id });
};