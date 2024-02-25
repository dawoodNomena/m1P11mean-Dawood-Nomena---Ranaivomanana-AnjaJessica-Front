import { Injectable } from '@angular/core';
import * as nodemailer from 'nodemailer';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'tendryarivony@gmail.com', 
        pass: 'srmkzkqolzzwvpzc' 
    }
  });

  sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: '"Garage Mean" <garagemean.itu.com>',
      to: to,
      subject: subject,
      html: html
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response); 
      }
    });
  }
}




