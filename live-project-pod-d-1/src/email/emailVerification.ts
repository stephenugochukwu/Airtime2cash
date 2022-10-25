export function forgotPasswordVerification(id: string): string {
  const link = `${process.env.FRONTEND_URL}/forgot-password/${id}`;
  let temp = `
  <div style="max-width: 700px;
  margin:auto; padding: 50px 20px;
  font-size: 110%;  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow:  20px 20px 60px #d9d9d9,
          -20px -20px 60px #ffffff;">
  <h3 style="text-align: center; text-transform: uppercase;color: teal;">We received a request
  to reset your password</h3>
   <p>Use the link below to set up the new password for your account. If you did not request to reset your password,
    ignore this email and the link will expire on its own
   </p>
    <a href=${link}
    style="background: rgb(191, 58, 58); text-decoration: none; color: white;
     padding: 10px 20px; margin: 10px 0;
    display: inline-block; margin-left: 14%; width: 60%; text-align: center; border-radius: 2%;">Click here</a>
   </div>
      `;
  return temp;
}
