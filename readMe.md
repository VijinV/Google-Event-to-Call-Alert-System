# 📞 Google Event to Call Alert System

A full-stack web application that enables users to log in with Google, authorize access to their Google Calendar, and receive phone call reminders for upcoming events via Twilio.

---

## 🛠 Tech Stack

- **Frontend:** Next.js
- **Backend:** Node.js (Express)
- **Authentication:** Google OAuth 2.0
- **APIs:** Google Calendar API, Twilio Voice API
- **Package Manager:** pnpm

---

## 📁 Project Structure

```
/project-root
├── frontend/                # Next.js application
├── backend/                 # Node.js backend
├── README.md
```

---

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18.x
- [pnpm](https://pnpm.io/) ≥ 8.x
- Google Cloud Project (OAuth + Calendar API enabled)
- Twilio account with verified number

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/google-calendar-twilio.git
cd google-calendar-twilio
```

### 2. Install Dependencies

```bash
pnpm install --filter ./frontend
pnpm install --filter ./backend
```

### 3. Configure Environment Variables

#### 💻 Frontend `.env.local`

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_GOOGLE_CALLBACK_URL=
NEXT_PUBLIC_SECRET_KEY=
```

*Create this file inside `/frontend` directory.*

#### ⚙️ Backend `.env`

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
SESSION_SECRET=
PORT=
MONGO_URI=
JWT_SECRET=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

*Create this file inside `/backend` directory.*

---

## 📦 Running the Project

### 🔹 Start Frontend

```bash
cd frontend
pnpm dev
```

Visit: http://localhost:3000

### 🔸 Start Backend

```bash
cd backend
pnpm dev
```

Backend runs at: http://localhost:5000

---

## ⏰ Event Check + Phone Calls

- Backend runs a scheduled check (default: every 5 minutes).
- If an event is found within the next 5 minutes, a phone call is triggered via Twilio.

**Ensure the backend is running continuously to enable this feature.**

---

## ⚠️ Notes

- Make sure redirect URIs are consistent across `.env` and Google Console.
- Twilio trial accounts only allow calls to verified phone numbers.
- Use ngrok for local backend testing with external access if needed.

---

## 📋 Summary

| Feature | Status |
|---------|--------|
| Google Login | ✅ Implemented |
| Calendar API Access | ✅ Implemented |
| Phone Input UI | ✅ Implemented |
| Cron-based Event Check | ✅ Implemented |
| Twilio Call Trigger | ✅ Implemented |

---

## 👨‍💻 Author

**Name:** Vijin Vinod

---