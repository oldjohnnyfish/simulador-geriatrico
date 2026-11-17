
/*
 * Simulador de Consulta Geriátrica
 * Motor gratuito de entrevistas - Versión 7
 *
 * Entrevistas clínicas con reconocimiento de temas,
 * cronología y preguntas de seguimiento.
 *
 * Las respuestas proceden de casosClinicos.js.
 * No utiliza APIs ni servicios externos.
 */

import { obtenerCasoClinico } from './casosClinicos.js';

function normalizar(texto) {
  return String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!.,;:()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function coincide(texto, patrones) {
  return patrones.some((patron) => patron.test(texto));
}

const temas = [
  {
    id: 'antecedentesFamiliares',
    patrones: [
      /\b(antecedentes familiares|historia familiar|familiares con demencia|familiares con alzheimer)\b/,
      /\b(madre|padre|hermanos|abuelos)\b.*\b(memoria|demencia|alzheimer|olvidos)\b/,
      /\b(memoria|demencia|alzheimer|olvidos)\b.*\b(madre|padre|hermanos|abuelos|familia)\b/
    ]
  },
  {
    id: 'finanzas',
    patrones: [
      /\b(dinero|finanzas|cuentas|banco|pagos|pagar|administrar|administra|economia|gastos)\b/
    ]
  },
  {
    id: 'medicamentos',
    patrones: [
      /\b(medicamentos?|medicinas?|pastillas?|farmacos?|tratamientos?|dosis|receta)\b/,
      /\b(que toma|como se toma|olvida tomar)\b/
    ]
  },
  {
    id: 'funcionesEjecutivas',
    patrones: [
      /\b(planificar|planeacion|organizar tareas|organizar actividades|resolver problemas|tomar decisiones|tareas complejas)\b/,
      /\b(varias cosas a la vez|seguir instrucciones complejas)\b/
    ]
  },
  {
    id: 'visuoespacial',
    patrones: [
      /\b(visuoespacial|espacial|reconocer lugares|reconocer caminos|dibujar figuras|calcular distancias)\b/
    ]
  },
  {
    id: 'orientacion',
    patrones: [
      /\b(perdido|perderse|desorientado|desorientada|desorientacion|ubicarse|encontrar el camino|regresar a casa)\b/,
      /\b(sabe donde esta|sabe que dia es|reconoce los lugares)\b/
    ]
  },
  {
    id: 'alucinaciones',
    patrones: [
      /\b(alucinaciones?|alucina|alucinado)\b/,
      /\b(ver|ve|visto|mirar|mira)\b.*\b(cosas|personas|figuras|sombras)\b.*\b(no ven|no ve|no existen|no estan|nadie mas)\b/,
      /\b(escuchar|escucha|oye|oir)\b.*\b(voces|sonidos)\b/,
      /\b(ve cosas|ha visto cosas|ver cosas|ve personas que no estan)\b/,
      /\b(cosas que otras personas no ven|cosas que los demas no ven)\b/
    ]
  },
  {
    id: 'fluctuaciones',
    patrones: [
      /\b(fluctuaciones?|cambios de alerta|confusion intermitente|momentos de confusion|dias buenos y malos)\b/
    ]
  },
  {
    id: 'conducta',
    patrones: [
      /\b(conducta|comportamiento|personalidad|desinhibicion|impulsividad|agresividad|apatia|irritabilidad|suspicacia|desconfianza)\b/
    ]
  },
  {
    id: 'sintomasDepresivos',
    patrones: [
      /\b(depresion|deprimida|tristeza persistente|perdida de interes|anhedonia|desesperanza)\b/
    ]
  },
  {
    id: 'animo',
    patrones: [
      /\b(animo|triste|ansiedad|angustia|preocupacion|preocupada|disfruta|disfrutar)\b/
    ]
  },
  {
    id: 'atencion',
    patrones: [
      /\b(atencion|concentracion|concentrarse|distrae|distraccion|mantener una conversacion)\b/
    ]
  },
  {
    id: 'memoria',
    patrones: [
      /\b(memoria|olvidos?|olvidar|olvida|olvidan|recordar|recuerda|recuerdos?|extraviar|extravia)\b/,
      /\b(llaves|citas|compromisos|cosas recientes|repite preguntas)\b/
    ]
  },
  {
    id: 'nutricion',
    patrones: [
      /\b(nutricion|alimentacion|apetito|comida|come bien|perdida de peso|bajado de peso|adelgazado)\b/
    ]
  },
  {
    id: 'fragilidad',
    patrones: [
      /\b(fragilidad|debilidad|fuerza muscular|cansancio|agotamiento|fatiga)\b/
    ]
  },
  {
    id: 'caidas',
    patrones: [
      /\b(caidas?|caido|tropezones?|se ha caido)\b/
    ]
  },
  {
    id: 'movilidad',
    patrones: [
      /\b(movilidad|caminar|camina|marcha|baston|andadera|ejercicio|actividad fisica)\b/
    ]
  },
  {
    id: 'redApoyo',
    patrones: [
      /\b(vive sola|vive con|con quien vive|familia|hijos|hijas|apoyo familiar|quien la ayuda|quien la cuida)\b/
    ]
  },
  {
    id: 'funcionalidad',
    patrones: [
      /\b(actividades de la vida diaria|actividades cotidianas|actividades habituales)\b/,
      /\b(independiente|dependiente|necesita ayuda|requiere ayuda|puede hacer sola)\b/,
      /\b(banarse|vestirse|asearse|cocinar|preparar comida|hacer compras|quehaceres)\b/
    ]
  },
  {
    id: 'antecedentes',
    patrones: [
      /\b(antecedentes?|enfermedades?|padecimientos?|hipertension|diabetes|presion alta|presion arterial)\b/
    ]
  },
  {
    id: 'audicion',
    patrones: [
      /\b(audicion|escuchar|escucha|oir|oye|oidos?|sordera|auditivos?)\b/
    ]
  },
  {
    id: 'lenguaje',
    patrones: [
      /\b(lenguaje|palabras|hablar|habla|nombrar|expresarse|conversar)\b/
    ]
  },
  {
    id: 'escolaridad',
    patrones: [
      /\b(escolaridad|escuela|estudios|estudio|educacion|universidad|profesion|ocupacion|jubilacion|jubilada|trabajaba)\b/
    ]
  },
  {
    id: 'sueno',
    patrones: [
      /\b(sueno|dormir|duerme|insomnio|pesadillas|descanso)\b/
    ]
  },
  {
    id: 'motivo',
    patrones: [
      /\b(que le trae|motivo de consulta|por que viene|que le pasa|en que puedo ayudar|cual es su problema)\b/
    ]
  },
  {
    id: 'cronologia',
    patrones: [
      /\b(desde cuando|hace cuanto|cuanto tiempo|cuando empezo|cuando inicio|cuando comenzaron|desde hace cuanto)\b/,
      /\b(cuando noto|cuando aparecieron|desde que edad)\b/,
      /\b(como comenzo|como inicio|como empezo|como fue el inicio)\b/,
      /\b(primer sintoma|primeros sintomas|primer cambio|primeros cambios|lo primero que noto|lo primero que observaron)\b/,
      /\b(inicio brusco|inicio gradual|inicio repentino|inicio insidioso)\b/,
      /\b(de repente|de forma gradual|de manera progresiva|de manera subita|de forma subita)\b/,
      /\b(como ha evolucionado|como evoluciono|curso de la enfermedad|progresion de los sintomas)\b/
    ]
  }
];

function identificarTema(pregunta) {
  return temas.find((tema) =>
    coincide(pregunta, tema.patrones)
  ) || null;
}

const tiposSeguimiento = [
  {
    id: 'ejemplo',
    patrones: [
      /\b(ejemplo|ejemplos|puede explicarme mejor|a que se refiere|como por ejemplo)\b/
    ]
  },
  {
    id: 'solucion',
    patrones: [
      /\b(como lo resuelve|como lo soluciona|que hace para evitarlo|como se organiza|como lo maneja)\b/
    ]
  },
  {
    id: 'frecuencia',
    patrones: [
      /\b(con que frecuencia|cada cuanto|que tan seguido|cuantas veces|le pasa seguido|le sucede seguido)\b/
    ]
  },
  {
    id: 'evolucion',
    patrones: [
      /\b(ha empeorado|ha progresado|ha aumentado|ha cambiado con el tiempo|se ha agravado|ha ido empeorando)\b/,
      /\b(desde cuando|hace cuanto|cuanto tiempo|cuando empezo|desde hace cuanto)\b/,
      /\b(como ha evolucionado|como evoluciono|ha sido progresivo|ha ido avanzando)\b/
    ]
  },
  {
    id: 'repercusion',
    patrones: [
      /\b(afecta sus actividades|afecta su vida|afecta su independencia|le impide|le dificulta|consecuencias|repercusion|impacto en su vida)\b/,
      /\b(necesita ayuda por eso|ha dejado de hacer cosas|puede seguir haciendo sus actividades)\b/
    ]
  }
];

function identificarSeguimiento(pregunta) {
  return tiposSeguimiento.find((tipo) =>
    coincide(pregunta, tipo.patrones)
  )?.id || null;
}

function respuestaNoDisponible(canal) {
  return canal === 'paciente'
    ? 'No sabría darle ese detalle con precisión.'
    : 'No tenemos información suficiente para precisar ese aspecto.';
}

function construirRespuesta(
  respuesta,
  tema,
  seguimiento = false
) {
  return {
    respuesta,
    tema,
    reconocido: true,
    seguimiento
  };
}

/*
 * Preguntas específicas sobre la cronología.
 *
 * Se procesan antes de los temas generales
 * para evitar que palabras como "memoria",
 * "enfermedad" o "actividades" desvíen
 * la interpretación de la pregunta.
 *
 * Las respuestas se obtienen del caso clínico,
 * sin inventar información.
 */
function responderCronologia(caso, canal, pregunta) {
  const cronologia = caso.entrevista?.cronologia;
  const seguimientos = caso.seguimientos?.cronologia;

  if (!cronologia?.[canal]) {
    return null;
  }

  const primerSintoma = [
    /\b(primer sintoma|primeros sintomas|primer cambio|primeros cambios)\b/,
    /\b(lo primero que noto|lo primero que observaron|que fue lo primero)\b/,
    /\b(con que sintoma|con cuales sintomas)\b.*\b(empezo|inicio|comenzo)\b/,
    /\b(que sintomas?|cuales sintomas?)\b.*\b(al principio|al inicio|primero)\b/
  ];

  const inicio = [
    /\b(como comenzo|como inicio|como empezo|como fue el inicio)\b/,
    /\b(como empezaron|como iniciaron|como comenzaron)\b/,
    /\b(inicio brusco|inicio gradual|inicio repentino|inicio insidioso)\b/,
    /\b(brusco o gradual|repentino o progresivo|subito o gradual)\b/,
    /\b(de repente|de forma gradual|de manera subita|de forma subita)\b/
  ];

  const evolucion = [
    /\b(como ha evolucionado|como evoluciono|como ha progresado)\b/,
    /\b(ha ido empeorando|ha ido avanzando|ha sido progresivo)\b/,
    /\b(progresion de los sintomas|curso de la enfermedad)\b/,
    /\b(que paso despues|que ocurrio despues|que sucedio despues)\b/
  ];

  const tiempo = [
    /\b(desde cuando|hace cuanto|cuanto tiempo|cuando empezo|cuando inicio|cuando comenzaron|desde hace cuanto)\b/,
    /\b(cuando noto|cuando aparecieron|desde que edad)\b/,
    /\b(cuanto lleva|cuantos meses|cuantos anos)\b/
  ];

  const primerasLimitaciones = [
    /\b(primera actividad|primeras actividades|primeras dificultades funcionales)\b/,
    /\b(que dejo de hacer primero|que actividad dejo de hacer)\b/,
    /\b(cuando empezo a necesitar ayuda|cuando comenzo a necesitar ayuda)\b/,
    /\b(cuando perdio su independencia|cuando dejo de ser independiente)\b/
  ];

  if (coincide(pregunta, primerasLimitaciones)) {
    const respuesta =
      caso.seguimientos?.funcionalidad?.evolucion?.[canal] ||
      caso.entrevista?.funcionalidad?.[canal];

    if (respuesta) {
      return construirRespuesta(
        respuesta,
        'funcionalidad',
        true
      );
    }
  }

  if (coincide(pregunta, primerSintoma)) {
    return construirRespuesta(
      seguimientos?.ejemplo?.[canal] ||
        cronologia[canal],
      'cronologia',
      Boolean(seguimientos?.ejemplo?.[canal])
    );
  }

  if (coincide(pregunta, evolucion)) {
    return construirRespuesta(
      seguimientos?.evolucion?.[canal] ||
        cronologia[canal],
      'cronologia',
      Boolean(seguimientos?.evolucion?.[canal])
    );
  }

  if (coincide(pregunta, inicio)) {
    return construirRespuesta(
      seguimientos?.evolucion?.[canal] ||
        cronologia[canal],
      'cronologia',
      Boolean(seguimientos?.evolucion?.[canal])
    );
  }

  if (coincide(pregunta, tiempo)) {
    return construirRespuesta(
      cronologia[canal],
      'cronologia',
      false
    );
  }

  return null;
}

export function responderEntrevista({
  pacienteId,
  interlocutor,
  mensaje,
  ultimoTema = null
}) {
  const caso = obtenerCasoClinico(pacienteId);

  if (!caso) {
    return {
      respuesta:
        'La entrevista de este caso todavía está en preparación.',
      tema: null,
      reconocido: false
    };
  }

  const canal =
    interlocutor === 'familiar'
      ? 'familiar'
      : 'paciente';

  const pregunta = normalizar(mensaje);

  if (!pregunta) {
    return {
      respuesta: '¿Podría repetir su pregunta?',
      tema: null,
      reconocido: false
    };
  }

  if (
    /^(hola|buenos dias|buenas tardes|buenas noches)\b/.test(
      pregunta
    )
  ) {
    return construirRespuesta(
      canal === 'paciente'
        ? 'Buenos días, doctor. Mucho gusto.'
        : 'Buenos días, doctor. Gracias por recibirnos.',
      'saludo'
    );
  }

  if (
    /\b(adios|hasta luego|muchas gracias|gracias por su tiempo)\b/.test(
      pregunta
    )
  ) {
    return construirRespuesta(
      canal === 'paciente'
        ? 'Muchas gracias, doctor. Que tenga buen día.'
        : 'Muchas gracias por atendernos.',
      'despedida'
    );
  }

  /*
   * Las preguntas sobre el inicio general
   * de la enfermedad tienen prioridad.
   */
  const respuestaCronologica =
    responderCronologia(caso, canal, pregunta);

  if (respuestaCronologica) {
    return respuestaCronologica;
  }

  const tipoSeguimiento =
    identificarSeguimiento(pregunta);

  const temaExplicito =
    identificarTema(pregunta);

  /*
   * Si el estudiante menciona un tema concreto,
   * se prioriza sobre el tema de la pregunta
   * anterior.
   *
   * Ejemplo:
   * "¿Desde cuándo tiene problemas de memoria?"
   * se responde con la cronología del caso.
   *
   * "¿Ha empeorado su memoria?"
   * utiliza el seguimiento de memoria.
   */
  if (tipoSeguimiento) {
    let temaContextual = ultimoTema;

    if (
      temaExplicito &&
      temaExplicito.id !== 'cronologia'
    ) {
      temaContextual = temaExplicito.id;
    }

    if (temaContextual) {
      const respuesta =
        caso.seguimientos?.[temaContextual]
          ?.[tipoSeguimiento]?.[canal];

      if (respuesta) {
        return construirRespuesta(
          respuesta,
          temaContextual,
          true
        );
      }

      /*
       * Si existe una respuesta general para
       * el tema, se usa como alternativa.
       */
      const respuestaGeneral =
        caso.entrevista?.[temaContextual]?.[canal];

      if (respuestaGeneral) {
        return construirRespuesta(
          respuestaGeneral,
          temaContextual,
          false
        );
      }

      return {
        respuesta: respuestaNoDisponible(canal),
        tema: temaContextual,
        reconocido: true,
        seguimiento: true,
        datoDisponible: false
      };
    }
  }

  /*
   * Pregunta clínica principal.
   */
  if (temaExplicito) {
    const informacion =
      caso.entrevista?.[temaExplicito.id];

    if (informacion?.[canal]) {
      return construirRespuesta(
        informacion[canal],
        temaExplicito.id,
        false
      );
    }
  }

  return {
    respuesta:
      canal === 'paciente'
        ? '¿Podría preguntármelo de otra manera? Quiero asegurarme de entenderle.'
        : 'No tengo información suficiente sobre eso. ¿Podría hacer una pregunta más específica?',
    tema: null,
    reconocido: false
  };
}
