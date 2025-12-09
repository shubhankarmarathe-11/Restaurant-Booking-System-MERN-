import nodemailer from "nodemailer";

const SendMail = async ({ name, email, tablenumbers, date, time, guests }) => {
  try {
    const transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: `${process.env.GMAIL_USER}`,
        pass: `${process.env.GMAIL_PASS}`,
      },
    });

    const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Table Booking Confirmation</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 8px; padding: 20px;">
          
          <tr>
            <td style="text-align: center; padding: 10px 0;">
              <h2 style="color: #333; margin: 0;">DemoRestaurant</h2>
              <p style="color: #777; margin: 5px 0 0;">Table Booking Confirmation</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 20px 10px; color: #333; font-size: 15px;">
              <p>Hi <strong>${name}</strong>,</p>
              <p>Thank you for choosing <strong>DemoRestaurant</strong>!</p>

              <p>Your table reservation has been confirmed. Below are your booking details:</p>

              <div style="background: #f1f1f1; padding: 15px; border-radius: 6px; margin: 15px 0;">
                <p><strong>Table Number(s):</strong> ${tablenumbers.join(
                  ", "
                )}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Guests:</strong> ${guests}</p>
              </div>

              <p>If you want to make any changes, reply to this email or contact us.</p>

              <p style="margin-top: 25px;">Warm regards,<br>
              <strong>DemoRestaurant Team</strong></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    await transporter.sendMail({
      from: {
        name: "Booking Confirmation",
        address: `${process.env.GMAIL_USER}`,
      },
      to: email,
      subject: "Your Table Booking Confirmation – DemoRestaurant",
      html: htmlTemplate,
    });

    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.log("Email Error:", error);
    return false;
  }
};

export { SendMail };
