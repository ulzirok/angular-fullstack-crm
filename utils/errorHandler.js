module.exports = (res, err) => { //универсальная ошибка во время работы сервера 500
  res.status(500).json({
    success: false,
    message: err.message ? err.message : err
  })
}