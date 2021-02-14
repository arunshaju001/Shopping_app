const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = 'Api_key'

sgMail.setApiKey(sendgridAPIKey)

exports.sendMail = (data)=>{
    console.log(data)
    return new Promise((resolve,reject)=>{
        sgMail.send({
            to: data.email,
            from: 'Sampleapp@mail.com',
            subject: 'Mail from Mailer APP',
            text: 'Hi '+data.name+',\nStatus of your order '+data.order+' is '+data.status
        }).then(()=>{
            resolve('Mail Sent')
        })
        .catch((error) => {
            reject(error)
          console.error(error)
        })
})
}
