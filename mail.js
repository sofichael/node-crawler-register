var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
  host: "smtp.126.com",
  secureConnection: true,
  port: 465,
  auth: {
    user: "",
    pass: ""
  }
});

// 设置邮件内容
var mailOptions = {
  from: "sofichael@126.com",
  to: "315747294@qq.com",
  subject: "预约通知",
  html: "<b>可以预约</b>: 预约开始<a href='http://guahao.cq12320.cn/login.aspx' target='_blank'>点击预约</a>"
}

module.exports.sendMail = function() {
    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
        console.log(error);
      }else{
        console.log("Message sent: " + response.message);
      }
      smtpTransport.close();
    });
}
