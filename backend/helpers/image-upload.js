import multer from 'multer';
import path from 'path';

//Destination to store the images (Destino para guardar as imagens)

const imageStorage = multer.diskStorage({
     //onde vamos salvar
    destination: function(req, file, cb) {

        //Mandar para pasta pets ou users através da url

        let folder = "";

        if(req.baseUrl.includes("users")) {
            folder = "users"
        } else if(req.baseUrl.includes("pets")) {
            folder = "pets"
        }

        // passar a pasta onde ele vai por as imagens
        cb(null, `public/images/${folder}`)

    },

     //como via ficar o nome do arquivo depois de salvo
    filename: function(req, file, cb) {
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname))
        //exemplo: 2324234.jpg
    }
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter: function (req, file, cb) {   //filtrar arquivos
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error("Por favor envie jpg ou png."));
        }

        cb(undefined, true);
    }
});

export default imageUpload;