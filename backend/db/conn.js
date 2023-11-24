import mongoose from 'mongoose';

async function main() {
    await mongoose.connect('mongodb://localhost:27017/getapet');
    mongoose.set('strictQuery', true);
    console.log('Conectado ao MongoDB com Mongoose');
}

main().catch(err => console.log(err));

export default mongoose;