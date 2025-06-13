import { useEffect, useRef, useState } from 'react'
import { etapas } from '../data/etapas'

function PainelMissao() {
  const [indice, setIndice] = useState(0)
  const [checklist, setChecklist] = useState<{ [id: string]: boolean }>({})
  const [liberado, setLiberado] = useState(false)
  const [log, setLog] = useState<string[]>([])
  const [tempos, setTempos] = useState<number[]>([])
  const [inicioEtapa, setInicioEtapa] = useState(Date.now())
  const audioRef = useRef<HTMLAudioElement>(null)
  const etapaAtual = etapas[indice]

  useEffect(() => {
    const estadoInicial = {}
    etapaAtual.checklist.forEach((item) => {
      estadoInicial[item.id] = item.tipo === 'auto' ? true : false
      if (item.tipo === 'auto') {
        setLog((prev) => [...prev, `✅ ${item.label}`])
      }
    })
    setChecklist(estadoInicial)
    setLiberado(false)
    setInicioEtapa(Date.now())
  }, [etapaAtual])

  useEffect(() => {
    const todosMarcados = Object.values(checklist).every((v) => v)
    if (todosMarcados) {
      if (audioRef.current?.ended || audioRef.current?.paused) {
        setLiberado(true)
      }
    }
  }, [checklist])

  const handleAudioEnded = () => {
    const todosMarcados = Object.values(checklist).every((v) => v)
    if (todosMarcados) {
      setLiberado(true)
    }
  }

  const marcarItem = (id: string) => {
    setChecklist((prev) => {
      const novo = { ...prev, [id]: !prev[id] }
      if (!prev[id]) setLog((log) => [...log, `☑️ ${etapaAtual.checklist.find((i) => i.id === id)?.label}`])
      return novo
    })
  }

  const avancar = () => {
    const duracao = Math.round((Date.now() - inicioEtapa) / 1000)
    setTempos((prev) => [...prev, duracao])
    if (indice < etapas.length - 1) {
      setIndice((i) => i + 1)
    }
  }

  const exportarLog = (tipo: 'txt' | 'json') => {
    const blob = new Blob([
      tipo === 'json' ? JSON.stringify(log, null, 2) : log.join('\n')
    ], { type: tipo === 'json' ? 'application/json' : 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = tipo === 'json' ? 'log_missao.json' : 'log_missao.txt'
    a.click()
  }

  const finalizado = indice === etapas.length - 1 && liberado
  const nota = ((log.length / (etapas.length * 2)) * 10).toFixed(1)
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
              <p className="text-sm text-gray-800 mb-1"><strong>Eventos registrados:</strong> {log.length}</p>
              <p className="text-sm text-gray-800"><strong>Nota estimada:</strong> {nota} / 10</p>
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => exportarLog('txt')}
                  className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-black text-sm"
                >Exportar .txt</button>
                <button
                  onClick={() => exportarLog('json')}
                  className="px-4 py-2 rounded bg-indigo-700 text-white hover:bg-indigo-800 text-sm"
                >Exportar .json</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-2xl shadow border">
        <h3 className="font-semibold mb-2 text-gray-800">📝 Log de Ações</h3>
        <ul className="text-sm text-gray-700 space-y-1 max-h-60 overflow-y-auto bg-gray-50 p-3 rounded border">
          {log.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PainelMissao
