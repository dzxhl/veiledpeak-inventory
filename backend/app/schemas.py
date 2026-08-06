from pydantic import BaseModel


class ProductCreate(BaseModel):
    sku: str
    name: str
    cost: float
    price: float
    quantity: int
    location: str
    notes: str = ""