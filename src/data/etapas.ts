export const etapas = [
  {
    id: 1,
    titulo: 'Etapa 01 – Briefing da Missão',
    texto: 'Apresentação da missão e funcionamento do painel.',
    audioSrc: '/audios/etapa01_briefing.mp3',
    checklist: [
      { id: 'briefing', label: 'Briefing lido e compreendido', tipo: 'manual' }
    ]
  },
  {
    id: 2,
    titulo: 'Etapa 02 – Checklist de Segurança e Energização',
    texto: 'Executar checklist de segurança e preparar energização da aeronave.',
    audioSrc: '/audios/etapa02_seg_energizacao.mp3',
    checklist: [
      { id: 'cinto', label: 'Cinto afivelado', tipo: 'manual' },
      { id: 'trim', label: 'Trim ajustado para decolagem', tipo: 'manual' },
      { id: 'combustivel', label: 'Seletora de combustível aberta', tipo: 'manual' },
      { id: 'avionics_off', label: 'Avionics desligado', tipo: 'auto', parametro: 'AVIONICS_MASTER', valorEsperado: 0 }
    ]
  },
  {
    id: 3,
    titulo: 'Etapa 03 – Briefing de Decolagem',
    texto: 'Realize mentalmente o briefing padrão de decolagem.',
    audioSrc: '/audios/etapa03_briefing_decolagem.mp3',
    checklist: [
      { id: 'briefing_feito', label: 'Briefing decolagem mental concluído', tipo: 'manual' }
    ]
  }
  // [... demais etapas devem ser incluídas aqui ...]
]
