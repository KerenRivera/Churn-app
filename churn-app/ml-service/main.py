from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import numpy as np

app = FastAPI()

with open('model/model_churn.pkl', 'rb') as f:
    model = pickle.load(f)

class CLienteData (BaseModel):
    frecuencia_visitas: int
    dias_ultima_visitas: int
    total_gastado: float

@app.post("/predecir")
def predecir(cliente: CLienteData):
    datos = np.array([[cliente.frecuencia_visitas,
                       cliente.dias_ultima_visitas,
                       cliente.total_gastado]])

    prediction = model.predict(datos)[0]
    probability = model.predict_proba(datos)[0][1]

    return {
        "en_riesgo": bool(prediction),
        "probability": round(float(probability), 2)
    }

@app.get("/")
def health():
    return {"status": "ok"}