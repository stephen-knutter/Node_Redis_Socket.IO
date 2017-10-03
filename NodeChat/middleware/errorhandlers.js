exports.notFound = function notFound(req, res, next) {
  res.status(404).send('You seem lost. You must have taken a wrong turn somewhere');
}

exports.error = function error(err, req, res, next) {
  console.error(err);
  res.status(500).send('Ooops, something broke');
}
