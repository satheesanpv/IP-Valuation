<?php
namespace IP;
require 'vendor/phpmailer/phpmailer/PHPMailerAutoload.php';

use PHPMailer;

class sendMail {

    private $mail;
    
    public function __construct()
    {
        $mail = new PHPMailer;
        $smtpHost = Config::SMTP_HOST;
        $mailUser = Config::MAIL_USER;
        $mailPassword = Config::MAIL_PASSWORD;
        $mailFrom = Config::MAIL_FROM;
        $fromName = Config::FROM_NAME;
        
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = $smtpHost;  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = $mailUser;                 // SMTP username
        $mail->Password = $mailPassword ;                           // SMTP password
        $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587;                                    // TCP port to connect to

        $mail->setFrom($mailFrom, $fromName);
        
        $this->mail = $mail;
    }
    
    public function sendMail($recipients, $subject, $body) {
        $mail = $this->mail;
        if (is_array($recipients)) {
            foreach($recipients as $user)
            {
                //error_log(print_r($user));
                $email = $user['email'];
                $name = $user['name'];
                $mail->AddAddress($email, $name);
            }
        } else {
            $mail->AddAddress($recipients);
        }
    
        $mail->isHTML(true);                                  // Set email format to HTML

        $mail->Subject = $subject;
        $mail->Body    = $body;
        
        if(!$mail->send()) {
            error_log('Mailer Error: ' . $mail->ErrorInfo);
        } else {
            error_log('Message has been sent');
        }
    }

}