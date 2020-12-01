const now = new Date();

module.exports = (req, res) => {
  res.json({ alive: true, aliveAt: now.toISOString() });
}
