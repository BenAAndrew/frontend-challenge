from uuid import UUID
import os

from fastapi import APIRouter, status, Response

from app.config import config

router = APIRouter()


@router.get(
    "/images/{file_stem}",
    status_code=status.HTTP_200_OK,
)
async def get_image(file_stem: str):
    with open(os.path.join(config.images_dir, f"{file_stem}.jpg"), "rb") as image:
        f = image.read()
    return Response(content=f, media_type="image/jpg")
