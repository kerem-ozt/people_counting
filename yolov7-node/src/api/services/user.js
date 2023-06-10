import admin from 'firebase-admin'
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD7eJA-Gl-Yi86KDX8nxf_67yTm3Ovd-M8",
  authDomain: "peoplecounting-4f4a4.firebaseapp.com",
  projectId: "peoplecounting-4f4a4",
  storageBucket: "peoplecounting-4f4a4.appspot.com",
  messagingSenderId: "414950789625",
  appId: "1:414950789625:web:e9156a2f60b54fc6b22d28",
  measurementId: "G-VHEH6XGP0Q"
};

class UserService {

    static async getAll (req) {
        try {
            const userResponse = await admin.auth().listUsers();
            return {type: true, data: userResponse};
        }
        catch (err){
            return {type: false, message: err};
        }
    }

    static async get (req) {
        try {
            let {uid} = req.params;
            const userResponse = await admin.auth().getUser(uid);
            return {type: true, data: userResponse};
        }
        catch (err) {
            return {type: false, message: err};
        }
    }

    static async register (req) {
		
        try {
            const user = {
                email: req.body.email,
                password: req.body.password
            }
            const userResponse = await admin.auth().createUser({
                email: user.email,
                password: user.password,
                emailVerified: false,
                disabled: false
            })
            return {type: true, data: user};
        }
        catch (err) {	
            return {type: false, message: err};
        }
		
    }

    static async delete (req) {

		try {
			let {uid} = req.params;
			const userResponse = await admin.auth().deleteUser(uid);
            return {type: true, data: userResponse};
        }
        
        catch (err) {
            return {type: false, message: err};
        }
	}

    static async update (req) {

        try {
            let {uid} = req.params;
            const user = {
                email: req.body.email,
                password: req.body.password
            }
            const userResponse = await admin.auth().updateUser(uid, {
                email: user.email,
                password: user.password,
                emailVerified: false,
                disabled: false
            })
            return {type: true, data: userResponse};
        }
        catch (err) {
            return {type: false, message: err};
        }
    }

    static async login (req) {
		
        try {
            const user = {
                email: req.body.email,
                password: req.body.password
            }

            const app = initializeApp(firebaseConfig);
            const userResponse = await signInWithEmailAndPassword(getAuth(), user.email, user.password);
            
            await userResponse.user.getIdToken().then((idToken) => {
                req.session.token = idToken;
            });

            return {type: true, data: {user , token: req.session.token}};
        }
        catch (err) {
            return {type: false, message: err};
        }

		// 	if ( user && createHash('md5').update(password).digest('hex') === user.password) {
		// 		const token = generateAccessToken({ username: user.id });				
		// 		req.session.userid = user.id;
		// 		req.session.token = token;
		// 		const refreshToken = generateRefreshToken({ username: user.id });
		// 		await db.users.update(
		// 			{refresh_token: refreshToken},
		// 			{ where: { id: user.id } }
		// 		);
		// 		return ({ type: true, data: user, message: getLanguage(language, 'user_login_success')});
		// 	}
		// 	else {
		// 		return { type: false, message: getLanguage(language, 'user_login_fail')}; 
		// 	}
		// }
	}

    static async logout (req) {

        try {
            const app = initializeApp(firebaseConfig);
            
            const userResponse = await signOut(getAuth());

            req.session.destroy(function(err) {
                if(err) {
                    return {type: false, message: err};
                }
            });
            
            return {type: true, data: userResponse};
        }
        catch (err) {
            return {type: false, message: err};
        }
    }
}

export default UserService;