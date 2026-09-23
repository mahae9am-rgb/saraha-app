import nodemailer from "nodemailer";

export async function sendEmail({to,subject,html}) {
    const transporter = await nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    })
   await  transporter.sendMail({
    from:`"saraha-app"<${process.env.SMTP_USER}>`,
    to:to,
    subject:subject,
    html:html
   })
    
}