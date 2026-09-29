from datetime import datetime, timedelta, timezone

from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pwdlib import PasswordHash
from sqlalchemy.orm import Session
from fastapi import Cookie, Depends, HTTPException, status
from app.database import get_db
from app.models.user import User


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

password_hash = PasswordHash.recommended()

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def hash_password(password: str):
    return password_hash.hash(password)


def verify_password(plain_password: str, hashed_password: str):
    return password_hash.verify(plain_password, hashed_password)


def create_access_token(user_id: int):
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": str(user_id),
        "exp": expire,
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


def get_current_user(
    access_token: str | None = Cookie(default=None),
    db: Session = Depends(get_db),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )

    if not access_token:
        raise credentials_exception

    try:
        payload = jwt.decode(
            access_token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.id == int(user_id)).first()

    if user is None:
        raise credentials_exception

    return user