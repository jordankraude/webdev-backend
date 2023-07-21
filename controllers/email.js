const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

// Step 2: Store OAuth client credentials as environment variables or in a configuration file
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const redirectUri = 'http://localhost:8000/api-docs'; // Change this to your redirect URI

const oAuth2Client = new OAuth2(clientId, clientSecret, redirectUri);

// Step 5: Send the email using Nodemailer and the stored access token
async function sendEmailUsingOAuth(req, res) {
  const { name, email, message } = req.body;

  // Check if we have the access token stored
  if (!oAuth2Client.credentials || !oAuth2Client.credentials.access_token) {
    return res.status(401).send('Authorization required. Please authorize first.');
  }

  try {
    const mailOptions = {
      from: 'your-email@example.com', // This should be the same as the 'user' in transporter
      to: 'recipient@example.com',
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'your-email@example.com',
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: oAuth2Client.credentials.refresh_token,
        accessToken: oAuth2Client.credentials.access_token,
      },
    });

    const result = await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
}

module.exports = {
  sendEmailUsingOAuth,
};