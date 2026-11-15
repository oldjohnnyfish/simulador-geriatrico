
/*
 * Simulador de Consulta Geriátrica
 * Motor gratuito de entrevistas clínicas
 *
 * Versión 1: Elena Martínez
 * Sin API, sin servicios externos.
 */

const normalizar = (texto) =>
  String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!.,;:()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const temasElena = [
  {
    id: 'inicio',
    patrones: [
      /\b(que le trae|motivo de consulta|por que viene|que le pasa|en que puedo ayudar)\b/
    ],
    paciente:
      'Pues últimamente he notado que se me olvidan algunas cosas. No es que no pueda hacer mis actividades, pero sí me preocupa que mi memoria ya no sea como antes.',
    familiar:
      'Ella empezó a preocuparse porque a veces olvida citas o dónde deja las cosas. Por lo demás, sigue haciendo sus actividades habituales.'
  },
  {
    id: 'cronologia',
    patrones: [
      /\b(desde cuando|hace cuanto|cuando empezo|cuanto tiempo|cuando inicio)\b/,
      /\b(inicio|comenzo|empezo)\b.*\b(olvido|memoria|problema)\b/
    ],
    paciente:
      'Yo diría que desde hace unos catorce meses. Primero eran pequeños olvidos y después empecé a notarlos con más frecuencia.',
    familiar:
      'Hace poco más de un año comenzó a comentar esos olvidos. El cambio ha sido gradual, sin un deterioro brusco.'
  },
  {
    id: 'memoria',
    patrones: [
      /\b(memoria|olvid|record|recuerd|extravi|perdido|pierde|objetos|citas)\w*\b/
    ],
    paciente:
      'A veces olvido dónde dejé las llaves o alguna cita. Cuando anoto las cosas en mi agenda me organizo mucho mejor.',
    familiar:
      'Tiene algunos olvidos de cosas recientes, pero suele acordarse con pistas o cuando revisa sus notas.'
  },
  {
    id: 'funcionalidad',
    patrones: [
      /\b(actividades|independiente|dependiente|vida diaria|aseo|banar|vestir|comer sola|cocinar|compras|quehaceres)\b/
    ],
    paciente:
      'Me baño, me visto, cocino y hago mis compras sin ayuda. Todavía llevo mi casa como siempre.',
    familiar:
      'Sigue siendo independiente para sus actividades básicas y para organizar su hogar.'
  },
  {
    id: 'finanzas',
    patrones: [
      /\b(dinero|finanzas|cuentas|banco|pagos|administrar|manejar dinero)\b/
    ],
    paciente:
      'Yo sigo pagando mis cuentas y administrando mi dinero. No he necesitado que alguien lo haga por mí.',
    familiar:
      'Hasta ahora no hemos tenido que intervenir en sus finanzas.'
  },
  {
    id: 'medicamentos',
    patrones: [
      /\b(medicament|medicina|pastilla|tratamiento|farmaco|toma algo)\w*\b/
    ],
    paciente:
      'Tomo tratamiento para la presión arterial. Yo misma organizo mis medicamentos y procuro no saltarme las dosis.',
    familiar:
      'Ella sigue encargándose de sus medicamentos. No hemos detectado problemas importantes con eso.'
  },
  {
    id: 'antecedentes',
    patrones: [
      /\b(enfermedad|antecedente|hipertension|diabetes|presion arterial|padecimiento)\w*\b/
    ],
    paciente:
      'Tengo presión alta, pero está controlada con mi tratamiento. No recuerdo que me hayan diagnosticado otra enfermedad importante.',
    familiar:
      'Sabemos que tiene hipertensión controlada. No tengo conocimiento de otros antecedentes relevantes.'
  },
  {
    id: 'audicion',
    patrones: [
      /\b(oido|oir|escuchar|audicion|sordera|aparato auditivo)\b/
    ],
    paciente:
      'Últimamente me cuesta un poco escuchar cuando hay mucho ruido. Si me hablan claramente, entiendo bien.',
    familiar:
      'Tiene cierta dificultad para escuchar, especialmente cuando hay varias personas hablando.'
  },
  {
    id: 'animo',
    patrones: [
      /\b(animo|triste|deprim|ansiedad|preocup|angust|emocion|sentir)\w*\b/
    ],
    paciente:
      'En general me siento bien, aunque estos olvidos sí me preocupan. Me da miedo que con el tiempo empeoren.',
    familiar:
      'La noto preocupada por su memoria, pero continúa participando en sus actividades habituales.'
  },
  {
    id: 'orientacion',
    patrones: [
      /\b(orientad|perdid|desorient|camino|ubicacion|lugar|fecha)\w*\b/
    ],
    paciente:
      'No, no me he perdido. Sé llegar a los lugares que frecuento y normalmente sé qué día es.',
    familiar:
      'No hemos observado que se pierda en lugares conocidos.'
  },
  {
    id: 'lenguaje',
    patrones: [
      /\b(palabras|lenguaje|hablar|nombrar|expresarse|conversacion)\b/
    ],
    paciente:
      'No he notado problemas importantes para hablar o entender lo que me dicen.',
    familiar:
      'Conversa con normalidad. No hemos observado cambios importantes en su lenguaje.'
  },
  {
    id: 'escolaridad',
    patrones: [
      /\b(estudio|estudios|escuela|escolaridad|educacion|universidad|profesion|trabajo)\w*\b/
    ],
    paciente:
      'Estudié dieciséis años en total. Ahora estoy jubilada.',
    familiar:
      'Tiene dieciséis años de escolaridad y actualmente está jubilada.'
  },
  {
    id: 'sueno',
    patrones: [
      /\b(sueno|dormir|duerme|insomnio|pesadilla)\w*\b/
    ],
    paciente:
      'No he notado cambios importantes en mi sueño, aunque no sabría decirle cuántas horas duermo cada noche.',
    familiar:
      'No conozco problemas importantes de sueño, pero habría que preguntarle a ella.'
  },
  {
    id: 'caidas',
    patrones: [
      /\b(caida|caido|tropiez|equilibrio|marcha|caminar)\w*\b/
    ],
    paciente:
      'No recuerdo haber tenido alguna caída reciente. Sigo caminando y haciendo mis actividades.',
    familiar:
      'No tengo conocimiento de caídas recientes.'
  }
];

