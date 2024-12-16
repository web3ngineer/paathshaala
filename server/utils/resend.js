import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendPaymentConfirmation(params) {
  const { name } = params.user;
  const { amount, razorpay_payment_id } = params.paymentInfo;

  try {
    await resend.emails.send({
      from: "payment@shubhamjangir.in",
      to: params.user.email,
      subject: "Payment Confirmation",
      html: `
        <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Payment Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f9;
          margin: 0;
          padding: 0;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #4caf50;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
        }
        .details {
          margin-top: 20px;
          border-top: 1px solid #ddd;
          padding-top: 10px;
        }
        .details p {
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Payment Successful</h1>
        <p>Hello ${name},</p>
        <p>Thank you for your payment. Your transaction has been successfully processed.</p>
        <div class="details">
          <h2>Payment Details:</h2>
          <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
          <p><strong>Amount:</strong> ₹${amount}</p>
        </div>
        <p>If you have any questions or concerns, please feel free to contact us.</p>
        <p>Thank you for choosing our service!</p>
      </div>
    </body>
  </html>
      `,
    });
    return { success: true, message: "Payment Confirmation email sent successfully" };
  } catch (error) {
    console.error("ERROR :: Send Payment Confirmation Email ::", error);
    return { success: false, message: "Failed to send Payment Confirmation email" };
  }
}

export default sendPaymentConfirmation;
