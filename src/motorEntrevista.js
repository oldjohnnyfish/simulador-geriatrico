
/*
 * Simulador de Consulta Geriátrica
 * Motor gratuito de entrevistas - Versión 5
 *
 * Incluye:
 * - Reconocimiento de preguntas clínicas
 * - Respuestas desde casosClinicos.js
 * - Preguntas de seguimiento
 * - Contexto conversacional
 *
 * No utiliza servicios externos.
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

const temas = [
  {
    id: 'cronologia',
    patrones: [
      /\b(desde cuando|hace cuanto|cuanto tiempo|cuando empezo|cuando inicio|cuando comenzaron|desde hace cuanto)\b/,
      /\b(cuando noto|cuando aparecieron|desde que edad)\b/
    ]
  },
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
      /\b(conducta|comportamiento|personalidad|desinhibicion|impulsividad|agresividad|apatia)\b/
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
  }
];

function identificarTema(pregunta) {
  return temas.find((tema) =>
    tema.patrones.some((patron) => patron.test(pregunta))
  ) || null;
}

/*
 * Respuestas de seguimiento.
 * Por ahora corresponden a Elena Martínez.
 */
const seguimientosElena = {
  memoria: {
    ejemplo: {
      paciente:
        'Por ejemplo, a veces no recuerdo dónde dejé las llaves o se me pasa alguna cita.',
      familiar:
        'Por ejemplo, en ocasiones no recuerda dónde dejó sus cosas o algún compromiso.'
    },
    solucion: {
      paciente:
        'Empecé a utilizar una agenda para anotar mis compromisos y eso me ayuda bastante.',
      familiar:
        'Utiliza una agenda y notas para organizarse. Hasta ahora le han funcionado bien.'
    }
  },

  funcionesEjecutivas: {
    ejemplo: {
      paciente:
        'Cuando tengo que organizar varias cosas nuevas, a veces necesito más tiempo para decidir por dónde empezar.',
      familiar:
        'Cuando tiene que organizar algo complicado, suele tardar un poco más, pero lo resuelve sola.'
    }
  },

  audicion: {
    ejemplo: {
      paciente:
        'Cuando estoy en una reunión y todos hablan al mismo tiempo, me cuesta seguir la conversación.',
      familiar:
        'En reuniones familiares a veces necesita que le repitamos lo que dijimos.'
    }
  },

  animo: {
    ejemplo: {
      paciente:
        'Me preocupa que los olvidos empeoren, aunque sigo disfrutando mis actividades.',
      familiar:
        'A veces expresa preocupación por su memoria, pero mantiene sus actividades habituales.'
    }
  }
};

function identificarSeguimiento(pregunta) {
  if (
    /\b(ejemplo|ejemplos|como por ejemplo|puede explicarme mejor|a que se refiere)\b/.test(
      pregunta
    )
  ) {
    return 'ejemplo';
  }

  if (
    /\b(como lo resuelve|como lo soluciona|que hace para evitarlo|como se organiza|como lo maneja)\b/.test(
      pregunta
    )
  ) {
    return 'solucion';
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

  // Seguimientos basados en el tema anterior
  const tipoSeguimiento = identificarSeguimiento(pregunta);

  if (
    pacienteId === 'caso-01' &&
    ultimoTema &&
    tipoSeguimiento
  ) {
    const respuestaSeguimiento =
      seguimientosElena[ultimoTema]?.[tipoSeguimiento]?.[canal];

    if (respuestaSeguimiento) {
      return {
        respuesta: respuestaSeguimiento,
        tema: ultimoTema,
        reconocido: true,
        seguimiento: true
      };
    }
  }

  // Pregunta clínica principal
  const tema = identificarTema(pregunta);

  if (tema) {
    const informacion = caso.entrevista?.[tema.id];

    if (informacion?.[canal]) {
      return {
        respuesta: informacion[canal],
        tema: tema.id,
        reconocido: true,
        seguimiento: false
      };
    }
  }

  // Pregunta no reconocida
  return {
    respuesta:
      canal === 'paciente'
        ? '¿Podría preguntármelo de otra manera? Quiero asegurarme de entenderle.'
        : 'No tengo información suficiente sobre eso. ¿Podría hacer una pregunta más específica?',
    tema: null,
    reconocido: false
  };
}
