const current = async (req, res) => {
  const { id, email } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: { id, email },
    message: "User data",
  });
};

module.exports = { current };
