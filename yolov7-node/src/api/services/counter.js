import { Server } from 'socket.io'
import server from '../../index.js';
import { OnnxRunTime } from "../../utils/onnxcore.js";
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

    static io = null; // Define a static variable for the Socket.IO server instance

    static getSocketIOInstance() {
        if (!CounterService.io) {
          // Create a new Socket.IO server instance if it doesn't exist
          CounterService.io = new Server(server, {
            maxHttpBufferSize: 1e8,
            pingTimeout: 60000,
            cors: {
              origin: 'http://localhost:3000',
              methods: ['GET', 'POST'],
            },
          });
    
        //   CounterService.io.on('connection', (socket) => {
        //     // Handle socket connections
        //     // ...
        //   });
        }
    
        return CounterService.io;
      }

    // Detect and count people
    static async runDetector (req) {
        try {
            const modelInfo = {
                name: 'yolov7-tiny.onnx', // ONNX dosyası
                inputShape: [1, 3, 640, 640] // model için giriş tensörünün şekli
            }

            const io = CounterService.getSocketIOInstance(); // Get the Socket.IO server instance

            io.sockets.sockets.forEach((socket) => {
                socket.disconnect(true);
            });

            io.on('connection', (socket) => {
                // model bilgilerini istemciye gönder
                socket.emit('model-env', modelInfo)

                socket.on('disconnect', () => {
                    // kullanıcı soket bağlantısının kesildiğini bildirir
                    console.log('kullanıcı bağlantısı kesildi')
                })

                // önyüzden görüntü dizisi alır ve görüntüdeki nesneyi algılamak üzere detect fonskiyonunu çalıştırır
                socket.on('videoframe', async (frame, xRatio, yRatio, callback) => {
                    const boxes = await OnnxRunTime.detect(frame, xRatio, yRatio)
                    // algılama sonuçlarını önyüze geri gönder
                    callback(boxes)
                })
            })

            return {type: true, message: 'Algılayıcı Çalışıyor'};
        }
        catch (err) {
            return {type: false, message: err};
        }
    }

    // Detect and save data to firebase realtime database 
    static async runAndSave (req) {
        try{

            const db = getDatabase();
            const ref = db.ref('people');   
            
            const modelInfo = {
                name: 'yolov7-tiny.onnx', // ONNX dosyası
                inputShape: [1, 3, 640, 640] // model için giriş tensörünün şekli
            }

            const io = CounterService.getSocketIOInstance(); // Socket.IO sunucusu örneğini al

            io.sockets.sockets.forEach((socket) => {
                socket.disconnect(true);
            });

            io.on('connection', (socket) => {
                // model bilgilerini istemciye gönder
                socket.emit('model-env', modelInfo)

                socket.on('disconnect', () => {
                    // kullanıcı soket bağlantısının kesildiğini bildirir
                    console.log('kullanıcı bağlantısı kesildi')
                })

                // önyüzden görüntü dizisi alır ve görüntüdeki nesneyi algılamak üzere detect fonskiyonunu çalıştırır
                socket.on('videoframe', async (frame, xRatio, yRatio, callback) => {
                    const boxes = await OnnxRunTime.detect(frame, xRatio, yRatio)
                    // algılama sonuçlarını önyüze geri gönder
                    callback(boxes)
                    let counter = 0;
                    if (boxes.length > 0) {
                        for (let i = 0; i < boxes.length; i++) {
                            if (boxes[i].classId == 0) {
                                counter++;
                            }
                        }
                    }
                    boxes.push(`detected people nums: ${counter}`);
                    const newPersonRef = ref.child(new Date().toISOString().replace(/T|\.|Z/g, '/'));
                    newPersonRef.set(boxes);
                })
            })
            return {type: true, message: 'Algılayıcı başarılı bir şekilde çalışıyor ve veriler kaydediliyor'};
        }
        catch (err) {
            return {type: false, message: err};
        }
    }

    // Get data from firebase realtime database
    static async getAllWithParam (req) {
        try{
            const db = getDatabase();
            
            const { date = '', time = '' } = req.body;

            const customerRef = db.ref(`people/${date}/${time}`);
            // const customerRef = db.ref(`people//`);
            
            // console.log(date , time);

            let data = [];

            const snapshot = await customerRef.get();
  
            snapshot.forEach((doc) => {
              data.push(doc.toJSON());
            });

            return {type: true, data, message: 'Veri Başarıyla Bulundu'};
        }
        catch (err) {
            // console.log(err);
            return {type: false, message: err};
        }
    }

    // Delete data from firebase realtime database
    static async delete (req) {
        try{
           const db = getDatabase();

            const { date = '', time = '' } = req.body;

            const customerRef = db.ref(`people/${date}/${time}`);
            // const customerRef = db.ref(`people//`);

            customerRef.remove(
                (error) => {
                  if (error) {
                    console.log("Silme işlemi başarısız:" + error.message);
                  } else {
                    console.log("Silme işlemi başarılı.");
                  }
                }
              );

            return {type: true, message: 'Veri Başarıyla Silindi'};
        }
        catch (err) {
            console.log(err);
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


            return {type: true, message: 'Data saved successfully'};
        }
        catch (err) {
            return {type: false, message: err};
        }
    }

    static async deleteSession (req) {
        try{
            OnnxRunTime.deleteAllSessions();
            return {type: true, message: 'Session deleted successfully'};
        }
        catch (err) {
            console.log(err);
            return {type: false, message: err};
        }
    }

}

export default CounterService;