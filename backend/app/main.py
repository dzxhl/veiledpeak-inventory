from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, SessionLocal
from app import models
from app.schemas import ProductCreate

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="VeiledPeak Inventory")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "name": "VeiledPeak Inventory",
        "version": "0.2.0"
    }


@app.post("/products")
def create_product(product: ProductCreate):

    db = SessionLocal()

    item = models.Product(
        sku=product.sku,
        name=product.name,
        cost=product.cost,
        price=product.price,
        quantity=product.quantity,
        location=product.location,
        notes=product.notes,
    )

    db.add(item)
    db.commit()
    db.refresh(item)
    db.close()

    return item
@app.get("/products")
def get_products():

    db = SessionLocal()

    products = db.query(models.Product).all()

    db.close()

    return products
@app.get("/products/{sku}")
def get_product(sku: str):

    db = SessionLocal()

    product = db.query(models.Product).filter(
        models.Product.sku == sku
    ).first()

    db.close()

    return product
@app.delete("/products/{id}")
def delete_product(id: int):

    db = SessionLocal()

    product = db.query(models.Product).filter(
        models.Product.id == id
    ).first()

    if product is None:
        db.close()
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()

    db.close()

    return {"message": "Product deleted successfully"}