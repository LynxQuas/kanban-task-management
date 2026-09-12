from fastapi import FastAPI

from app.routers import boards, tasks
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(boards.router, prefix="/boards")
app.include_router(tasks.router, prefix="/tasks")
