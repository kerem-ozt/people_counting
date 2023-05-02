// gerekli paketlerin ve modüllerin yüklenmesi
const path = require("path");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const ort = require("onnxruntime-node");
const cors = require("cors");

// model yapılandırması
const modelInfo = {
  name: "yolov7-tiny.onnx", // ONNX dosyası
  inputShape: [1, 3, 640, 640], // model için giriş tensörünün şekli
};

let session; // onnxruntime session'ı için değişken
(async () => {
  // modelin çalışma zamanı oturumunun oluşturulması
  session = await ort.InferenceSession.create(path.join(__dirname, modelInfo.name));

  // modelin boş bir girdi üzerinde çalıştırılarak kontrolü
  const tensor = new ort.Tensor(
    "float32",
    new Float32Array(modelInfo.inputShape.reduce((a, b) => a * b)),
    modelInfo.inputShape
  );
  await session.run({ images: tensor });
  console.log(session);
})();

const app = express();

// önyüzden gelebilecek isteklere izin vermek için CORS eklentisi
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  // SocketIO için maksimum aktarım boyutunun değiştirilmesi
  maxHttpBufferSize: 1e8,
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000', // CORS için izin verilen kaynağın ayarlanması
    methods: ['GET', 'POST'], // CORS için izin verilen HTTP yöntemlerinin ayarlanması
  },
});

// tek bir kare üzerinden nesne algılayan fonksiyon 
const detect = async (frame, xRatio, yRatio) => {
  // console.log('frame:', frame);
  const input = new Float32Array(frame.buffer); // giriş tensörlerinin oluşturulması
  // console.log('input:', input);
  const tensor = new ort.Tensor("float32", input, modelInfo.inputShape); // giriş tensörünün bir ONNX tensörüne dönüştürülmesi
  // console.log('tensor:', tensor);
  const { output } = await session.run({ images: tensor }); // ONNX session'ının çhazırlanan tensörle çalıştırılması ve çıktının alınması
  const boxes = [];

  // algılanan nesneler için döngü
  for (let r = 0; r < output.size; r += output.dims[1]) {
    const data = output.data.slice(r, r + output.dims[1]);
    const [x0, y0, x1, y1, classId, score] = data.slice(1);
    const w = x1 - x0,
      h = y1 - y0;
    boxes.push({
      classId: classId,
      probability: score,
      bounding: [x0 * xRatio, y0 * yRatio, w * xRatio, h * yRatio],
    });
  }
  // console.log(boxes);
  // algılanan nesnelerin döndürülmesi
  return boxes; 
};

io.on("connection", (socket) => {
  // model bilgilerini istemciye gönder
  socket.emit("model-env", modelInfo); 

  socket.on("disconnect", () => {
    // kullanıcı soket bağlantısının kesildiğini bildirir
    console.log("user disconnected"); 
  });

  // önyüzden görüntü dizisi alır ve görüntüdeki nesneyi algılamak üzere detect fonskiyonunu çalıştırır
  socket.on("videoframe", async (frame, xRatio, yRatio, callback) => {
    const boxes = await detect(frame, xRatio, yRatio); 
    // algılama sonuçlarını önyüze geri gönder
    callback(boxes); 
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:4000`); 
});
