
/*
 * Simulador de Consulta Geriátrica
 * Motor de entrevista - Versión 9
 *
 * Reconocimiento flexible de preguntas clínicas.
 * Seguimiento contextual de la conversación.
 * Diferencia entre paciente y familiar.
 * Sin APIs externas ni servicios de pago.
 */

import { obtenerCasoClinico } from './casosClinicos.js';

function normalizar(texto) {
  return String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9ñ\s]/g, ' ')
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
      /\b(antecedentes familiares|historia familiar|familiares con|hereditario)\b/,
      /\b(madre|padre|hermanos|abuelos)\b.*\b(memoria|demencia|alzheimer|olvidos)\b/,
      /\b(memoria|demencia|alzheimer|olvidos)\b.*\b(madre|padre|hermanos|abuelos|familia)\b/
    ]
  },
  {
    id: 'finanzas',
    patrones: [
      /\b(dinero|finanzas|cuentas|banco|pagos|pagar|administrar|administra|economia|gastos|recibos)\b/
    ]
  },
  {
    id: 'medicamentos',
    patrones: [
      /\b(medicamentos?|medicinas?|pastillas?|farmacos?|tratamientos?|dosis|receta|pastillero)\b/,
      /\b(que toma|como se toma|olvida tomar)\b/
    ]
  },
  {
    id: 'funcionesEjecutivas',
    patrones: [
      /\b(planificar|planeacion|organizar|organizacion|resolver problemas|tomar decisiones|tareas complejas)\b/,
      /\b(varias cosas a la vez|seguir instrucciones|hacer planes)\b/
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
      /\b(perdido|perderse|desorientado|desorientada|desorientacion|ubicarse|encontrar el camino|regresar a casa|extraviarse)\b/,
      /\b(sabe donde esta|sabe que dia es|reconoce los lugares|confunde las fechas)\b/
    ]
  },
  {
    id: 'alucinaciones',
    patrones: [
      /\b(alucinaciones?|alucina|alucinado)\b/,
      /\b(ve cosas|ha visto cosas|ve personas que no estan|escucha voces|oye voces)\b/,
      /\b(ver|ve|visto|mirar)\b.*\b(cosas|personas|figuras|sombras)\b.*\b(no ven|no ve|no existen|no estan|nadie mas)\b/,
      /\b(cosas que otras personas no ven|cosas que los demas no ven)\b/
    ]
  },
  {
    id: 'fluctuaciones',
    patrones: [
      /\b(fluctuaciones?|cambios de alerta|confusion intermitente|momentos de confusion|dias buenos y malos|cambios bruscos de atencion)\b/
    ]
  },
  {
    id: 'conducta',
    patrones: [
      /\b(conducta|comportamiento|personalidad|desinhibicion|impulsividad|agresividad|apatia|irritabilidad|irritable|suspicacia|desconfianza|enojona|enoja)\b/
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
      /\b(llaves|citas|compromisos|cosas recientes|repite preguntas|repetir preguntas)\b/
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
      /\b(vive sola|vive con|con quien vive|familia|hijos|hijas|apoyo familiar|quien la ayuda|quien la cuida|quien la acompana)\b/
    ]
  },
  {
    id: 'funcionalidad',
    patrones: [
      /\b(actividades de la vida diaria|actividades cotidianas|actividades habituales|actividades instrumentales)\b/,
      /\b(independiente|dependiente|independencia|necesita ayuda|requiere ayuda|puede hacer sola|puede valerse|se vale sola)\b/,
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
      /\b(que le trae|motivo de consulta|por que viene|que le pasa|en que puedo ayudar|cual es su problema|que le preocupa)\b/
    ]
  }
];

