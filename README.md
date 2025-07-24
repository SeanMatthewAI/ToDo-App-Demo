# Beautiful To-Do App with Clerk Authentication

This is a simple React To-Do application built with Vite and TypeScript, integrated with Clerk for user authentication. Tasks are stored in localStorage per user. Note that this app is merely a demo, as it was built for illustration purposes in the following YouTube tutorials:
https://www.youtube.com/watch?v=xLAHNTZ9quE (Clerk backend built by Grok 4)
https://www.youtube.com/watch?v=2bGh_DlkubM (frontend refined by Claude Code w/ Playwright MCP)

## Table of Contents
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Features](#features)
- [Security & Sensitive Data](#security--sensitive-data)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Node.js (v14 or later)
- npm

## Setup

1. **Clone the repository:**
   ```sh
   git clone [COPY URL FOR THIS PAGE]
   cd your-repo-name
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory:
```sh
VITE_CLERK_PUBLISHABLE_KEY=your-publishable-key
```

> See `.gitignore` for patterns that ensure `.env` and other sensitive files are not committed.

## Running the App

Start the development server:
```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

To build the app for production:
```sh
npm run build
```

## Features

- User authentication with Clerk
- Per-user task storage in localStorage
- Beautiful UI with gradients and animations
- Add, complete, and delete tasks

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License

[MIT](LICENSE) 
