from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.auth import SignupRequest
from app.core.security import hash_password

from app.models.user import User

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/signup")
def signup(user_data: SignupRequest, db: Session = Depends(get_db)):
	existing_email = db.query(User).filter(User.email == user_data.email).first()

	if existing_email:
		raise HTTPException(
					status_code=400,
					detail="Email already registered",
				)
    
	if user_data.password != user_data.confirmation:
		raise HTTPException(
			status_code = 400,
			detail = "Password do not match"
		)
		   
	hashed_password = hash_password(user_data.password)
    
	user = User(name=user_data.name,email= user_data.email, hashed_password = hashed_password)
    
	db.add(user)
	db.commit()
	db.refresh(user)
   
	return {"message": "Account created successfully."}