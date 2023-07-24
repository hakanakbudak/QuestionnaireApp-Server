const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'your_secret_key_here', (err, decodedToken) => {
        if (err) return res.sendStatus(403);
        req.user = decodedToken; // Kullanıcı kimliğini request objesine ekler
        next();
    });
};