const respuestasGenerales = {
  paciente: [
    '¿Podría preguntármelo de otra manera? Quiero asegurarme de entenderle bien.',
    'No estoy muy segura de qué información necesita. ¿Me lo puede explicar un poco más?',
    'Sobre eso no sabría decirle con certeza. ¿Podría hacerme una pregunta más específica?'
  ],
  familiar: [
    'No tengo información suficiente sobre eso. ¿Podría hacerme una pregunta más concreta?',
    'No sabría responderle con seguridad. ¿Qué aspecto le interesa conocer?',
    'Quizá sería mejor precisar la pregunta para poder ayudarle.'
  ]
};

const contadorRespuestas = {};

export function responderEntrevista({
  pacienteId,
  interlocutor,
  mensaje
}) {
  const canal = interlocutor === 'familiar'
    ? 'familiar'
    : 'paciente';

  if (pacienteId !== 'caso-01') {
    return {
      respuesta:
        'Este caso todavía está en preparación. Pronto estará disponible su entrevista clínica.',
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

  for (const tema of temasElena) {
    if (tema.patrones.some((patron) => patron.test(pregunta))) {
      return {
        respuesta: tema[canal],
        tema: tema.id,
        reconocido: true
      };
    }
  }

  const clave = `${pacienteId}-${canal}`;
  const indice = contadorRespuestas[clave] || 0;
  const opciones = respuestasGenerales[canal];

  contadorRespuestas[clave] = indice + 1;

  return {
    respuesta: opciones[indice % opciones.length],
    tema: null,
    reconocido: false
  };
}
