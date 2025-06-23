# 🏥 Electronic Health Record Microservice

This project is a microservice designed to manage **Electronic Health Records (EHR)**. It allows you to perform CRUD operations on patient records and send those records to external services in **HL7** format. The system is split into a **frontend** and **backend**, both of which can be run independently.

## ✨ Features

- **CRUD Operations**: Perform Create, Read, Update, and Delete operations on patient health records.
- **HL7 Integration**: Send patient records to external services in the HL7 format for interoperability.
- **Frontend**: A user interface for interacting with the health records.
- **Backend**: Handles business logic, database management, and HL7 integration.

---

## 🚀 Getting Started

To run the application, you'll need to set up both the frontend and backend. Below are the steps to get everything up and running.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

---

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/hxn7/Electronic-Health-Record-Service.git
cd Electronic-Health-Record-Service
```

### 2. Set Up the Environment Variables

Before running the application, you need to create .env files for both the frontend and backend to configure necessary environment variables.

#### Backend .env

Create a .env file in the backend directory with the following variables (modify them based on your configuration):

```
PORT =
MONGODB_CONNECTION_STRING =
```

#### Frontend .env

Create a .env file in the backend directory with the following variables (modify them based on your configuration):

```
VITE_REACT_APP_BASE_URL =
VITE_EHR_PORT =
```

### 3. Set Up the Backend

The backend is responsible for handling all business logic, database management, and HL7 format export.

Steps to run the backend:

```
cd backend
npm install
npm start
```

### 4. Set Up the Frontend

The frontend provides a user interface for interacting with the electronic health records.

Steps to run the frontend:

```
cd frontend
npm install
npm start
```

---

## 🖥️ How to Use

- **Backend:** The backend exposes API endpoints for performing CRUD operations on patient records. These endpoints also handle the HL7 export feature.

- **Frontend:** Access the frontend in your browser to interact with patient records. You can add, update, and delete patient records, as well as view them in a structured format.

---

## 💡 Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
