import admin from 'firebase-admin'

export async function verifyToken(req, res, next) {
	try {
		const {token} = req.headers;
		// const token = req.session.token;
		console.log(req.headers);
		if (!token) {
			return res.status(401).send('A token is required.');
		}
		else {
			await admin.auth().verifyIdToken(token);
		}
	}
	catch (err) {
		return res.status(401).send(err.message);
	}
	return next();
}