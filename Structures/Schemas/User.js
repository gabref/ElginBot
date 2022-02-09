const { model, Schema } = require('mongoose')

const infoContatoSchema = new Schema({
    Nome: String,
    Nome_Empresa: String,
    Email: String,
    CNPJ: String,
    CPF: String,
    address: {
        Rua: String,
        Numero: String,
        Bairro: String,
        Cidade: String,
        Estado: String,
        CEP: String
    },
    Telefones: [String]
})

const userSchema = new Schema({
    UserID: String,
    CargosID: [String],
    createAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    InfoContato: infoContatoSchema,
});

module.exports = model("User", userSchema)