# Project 3: The Neural Task Engine

A specialized microservice for **AETHER NEXUS** focused on **Relational Geometry** and state persistence.

## 🏛️ Architectural Pillars
1. **The Blueprint**: Precise Mongoose schemas with relational linking.
2. **The Bridge**: Seamless integration via ORM and shared Cloud Persistence.
3. **The Action**: Full RESTful CRUD operations (POST, GET, PATCH, DELETE).
4. **The Shield**: Data integrity enforced via strict schema constraints and Joi validation.

## 📊 Relational Geometry
This engine maps the complex interconnections of the digital world:

```mermaid
erDiagram
    USER ||--o{ PROJECT : "owns (1:N)"
    PROJECT ||--o{ TASK : "contains (1:N)"
    TASK }o--o{ LABEL : "tagged (M:N)"
    
    USER {
        string _id PK
        string email UNIQUE
        string role "Admin/User"
    }
    PROJECT {
        string _id PK
        string name UNIQUE
        objectId owner FK
    }
    TASK {
        string _id PK
        string title
        string status "todo/in-progress"
        objectId project FK
    }
    LABEL {
        string _id PK
        string name UNIQUE
        string color
    }
```

## 📜 API Documentation
Interactive Swagger documentation for all CRUD operations:
`http://localhost:3001/api-docs`

## 📡 Live Monitoring
This service is continuously monitored by the **Project 1 Command Center**. It exposes a `/health` heartbeat that ensures the "Nervous System" is responsive.

## 🚀 Setup
```bash
npm install
npm run dev
```
Running on **Port 3001** to allow co-existence with the Project 2 Gateway.
