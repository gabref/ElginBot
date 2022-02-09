const { CommandInteraction } = require('discord.js');
const UserDB = require('../../Structures/Schemas/User')
const logger = require('../../Systems/Logs').Logger;

module.exports = {
    name: "cadastro",
    description: "Comando para cadastro no banco de dados da Elgin Developers Community",
    options: [
        {
            name: "nome",
            type: "STRING",
            description: "O seu nome e sobrenome pessoais",
            required: true
        },
        {
            name: "nome_empresa",
            type: "STRING",
            description: "O nome da empresa",
            required: false
        },
        {
            name: "email",
            type: "STRING",
            description: "Adicione um e-mail",
            required: false
        },
        {
            name: "cpf",
            type: "STRING",
            description: "O seu CPF",
            required: false
        },
        {
            name: "cnpj",
            type: "STRING",
            description: "Adicione o seu CNPJ",
            required: false
        },
        {
            name: "rua",
            type: "STRING",
            description: "Selecione o tipo de via"
        },
        {
            name: "numero",
            type: "STRING",
            description: "Selecione o tipo de via"
        },
        {
            name: "bairro",
            type: "STRING",
            description: "Selecione o tipo de via"
        },
        {
            name: "cidade",
            type: "STRING",
            description: "Selecione o tipo de via"
        },
        {
            name: "estado",
            type: "STRING",
            description: "Selecione o tipo de via"
        },
        {
            name: "cep",
            type: "STRING",
            description: "Selecione o tipo de via"
        },
        {
            name: "telefones",
            type: "STRING",
            description: "Coloque seus números de telefone! Se tiver mais de um, separe os número por ','"
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction
     */ 
    async execute(interaction) {

        const { options } = interaction;
        
        const name = options.getString("nome") || "";
        const name_empresa = options.getString("nome_empresa") || "";
        const email = options.getString("email") || "";
        const cpf = options.getString("cpf") || "";
        const cnpj = options.getString("cnpj") || "";
        const rua = options.getString("rua") || "";
        const numero = options.getString("numero") || "";
        const bairro = options.getString("bairro") || "";
        const cidade = options.getString("cidade") || "";
        const estado = options.getString("estado") || "";
        const cep = options.getString("cep") || "";
        const telefones = options.getString("telefones") ? options.getString("telefones").split(",") : [];

        const userID = interaction.user.id;
        
        await interaction.deferReply({ ephemeral: true })
        
        try {
            
            const dados = await UserDB.findOne({ UserID: userID })
            
            if(!dados) {
                await UserDB.create(
                    { 
                        UserID: userID,
                        InfoContato: {
                            Nome: name,
                            Nome_Empresa: name_empresa,
                            Email: email,
                            CNPJ: cnpj,
                            CPF: cpf,
                            address: {
                                Rua: rua,
                                Numero: numero,
                                Bairro: bairro,
                                Cidade: cidade,
                                Estado: estado,
                                CEP: cep
                            },
                            Telefones: telefones 
                        }
                    }
                )
                return await interaction.editReply({ content: "Seu cadastro foi criado com sucesso ✅" })
            } else {                
                await UserDB.updateOne(
                    { 
                        UserID: userID
                    }, 
                    { 
                        $set: {
                            InfoContato: {
                                Nome: name,
                                Nome_Empresa: name_empresa,
                                Email: email,
                                CNPJ: cnpj,
                                CPF: cpf,
                                address: {
                                    Rua: rua,
                                    Numero: numero,
                                    Bairro: bairro,
                                    Cidade: cidade,
                                    Estado: estado,
                                    CEP: cep
                                },
                                Telefones: telefones 
                            }
                        }
                    }
                )
                return interaction.editReply({ content: "Seu cadastro foi atualizado com sucesso ✅" })
            }

        } catch (e) {
            console.log(e);
            logger.error(e.message);
            return interaction.editReply({ content: "Parece que não foi possível conectar com o banco de dados..😥 tente de novo mais tarde." })
        }

    }
    
}