const patronesCronologia = {
  primerSintoma: [
    /\b(primer|primeros|primera|primeras)\b.*\b(sintoma|sintomas|cambio|cambios|problema|problemas|manifestacion)\b/,
    /\b(que fue lo primero|cual fue lo primero|lo primero que noto|lo primero que observaron)\b/,
    /\b(con que|con cuales)\b.*\b(sintomas|problemas)\b.*\b(empezo|inicio|comenzo)\b/,
    /\b(que|cuales)\b.*\b(sintomas|problemas)\b.*\b(al principio|al inicio)\b/
  ],

  primerasLimitaciones: [
    /\b(primera|primeras|primer)\b.*\b(actividad|actividades|dificultad funcional|limitacion)\b/,
    /\b(que dejo de hacer primero|que actividad dejo de hacer)\b/,
    /\b(cuando|desde cuando|hace cuanto)\b.*\b(necesitar ayuda|necesita ayuda|perdio su independencia|dejo de ser independiente)\b/,
    /\b(que actividades dejo de hacer|que empezo a dejar de hacer)\b/
  ],

  evolucion: [
    /\b(evolucion|evolucionado|evolucionaron|evolucionando|evoluciono|evolucionan)\b/,
    /\b(progresion|progresado|progresaron|progresivo|progresivamente)\b/,
    /\b(empeorado|empeorando|empeoraron|agravado|agravando)\b/,
    /\b(avanzado|avanzando|avanzaron|deteriorado|deteriorando)\b/,
    /\b(que paso despues|que ocurrio despues|que sucedio despues|que vino despues)\b/,
    /\b(y despues que paso|y luego que paso|y entonces que paso)\b/,
    /\b(y despues|y luego|y entonces|que vino despues)\b/,
    /\b(como siguio|como continuaron|como ha seguido|que paso a continuacion)\b/,
    /\b(que cambios)\b.*\b(con el tiempo|desde entonces|desde el inicio|desde que)\b/,
    /\b(como ha ido|como han ido|como fue cambiando|como fueron cambiando)\b/
  ],

  inicio: [
    /\b(como|de que manera)\b.*\b(comenzo|comenzaron|inicio|iniciaron|empezo|empezaron|arranco)\b/,
    /\b(inicio brusco|inicio gradual|inicio repentino|inicio insidioso)\b/,
    /\b(brusco o gradual|repentino o progresivo|subito o gradual)\b/,
    /\b(de repente|de forma gradual|de manera subita|de forma subita|poco a poco)\b/
  ],

  tiempo: [
    /\b(desde cuando|desde hace cuanto|hace cuanto|cuanto tiempo|cuando empezo|cuando inicio|cuando comenzaron|cuando aparecieron)\b/,
    /\b(cuando noto|cuando notaron|desde que edad|cuanto lleva|cuantos meses|cuantos anos)\b/
  ]
};

const seguimientos = [
  {
    id: 'ejemplo',
    patrones: [
      /\b(ejemplo|ejemplos|puede explicarme mejor|a que se refiere|como por ejemplo|me puede dar un ejemplo)\b/
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
      /\b(con que frecuencia|cada cuanto|que tan seguido|cuantas veces|le pasa seguido|le sucede seguido|que tan frecuente)\b/
    ]
  },
  {
    id: 'evolucion',
    patrones: patronesCronologia.evolucion
  },
  {
    id: 'repercusion',
    patrones: [
      /\b(afecta sus actividades|afecta su vida|afecta su independencia|le impide|le dificulta|consecuencias|repercusion|impacto en su vida)\b/,
      /\b(necesita ayuda por eso|ha dejado de hacer cosas|puede seguir haciendo sus actividades|como le afecta|en que le afecta)\b/
    ]
  }
];

function identificarTema(pregunta) {
  return temas.find((tema) =>
    coincide(pregunta, tema.patrones)
  )?.id || null;
}

function identificarSeguimiento(pregunta) {
  return seguimientos.find((tipo) =>
    coincide(pregunta, tipo.patrones)
  )?.id || null;
}

function respuestaNoDisponible(canal) {
  return canal === 'paciente'
    ? 'No sabría darle ese detalle con precisión.'
    : 'No tenemos información suficiente para precisar ese aspecto.';
}

function resultado(respuesta, tema, seguimiento = false) {
  return {
    respuesta,
    tema,
    reconocido: true,
    seguimiento
  };
}

