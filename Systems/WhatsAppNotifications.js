const { sendMessage } = require('./TwilioFuntioncs')
const Contatos = require('./Contatos.json')
const Categoria = require('./Categorias.json')
var logger = require('./Logs').Logger;

module.exports.WhatsAppOpenTicket = function (categoriaID, channel, link) {
    switch(categoriaID) {
        case "Totem e AutoAtendimento" : {
            logger.info(`Ticket criado "customId": ${categoriaID}`);
            Categoria['Totem e AutoAtendimento'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessage(value.Numero, value.Apelido, categoriaID, channel, link);
                });
            })
        }
        break;
        case "POS ElginPay Android" : {
            logger.info(`Ticket criado "customId": ${categoriaID}`);
            Categoria['POS ElginPay Android'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessage(value.Numero, value.Apelido, categoriaID, channel, link);
                });
            })
        }
        break;
        case "Leitores Fixos" : {
            logger.info(`Ticket criado "customId": ${categoriaID}`);
            Categoria['Leitores Fixos'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessage(value.Numero, value.Apelido, categoriaID, channel, link);
                });
            })
        }
        break;
        case "Monitores" : {
            logger.info(`Ticket criado "customId": ${categoriaID}`);
            Categoria.Monitores.forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessage(value.Numero, value.Apelido, categoriaID, channel, link);
                });
            })
        }
        break;
        case "Balanças" : {
            logger.info(`Ticket criado "customId": ${categoriaID}`);
            Categoria.Balanças.forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessage(value.Numero, value.Apelido, categoriaID, channel, link);
                });
            })
        }
        break;
        case "Impressoras de Etiquetas" : {
            logger.info(`Ticket criado "customId": ${categoriaID}`);
            Categoria['Impressoras de Etiquetas'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessage(value.Numero, value.Apelido, categoriaID, channel, link);
                });
            })
        }
        break;
        case "Impressoras Térmicas" : {
            logger.info(`Ticket criado "customId": ${categoriaID}`);
            Categoria['Impressoras Térmicas'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessage(value.Numero, value.Apelido, categoriaID, channel, link);
                });
            })
        }
        break;
        case "Leitores de Mão" : {
            logger.info(`Ticket criado "customId": ${categoriaID}`);
            Categoria['Leitores de Mão'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessage(value.Numero, value.Apelido, categoriaID, channel, link);
                });
            })
        }
        break;
        case "Computadores" : {
            logger.info(`Ticket criado "customId": ${categoriaID}`);
            Categoria.Computadores.forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessage(value.Numero, value.Apelido, categoriaID, channel, link);
                });
            })
        }
        break;
        case "Gaveta " : {
            logger.info(`Ticket criado "customId": ${categoriaID}`);
            Categoria['Gaveta '].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessage(value.Numero, value.Apelido, categoriaID, channel, link);
                });
            })
        }
        break;
        case "Etiquetas Eletrônicas" : {
            logger.info(`Ticket criado "customId": ${categoriaID}`);
            Categoria['Etiquetas Eletrônicas'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessage(value.Numero, value.Apelido, categoriaID, channel, link);
                });
            })
        }
        break;
        case "Terminais Consulta" : {
            logger.info(`Ticket criado "customId": ${categoriaID}`);
            Categoria['Terminais Consulta'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessage(value.Numero, value.Apelido, categoriaID, channel, link);
                });
            })
        }
        break;
        case "SAT-MFE" : {
            logger.info(`Ticket criado "customId": ${categoriaID}`);
            Categoria['SAT-MFE'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessage(value.Numero, value.Apelido, categoriaID, channel, link);
                });
            })
        }
        break;
        case "Self-Checkout" : {
            logger.info(`Ticket criado "customId": ${categoriaID}`);
            Categoria['Self-Checkout'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessage(value.Numero, value.Apelido, categoriaID, channel, link);
                });
            })
        }
        break;
        case "PDV M10 Android" : {
            logger.info(`Ticket criado "customId": ${categoriaID}`);
            Categoria['PDV M10 Android'].forEach((nome) => {
                Object.entries(Contatos).forEach(([key, value]) => {
                    if (key === nome) sendMessage(value.Numero, value.Apelido, categoriaID, channel, link);
                });
            })
        }
        break;
        default:
            logger.error(`Switch Case WhastappNotifications não encontrou nenhum "customId": "${categoriaID}"`)
    }
}