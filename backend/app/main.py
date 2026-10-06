from fastapi import FastAPI

from app.routers import boards, tasks, auth
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
import os

origins = os.getenv("CORS_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(boards.router, prefix="/boards")
app.include_router(tasks.router, prefix="/tasks")
app.include_router(auth.router, prefix="/auth")

