from datetime import date

from pydantic import BaseModel, Field

class SignupRequest(BaseModel):
	email: str
	name: str
	password: str = Field(min_length=8)
	confirmation: str = Field(min_length=8)
