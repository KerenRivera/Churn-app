import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import pickle

np.random.seed(42)

n = 50

frecuencia_visitas = np.random.randint(1, 20, n)
dias_ultima_visita = np.random.randint(1, 120, n)
total_gastos = np.random.randint(20, 1000, n)

en_riesgo = ((frecuencia_visitas < 5) &
             (dias_ultima_visita > 30) &
             (total_gastos < 200)).astype(int)

data = {
    'frecuencia_visitas': frecuencia_visitas,
    'dias_ultima_visita': dias_ultima_visita,
    'total_gastos': total_gastos,
    'en_riesgo': en_riesgo
}

df = pd.DataFrame(data)

X = df[['frecuencia_visitas', 'dias_ultima_visita', 'total_gastos']]
y = df['en_riesgo']

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

with open('model/model_churn.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Modelo entrenado con 50 clientes.")

