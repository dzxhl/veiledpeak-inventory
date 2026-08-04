from fastapi import FastAPI

app = FastAPI(title="VeiledPeak Inventory")

@app.get("/")
def root():
    return {
        "name": "VeiledPeak Inventory",
        "version": "0.1.0"
    }