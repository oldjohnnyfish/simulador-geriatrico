
/*
 * Simulador de Consulta Geriátrica
 * Evaluaciones diagnósticas - Versión 5
 *
 * Casos:
 * 01 - Elena Martínez
 * 02 - María Hernández
 * 03 - Roberto Salgado
 * 04 - Jorge Villaseñor
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
  },

  // ==========================================
  // CASO 03: ROBERTO SALGADO
  // ==========================================

  'caso-03': {
    pacienteId: 'caso-03',

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
        'Roberto presenta alteraciones cognitivas persistentes que comprometen su independencia para actividades instrumentales de la vida diaria. Las dificultades ejecutivas y atencionales comenzaron antes del ictus y se acompañaron de pérdida de autonomía. Después del evento vascular, la dependencia aumentó. Los hallazgos son compatibles con síndrome demencial o trastorno neurocognitivo mayor. La discapacidad motora posterior al ictus también debe considerarse al interpretar la dependencia para actividades básicas.'
    },

    diagnosticoEtiologico: {
      puntuacionMaxima: 20,

      pregunta:
        '¿Cuál es la interpretación etiológica más apropiada?',

      opciones: opcionesEtiologicas,

      respuestaCorrecta: 'vascular_confirmado',

      explicacion:
        'El patrón clínico es compatible con un trastorno neurocognitivo mayor de origen vascular. Existe un deterioro cognitivo predominantemente ejecutivo y atencional de evolución gradual, asociado con enfermedad cerebral de pequeños vasos, seguido de un empeoramiento brusco tras un ictus isquémico subcortical. La resonancia muestra hiperintensidades extensas de sustancia blanca, infartos lacunares y un infarto subcortical crónico. La concordancia entre cronología, perfil cognitivo, hallazgos neurológicos y neuroimagen apoya la contribución vascular.'
    },

    justificacionClinica: {
      puntuacionMaxima: 50,

      pregunta:
        'Justifique su diagnóstico utilizando los hallazgos de la entrevista, la exploración y los estudios complementarios.',

      criterios: [
        {
          id: 'inicio_evolucion',
          nombre:
            'Cronología del deterioro y empeoramiento posterior al ictus',
          puntos: 8,

          palabrasClave: [
            'cuatro anos',
            '4 anos',
            'gradual',
            'progresivo',
            'lentamente',
            'ictus',
            'evento vascular',
            'infarto cerebral',
            'derrame',
            'ocho meses',
            '8 meses',
            'empeoramiento brusco',
            'deterioro escalonado',
            'deterioro abrupto'
          ],

          retroalimentacion:
            'Es fundamental reconocer dos etapas: deterioro cognitivo gradual durante aproximadamente cuatro años y empeoramiento brusco después del ictus ocurrido hace ocho meses. La relación temporal con el evento vascular es una pieza central del razonamiento etiológico.'
        },

        {
          id: 'alteracion_cognitiva',
          nombre:
            'Perfil cognitivo ejecutivo, atencional y de lentitud de procesamiento',
          puntos: 8,

          palabrasClave: [
            'funciones ejecutivas',
            'disfuncion ejecutiva',
            'funcion ejecutiva',
            'atencion',
            'lentitud',
            'velocidad de procesamiento',
            'procesamiento',
            'planificacion',
            'organizacion',
            'concentracion',
            'enlentecimiento',
            'bradipsiquia',
            'memoria',
            'evocacion con pistas'
          ],

          retroalimentacion:
            'El perfil cognitivo presenta predominio de disfunción ejecutiva, dificultades de atención y enlentecimiento del procesamiento. Este patrón, junto con la mejoría parcial de evocación mediante pistas, resulta compatible con afectación vascular subcortical.'
        },

        {
          id: 'funcionalidad',
          nombre:
            'Pérdida de independencia y repercusión funcional',
          puntos: 12,

          palabrasClave: [
            'dependencia',
            'perdida de independencia',
            'perdida de autonomia',
            'deterioro funcional',
            'actividades instrumentales',
            'aivd',
            'finanzas',
            'pagos',
            'medicamentos',
            'supervision',
            'necesita ayuda',
            'bano',
            'vestido',
            'actividades basicas',
            'abvd'
          ],

          retroalimentacion:
            'La pérdida de independencia para finanzas y medicamentos precedió al ictus y demuestra repercusión cognitiva sobre las actividades instrumentales. La necesidad posterior de ayuda para baño y vestido debe interpretarse considerando tanto las dificultades cognitivas como la hemiparesia residual.'
        },

        {
          id: 'informante',
          nombre:
            'Corroboración de la evolución por la esposa',
          puntos: 6,

          palabrasClave: [
            'esposa',
            'familiar',
            'informante',
            'heteroanamnesis',
            'corroborado',
            'corrobora',
            'cuidadora',
            'testimonio familiar'
          ],

          retroalimentacion:
            'La esposa permite establecer que el deterioro cognitivo comenzó antes del ictus, identificar los primeros dominios afectados y documentar el empeoramiento posterior y la pérdida de independencia.'
        },

        {
          id: 'evaluacion_cognitiva',
          nombre:
            'Integración de MoCA y exploración neurológica',
          puntos: 8,

          palabrasClave: [
            'moca',
            '17/30',
            '17 de 30',
            'evaluacion cognitiva',
            'prueba cognitiva',
            'tamizaje cognitivo',
            'hemiparesia',
            'focalizacion neurologica',
            'focalidad neurologica',
            'debilidad derecha',
            'marcha asimetrica',
            'exploracion neurologica'
          ],

          retroalimentacion:
            'El MoCA de 17/30 documenta alteración cognitiva, especialmente ejecutiva y atencional. La hemiparesia derecha residual y la marcha asimétrica apoyan la existencia de secuelas neurológicas del ictus. Los resultados deben interpretarse según escolaridad y limitaciones motoras.'
        },

        {
          id: 'diagnostico_diferencial',
          nombre:
            'Evidencia vascular en neuroimagen y diagnóstico diferencial',
          puntos: 8,

          palabrasClave: [
            'enfermedad de pequenos vasos',
            'pequenos vasos',
            'sustancia blanca',
            'hiperintensidades',
            'infartos lacunares',
            'lagunas',
            'infarto subcortical',
            'resonancia',
            'vascular',
            'isquemico',
            'isquemia',
            'alzheimer',
            'demencia mixta',
            'depresion',
            'delirium',
            'diagnostico diferencial',
            'b12',
            'tsh'
          ],

          retroalimentacion:
            'La resonancia muestra enfermedad extensa de pequeños vasos, infartos lacunares y secuela de infarto subcortical. Es importante vincular estos hallazgos con el perfil cognitivo y la cronología, además de considerar causas alternativas o contribuyentes, incluida la posibilidad de patología mixta.'
        }
      ],

      advertencia:
        'La evaluación automática de texto libre es orientativa. Identificar términos relacionados con enfermedad vascular no garantiza que la explicación clínica sea correcta. Es necesario valorar la concordancia entre evolución, perfil cognitivo, repercusión funcional y neuroimagen. La revisión docente continúa siendo necesaria.'
    },

    retroalimentacionFinal: {
      titulo: 'Evaluación de razonamiento clínico',

      mensaje:
        'Roberto presenta un trastorno neurocognitivo mayor con un patrón clínico compatible con etiología vascular. La clave es reconocer la evolución gradual previa, caracterizada por disfunción ejecutiva y enlentecimiento, seguida de un deterioro brusco después del ictus. La información de la esposa, la pérdida de independencia y la evidencia de enfermedad cerebral de pequeños vasos e infartos subcorticales respaldan la interpretación.',

      recomendaciones: [
        'Reconstruir la cronología completa y distinguir el deterioro previo del empeoramiento posterior al ictus.',
        'Identificar el predominio de alteraciones ejecutivas, atencionales y de velocidad de procesamiento.',
        'Documentar la pérdida de independencia instrumental anterior al ictus.',
        'Diferenciar la discapacidad atribuible al deterioro cognitivo de las limitaciones motoras posteriores al evento vascular.',
        'Utilizar la información de la esposa para corroborar la evolución.',
        'Interpretar el MoCA junto con la exploración neurológica y la escolaridad.',
        'Relacionar los hallazgos de neuroimagen con el perfil cognitivo y la cronología.',
        'Considerar patología mixta y otras causas contribuyentes sin asumir que toda lesión vascular explica necesariamente todos los síntomas.'
      ]
    }
  },

  // ==========================================
  // CASO 04: JORGE VILLASEÑOR
  // ==========================================

  'caso-04': {
    pacienteId: 'caso-04',

    configuracion: {
      retroalimentacion: 'al_finalizar',
      puntuacionMaxima: 100
    },

    diagnosticoSindromatico: {
      puntuacionMaxima: 30,
      pregunta: '¿Cuál es el diagnóstico sindromático más probable?',
      opciones: opcionesSindromaticas,
      respuestaCorrecta: 'demencia',
      explicacion:
        'El deterioro cognitivo de Jorge afecta la atención, las funciones ejecutivas y las habilidades visuoespaciales, y compromete su independencia para administrar finanzas, medicamentos y traslados. Esto corresponde a un trastorno neurocognitivo mayor, aunque conserve la mayoría de las actividades básicas.'
    },

    diagnosticoEtiologico: {
      puntuacionMaxima: 20,
      pregunta: '¿Cuál es la interpretación etiológica más apropiada?',
      opciones: opcionesEtiologicas,
      respuestaCorrecta: 'cuerpos_lewy',
      explicacion:
        'El síndrome clínico es compatible con demencia con cuerpos de Lewy probable: deterioro cognitivo que precede al parkinsonismo espontáneo, fluctuaciones de atención y alerta, alucinaciones visuales recurrentes bien formadas y parkinsonismo espontáneo. Además, la historia sugiere trastorno de conducta del sueño REM, todavía no confirmado mediante polisomnografía. La resonancia inespecífica no confirma ni excluye esta etiología.'
    },

    justificacionClinica: {
      puntuacionMaxima: 50,
      pregunta: 'Justifique su diagnóstico utilizando los hallazgos de la entrevista, la exploración y los estudios complementarios.',
      criterios: [
        {
          id: 'inicio_evolucion',
          nombre: 'Cronología de síntomas de sueño, cognitivos y motores',
          puntos: 8,
          palabrasClave: [
            'cuatro anos', '4 anos', 'dos anos', '2 anos',
            '18 meses', 'dieciocho meses', '10 meses', 'diez meses',
            '6 meses', 'seis meses', 'sueno rem', 'suenos actuados',
            'trastorno de conducta del sueno rem', 'antes del deterioro cognitivo',
            'despues del deterioro cognitivo', 'parkinsonismo posterior',
            'cronologia', 'evolucion'
          ],
          retroalimentacion:
            'La actuación de sueños comenzó hace cuatro años; los síntomas cognitivos aparecieron hace dos años, seguidos por fluctuaciones, alucinaciones visuales y, finalmente, parkinsonismo. El deterioro cognitivo precedió a los síntomas motores.'
        },
        {
          id: 'alteracion_cognitiva',
          nombre: 'Perfil cognitivo y manifestaciones nucleares',
          puntos: 8,
          palabrasClave: [
            'fluctuaciones', 'fluctuacion', 'atencion', 'alerta',
            'somnolencia', 'episodios de confusion', 'visuoespacial',
            'visuoespaciales', 'funciones ejecutivas', 'disfuncion ejecutiva',
            'alucinaciones visuales', 'alucinaciones', 'personas',
            'animales', 'parkinsonismo', 'bradicinesia', 'rigidez'
          ],
          retroalimentacion:
            'Predominan dificultades atencionales, ejecutivas y visuoespaciales, con fluctuaciones cognitivas y alucinaciones visuales recurrentes y detalladas. La exploración también identifica parkinsonismo espontáneo.'
        },
        {
          id: 'funcionalidad',
          nombre: 'Pérdida de independencia instrumental',
          puntos: 12,
          palabrasClave: [
            'dependencia', 'perdida de independencia', 'perdida de autonomia',
            'deterioro funcional', 'actividades instrumentales', 'aivd',
            'finanzas', 'cuentas', 'pagos', 'medicamentos', 'traslados',
            'supervision', 'necesita ayuda', 'actividades basicas',
            'trastorno neurocognitivo mayor', 'sindrome demencial'
          ],
          retroalimentacion:
            'La supervisión necesaria para finanzas, medicamentos y traslados demuestra pérdida de autonomía instrumental atribuible al deterioro cognitivo, pese a la relativa preservación de actividades básicas.'
        },
        {
          id: 'informante',
          nombre: 'Aporte de la esposa como informante',
          puntos: 6,
          palabrasClave: [
            'esposa', 'familiar', 'informante', 'heteroanamnesis',
            'corroborado', 'corrobora', 'cuidadora', 'testimonio familiar',
            'minimiza'
          ],
          retroalimentacion:
            'La esposa permite reconstruir los episodios nocturnos, las fluctuaciones, las alucinaciones y la secuencia temporal; el paciente minimiza parte de sus dificultades.'
        },
        {
          id: 'evaluacion_cognitiva',
          nombre: 'Interpretación del MoCA y exploración neurológica',
          puntos: 8,
          palabrasClave: [
            'moca', '18/30', '18 de 30', 'evaluacion cognitiva',
            'prueba cognitiva', 'tamizaje cognitivo', 'atencion',
            'visuoespacial', 'funciones ejecutivas', 'bradicinesia',
            'rigidez', 'marcha lenta', 'pasos cortos', 'exploracion neurologica'
          ],
          retroalimentacion:
            'El MoCA de 18/30 y la exploración con bradicinesia, rigidez y marcha de pasos cortos apoyan la alteración cognitiva y el parkinsonismo. El rendimiento debe interpretarse según la escolaridad y las fluctuaciones del estado de alerta.'
        },
        {
          id: 'diagnostico_diferencial',
          nombre: 'Diagnóstico diferencial y límites de la evidencia',
          puntos: 8,
          palabrasClave: [
            'cuerpos de lewy', 'lewy', 'alzheimer', 'parkinson',
            'demencia asociada a parkinson', 'regla de un ano',
            'delirium', 'depresion', 'medicamentos', 'antipsicoticos',
            'resonancia', 'polisomnografia', 'sueno rem', 'b12', 'tsh',
            'diagnostico diferencial', 'sin biomarcadores', 'probable'
          ],
          retroalimentacion:
            'El inicio cognitivo anterior al parkinsonismo favorece demencia con cuerpos de Lewy frente a demencia asociada a enfermedad de Parkinson. Deben considerarse delirium, Alzheimer y causas farmacológicas. El trastorno de conducta del sueño REM es probable, pero no está confirmado por polisomnografía; la resonancia es inespecífica.'
        }
      ],
      advertencia:
        'La evaluación automática de texto libre es orientativa. Detectar palabras clave no demuestra que se hayan integrado correctamente los criterios clínicos. La revisión docente sigue siendo necesaria.'
    },

    retroalimentacionFinal: {
      titulo: 'Evaluación de razonamiento clínico',
      mensaje:
        'Jorge presenta un trastorno neurocognitivo mayor con características clínicas de demencia con cuerpos de Lewy probable. La integración depende de la pérdida de independencia instrumental, las fluctuaciones cognitivas, las alucinaciones visuales bien formadas, el parkinsonismo espontáneo y los síntomas compatibles con trastorno de conducta del sueño REM.',
      recomendaciones: [
        'Reconstruir la cronología de síntomas nocturnos, cognitivos, perceptivos y motores.',
        'Distinguir el trastorno neurocognitivo mayor del deterioro cognitivo leve por la pérdida de independencia instrumental.',
        'Investigar fluctuaciones de atención y alerta y diferenciarlas de delirium.',
        'Documentar alucinaciones visuales recurrentes y parkinsonismo espontáneo.',
        'Incorporar la información de la esposa y el MoCA de 18/30.',
        'Diferenciar demencia con cuerpos de Lewy de demencia asociada a enfermedad de Parkinson y enfermedad de Alzheimer.',
        'Evitar afirmar confirmación polisomnográfica del trastorno de conducta del sueño REM cuando no se ha realizado el estudio.'
      ]
    }
  }
};

export function obtenerEvaluacionClinica(pacienteId) {
  return evaluacionesClinicas[pacienteId] || null;
}
