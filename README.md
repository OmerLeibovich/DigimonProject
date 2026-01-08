## DigimonProject

A full-stack web application inspired by Digimon.
The project combines Node.js + Express + Prisma (PostgreSQL) on the backend with EJS, Bootstrap, and jQuery on the frontend.
It provides user management, Digimon gameplay features (battle, shop, inventory, statistics,Email verificatin), and deployment setup.

## Live Demo
[DigimonProject Live Demo](https://digimontra.xyz/)


## Folder Structure
```bash
DigimonProject/
│── controllers/              # Application controllers (auth, shop, digimon, etc.)
│── routes/                   # Express routes
│── services/                 # Reusable services (email, helpers, etc.)
│   └── mailsender.js         # Resend / email service (recommended to be here)
│
│── prisma/                   # Prisma schema and migrations
│   ├── schema.prisma
│   └── migrations/
│
│── __tests__/                # Jest + Supertest API tests
│   └──  auth.test.js
│
│── public/
│   ├── assets/               # Images, icons, etc.
│   └── Pages/                # Frontend JS logic (jQuery)
│       ├── accountSystem.js
│       ├── battlesystem.js
│       ├── calculation.js
│       ├── create.js
│       ├── Messages.js
│       ├── navbar.js
│       ├── reset.js
│       ├── script.js
│       ├── style.css
│       ├── tableFunc.js
│       └── userDigiAndItems.js
│
│── views/                    # EJS templates
│   ├── DigimonSystem/
│   ├── inventorySystem/
│   ├── loginSystem/
│   ├── RegisterSystem/
│   ├── shopSystem/
│   ├── index.ejs
│   └── userconfirm.ejs
│
│── app.js                    # Main server entry point
│── package.json              # Project metadata and dependencies
│── package-lock.json         # Dependency lock file
│── .gitignore                # Git ignored files configuration
│── render.yaml               # Deployment configuration (Render)
│── railway.json / Procfile   # (Optional) Railway config if you use it
│── .env                      # Environment variables (NOT committed)
│── README.md                 # Documentation
│
└── node_modules/             # Dependencies (NOT committed)

```

## Technologies
Node.js + Express – Backend server

Prisma ORM – Database schema & queries (PostgreSQL)

EJS – Template rendering

Bootstrap & jQuery – Frontend styling and interactivity

Resend – Email handling

Railway – Deployment platform

Jest + Supertest -  Automated API and integration testing

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

## Mobile photos

## Battle System (Mobile)
<img alt="Mobile Battle System" src="https://github.com/user-attachments/assets/5f2c1ded-ee04-4f1a-a7ad-df5f1a731626" width="300" height="600"/>

## Digimon Management (Mobile)
<img alt="Mobile Digimon Card" src="https://github.com/user-attachments/assets/bf370203-2b95-4813-873f-f66223e18bcf" width="300" height="600"/>

## Statistics System (Mobile)
<img alt="Mobile Statistics System" src="https://github.com/user-attachments/assets/dbe060fb-b468-4db4-a555-212ef6b1dd4f" width="300" height="600"/>

## Shop System (Mobile)
<img alt="Mobile Shop System" src="https://github.com/user-attachments/assets/7d1679d3-c211-4696-a79b-22b1d8a1bb33" width="300" height="600"/>

## Inventory System (Mobile)
<img alt="Mobile Inventory System" src="https://github.com/user-attachments/assets/bb7bf88a-033f-4e3c-9f97-67ca0ca3bc46" width="300" height="600"/>
