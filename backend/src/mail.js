const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
});

const makeAnEmail = (text) => `
  <div className="email" style="
    border: 1px solid black;
    padding: 60px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <div style="font-size: 1rem; padding: 10px; color: white; background-color: #22568D; height: 30px;">
    Recibimos una peticion para cambio de contraseña. 
    </div>

    <div style="font-size: 1rem; line-height: 3; padding: 20px;">
      <p style="font-size: 1rem;">${text}</p>
      <p style="line-height: 30px;">Si tu requeriste el cambio de contraseña de SECOVI APP, 
      dándole click al boton te llevará a nuestra App donde podrás crear una nueva contraseña. 
      Una ves hecho el cambio podras accesar la aplicación automaticamente.
      </p>
      <p style="border-top:1px solid #ccc">Si tu no requeriste un cambio de contraseña, porfavor contacta Servicio al Cliente.</p>
    </div>
  </div>  
`;

exports.transporter = transporter;
exports.makeAnEmail = makeAnEmail;
