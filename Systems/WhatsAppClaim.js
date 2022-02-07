const { sendMessageClaim } = require('./TwilioFuntioncs')
const Contatos = require('./Contatos.json')
const Categoria = require('./Categorias.json')
var logger = require('./Logs').Logger;

module.exports.WhatsAppClaim = function (categoriaID, channel, channelCreatedAt, membro) {
    switch(categoriaID) {
        case "totem e autoatendimento" : {
            logger.info(`Ticket "customId": ${categoriaID} aceito por ${membro}`);
            Categoria['Totem e AutoAtendimento'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessageClaim(value.Numero, value.Apelido, categoriaID, channel, channelCreatedAt, membro);
                });
            })
        }
        break;
        case "pos elginpay android" : {
            logger.info(`Ticket "customId": ${categoriaID} aceito por ${membro}`);
            Categoria['POS ElginPay Android'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessageClaim(value.Numero, value.Apelido, categoriaID, channel, channelCreatedAt, membro);
                });
            })
        }
        break;
        case "leitores fixos" : {
            logger.info(`Ticket "customId": ${categoriaID} aceito por ${membro}`);
            Categoria['Leitores Fixos'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessageClaim(value.Numero, value.Apelido, categoriaID, channel, channelCreatedAt, membro);
                });
            })
        }
        break;
        case "monitores" : {
            logger.info(`Ticket "customId": ${categoriaID} aceito por ${membro}`);
            Categoria.Monitores.forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessageClaim(value.Numero, value.Apelido, categoriaID, channel, channelCreatedAt, membro);
                });
            })
        }
        break;
        case "balanças" : {
            logger.info(`Ticket "customId": ${categoriaID} aceito por ${membro}`);
            Categoria.Balanças.forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessageClaim(value.Numero, value.Apelido, categoriaID, channel, channelCreatedAt, membro);
                });
            })
        }
        break;
        case "impressoras de etiquetas" : {
            logger.info(`Ticket "customId": ${categoriaID} aceito por ${membro}`);
            Categoria['Impressoras de Etiquetas'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessageClaim(value.Numero, value.Apelido, categoriaID, channel, channelCreatedAt, membro);
                });
            })
        }
        break;
        case "impressoras térmicas" : {
            logger.info(`Ticket "customId": ${categoriaID} aceito por ${membro}`);
            Categoria['Impressoras Térmicas'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessageClaim(value.Numero, value.Apelido, categoriaID, channel, channelCreatedAt, membro);
                });
            })
        }
        break;
        case "leitores de mão" : {
            logger.info(`Ticket "customId": ${categoriaID} aceito por ${membro}`);
            Categoria['Leitores de Mão'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessageClaim(value.Numero, value.Apelido, categoriaID, channel, channelCreatedAt, membro);
                });
            })
        }
        break;
        case "computadores" : {
            logger.info(`Ticket "customId": ${categoriaID} aceito por ${membro}`);
            Categoria.Computadores.forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessageClaim(value.Numero, value.Apelido, categoriaID, channel, channelCreatedAt, membro);
                });
            })
        }
        break;
        case "gaveta" : {
            logger.info(`Ticket "customId": ${categoriaID} aceito por ${membro}`);
            Categoria['Gaveta '].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessageClaim(value.Numero, value.Apelido, categoriaID, channel, channelCreatedAt, membro);
                });
            })
        }
        break;
        case "etiquetas eletrônicas" : {
            logger.info(`Ticket "customId": ${categoriaID} aceito por ${membro}`);
            Categoria['Etiquetas Eletrônicas'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessageClaim(value.Numero, value.Apelido, categoriaID, channel, channelCreatedAt, membro);
                });
            })
        }
        break;
        case "terminais consulta" : {
            logger.info(`Ticket "customId": ${categoriaID} aceito por ${membro}`);
            Categoria['Terminais Consulta'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessageClaim(value.Numero, value.Apelido, categoriaID, channel, channelCreatedAt, membro);
                });
            })
        }
        break;
        case "sat mfe" : {
            logger.info(`Ticket "customId": ${categoriaID} aceito por ${membro}`);
            Categoria['SAT-MFE'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessageClaim(value.Numero, value.Apelido, categoriaID, channel, channelCreatedAt, membro);
                });
            })
        }
        break;
        case "self-checkout" : {
            logger.info(`Ticket "customId": ${categoriaID} aceito por ${membro}`);
            Categoria['Self-Checkout'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessageClaim(value.Numero, value.Apelido, categoriaID, channel, channelCreatedAt, membro);
                });
            })
        }
        break;
        case "pdv m10 android" : {
            logger.info(`Ticket "customId": ${categoriaID} aceito por ${membro}`);
            Categoria['PDV M10 Android'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessageClaim(value.Numero, value.Apelido, categoriaID, channel, channelCreatedAt, membro);
                });
            })
        }
        break;
        default:
            logger.error(`Switch Case WhastappNotifications não encontrou nenhum "customId": "${categoriaID}"`)
    }
}