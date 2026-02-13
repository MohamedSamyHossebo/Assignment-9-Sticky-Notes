<h1 align="center">📝 Sticky Notes API</h1>

<p align="center">
  <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="200" alt="Cat typing" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v20+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-v5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-v9-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<p align="center">
  A fully-featured RESTful API for managing sticky notes with user authentication, built as <strong>Assignment 9</strong> for the <strong>Back-End Course</strong> at <a href="https://www.roadtoit.com/"><strong>Route IT Training Center</strong></a>.
</p>

---

## ✨ Features

- 🔐 **Authentication** — Secure sign-up & login with password hashing (bcrypt) and JWT tokens
- 📝 **Full CRUD** — Create, Read, Update, Replace, and Delete notes
- 👤 **User Management** — View, update, and delete your own profile
- 🔎 **Search** — Search notes by content using regex matching
- 📄 **Pagination & Sorting** — Paginated note listing with customizable page size
- 🔗 **Aggregation** — MongoDB aggregation pipeline for notes with user details
- 🛡️ **Authorization** — Token-based ownership verification on every note operation
- 📱 **Phone Encryption** — SHA-256 hashing for phone numbers
- 🚀 **Deployed on Vercel** — Production-ready serverless deployment

---

## 📸 Highlights

### 🔑 Authentication — *"You shall not pass!"*
> Secure sign-up & login with hashed passwords and JWT tokens.

<p align="center">
  <img src="https://media.giphy.com/media/8abAbOrQ9rvLG/giphy.gif" width="350" alt="You shall not pass" />
</p>

### 📝 CRUD Notes — *"I'm something of a developer myself"*
> Full Create, Read, Update, Replace & Delete operations on your sticky notes.

<p align="center">
  <img src="https://media.giphy.com/media/citBl9yPwnUOs/giphy.gif" width="350" alt="Typing fast" />
</p>

### 📄 Pagination & Search — *"Finding your notes like..."*
> Paginated listing, content search, and aggregation pipeline.

<p align="center">
  <img src="https://media.giphy.com/media/l46Cy1rHbQ92uuLXa/giphy.gif" width="350" alt="Searching" />
</p>

---

## 🏗️ Project Structure

```
Assignment-9/
├── 📄 app.js                        # Entry point — Express server setup
├── 📄 bonus.js                      # Bonus: LeetCode "Longest Common Prefix"
├── 📄 vercel.json                   # Vercel deployment configuration
├── 📄 notes.postman.json            # Postman collection for API testing
├── 📁 Config/
│   └── .env.secrets                 # Environment variables (not committed)
└── 📁 src/
    ├── 📄 app.controller.js         # Bootstrap — middleware, DB, routes
    ├── 📁 DB/
    │   ├── 📄 connection.js         # MongoDB connection via Mongoose
    │   └── 📁 Models/
    │       ├── 📁 Notes/
    │       │   └── Notes.model.js   # Note schema (title, content, userId)
    │       └── 📁 Users/
    │           └── Users.model.js   # User schema (name, email, password, age, phone, token)
    ├── 📁 Modules/
    │   ├── 📄 index.js              # Barrel exports for all routers
    │   ├── 📁 Auth/
    │   │   ├── Auth.controller.js   # Auth routes (signup, login)
    │   │   └── Auth.service.js      # Auth business logic
    │   ├── 📁 Notes/
    │   │   ├── Notes.controller.js  # Notes routes (CRUD + search + pagination)
    │   │   └── Notes.service.js     # Notes business logic
    │   └── 📁 User/
    │       ├── User.controller.js   # User routes (get, update, delete)
    │       └── User.service.js      # User business logic
    ├── 📁 Utils/
    │   ├── jwt.util.js              # JWT secret & payload helper
    │   └── notes.validators.js      # Custom title validator (no all-uppercase)
    └── 📁 Middlewares/              # (Reserved for future middleware)
```

---

## 🔌 API Endpoints

### 🔐 Auth — `/api/auth`

| Method | Endpoint           | Description           | Auth |
| ------ | ------------------ | --------------------- | ---- |
| `POST` | `/api/auth/signup` | Register a new user   | ❌    |
| `POST` | `/api/auth/login`  | Login & get JWT token | ❌    |

