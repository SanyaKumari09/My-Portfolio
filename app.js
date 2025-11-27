// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const path = require('path');
// const fs = require('fs');
// const nodemailer = require('nodemailer');

// app.set("view engine", "ejs");
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(express.static(path.join(__dirname,'public')));
// // 1. Declare experiencesData at the top level with an initial value.
// // This ensures it is always defined in the module scope.
// let experiencesData = [];
// const dataPath = path.join(__dirname, 'data', 'experiences.json');

// let projectsData = [];
// const projectsPath = path.join(__dirname, 'data', 'projects.json');

// let certifiactesData = [];
// const certificatesPath = path.join(__dirname, 'data', 'certificates.json');


// const experiences =
//         [
//   {
//     "role": "Full Stack Web Developer Intern",
//     "company": "Ardent Computech",
//     "duration": "June 2025 - August 2025",
//     "description": "Completed a MERN Stack internship, creating scalable full-stack applications with modern web technologies"
//   },
//   {
//     "role": "Full Stack Web Development Intern",
//     "company": "Cognifyz Technologies",
//     "duration": "May 2025 - June 2025",
//     "description": "Worked on backend development, RESTful API integration, and debugging during my MERN Stack Web Development internship."
//   }
//      ]

//   const projects =[
//   {
//     "title": "NotesFlow",
//     "description": "An ultra-lightweight, dynamic notes app built on Node.js/Express.js, featuring a clean Tailwind/EJS interface and innovative database-free persistence using the native fs module.",
//     "image": "/images/NotesFlow.jpg",
//     "link": "https://github.com/SanyaKumari09/NotesFlow"
//   },
//   {
//     "title": "Tic-Tac-Toe",
//     "description": "Browser-based Tic-Tac-Toe game featuring complete game logic, responsive UI, and instant reset, strengthening DOM manipulation and event handling skills.",
//     "image": "/images/Tic-Tac-Toe.jpg",
//     "link": "https://github.com/SanyaKumari09/Tic-Tac-Toe"
//   }
// ]

// const certificates = [
//   [
//     {
//     "name":"NPTEL course of Introduction to Machine Learning"
//   },
//   {
//     "name":"Introduction to Artificial Intelliegnce"
//   },
//   {
//      "name":"HP Life Data Science & Analytics"
//   },
//   {
    
//     "name": "All India NCAT"
//   },
//   {
//     "name":"Java Spoken Tutorial Project"
//   },
//   {
//     "name":"Certificate of Attendence by ISRO"
//   }
// ]
// ]

// // Change this block in your app.js:
// const transporter = nodemailer.createTransport({
//     // service: 'gmail', // <--- COMMENT THIS OUT
//     host: 'smtp.gmail.com', // <--- Use the explicit host
//     port: 465,              // <--- Use the standard port for secure connections
//     secure: true,           // <--- Use SSL/TLS
//     auth: {
//         user: 'sanyakumari3232@gmail.com',
//         pass: 'clzxpcdxojjtybmq' 
//     }
// });



// app.get("/", (req, res) => {
//   const experiences = JSON.parse(fs.readFileSync("./data/experiences.json", "utf-8"));
//   const projects = JSON.parse(fs.readFileSync("./data/projects.json", "utf-8"));
//   const certificates = JSON.parse(fs.readFileSync("./data/certificates.json", "utf-8"));
//   res.render("index", { experiences, projects,certificates });
// });

// app.get("/about",(req,res)=>{
//      res.render("about");
// });

// app.post('/contact', async (req, res) => {
//     const { name, email, phone, message } = req.body;
//      let successMessage;
//     console.log('--- New Contact Submission ---');
//     console.log(`Name: ${name}`);
//     // ... (rest of the logging and email logic)
//     console.log('-----------------------------');

//      const mailOptions = {
//         from: '"Portfolio Contact Form" <YOUR_SENDER_EMAIL@gmail.com>', // Replace with your email
//         to: 'YOUR_RECEIVER_EMAIL@example.com', // <-- Replace with your email (where you want to receive the message)
//         subject: `New Message from ${name} on Portfolio`,
//         html: `
//             <p><strong>Name:</strong> ${name}</p>
//             <p><strong>Email:</strong> ${email}</p>
//             <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
//             <hr>
//             <p><strong>Message:</strong></p>
//             <p>${message}</p>
//         `
//     };

//     //Sending the email
//       try {
//         let info = await transporter.sendMail(mailOptions);
//         console.log('Email sent successfully:', info.messageId);
//         successMessage = `Thank you, ${name}! Your message has been sent successfully.`;
//     } catch (error) {
//         console.error('Error sending email:', error);
//         successMessage = `Sorry, there was an issue sending your message. Please try emailing directly at [Your Email Address].`;
//     }
    

//     // FIX: Passing both 'experiences' (REQUIRED) and the 'message' (for success display)
//     res.render('index', { 
//         experiences: experiences, // Data required by EJS template
//         message: successMessage,
//         projects :projects,
//         certificates:certificates  // Success message
//     });
// });


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// // app.listen(1500,()=>{
// //     console.log("Server is running on PORT 1500");
// // })

const express = require("express");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();


const app = express();

// BASIC APP SETUP
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // safer on Vercel

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


// HELPER: LOAD DATA FROM /data
// ---------------------
function loadPortfolioData() {
  const dataDir = path.join(__dirname, "data");

  let experiences = [];
  let projects = [];
  let certificates = [];

  try {
    const expRaw = fs.readFileSync(path.join(dataDir, "experiences.json"), "utf-8");
    experiences = expRaw ? JSON.parse(expRaw) : [];
  } catch (err) {
    console.error("Error reading experiences.json:", err);
  }

  try {
    const projRaw = fs.readFileSync(path.join(dataDir, "projects.json"), "utf-8");
    projects = projRaw ? JSON.parse(projRaw) : [];
  } catch (err) {
    console.error("Error reading projects.json:", err);
  }

  try {
    const certRaw = fs.readFileSync(path.join(dataDir, "certificates.json"), "utf-8");
    certificates = certRaw ? JSON.parse(certRaw) : [];
  } catch (err) {
    console.error("Error reading certificates.json:", err);
  }

  return { experiences, projects, certificates };
}

// EMAIL TRANSPORT (USE ENV VARS ON VERCEL)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // set on Vercel
    pass: process.env.EMAIL_PASS, // set on Vercel
  },
});

// ROUTES
// Home page
app.get("/", (req, res) => {
  const { experiences, projects, certificates } = loadPortfolioData();

  res.render("index", {
    experiences,
    projects,
    certificates,
    message: null, // no success message initially
  });
});

// About page
app.get("/about", (req, res) => {
  res.render("about");
});

// Contact form submit
app.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;
  const { experiences, projects, certificates } = loadPortfolioData();
  let successMessage;

  console.log("--- New Contact Submission ---");
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Phone: ${phone}`);
  console.log(`Message: ${message}`);
  console.log("------------------------------");

  const mailOptions = {
    from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER, // you receive the mail here
    subject: `New Message from ${name} on Portfolio`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    successMessage = `Thank you, ${name}! Your message has been sent successfully.`;
  } catch (error) {
    console.error("Error sending email:", error);
    successMessage =
      "Sorry, there was an issue sending your message. Please try emailing me directly.";
  }

  // Re-render home page with data + success message
  res.render("index", {
    experiences,
    projects,
    certificates,
    message: successMessage,
  });
});

// SERVER START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
