# FastAPI Todo Application

A modern full-stack todo application with FastAPI backend and React frontend.

## Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as completed/pending
- ✅ Modern, responsive UI
- ✅ Real-time updates
- ✅ PostgreSQL database integration

## Project Structure

```
fastapi_practice/
└── backtend/ 
   ├── main.py              # FastAPI backend
   ├── models.py             # SQLAlchemy models
   ├── schemas.py            # Pydantic schemas
   ├── database.py           # Database configuration
└── frontend/             # React frontend
    ├── package.json
    ├── public/
    └── src/
        ├── components/
        ├── services/
        └── App.js
├── requirements.txt      # Python dependencies
```

## Prerequisites

- Python 3.7+
- Node.js 16+
- PostgreSQL
- npm or yarn

## Backend Setup (FastAPI)

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2. Database Setup

Make sure PostgreSQL is running and create a database:

```sql
-- Connect to PostgreSQL as superuser
CREATE USER postgres WITH PASSWORD '123456';
CREATE DATABASE tododb;
GRANT ALL PRIVILEGES ON DATABASE tododb TO postgres;
```

### 3. Run the Backend

```bash
# Start the FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: `http://localhost:8000`

### 4. API Documentation

- Interactive API docs: `http://localhost:8000/docs`
- ReDoc documentation: `http://localhost:8000/redoc`

## Frontend Setup (React)

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm start
```

The React app will be available at: `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| GET | `/todos/{id}` | Get a specific todo |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/{id}` | Update a todo |
| DELETE | `/todos/{id}` | Delete a todo |

## Usage

1. **Start the backend server** (FastAPI)
2. **Start the frontend server** (React)
3. **Open your browser** and navigate to `http://localhost:3000`
4. **Create, edit, and manage your todos!**

## Development

### Backend Development

The FastAPI backend includes:
- Automatic database table creation
- CORS support for frontend integration
- Input validation with Pydantic
- SQLAlchemy ORM for database operations

### Frontend Development

The React frontend includes:
- Modern component architecture
- Responsive design
- Real-time API integration
- Error handling and loading states

## Configuration

### Database Configuration

Update the database connection in `database.py`:

```python
SQLALCHEMY_DATABASE_URL = "postgresql://username:password@localhost:5432/tododb"
```

### API Configuration

Update the API base URL in `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000';
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check database credentials in `database.py`
   - Verify database exists

2. **Frontend Can't Connect to Backend**
   - Ensure FastAPI server is running on port 8000
   - Check CORS settings
   - Verify API_BASE_URL in frontend

3. **Port Already in Use**
   - Change ports in the respective configuration files
   - Kill existing processes using the ports

## License

MIT License







