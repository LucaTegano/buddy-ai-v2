# Buddy AI v2 Monorepo

Welcome to the Buddy AI v2 monorepo. This repository contains both the frontend (Next.js) and backend (Spring Boot) for the Buddy AI platform.

![Image](https://github.com/user-attachments/assets/c1994777-c4d3-4dde-ac3b-e7ed803acbd8)

## 📁 Structure

- **`client/`**: The frontend application built with Next.js, Tailwind CSS, and Radix UI.
- **`server/`**: The backend API built with Spring Boot 3, Java 21, and PostgreSQL.

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Node.js 20+](https://nodejs.org/) (for local frontend development without Docker)
- [JDK 21+](https://openjdk.org/) (for local backend development without Docker)

### Local Development with Docker

The easiest way to run the entire stack is using Docker Compose:

```bash
docker-compose up --build
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8080](http://localhost:8080)

### Manual Development

#### Backend

```bash
cd server
./mvnw spring-boot:run
```

#### Frontend

```bash
cd client
npm install
npm run dev
```

## 🛠 CI/CD

This repository uses GitHub Actions for automated builds:
- **Client CI**: Triggers on changes to `client/**`.
- **Server CI**: Triggers on changes to `server/**`.

## 📄 License

Distributed under the MIT License. See `client/README.md` and `server/README.md` for more details.
