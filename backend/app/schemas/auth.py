from datetime import date

from pydantic import BaseModel, Field,  EmailStr

class SignupRequest(BaseModel):
	email: str
	name: str
	password: str = Field(min_length=8)
	confirmation: str = Field(min_length=8)
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
