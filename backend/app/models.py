from sqlalchemy import Column, Integer, Float, String

from app.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    sku = Column(String, unique=True)

    name = Column(String)

    cost = Column(Float)

    price = Column(Float)

    quantity = Column(Integer)

    location = Column(String)

    notes = Column(String)