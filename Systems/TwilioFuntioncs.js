require('dotenv')
const { TwilioAccountSid, TwilioAuthToken, TwilioNumber } = process.env;
var logger = require('./Logs').Logger;
const accountSid = TwilioAccountSid; 
const authToken = TwilioAuthToken; 
const client = require('twilio')(accountSid, authToken); 
 
const numberFrom = TwilioNumber

module.exports.sendMessage = function sendMessage(numberTo, name, customId, channel, link)
{
    client.messages 
        .create({ 
            body: `Opa ${name}, tudo bem? Aqui é o *ElginBot* 🤖 do *Discord*.\nPassando pra avisar que um ticket foi aberto no discord.\n\n*Categoria:* ${customId}\n*ID do chat:* ${channel}\n*Abrir Discord:* ${link}`, 
            from: `whatsapp:${numberFrom}`,       
            to: `whatsapp:${numberTo}`
        }) 
        .then(message => logger.info(
            `Account SID: ${message.sid} Direction: ${message.direction} Errors: ${message.errorCode} - ${message.errorMessage}  Message: ${message.body.replace("\n", "")}`
        )) 
        .catch((err) => console.log(err))
        .done();
}

module.exports.sendMessageClaim = function sendMessageClaim(numberTo, name, customId, channel, data, membro)
{
    client.messages 
        .create({ 
            body: `✅ ${name}, sobre o ticket *${channel}* do *Discord* que foi aberto ${data}.\n*${membro}* já aceitou esse ticket 👍.\n\n*Categoria:* ${customId}\n*ID do chat:* ${channel}`, 
            from: `whatsapp:${numberFrom}`,       
            to: `whatsapp:${numberTo}`
        }) 
        .then(message => logger.info(
            `Account SID: ${message.sid} Direction: ${message.direction} Errors: ${message.errorCode} - ${message.errorMessage}  Message: ${message.body}`
        )) 
        .catch((err) => console.log(err))
        .done();
}


 