#### Sign Up — Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "age": 25,
  "phone": "(555) 123-4567"
}
```

#### Login — Request Body
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

---

### 📝 Notes — `/api/notes`

| Method   | Endpoint                     | Description                             | Auth |
| -------- | ---------------------------- | --------------------------------------- | ---- |
| `POST`   | `/api/notes`                 | Create a new note                       | ✅    |
| `GET`    | `/api/notes/:noteId`         | Get a note by ID                        | ✅    |
| `GET`    | `/api/notes/note-with-user`  | Get all notes with user info (populate) | ✅    |
| `GET`    | `/api/notes/aggregate`       | Get notes via aggregation pipeline      | ✅    |
| `GET`    | `/api/notes/paginate-sort`   | Get paginated & sorted notes            | ✅    |
| `GET`    | `/api/notes/note-by-content` | Search notes by content                 | ✅    |
| `PATCH`  | `/api/notes/:noteId`         | Update a single note                    | ✅    |
| `PATCH`  | `/api/notes/all`             | Update all notes' title                 | ✅    |
| `PUT`    | `/api/notes/replace/:noteId` | Replace a note document                 | ✅    |
| `DELETE` | `/api/notes/:noteId`         | Delete a note by ID                     | ✅    |
| `DELETE` | `/api/notes`                 | Delete all notes for the user           | ✅    |

#### Create Note — Request Body
```json
{
  "title": "Meeting Notes",
  "content": "Discuss project timeline and milestones"
}
```

#### Pagination — Query Parameters
| Parameter | Default | Description    |
| --------- | ------- | -------------- |
| `page`    | `1`     | Page number    |
| `limit`   | `10`    | Items per page |

#### Search — Query Parameters
| Parameter | Description                  |
| --------- | ---------------------------- |
| `content` | Regex search on note content |

#### Aggregate — Query Parameters
| Parameter | Description                                         |
| --------- | --------------------------------------------------- |
| `title`   | (Optional) Filter by title (case-insensitive regex) |

---

### 👤 User — `/api/users`

| Method   | Endpoint     | Description                | Auth |
| -------- | ------------ | -------------------------- | ---- |
| `GET`    | `/api/users` | Get logged-in user profile | ✅    |
| `PATCH`  | `/api/users` | Update logged-in user      | ✅    |
| `DELETE` | `/api/users` | Delete logged-in user      | ✅    |

#### Update User — Request Body
```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "age": 30,
  "phone": "(555) 987-6543"
}
```

---

## 🔒 Authentication

All protected endpoints require a **JWT token** in the `Authorization` header:

```
Authorization: <your_jwt_token>
```

The token is returned upon successful **signup** or **login** and expires in **24 hours**.

---

## ⚙️ Getting Started

<p align="center">
  <img src="https://media.giphy.com/media/vzO0Vc8b2VBLi/giphy.gif" width="300" alt="Let's do this" />
</p>

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB)
- [pnpm](https://pnpm.io/) package manager (recommended) or npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/MohamedSamyHossebo/Assignment-9-Sticky-Notes.git

# 2. Navigate to the project
cd Assignment-9-Sticky-Notes

# 3. Install dependencies
pnpm install
# or
npm install
```

### Environment Variables

Create a file at `Config/.env.secrets` with the following:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret_key
```

### Running the Server

```bash
# Development (with auto-reload)
pnpm dev
# or
npm run dev

# Production
pnpm start
# or
npm start
```

The server will start at `http://localhost:3000` 🚀

---

## 🧪 Testing with Postman

<p align="center">
  <img src="https://media.giphy.com/media/3o7btNa0RUYa5E7iiQ/giphy.gif" width="300" alt="Testing" />
</p>

A ready-to-use Postman collection is included in the project:

1. Open [Postman](https://www.postman.com/)
2. Click **Import** → select `notes.postman.json`
3. Set the `baseUrl` variable to `http://localhost:3000` (or your Vercel URL)
4. Set the `userToken` variable after signing up / logging in
5. Start testing all endpoints!

---

## 🧠 Bonus — LeetCode Solution

<p align="center">
  <img src="https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif" width="300" alt="Big brain" />
</p>

The `bonus.js` file contains a solution for the **Longest Common Prefix** problem:

```js
var longestCommonPrefix = function (strs) {
    if (!strs.length) return "";
    strs.sort();
    let first = strs[0], last = strs[strs.length - 1], result = "";
    for (let i = 0; i < first.length; i++) {
        if (first[i] === last[i]) {
            result += first[i];
        } else {
            break;
        }
    }
    return result;
};

console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
```

---

## 🛠️ Tech Stack

| Technology       | Purpose               |
| ---------------- | --------------------- |
| **Express 5**    | Web framework         |
| **Mongoose 9**   | MongoDB ODM           |
| **bcryptjs**     | Password hashing      |
| **jsonwebtoken** | JWT authentication    |
| **dotenv**       | Environment variables |
| **Vercel**       | Serverless deployment |

---

## 📂 Database Models

### User Model
| Field      | Type   | Constraints                          |
| ---------- | ------ | ------------------------------------ |
| `name`     | String | Required                             |
| `email`    | String | Required, Unique                     |
| `password` | String | Required (hashed)                    |
| `age`      | Number | Required, Min: 18, Max: 60           |
| `phone`    | String | Required, Unique (SHA-256 encrypted) |
| `token`    | String | Stores current JWT                   |

### Note Model
| Field       | Type     | Constraints                       |
| ----------- | -------- | --------------------------------- |
| `title`     | String   | Required, Cannot be all uppercase |
| `content`   | String   | Required                          |
| `userId`    | ObjectId | Reference to User model           |
| `createdAt` | Date     | Auto-generated                    |
| `updatedAt` | Date     | Auto-generated                    |

---

<p align="center">
  <img src="https://media.giphy.com/media/lD76yTC5zxZPG/giphy.gif" width="200" alt="Thank you" />
  <br/>
  Made with ❤️ by <strong>Mohamed Samy</strong> — Route IT Back-End Course
</p>
