//gerekli paketlerin ve modüllerin yüklenmesi
import path from 'path'
import { fileURLToPath } from 'url';
import ort from 'onnxruntime-node'

export class OnnxKlas {
    static async createsession() {
        const __filename = fileURLToPath('file:///C:/Users/MDP/Documents/GitHub/people_counting/yolov7-node/src/yolov7-tiny.onnx');
        const __dirname = path.dirname(__filename);
    
        // model yapılandırması
        const modelInfo = {
        name: 'yolov7-tiny.onnx', // ONNX dosyası
        inputShape: [1, 3, 640, 640] // model için giriş tensörünün şekli
        }
    
        // modelin çalışma zamanı oturumunun oluşturulması
        let session; 
        session = await ort.InferenceSession.create(path.join(__dirname, modelInfo.name))
       
        return session;
    }
    
    static async detect (frame, xRatio, yRatio) {

        const modelInfo = {
            name: 'yolov7-tiny.onnx', // ONNX dosyası
            inputShape: [1, 3, 640, 640] // model için giriş tensörünün şekli
        }
        
        let session = await this.createsession();
        console.log(session);

        const input = new Float32Array(frame.buffer) // giriş tensörlerinin oluşturulması
        const tensor = new ort.Tensor('float32', input, modelInfo.inputShape) // giriş tensörünün bir ONNX tensörüne dönüştürülmesi
        const { output } = await session.run({ images: tensor }) // ONNX session'ının çhazırlanan tensörle çalıştırılması ve çıktının alınması
        const boxes = []
    
        // algılanan nesneler için döngü
        for (let r = 0; r < output.size; r += output.dims[1]) {
            const data = output.data.slice(r, r + output.dims[1])
            const [x0, y0, x1, y1, classId, score] = data.slice(1)
            const w = x1 - x0
            const h = y1 - y0
            boxes.push({
            classId,
            probability: score,
            bounding: [x0 * xRatio, y0 * yRatio, w * xRatio, h * yRatio]
            })
        }

        return boxes
    }
    
}

export default OnnxKlas;