import { Server } from 'socket.io'
import server from '../../index.js';
import { OnnxKlas } from "../../utils/onnxcore.js";
import { getDatabase } from 'firebase-admin/database';
import admin from 'firebase-admin';

const firebaseConfig = {
  apiKey: "AIzaSyD7eJA-Gl-Yi86KDX8nxf_67yTm3Ovd-M8",
  authDomain: "peoplecounting-4f4a4.firebaseapp.com",
  projectId: "peoplecounting-4f4a4",
  storageBucket: "peoplecounting-4f4a4.appspot.com",
  messagingSenderId: "414950789625",
  appId: "1:414950789625:web:e9156a2f60b54fc6b22d28",
  measurementId: "G-VHEH6XGP0Q",
  databaseURL: "https://peoplecounting-4f4a4-default-rtdb.firebaseio.com"
};

class CounterService {

    static async runDetector (req) {
        try {
            const modelInfo = {
                name: 'yolov7-tiny.onnx', // ONNX dosyası
                inputShape: [1, 3, 640, 640] // model için giriş tensörünün şekli
            }

            const io = new Server(server, {
                maxHttpBufferSize: 1e8,
                pingTimeout: 60000,
                cors: {
                    origin: 'http://localhost:3000', 
                    methods: ['GET', 'POST'] 
                }
            })

            io.on('connection', (socket) => {
                // model bilgilerini istemciye gönder
                socket.emit('model-env', modelInfo)

                socket.on('disconnect', () => {
                    // kullanıcı soket bağlantısının kesildiğini bildirir
                    console.log('user disconnected')
                })

                // önyüzden görüntü dizisi alır ve görüntüdeki nesneyi algılamak üzere detect fonskiyonunu çalıştırır
                socket.on('videoframe', async (frame, xRatio, yRatio, callback) => {
                    const boxes = await OnnxKlas.detect(frame, xRatio, yRatio)
                    // algılama sonuçlarını önyüze geri gönder
                    callback(boxes)
                    console.log(boxes);
                })
            })

        }
        catch (err) {
            return {type: false, message: err};
        }
    }

    static async runDetectorSaveData (req) {
        try{
            const db = admin.firestore();
            
            let customerRef = db.collection('people');

            customerRef.get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    console.log(doc.id, '=>', doc.data());
                });
            })
            
            return {type: true, message: 'Data saved successfully'};
        }
        catch (err) {
            console.log('a',err);
            return {type: false, message: err};
        }
    }

    static async test (req) {
        try{

            const db = getDatabase();
        
            const ref = db.ref();
            const usersRef = ref.child('users');    

            const modelInfo = {
                name: 'yolov7-tiny.onnx', // ONNX dosyası
                inputShape: [1, 3, 640, 640] // model için giriş tensörünün şekli
            }

            const io = new Server(server, {
                maxHttpBufferSize: 1e8,
                pingTimeout: 60000,
                cors: {
                    origin: 'http://localhost:3000', 
                    methods: ['GET', 'POST'] 
                }
            })

            io.on('connection', (socket) => {
                // model bilgilerini istemciye gönder
                socket.emit('model-env', modelInfo)

                socket.on('disconnect', () => {
                    // kullanıcı soket bağlantısının kesildiğini bildirir
                    console.log('user disconnected')
                })

                // önyüzden görüntü dizisi alır ve görüntüdeki nesneyi algılamak üzere detect fonskiyonunu çalıştırır
                socket.on('videoframe', async (frame, xRatio, yRatio, callback) => {
                    const boxes = await OnnxKlas.detect(frame, xRatio, yRatio)
                    // algılama sonuçlarını önyüze geri gönder
                    callback(boxes)
                    console.log(boxes);
                    usersRef.set({
                        test: {
                            date_of_birth: new Date(),
                            full_name: boxes
                        },
                    });
                })
            })

        }
        catch (err) {
            console.log('a',err);
            return {type: false, message: err};
        }
    }

    static async testWithNormalDatabase (req) {
        try{
            const db = admin.firestore();
            
            let customerRef = db.collection('people');

            // db.collection('people').doc('peoplecount').set({
            //     people: 4
            // });

            customerRef.add({
                people: 5
            });

            customerRef.get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    console.log(doc.id, '=>', doc.data());
                });
            })

            // const cityRef = db.collection('people').doc('peoplecount');

            // await cityRef.set({
            //     title: new Date(),
            //     body: 'Hello World',
            // });

            // await cityRef.set({
            //     title: new Date(),
            //     body: 'Hello World',
            // });

            // const res = await cityRef.add({
            //     people: 4
            // });

            // const res = await cityRef.set({
            //     capital: true
            // }, { merge: true });

            return {type: true, message: 'Data saved successfully'};
        }
        catch (err) {
            console.log('1',err);
            return {type: false, message: err};
        }
    }

    static async son (req) {
        try{

            const db = admin.firestore();
            
            let customerRef = db.collection('people');

            const modelInfo = {
                name: 'yolov7-tiny.onnx', // ONNX dosyası
                inputShape: [1, 3, 640, 640] // model için giriş tensörünün şekli
            }

            const io = new Server(server, {
                maxHttpBufferSize: 1e8,
                pingTimeout: 60000,
                cors: {
                    origin: 'http://localhost:3000', 
                    methods: ['GET', 'POST'] 
                }
            })

            io.on('connection', (socket) => {
                // model bilgilerini istemciye gönder
                socket.emit('model-env', modelInfo)

                socket.on('disconnect', () => {
                    // kullanıcı soket bağlantısının kesildiğini bildirir
                    console.log('user disconnected')
                })

                // önyüzden görüntü dizisi alır ve görüntüdeki nesneyi algılamak üzere detect fonskiyonunu çalıştırır
                socket.on('videoframe', async (frame, xRatio, yRatio, callback) => {
                    const boxes = await OnnxKlas.detect(frame, xRatio, yRatio)
                    // algılama sonuçlarını önyüze geri gönder
                    callback(boxes)
                    console.log(boxes);
                    customerRef.add({
                        date: new Date(),
                        box: boxes
                    });
                })
            })

        }
        catch (err) {
            console.log('1',err);
            return {type: false, message: err};
        }
    }
}

export default CounterService;