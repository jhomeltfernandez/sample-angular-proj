using System.Threading.Tasks;

namespace AngularTraining.Services
{
    public interface IEmailService
    {
        Task SendAsync(string to, string subject, string message, bool isHtml = false);
        Task MailKitSendAsync(string to, string subject, string message);
    }
}