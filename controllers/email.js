const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

// Step 2: Store OAuth client credentials as environment variables or in a configuration file
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const redirectUri = 'http://localhost:8000/api-docs'; // Change this to your redirect URI

const oAuth2Client = new OAuth2(clientId, clientSecret, redirectUri);
const scopes = ['https://www.googleapis.com/auth/gmail.send'];

// Step 1: Redirect the user to the OAuth provider's authorization URL
app.get('/authorize', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.redirect(authUrl);
});

// Step 2: Handle the authorization callback from the OAuth provider
app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;

  try {
    // Step 3: Exchange the authorization code for tokens
    const { tokens } = await oAuth2Client.getToken(code);
    const { access_token, refresh_token } = tokens;

    // Store the access_token and refresh_token securely (e.g., in a database) for later use
    // For this example, we'll just store them in memory.
    oAuth2Client.setCredentials(tokens);

    res.send('Authorization successful. You can now send emails.');
  } catch (error) {
    console.error('Error during token exchange:', error);
    res.status(500).send('Error during token exchange. Please try again.');
  }
});

// Step 5: Send the email using Nodemailer and the stored access token
async function sendEmailUsingOAuth(req, res) {
  const { name, email, message } = req.body;


  console.log(name, email, message)
  // Check if we have the access token stored
  if (!oAuth2Client.credentials || !oAuth2Client.credentials.access_token) {
    return res.status(401).send('Authorization required. Please authorize first.');
  }
  console.log(oAuth2Client.credentials)
  try {
    const mailOptions = {
      from: 'your-email@example.com', // This should be the same as the 'user' in transporter
      to: 'recipient@example.com',
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
    console.log(mailOptions)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'jordankraudetp@gmail.com',
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: oAuth2Client.credentials.refresh_token,
        accessToken: oAuth2Client.credentials.access_token,
      },
    });
    console.log(transporter)

    const result = await transporter.sendMail(mailOptions);

    console.log(result)

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
}

module.exports = {
  sendEmailUsingOAuth,
};