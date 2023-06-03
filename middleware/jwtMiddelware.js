const jwt = require('jsonwebtoken');

const secretKey = 'gizliAnahtar';

function jwtMiddleware(req, res, next) {
  // İstek başlığından token'ı al
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Yetkilendirme başarısız: Token bulunamadı.' });
  }

  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Yetkilendirme başarısız: Geçersiz token.' });
  }
}

module.exports = jwtMiddleware;
