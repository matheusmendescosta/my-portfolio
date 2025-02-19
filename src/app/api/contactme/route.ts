import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'E-mail e mensagem são obrigatórios' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `Nova mensagem de ${name}`,
      text: `${name} mandou mensagem via portfolio!\n\n remetente:\n - Nome: ${name}\n - E-mail: ${email}\n\nMensagem:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'E-mail enviado!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao enviar o e-mail', details: error }, { status: 500 });
  }
}
