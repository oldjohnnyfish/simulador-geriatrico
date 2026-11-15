
/*
 * Simulador de Consulta Geriátrica
 * Evaluaciones diagnósticas - Versión 1
 *
 * Criterios de evaluación para casos ficticios.
 * Retroalimentación al finalizar el caso.
 *
 * No utiliza servicios externos.
 */

export const evaluacionesClinicas = {
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

      opciones: [
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
      ],

      respuestaCorrecta: 'dcl',

      explicacion:
        'La paciente presenta dificultades cognitivas de inicio gradual, corroboradas por un familiar, con independencia funcional conservada. Los hallazgos son compatibles con deterioro cognitivo leve.'
    },

    diagnosticoEtiologico: {
      puntuacionMaxima: 20,

      pregunta:
        '¿Cuál es la interpretación etiológica más apropiada?',

      opciones: [
        {
          id: 'alzheimer_confirmado',
          texto:
            'Enfermedad de Alzheimer confirmada'
        },
        {
          id: 'vascular_confirmado',
          texto:
            'Deterioro cognitivo de etiología vascular confirmada'
        },
        {
          id: 'etiologia_no_establecida',
          texto:
            'Etiología aún no establecida; considerar enfermedad de Alzheimer prodrómica entre los diagnósticos diferenciales'
        },
        {
          id: 'delirium_infeccioso',
          texto:
            'Delirium secundario a infección'
        }
      ],

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
          nombre: 'Consideración de diagnósticos diferenciales y factores modificables',
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
      titulo:
        'Evaluación de razonamiento clínico',

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
  }
};

export function obtenerEvaluacionClinica(pacienteId) {
  return evaluacionesClinicas[pacienteId] || null;
}
