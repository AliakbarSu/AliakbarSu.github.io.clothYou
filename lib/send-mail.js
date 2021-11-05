const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const msg = {
  to: 'support@clothyou.co.nz',
  from: 'support@clothyou.co.nz',
  subject: 'Automated Test Email',
  text: 'This is an automated test email',
  html: '<strong>This email was send from the api server</strong>'
}

export default (message = msg) => {
  return sgMail.send(message)
}
