exports.notFound = function notFound(req, res, next) {
  res.status().send(404, 'You seem lost. You must hav taken a wrong turn.');
}

exports.error = function error(err, req, res, next) {
  console.log(err);
  res.status().send(500, 'Something broke. What did you do?');
}
