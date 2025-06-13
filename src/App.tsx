import React from 'react'
import { etapas } from './data/etapas'

function App() {
  return (
    <div className="p-4 max-w-2xl mx-auto text-sm font-mono whitespace-pre-wrap">
      <h1 className="text-xl font-bold mb-4">Flight Coach - Missão 01</h1>
      {etapas.map(etapa => (
        <div key={etapa.id} className="mb-4">
          <h2 className="text-lg font-semibold">{etapa.titulo}</h2>
          <p>{etapa.texto}</p>
          <ul className="list-disc ml-5 mt-2">
            {etapa.checklist.map(item => (
              <li key={item.id}>
                {item.label} {item.tipo === 'auto' ? '(auto)' : '(manual)'}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default App