function respuestaDe(caso, tema, canal, tipo = null) {
  if (tipo) {
    return caso.seguimientos?.[tema]?.[tipo]?.[canal] || null;
  }

  return caso.entrevista?.[tema]?.[canal] || null;
}

function responderCronologia(caso, canal, pregunta) {
  if (
    coincide(
      pregunta,
      patronesCronologia.primerasLimitaciones
    )
  ) {
    const respuesta =
      respuestaDe(caso, 'funcionalidad', canal, 'evolucion') ||
      respuestaDe(caso, 'funcionalidad', canal);

    if (respuesta) {
      return resultado(respuesta, 'funcionalidad', true);
    }
  }

  if (
    coincide(pregunta, patronesCronologia.primerSintoma)
  ) {
    const respuesta =
      respuestaDe(caso, 'cronologia', canal, 'ejemplo') ||
      respuestaDe(caso, 'cronologia', canal);

    if (respuesta) {
      return resultado(respuesta, 'cronologia', true);
    }
  }

  if (
    coincide(pregunta, patronesCronologia.evolucion)
  ) {
    const tema = identificarTema(pregunta);

    const temaEspecifico =
      tema &&
      !['motivo', 'antecedentes'].includes(tema);

    const destino = temaEspecifico
      ? tema
      : 'cronologia';

    const respuesta =
      respuestaDe(caso, destino, canal, 'evolucion') ||
      respuestaDe(caso, destino, canal) ||
      respuestaDe(caso, 'cronologia', canal, 'evolucion') ||
      respuestaDe(caso, 'cronologia', canal);

    if (respuesta) {
      return resultado(respuesta, destino, true);
    }
  }

  if (
    coincide(pregunta, patronesCronologia.inicio)
  ) {
    const respuesta =
      respuestaDe(caso, 'cronologia', canal, 'evolucion') ||
      respuestaDe(caso, 'cronologia', canal);

    if (respuesta) {
      return resultado(respuesta, 'cronologia', true);
    }
  }

  if (
    coincide(pregunta, patronesCronologia.tiempo)
  ) {
    const respuesta =
      respuestaDe(caso, 'cronologia', canal);

    if (respuesta) {
      return resultado(respuesta, 'cronologia');
    }
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
    return resultado(
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
    return resultado(
      canal === 'paciente'
        ? 'Muchas gracias, doctor. Que tenga buen día.'
        : 'Muchas gracias por atendernos.',
      'despedida'
    );
  }

  const cronologia =
    responderCronologia(caso, canal, pregunta);

  if (cronologia) {
    return cronologia;
  }

  const temaExplicito = identificarTema(pregunta);
  const tipoSeguimiento = identificarSeguimiento(pregunta);

  if (tipoSeguimiento) {
    const tema = temaExplicito || ultimoTema;

    if (tema) {
      const respuesta =
        respuestaDe(caso, tema, canal, tipoSeguimiento) ||
        respuestaDe(caso, tema, canal);

      if (respuesta) {
        return resultado(respuesta, tema, true);
      }

      return {
        respuesta: respuestaNoDisponible(canal),
        tema,
        reconocido: true,
        seguimiento: true,
        datoDisponible: false
      };
    }
  }

  if (
    ultimoTema &&
    coincide(pregunta, [
      /^(y despues|y luego|que paso despues|y eso|y entonces)$/,
      /^(desde cuando|hace cuanto|cada cuanto|que tan seguido)$/,
      /^(me puede contar mas|cuenteme mas|expliqueme mas)$/
    ])
  ) {
    const tipo =
      /cada cuanto|que tan seguido/.test(pregunta)
        ? 'frecuencia'
        : /despues|luego|entonces/.test(pregunta)
          ? 'evolucion'
          : 'ejemplo';

    const respuesta =
      respuestaDe(caso, ultimoTema, canal, tipo) ||
      respuestaDe(caso, ultimoTema, canal);

    if (respuesta) {
      return resultado(respuesta, ultimoTema, true);
    }
  }

  if (temaExplicito) {
    const respuesta =
      respuestaDe(caso, temaExplicito, canal);

    if (respuesta) {
      return resultado(respuesta, temaExplicito);
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
