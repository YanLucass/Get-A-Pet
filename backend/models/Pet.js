import mongoose from "../db/conn";
const { Schema } = mongoose;

const Pet = mongoose.model(
    'Pet',
    new Schema(
        {
            name: {
                type: String, required: true
            },
            
            age: {
                type: Number, required: true
            },

            weight: {
                type: Number, required: true
            },

            color: {
                type: String, required: true
            },

            images: {
                type: Array, required: true // salvar varias imagens
            },

            available: {
                type: Boolean //adotado aou nao
            },

            user: Object, //colocarmos aq pq vms precisar do nome, telefone 
            adopter: Object // teremosinformaçoes de quem adotou

        },
            { timestamps: true },

    ),
)

export default Pet;