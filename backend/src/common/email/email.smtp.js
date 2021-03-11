const SMTPClient = require('emailjs').SMTPClient;
const env = require('./../../../config.env');

class EmailSmtp {

    constructor() {
        return this;
    }


    send = (data = null, template = null) => {

        if (data === null || template === null) return false;

        const client = new SMTPClient(env.smpt);


        let html = template(data);


        const message = {
            text: 'Erro, email html não gerado',
            from: 'encode.cafe <comercial@encodecafe.com>',
            to: `${data.email}`,
            // cc: 'agenor.cadastro@gmail.com',
            subject: `Seu pedido cod. ${data.carrinho}, <Multiplier-teste>!`,
            attachment: [
                { data: html, alternative: true }
            ],
        };

        client.send(message, function (err, message) {
            if (err) console.log(err);
        });

    }


}


module.exports = EmailSmtp;