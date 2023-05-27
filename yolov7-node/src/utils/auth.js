const checkAuth = (req, res, next) => {
    if (req.headers?.authorization?.startsWith('Bearer ')) {
        console.log('SA');
    }
    console.log('AS');
    const { authorization } = req.headers;
    console.log (req.headers);
    console.log (req.headers.postman-token);
    if (!authorization || !authorization.startsWith('Bearer ')) {
      // No authorization token found or invalid format
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    const token = authorization.split('Bearer ')[1];
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        req.user = decodedToken;
        next(); // Proceed to the next middleware/route
      })
      .catch((error) => {
        console.error('Error verifying token:', error);
        res.status(401).json({ error: 'Unauthorized' });
      });
  };

  export default checkAuth;
  