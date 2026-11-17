
/*
 * Simulador de Consulta Geriátrica
 * Evaluaciones diagnósticas - Versión 3
 *
 * Casos:
 * 01 - Elena Martínez
 * 02 - María Hernández
 *
 * Catálogos diagnósticos compartidos.
 * Evaluación local, sin servicios externos.
 */

export const opcionesEtiologicas = [
  {
    id: 'etiologia_no_establecida',
    texto: 'Etiología aún no establecida'
  },
  {
    id: 'alzheimer_confirmado',
    texto: 'Enfermedad de Alzheimer'
  },
  {
    id: 'vascular_confirmado',
    texto: 'Deterioro cognitivo de origen vascular'
  },
  {
    id: 'cuerpos_lewy',
    texto: 'Enfermedad con cuerpos de Lewy'
  },
  {
    id: 'frontotemporal',
    texto: 'Degeneración lobar frontotemporal'
  },
  {
    id: 'demencia_rapidamente_progresiva',
    texto: 'Demencia rápidamente progresiva'
  },
  {
    id: 'demencia_mixta',
    texto: 'Demencia mixta'
  },
  {
    id: 'otras_causas',
    texto: 'Otras causas de deterioro cognitivo'
  }
];

export const opcionesSindromaticas = [
  {
    id: 'normal',
    texto: 'Cognición normal'
  },
  {
    id: 'dcl',
    texto: 'Deterioro cognitivo leve'
  },
  {
    id: 'demencia',
    texto: 'Síndrome demencial'
  },
  {
    id: 'delirium',
    texto: 'Delirium'
  }
];

