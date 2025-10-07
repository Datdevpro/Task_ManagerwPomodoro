from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas
from database import SessionLocal, engine
import psycopg2

conn = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="123456",   # đổi bằng password thật
    host="localhost",
    port="5432"
)
conn.autocommit = True  # cần autocommit khi CREATE DATABASE

cur = conn.cursor()

# Kiểm tra database 'tododb' đã tồn tại chưa, nếu chưa thì mới tạo
cur.execute("SELECT 1 FROM pg_database WHERE datname = 'tododb';")
exists = cur.fetchone()
if not exists:
    cur.execute("CREATE DATABASE tododb;")
    print("✅ Database 'tododb' created successfully!")
else:
    print("⚠️ Database 'tododb' already exists, skipping creation.")

cur.close()
conn.close()

models.Base.metadata.create_all(bind=engine) # create table if not exists

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app's address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/todos", response_model=schemas.Todo)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    db_todo = models.Todo(**todo.dict())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

@app.get("/todos", response_model=list[schemas.Todo])
def get_todos(db: Session = Depends(get_db)):
    return db.query(models.Todo).all()

@app.get("/todos/{todo_id}", response_model=schemas.Todo)
def get_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@app.put("/todos/{todo_id}", response_model=schemas.Todo)
def update_todo(todo_id: int, updated: schemas.TodoCreate, db: Session = Depends(get_db)):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    todo.title = updated.title
    todo.description = updated.description
    todo.completed = updated.completed
    db.commit()
    db.refresh(todo)
    return todo

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(todo)
    db.commit()
    return {"message": "Todo deleted successfully"}