import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { formData, captchaToken } = await req.json();
    const { name, email, message } = formData;

    if (!name || !email || !message || !captchaToken) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
    }

    const cfSecret = process.env.CLOUDFLARE_TURNSTILE_SECRET;
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: cfSecret, response: captchaToken }),
    });

    const { success } = await verifyRes.json();

    if (!success) {
      return NextResponse.json({ error: 'Falha na verificação do CAPTCHA' }, { status: 403 });
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