export const evaluacionesClinicas = {

  // ==========================================
  // CASO 01: ELENA MARTÍNEZ
  // ==========================================

  'caso-01': {
    pacienteId: 'caso-01',

    configuracion: {
      retroalimentacion: 'al_finalizar',
      puntuacionMaxima: 100
    },

    diagnosticoSindromatico: {
      puntuacionMaxima: 30,

      pregunta:
        '¿Cuál es el diagnóstico sindromático más probable?',

      opciones: opcionesSindromaticas,

      respuestaCorrecta: 'dcl',

      explicacion:
        'La paciente presenta dificultades cognitivas de inicio gradual, corroboradas por un familiar, con independencia funcional conservada. Los hallazgos son compatibles con deterioro cognitivo leve.'
    },

    diagnosticoEtiologico: {
      puntuacionMaxima: 20,

      pregunta:
        '¿Cuál es la interpretación etiológica más apropiada?',

      opciones: opcionesEtiologicas,

      respuestaCorrecta: 'etiologia_no_establecida',

      explicacion:
        'El patrón clínico puede sugerir un proceso neurodegenerativo, pero la información disponible no permite establecer una etiología definitiva. La enfermedad de Alzheimer en fase prodrómica es una posibilidad, no un diagnóstico confirmado.'
    },

    justificacionClinica: {
      puntuacionMaxima: 50,

      pregunta:
        'Justifique su diagnóstico utilizando los hallazgos de la entrevista, la exploración y los estudios complementarios.',

      criterios: [
        {
          id: 'inicio_evolucion',
          nombre: 'Inicio y evolución temporal',
          puntos: 8,
          palabrasClave: [
            'gradual',
            'insidioso',
            '14 meses',
            'catorce meses',
            'mas de un ano',
            'progresivo'
          ],
          retroalimentacion:
            'Reconocer el inicio insidioso y la evolución gradual ayuda a caracterizar el síndrome cognitivo.'
        },
        {
          id: 'alteracion_cognitiva',
          nombre: 'Identificación de alteraciones cognitivas',
          puntos: 8,
          palabrasClave: [
            'memoria',
            'olvidos',
            'evocacion',
            'recuerdo diferido',
            'funciones ejecutivas',
            'cognitivo'
          ],
          retroalimentacion:
            'Es importante describir los dominios cognitivos afectados y no limitarse a mencionar que existe un problema de memoria.'
        },
        {
          id: 'funcionalidad',
          nombre: 'Independencia funcional conservada',
          puntos: 12,
          palabrasClave: [
            'independencia',
            'independiente',
            'funcionalidad conservada',
            'sin dependencia',
            'actividades instrumentales',
            'actividades de la vida diaria'
          ],
          retroalimentacion:
            'La independencia funcional conservada es un elemento central para distinguir deterioro cognitivo leve de un síndrome demencial.'
        },
        {
          id: 'informante',
          nombre: 'Información proporcionada por familiar',
          puntos: 6,
          palabrasClave: [
            'familiar',
            'hija',
            'informante',
            'corroborado',
            'tercero'
          ],
          retroalimentacion:
            'La información del familiar ayuda a corroborar la existencia y evolución de los cambios cognitivos.'
        },
        {
          id: 'evaluacion_cognitiva',
          nombre: 'Interpretación de la evaluación cognitiva',
          puntos: 8,
          palabrasClave: [
            'moca',
            '24/30',
            '24 de 30',
            'prueba cognitiva',
            'tamizaje cognitivo'
          ],
          retroalimentacion:
            'El resultado de MoCA debe interpretarse junto con la historia clínica, la escolaridad y la funcionalidad.'
        },
        {
          id: 'diagnostico_diferencial',
          nombre:
            'Consideración de diagnósticos diferenciales y factores modificables',
          puntos: 8,
          palabrasClave: [
            'delirium',
            'depresion',
            'audicion',
            'hipoacusia',
            'b12',
            'tsh',
            'diagnostico diferencial',
            'causas reversibles'
          ],
          retroalimentacion:
            'El razonamiento debe considerar diagnósticos alternativos y factores potencialmente modificables que pueden influir en el rendimiento cognitivo.'
        }
      ],

      advertencia:
        'La evaluación automática de texto libre es orientativa. El reconocimiento de palabras clave no sustituye la valoración docente del razonamiento clínico.'
    },

    retroalimentacionFinal: {
      titulo: 'Evaluación de razonamiento clínico',

      mensaje:
        'La integración diagnóstica debe considerar los síntomas, su evolución, el funcionamiento cotidiano, la información del familiar y los resultados de la evaluación cognitiva.',

      recomendaciones: [
        'Describir los dominios cognitivos afectados.',
        'Determinar si existe pérdida de independencia funcional.',
        'Integrar información del paciente y del informante.',
        'Interpretar las pruebas cognitivas en su contexto.',
        'Evitar atribuir una etiología definitiva sin evidencia suficiente.'
      ]
    }
  },

  // ==========================================
  // CASO 02: MARÍA HERNÁNDEZ
  // ==========================================

  'caso-02': {
    pacienteId: 'caso-02',

    configuracion: {
      retroalimentacion: 'al_finalizar',
      puntuacionMaxima: 100
    },

    diagnosticoSindromatico: {
      puntuacionMaxima: 30,

      pregunta:
        '¿Cuál es el diagnóstico sindromático más probable?',

      opciones: opcionesSindromaticas,

      respuestaCorrecta: 'demencia',

      explicacion:
        'María presenta deterioro cognitivo progresivo que interfiere con su independencia para realizar actividades instrumentales de la vida diaria. Este compromiso funcional permite establecer un síndrome demencial o trastorno neurocognitivo mayor, en lugar de deterioro cognitivo leve.'
    },

    diagnosticoEtiologico: {
      puntuacionMaxima: 20,

      pregunta:
        '¿Cuál es la interpretación etiológica más apropiada?',

      opciones: opcionesEtiologicas,

      respuestaCorrecta: 'alzheimer_confirmado',

      explicacion:
        'El inicio insidioso, la progresión gradual durante aproximadamente tres años, el predominio inicial de alteraciones de memoria episódica y la pérdida progresiva de independencia funcional apoyan un diagnóstico clínico de enfermedad de Alzheimer probable. La resonancia magnética muestra atrofia de predominio temporomedial, un hallazgo de apoyo no específico. No se dispone de biomarcadores confirmatorios.'
    },

    justificacionClinica: {
      puntuacionMaxima: 50,

      pregunta:
        'Justifique su diagnóstico utilizando los hallazgos de la entrevista, la exploración y los estudios complementarios.',

      criterios: [
        {
          id: 'inicio_evolucion',
          nombre: 'Inicio insidioso y evolución progresiva',
          puntos: 8,
          palabrasClave: [
            'gradual',
            'insidioso',
            'progresivo',
            'progresiva',
            'tres anos',
            '3 anos',
            'empeoramiento',
            'evolucion'
          ],
          retroalimentacion:
            'La enfermedad comenzó aproximadamente tres años antes de la consulta, con síntomas iniciales de aparición gradual y progresión posterior. Esta cronología favorece un proceso neurodegenerativo.'
        },
        {
          id: 'alteracion_cognitiva',
          nombre: 'Alteración predominante de memoria episódica',
          puntos: 8,
          palabrasClave: [
            'memoria',
            'olvidos',
            'memoria episodica',
            'repite preguntas',
            'repeticion de preguntas',
            'olvida conversaciones',
            'recuerdo diferido',
            'alteracion cognitiva'
          ],
          retroalimentacion:
            'Los primeros síntomas fueron la repetición de preguntas y el olvido de conversaciones recientes, compatibles con afectación predominante de la memoria episódica.'
        },
        {
          id: 'funcionalidad',
          nombre: 'Pérdida de independencia en actividades instrumentales',
          puntos: 12,
          palabrasClave: [
            'dependencia',
            'perdida de independencia',
            'deterioro funcional',
            'actividades instrumentales',
            'aivd',
            'pagos',
            'finanzas',
            'medicamentos',
            'supervision',
            'necesita ayuda'
          ],
          retroalimentacion:
            'La necesidad de supervisión para manejar medicamentos y finanzas demuestra una repercusión funcional significativa. Este hallazgo distingue el trastorno neurocognitivo mayor del deterioro cognitivo leve.'
        },
        {
          id: 'informante',
          nombre: 'Corroboración de los cambios por un familiar',
          puntos: 6,
          palabrasClave: [
            'hija',
            'familiar',
            'informante',
            'corroborado',
            'heteroanamnesis',
            'minimiza'
          ],
          retroalimentacion:
            'La hija proporciona información fundamental sobre el inicio, la progresión y las consecuencias funcionales, especialmente porque la paciente minimiza sus dificultades.'
        },
        {
          id: 'evaluacion_cognitiva',
          nombre: 'Interpretación de la evaluación cognitiva',
          puntos: 8,
          palabrasClave: [
            'moca',
            '16/30',
            '16 de 30',
            'evaluacion cognitiva',
            'prueba cognitiva',
            'tamizaje cognitivo',
            'alteracion cognitiva objetiva'
          ],
          retroalimentacion:
            'El MoCA de 16/30 apoya la presencia de alteración cognitiva objetiva. Su interpretación debe integrarse con la escolaridad, la historia clínica y la pérdida de independencia.'
        },
        {
          id: 'diagnostico_diferencial',
          nombre: 'Diagnóstico diferencial y estudios complementarios',
          puntos: 8,
          palabrasClave: [
            'delirium',
            'depresion',
            'vascular',
            'cuerpos de lewy',
            'frontotemporal',
            'b12',
            'tsh',
            'resonancia',
            'atrofia temporomedial',
            'diagnostico diferencial',
            'causas reversibles'
          ],
          retroalimentacion:
            'Es necesario considerar causas alternativas o contribuyentes. La evolución gradual, la ausencia de focalización neurológica y los resultados de laboratorio e imagen apoyan la hipótesis clínica, pero no constituyen confirmación etiológica por biomarcadores.'
        }
      ],

      advertencia:
        'La evaluación automática de texto libre es orientativa. La detección de términos no garantiza que el razonamiento clínico sea correcto; la valoración docente sigue siendo necesaria.'
    },

    retroalimentacionFinal: {
      titulo: 'Evaluación de razonamiento clínico',

      mensaje:
        'El caso presenta un trastorno neurocognitivo mayor con un patrón clínico compatible con enfermedad de Alzheimer probable. La clave diagnóstica es integrar el inicio insidioso, la progresión de los síntomas, el deterioro de la memoria y la pérdida de independencia funcional.',

      recomendaciones: [
        'Reconstruir la cronología de los primeros síntomas y su progresión.',
        'Identificar los dominios cognitivos afectados, especialmente la memoria episódica.',
        'Distinguir el deterioro cognitivo leve del trastorno neurocognitivo mayor mediante la funcionalidad.',
        'Incorporar la información de la hija como informante.',
        'Interpretar el MoCA y los estudios complementarios en el contexto clínico.',
        'Considerar diagnósticos diferenciales y evitar presentar la etiología como confirmada por biomarcadores.'
      ]
    }
  }
};

export function obtenerEvaluacionClinica(pacienteId) {
  return evaluacionesClinicas[pacienteId] || null;
}
