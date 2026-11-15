
/*
 * Simulador de Consulta Geriátrica
 * Motor de entrevistas clínicas - Versión 3
 *
 * Respuestas obtenidas de casosClinicos.js
 * Sin servicios externos ni API de pago.
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

/*
 * Cada tema tiene patrones de reconocimiento.
 * La prioridad resuelve preguntas que coinciden
 * con más de un tema.
 */
const temas = [
  {
    id: 'cronologia',
    prioridad: 100,
    patrones: [
      /\b(desde cuando|hace cuanto|cuanto tiempo|cuando empezo|cuando inicio|cuando comenzaron|cuando noto por primera vez)\b/,
      /\b(desde hace cuanto|hace cuantos)\b/,
      /\b(inicio|comenzo|empezo)\b.*\b(olvidos?|memoria|problemas?)\b/
    ]
  },
  {
    id: 'funcionalidad',
    prioridad: 95,
    patrones: [
      /\b(actividades de la vida diaria|actividades cotidianas|actividades habituales)\b/,
      /\b(independiente|dependiente|necesita ayuda|requiere ayuda|puede hacer sola|puede hacerlo sola)\b/,
      /\b(banarse|vestirse|asearse|cocinar|preparar comida|hacer compras|hacer sus compras|limpiar la casa|quehaceres)\b/
    ]
  },
  {
    id: 'finanzas',
    prioridad: 95,
    patrones: [
      /\b(dinero|finanzas|cuentas|banco|pagos|pagar|administrar|administra|economia|gastos)\b/
    ]
  },
  {
    id: 'orientacion',
    prioridad: 95,
    patrones: [
      /\b(perdido|perderse|desorientado|desorientada|desorientacion|ubicarse|encontrar el camino|regresar a casa)\b/,
      /\b(sabe donde esta|sabe que dia es|reconoce los lugares)\b/
    ]
  },
  {
    id: 'medicamentos',
    prioridad: 90,
    patrones: [
      /\b(medicamentos?|medicinas?|pastillas?|farmacos?|tratamientos?|dosis|receta)\b/,
      /\b(que toma|como se toma|olvida tomar)\b/
    ]
  },
  {
    id: 'animo',
    prioridad: 90,
    patrones: [
      /\b(animo|tristeza|triste|depresion|deprimida|ansiedad|angustia|preocupacion|preocupada)\b/,
      /\b(disfrutar|disfruta|interes por sus actividades|ha perdido el interes|se siente sola)\b/
    ]
  },
  {
    id: 'memoria',
    prioridad: 85,
    patrones: [
      /\b(memoria|olvidos?|olvidar|olvida|olvidan|recordar|recuerda|recuerdos?|extraviar|extravia)\b/,
      /\b(llaves|citas|compromisos|cosas recientes|repite preguntas|repetir preguntas)\b/
    ]
  },
  {
    id: 'antecedentes',
    prioridad: 80,
    patrones: [
      /\b(antecedentes?|enfermedades?|padecimientos?|hipertension|diabetes|presion alta|presion arterial)\b/
    ]
  },
  {
    id: 'audicion',
    prioridad: 80,
    patrones: [
      /\b(audicion|escuchar|escucha|oir|oye|oidos?|sordera|auditivos?)\b/
    ]
  },
  {
    id: 'lenguaje',
    prioridad: 80,
    patrones: [
      /\b(lenguaje|palabras|hablar|habla|nombrar|expresarse|conversar|comprender lo que dicen)\b/
    ]
  },
  {
    id: 'escolaridad',
    prioridad: 80,
    patrones: [
      /\b(escolaridad|escuela|estudios|estudio|educacion|universidad|profesion|ocupacion|jubilacion|jubilada|trabajaba)\b/
    ]
  },
  {
    id: 'sueno',
    prioridad: 80,
    patrones: [
      /\b(sueno|dormir|duerme|dormido|insomnio|pesadillas|descanso)\b/
    ]
  },
  {
    id: 'caidas',
    prioridad: 80,
    patrones: [
      /\b(caidas?|caido|tropezones?|equilibrio|marcha|caminar|camina)\b/
    ]
  },
  {
    id: 'motivo',
    prioridad: 70,
    patrones: [
      /\b(que le trae|motivo de consulta|por que viene|que le pasa|en que puedo ayudar|que la preocupa|cual es su problema)\b/
    ]
  }
];

temas.sort((a, b) => b.prioridad - a.prioridad);

function identificarTema(pregunta) {
  return temas.find((tema) =>
    tema.patrones.some((patron) => patron.test(pregunta))
  ) || null;
}

export function responderEntrevista({
  pacienteId,
  interlocutor,
  mensaje
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
    interlocutor === 'familiar' ? 'familiar' : 'paciente';

  const pregunta = normalizar(mensaje);

  if (!pregunta) {
    return {
      respuesta: '¿Podría repetir su pregunta?',
      tema: null,
      reconocido: false
    };
  }

  // Saludos
  if (
    /^(hola|buenos dias|buenas tardes|buenas noches)\b/.test(
      pregunta
    )
  ) {
    return {
      respuesta:
        canal === 'paciente'
          ? 'Buenos días, doctor. Mucho gusto.'
          : 'Buenos días, doctor. Gracias por recibirnos.',
      tema: 'saludo',
      reconocido: true
    };
  }

  // Despedidas
  if (
    /\b(adios|hasta luego|muchas gracias|gracias por su tiempo)\b/.test(
      pregunta
    )
  ) {
    return {
      respuesta:
        canal === 'paciente'
          ? 'Muchas gracias, doctor. Que tenga buen día.'
          : 'Muchas gracias por atendernos.',
      tema: 'despedida',
      reconocido: true
    };
  }

  // Identificar el tema clínico
  const tema = identificarTema(pregunta);

  if (tema) {
    const informacion = caso.entrevista?.[tema.id];

    if (informacion?.[canal]) {
      return {
        respuesta: informacion[canal],
        tema: tema.id,
        reconocido: true
      };
    }
  }

  // Pregunta no reconocida o sin respuesta definida
  return {
    respuesta:
      canal === 'paciente'
        ? '¿Podría preguntármelo de otra manera? Quiero asegurarme de entenderle.'
        : 'No tengo información suficiente sobre eso. ¿Podría hacer una pregunta más específica?',
    tema: null,
    reconocido: false
  };
}
