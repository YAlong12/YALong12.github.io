# Cassie Project

Community Activity and Service System for Inclusive Engagement (CASSIE) is a web application that helps communities manage and participate in local events.

## Project Structure

```
cassie-project/
├── cassie-frontend/     # React frontend application
├── cassie-backend/      # Node.js/Express backend application
└── docker-compose.yml   # Docker configuration
```

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/YAlong12/YALong12.github.io.git
cd YALong12.github.io
```

2. Install dependencies:
```bash
npm run install-all
```

3. Create a `.env` file in the backend directory:
```bash
cd cassie-backend
cp .env.example .env
```

4. Start the development servers:
```bash
npm start
```

## Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment

To deploy manually:

1. Build the frontend:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

## Environment Variables

### Backend (.env)
```
PORT=3002
MONGODB_URI=mongodb://localhost:27017/cassie
JWT_SECRET=your_jwt_secret
ADMIN_KEY=your_admin_key
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3002
```

## Available Scripts

- `npm run install-all`: Install dependencies for both frontend and backend
- `npm start`: Start both frontend and backend development servers
- `npm run build`: Build the frontend application
- `npm test`: Run tests for both frontend and backend
- `npm run deploy`: Deploy the frontend to GitHub Pages

## GitHub Actions

The project uses GitHub Actions for CI/CD. The workflow:
1. Builds the application
2. Runs tests
3. Deploys to GitHub Pages (on main branch only)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 