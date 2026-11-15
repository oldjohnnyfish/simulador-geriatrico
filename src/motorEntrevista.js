
/*
 * Simulador de Consulta Geriátrica
 * Motor gratuito de entrevistas - Versión 2
 *
 * Caso inicial: Elena Martínez
 * Funciona localmente, sin servicios externos.
 */

function normalizar(texto) {
  return String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!.,;:()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const temasElena = [
  {
    id: 'cronologia',
    prioridad: 100,
    patrones: [
      /\b(desde cuando|hace cuanto|cuanto tiempo|cuando empezo|cuando inicio|cuando comenzaron|cuando comenzaron los|cuando noto por primera vez)\b/,
      /\b(hace cuantos|desde hace cuanto)\b/,
      /\b(inicio|comenzo|empezo)\b.*\b(olvidos?|memoria|problemas?)\b/
    ],
    paciente:
      'Comencé a notar los olvidos hace aproximadamente catorce meses. Al principio eran cosas pequeñas y después los empecé a notar un poco más.',
    familiar:
      'Los primeros olvidos aparecieron hace aproximadamente catorce meses. El cambio ha sido gradual, sin un episodio de deterioro brusco.'
  },
  {
    id: 'funcionalidad',
    prioridad: 95,
    patrones: [
      /\b(actividades de la vida diaria|actividades cotidianas|actividades habituales)\b/,
      /\b(independiente|dependiente|necesita ayuda|requiere ayuda|puede hacer sola|puede hacerlo sola)\b/,
      /\b(banarse|vestirse|asearse|cocinar|preparar comida|hacer compras|hacer sus compras|limpiar la casa|quehaceres)\b/
    ],
    paciente:
      'Sigo haciendo mis actividades por mi cuenta. Me baño, me visto, cocino y hago mis compras sin necesitar ayuda.',
    familiar:
      'Ella mantiene su independencia. Se encarga de sus actividades personales y de las tareas del hogar.'
  },
  {
    id: 'finanzas',
    prioridad: 95,
    patrones: [
      /\b(dinero|finanzas|cuentas|banco|pagos|pagar|administrar|administra|economia|gastos)\b/
    ],
    paciente:
      'Yo misma manejo mi dinero y pago mis cuentas. Hasta ahora no he necesitado ayuda para hacerlo.',
    familiar:
      'Ella sigue administrando sus finanzas y no hemos tenido que asumir esa responsabilidad.'
  },
  {
    id: 'orientacion',
    prioridad: 95,
    patrones: [
      /\b(perdido|perderse|pierde en la calle|desorient|ubicarse|encontrar el camino|regresar a casa)\w*\b/,
      /\b(sabe donde esta|sabe que dia es|reconoce los lugares)\b/
    ],
    paciente:
      'No me he perdido. Puedo salir y regresar a casa sin problemas, y reconozco los lugares que frecuento.',
    familiar:
      'No hemos observado episodios en los que se pierda o se desoriente en lugares conocidos.'
  },
  {
    id: 'medicamentos',
    prioridad: 90,
    patrones: [
      /\b(medicamentos?|medicinas?|pastillas?|farmacos?|tratamientos?|dosis|receta)\b/,
      /\b(que toma|como se toma|olvida tomar)\b/
    ],
    paciente:
      'Tomo medicamento para controlar la presión arterial. Yo misma organizo mis tomas.',
    familiar:
      'Ella se encarga de sus medicamentos. Hasta ahora no hemos detectado problemas importantes con las tomas.'
  },
  {
    id: 'animo',
    prioridad: 90,
    patrones: [
      /\b(animo|tristeza|triste|depresion|deprimida|ansiedad|angustia|preocupacion|preocupada)\b/,
      /\b(disfrutar|disfruta|interes por sus actividades|ha perdido el interes|se siente sola)\b/
    ],
    paciente:
      'En general me siento bien y sigo disfrutando mis actividades. Lo que sí me preocupa son estos olvidos.',
    familiar:
      'Sigue participando en sus actividades habituales. La noto preocupada por su memoria, pero no hemos observado un cambio importante en su ánimo.'
  },
  {
    id: 'memoria',
    prioridad: 85,
    patrones: [
      /\b(memoria|olvidos?|olvidar|olvida|olvidan|recordar|recuerda|recuerdos?|extraviar|extravia)\b/,
      /\b(llaves|citas|compromisos|cosas recientes|repite preguntas|repetir preguntas)\b/
    ],
    paciente:
      'A veces olvido dónde dejé mis llaves o alguna cita. Por eso utilizo una agenda y anoto las cosas importantes.',
    familiar:
      'Tiene algunos olvidos recientes, pero suele recordar con pistas o al consultar sus anotaciones.'
  },
  {
    id: 'antecedentes',
    prioridad: 80,
    patrones: [
      /\b(antecedentes?|enfermedades?|padecimientos?|hipertension|diabetes|presion alta|presion arterial)\b/
    ],
    paciente:
      'Tengo hipertensión arterial y tomo tratamiento. No recuerdo que me hayan diagnosticado otra enfermedad importante.',
    familiar:
      'Sabemos que tiene hipertensión arterial controlada. No conozco otros antecedentes médicos relevantes.'
  },
  {
    id: 'audicion',
    prioridad: 80,
    patrones: [
      /\b(audicion|escuchar|escucha|oir|oye|oidos?|sordera|auditivos?)\b/
    ],
    paciente:
      'Cuando hay mucho ruido me cuesta un poco escuchar, pero si me hablan claramente entiendo bien.',
    familiar:
      'Hemos notado cierta dificultad para escuchar cuando hay varias personas hablando.'
  },
  {
    id: 'lenguaje',
    prioridad: 80,
    patrones: [
      /\b(lenguaje|palabras|hablar|habla|nombrar|expresarse|conversar|comprender lo que dicen)\b/
    ],
    paciente:
      'No he notado problemas importantes para hablar, encontrar palabras o entender conversaciones.',
    familiar:
      'Su lenguaje se mantiene como siempre. No hemos observado dificultades importantes para expresarse.'
  },
  {
    id: 'escolaridad',
    prioridad: 80,
    patrones: [
      /\b(escolaridad|escuela|estudios|estudio|educacion|universidad|profesion|ocupacion|jubilacion|jubilada|trabajaba)\b/
    ],
    paciente:
      'Estudié dieciséis años y actualmente estoy jubilada.',
    familiar:
      'Tiene dieciséis años de escolaridad y está jubilada.'
  },
  {
    id: 'sueno',
    prioridad: 80,
    patrones: [
      /\b(sueno|dormir|duerme|dormido|insomnio|pesadillas|descanso)\b/
    ],
    paciente:
      'No he notado cambios importantes en mi sueño, aunque no sabría decirle exactamente cuántas horas duermo cada noche.',
    familiar:
      'No conozco problemas importantes relacionados con el sueño.'
  },
  {
    id: 'caidas',
    prioridad: 80,
    patrones: [
      /\b(caidas?|caido|tropezones?|equilibrio|marcha|caminar|camina)\b/
    ],
    paciente:
      'No recuerdo haber sufrido caídas recientemente. Sigo caminando y realizando mis actividades.',
    familiar:
      'No tenemos conocimiento de caídas recientes.'
  },
  {
    id: 'motivo',
    prioridad: 70,
    patrones: [
      /\b(que le trae|motivo de consulta|por que viene|que le pasa|en que puedo ayudar|que la preocupa|cual es su problema)\b/
    ],
    paciente:
      'Vengo porque he notado algunos problemas de memoria y me preocupa que puedan empeorar. Por lo demás, sigo haciendo mis actividades.',
    familiar:
      'La acompañé porque le preocupan sus olvidos recientes. Sigue siendo independiente, pero queríamos que la valoraran.'
  }
];

temasElena.sort((a, b) => b.prioridad - a.prioridad);

const saludos = [
  /\b(hola|buenos dias|buenas tardes|buenas noches|mucho gusto)\b/
];

const despedidas = [
  /\b(adios|hasta luego|nos vemos|muchas gracias|gracias por su tiempo)\b/
];

function identificarTema(pregunta) {
  for (const tema of temasElena) {
    if (tema.patrones.some((patron) => patron.test(pregunta))) {
      return tema;
    }
  }

  return null;
}

export function responderEntrevista({
  pacienteId,
  interlocutor,
  mensaje
}) {
  const canal =
    interlocutor === 'familiar' ? 'familiar' : 'paciente';

  if (pacienteId !== 'caso-01') {
    return {
      respuesta:
        'La entrevista de este caso todavía está en preparación.',
      tema: null,
      reconocido: false
    };
  }

  const pregunta = normalizar(mensaje);

  if (!pregunta) {
    return {
      respuesta: '¿Podría repetir su pregunta?',
      tema: null,
      reconocido: false
    };
  }

  if (despedidas.some((p) => p.test(pregunta))) {
    return {
      respuesta:
        canal === 'paciente'
          ? 'Muchas gracias, doctor. Que tenga buen día.'
          : 'Muchas gracias por atendernos.',
      tema: 'despedida',
      reconocido: true
    };
  }

  const tema = identificarTema(pregunta);

  if (tema) {
    return {
      respuesta: tema[canal],
      tema: tema.id,
      reconocido: true
    };
  }

  if (saludos.some((p) => p.test(pregunta))) {
    return {
      respuesta:
        canal === 'paciente'
          ? 'Buenos días, doctor. Mucho gusto.'
          : 'Buenos días, doctor. Gracias por recibirnos.',
      tema: 'saludo',
      reconocido: true
    };
  }

  return {
    respuesta:
      canal === 'paciente'
        ? '¿Podría hacerme la pregunta de otra manera? Quiero asegurarme de entenderle.'
        : 'No estoy seguro de entender la pregunta. ¿Podría ser un poco más específico?',
    tema: null,
    reconocido: false
  };
}
