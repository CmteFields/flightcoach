import { useEffect, useRef, useState } from 'react'
import { etapas } from '../data/etapas'

function PainelMissao() {
  const [indice, setIndice] = useState(0)
  const [checklist, setChecklist] = useState<{ [id: string]: boolean }>({})
  const [liberado, setLiberado] = useState(false)
  const [tempos, setTempos] = useState<number[]>([])
  const [inicioEtapa, setInicioEtapa] = useState(Date.now())
  const audioRef = useRef<HTMLAudioElement>(null)
  const etapaAtual = etapas[indice]

  useEffect(() => {
    const estadoInicial: Record<string, boolean> = {}
    etapaAtual.checklist.forEach((item) => {
      estadoInicial[item.id] = item.tipo === 'auto'
    })
    setChecklist(estadoInicial)
    setLiberado(false)
    setInicioEtapa(Date.now())
  }, [etapaAtual])

  useEffect(() => {
    const todosMarcados = Object.values(checklist).every((v) => v)
    if (todosMarcados && (audioRef.current?.ended || audioRef.current?.paused)) {
      setLiberado(true)
    }
  }, [checklist])

  const handleAudioEnded = () => {
    const todosMarcados = Object.values(checklist).every((v) => v)
    if (todosMarcados) setLiberado(true)
  }

  const marcarItem = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const avancar = () => {
    const duracao = Math.round((Date.now() - inicioEtapa) / 1000)
    setTempos((prev) => [...prev, duracao])
    if (indice < etapas.length - 1) setIndice((i) => i + 1)
  }

  const finalizado = indice === etapas.length - 1 && liberado
  const tempoTotal = tempos.reduce((a, b) => a + b, 0)

  return (
    <div className="p-4 max-w-4xl mx-auto font-sans">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
          <span>Missão 01</span>
          <span>Etapa {etapaAtual.id} de {etapas.length}</span>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-1">{etapaAtual.titulo}</h2>
        <p className="text-gray-700 mb-4">{etapaAtual.texto}</p>

        <audio
          ref={audioRef}
          onEnded={handleAudioEnded}
          className="mb-4 w-full"
          controls
          autoPlay
          src={etapaAtual.audioSrc}
        />

        <div className="bg-gray-50 p-4 rounded-xl border">
          <h3 className="text-md font-semibold mb-2 text-gray-700">Checklist</h3>
          <ul className="space-y-2">
            {etapaAtual.checklist.map((item) => (
              <li key={item.id} className="flex items-center">
                <input
                  type="checkbox"
                  disabled={item.tipo === 'auto'}
                  checked={!!checklist[item.id]}
                  onChange={() => marcarItem(item.id)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-800">
                  {item.label} {item.tipo === 'auto' && <em className="text-xs text-gray-500">(auto)</em>}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          {!finalizado ? (
            <button
              onClick={avancar}
              disabled={!liberado}
              className={`px-5 py-2 rounded-xl text-white font-medium text-sm transition ${
                liberado ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Avançar para próxima etapa
            </button>
          ) : (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <h3 className="text-lg font-bold text-green-800 mb-2">🏁 Missão Finalizada</h3>
              <p className="text-sm text-gray-800 mb-1"><strong>Tempo total:</strong> {tempoTotal} segundos</p>
              <p className="text-sm text-gray-800">Parabéns, missão concluída com sucesso!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PainelMissao
