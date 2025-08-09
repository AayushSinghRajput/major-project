# main.py
from fastapi import FastAPI
from database import Base, engine
from routes import auth, study_plan

Base.metadata.create_all(bind=engine)  # Create MySQL tables

app = FastAPI()
app.include_router(auth.router)
app.include_router(study_plan.router)

@app.get("/")
def home():
    return {"message": "SmartEd API"}