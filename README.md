## DigimonProject

A full-stack web application inspired by Digimon.
The project combines Node.js + Express + Prisma (PostgreSQL) on the backend with EJS, Bootstrap, and jQuery on the frontend.
It provides user management, Digimon gameplay features (battle, shop, inventory, statistics,Email verificatin), and deployment setup.

## Live Demo
[DigimonProject Live Demo](https://digimontra.xyz/)

If email confirmation doesn’t work, you can log in with the demo user:

Username: omer

Password: 12345

## Folder Structure
```bash
DigimonProject/
│── controllers/         # Application controllers 
│── generated/           # Auto-generated Prisma client files
│── node_modules/        # Project dependencies 
│── prisma/              # Prisma schema and migrations
│
│── public/              
│   ├── assets/          # Images, icons, etc.
│   ├── Pages/           # Page-specific JS logic
│   │   ├── accountSystem.js
│   │   ├── battlesystem.js
│   │   ├── calculation.js
│   │   ├── create.js
│   │   ├── Messages.js
│   │   ├── navbar.js
│   │   ├── reset.js
│   │   ├── script.js
│   │   ├── style.css
│   │   ├── tableFunc.js
│   │   └── userDigiAndItems.js
│
│── routes/              # Express routes
│
│── views/               # EJS templates for rendering UI
│   ├── DigimonSystem/   # Digimon-related views
│   ├── inventorySystem/ # Inventory pages
│   ├── loginSystem/     # Login pages
│   ├── RegisterSystem/  # Registration pages
│   ├── shopSystem/      # Shop pages
│   ├── index.ejs        # Main index page
│   └── userconfirm.ejs  # User confirmation page
│
│── .gitignore           # Git ignored files configuration
│── app.js               # Main entry point of the server
│── mailsender.js        # Email sender logic (Sendgrid)
│── package.json         # Project metadata and dependencies
│── package-lock.json    # Lock file for dependency versions
│── render.yaml          # Deployment configuration for Render
```

## Technologies
Node.js + Express – Backend server

Prisma ORM – Database schema & queries (PostgreSQL)

EJS – Template rendering

Bootstrap & jQuery – Frontend styling and interactivity

Sendgrid – Email handling

Railway – Deployment platform

## Features Showcase
## Your Digimons
<img  alt="Your Digimons" src="https://github.com/user-attachments/assets/01f32732-ebd1-4c74-81df-f30e9a048b34"  width="600" height="400"/>

## Battle System
<img alt="Battle System" src="https://github.com/user-attachments/assets/8cc40fb9-9330-4028-b98d-72b2c04bdff4"  width="600" height="400"/>

## Statistics System
<img alt="Statistics System" src="https://github.com/user-attachments/assets/5a67aaa3-bd02-400e-b891-8b45e90d912d"  width="600" height="400"/>

## Shop System
<img alt="Shop System" src="https://github.com/user-attachments/assets/9a5933ec-4d07-488f-8f81-f1034d42ea43" width="600" height="400"/>

## Inventory System
<img alt="Inventory System" src="https://github.com/user-attachments/assets/a3f30724-7f5b-405d-9ccd-ac3d5477ef27" width="600" height="400"/>

