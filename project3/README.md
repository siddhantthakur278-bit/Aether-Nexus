# Project 3: The Neural Task Engine

A specialized microservice for **Decode Labs** focused on **Relational Geometry** and state persistence.

## 🏛️ Architectural Pillars
1. **The Blueprint**: Precise Mongoose schemas with relational linking.
2. **The Bridge**: Seamless integration via ORM and shared Cloud Persistence.
3. **The Action**: Full RESTful CRUD operations (POST, GET, PATCH, DELETE).
4. **The Shield**: Data integrity enforced via strict schema constraints and Joi validation.

## 📊 Relational Geometry
This engine maps the complex interconnections of the digital world:
- **One-to-Many**: Projects act as containers for multiple Tasks.
- **Many-to-Many**: Tasks are tagged with shared Labels (Project/Tag linkage).
- **Referential Integrity**: Every Task is "bound by keys" (ObjectIDs) to its parent Project.

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
