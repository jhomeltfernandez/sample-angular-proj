using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MimeKit.Text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace AngularTraining.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _appConfiguration;
        private string _smtpServer;
        private int _smtpPort;
        private string _fromAddress;
        private string _fromAddressTitle;
        private string _username;
        private string _password;
        private bool _enableSsl;

        private bool _useDefaultCredentials;

        public EmailService(IConfiguration appConfiguration)
        {
            _smtpServer = appConfiguration["AppSettings:Smtp:Host"];
            _smtpPort = int.Parse(appConfiguration["AppSettings:Smtp:Port"]);
            _smtpPort = _smtpPort == 0 ? 25 : _smtpPort;
            _fromAddress = appConfiguration["AppSettings:Smtp:Email"];
            _fromAddressTitle = appConfiguration["AppSettings:Smtp:Email"];
            _username = appConfiguration["AppSettings:Smtp:Email"]; ;
            _password = appConfiguration["AppSettings:Smtp:Pw"]; ;
            _enableSsl = bool.Parse(appConfiguration["AppSettings:Smtp:EnableSsl"]);
            _useDefaultCredentials = bool.Parse(appConfiguration["AppSettings:Smtp:UseDefaultCredentials"]);
        }

        public async Task SendAsync(string to, string subject, string message, bool isHtml = false)
        {

            string host = _smtpServer;
            int port = _smtpPort;
            using (SmtpClient client = new SmtpClient(host, port))
            {

                MailMessage mailMessage = new MailMessage
                {
                    From = new MailAddress(_fromAddress, _fromAddress),
                    BodyEncoding = Encoding.UTF8,
                };
                mailMessage.To.Add(to);
                mailMessage.Body = message;
                mailMessage.Subject = subject;
                mailMessage.IsBodyHtml = isHtml;
                await client.SendMailAsync(mailMessage);
            }
        }

        public async Task MailKitSendAsync(string to, string subject, string message)
        {

            var mimeMessage = new MimeMessage(); // MIME : Multipurpose Internet Mail Extension
            mimeMessage.From.Add(new MailboxAddress(_fromAddressTitle, _fromAddress));
            mimeMessage.To.Add(new MailboxAddress(to, to));
            mimeMessage.Subject = subject;

            var bodyBuilder = new MimeKit.BodyBuilder
            {
                HtmlBody = message,
            };

            mimeMessage.Body = bodyBuilder.ToMessageBody();

            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                client.Connect(_smtpServer, _smtpPort, _enableSsl);
                client.Authenticate(_username, _password); // If using GMail this requires turning on LessSecureApps : https://myaccount.google.com/lesssecureapps
                
                await client.SendAsync(mimeMessage);

                client.Disconnect(true);

            }
        }
    }
}
