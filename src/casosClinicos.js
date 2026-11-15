
/*
 * Simulador de Consulta Geriátrica
 * Casos clínicos ficticios - Versión 2
 *
 * Datos para simulación educativa.
 * La información clínica debe revelarse
 * progresivamente durante la entrevista.
 */

export const casosClinicos = {
  'caso-01': {
    id: 'caso-01',

    identidad: {
      nombre: 'Elena Martínez',
      edad: 72,
      escolaridad: 16,
      ocupacion: 'Jubilada'
    },

    presentacion:
      'Mujer de 72 años que acude por preocupación relacionada con su memoria.',

    informacionReservada: {
      diagnostico: 'Deterioro cognitivo leve',
      evolucionMeses: 14,
      curso: 'Gradual',
      independenciaFuncional: true
    },

    entrevista: {
      motivo: {
        paciente:
          'He notado algunos olvidos y me preocupa que puedan empeorar.',
        familiar:
          'La acompañé porque últimamente está preocupada por su memoria.'
      },

      cronologia: {
        paciente:
          'Comencé a notar los olvidos hace aproximadamente catorce meses. No fue algo repentino.',
        familiar:
          'Los primeros cambios aparecieron hace poco más de un año y han sido graduales.'
      },

      memoria: {
        paciente:
          'A veces olvido dónde dejé mis llaves o alguna cita. Utilizo una agenda para organizarme.',
        familiar:
          'Tiene algunos olvidos recientes, pero suele recordar con pistas o al revisar sus anotaciones.'
      },

      atencion: {
        paciente:
          'Puedo seguir una conversación y leer sin mayores dificultades. A veces me distraigo si hay mucho ruido.',
        familiar:
          'No he notado dificultades importantes para mantener la atención.'
      },

      funcionesEjecutivas: {
        paciente:
          'Las tareas complicadas me toman un poco más de tiempo, pero todavía puedo organizar mis actividades.',
        familiar:
          'En ocasiones tarda más en planificar algo nuevo, aunque finalmente consigue hacerlo por su cuenta.'
      },

      visuoespacial: {
        paciente:
          'No he tenido problemas para reconocer lugares ni para encontrar el camino a casa.',
        familiar:
          'No hemos observado dificultades para orientarse en espacios conocidos.'
      },

      funcionalidad: {
        paciente:
          'Me baño, me visto, cocino y hago mis compras sin ayuda.',
        familiar:
          'Sigue siendo independiente para sus actividades habituales.'
      },

      finanzas: {
        paciente:
          'Yo misma administro mi dinero y pago mis cuentas.',
        familiar:
          'No hemos tenido que asumir el manejo de sus finanzas.'
      },

      medicamentos: {
        paciente:
          'Tomo medicamento para controlar mi presión arterial y yo misma organizo mis tomas.',
        familiar:
          'Ella se encarga de sus medicamentos y no hemos detectado errores importantes.'
      },

      antecedentes: {
        paciente:
          'Tengo hipertensión arterial y recibo tratamiento. No recuerdo otros problemas médicos importantes.',
        familiar:
          'Sabemos que tiene hipertensión arterial controlada.'
      },

      orientacion: {
        paciente:
          'No me he perdido. Reconozco los lugares que frecuento.',
        familiar:
          'No hemos observado que se desoriente en lugares conocidos.'
      },

      animo: {
        paciente:
          'En general me siento bien y disfruto mis actividades, aunque los olvidos me preocupan.',
        familiar:
          'La noto preocupada por su memoria, pero sigue participando en sus actividades.'
      },

      audicion: {
        paciente:
          'Me cuesta escuchar cuando hay mucho ruido, sobre todo si hablan varias personas.',
        familiar:
          'Tiene cierta dificultad para escuchar en ambientes ruidosos.'
      },

      lenguaje: {
        paciente:
          'No he notado dificultades importantes para hablar o entender conversaciones.',
        familiar:
          'No hemos observado cambios importantes en su lenguaje.'
      },

      escolaridad: {
        paciente:
          'Estudié dieciséis años y actualmente estoy jubilada.',
        familiar:
          'Tiene dieciséis años de escolaridad y está jubilada.'
      },

      sueno: {
        paciente:
          'Duermo alrededor de siete horas. En ocasiones despierto durante la noche, pero generalmente descanso bien.',
        familiar:
          'No conocemos alteraciones importantes del sueño.'
      },

      caidas: {
        paciente:
          'No he tenido caídas durante el último año.',
        familiar:
          'No tenemos conocimiento de caídas recientes.'
      },

      nutricion: {
        paciente:
          'Como tres veces al día y no he notado que haya bajado de peso sin proponérmelo.',
        familiar:
          'Mantiene su alimentación habitual y no hemos observado pérdida de peso importante.'
      },

      movilidad: {
        paciente:
          'Salgo a caminar varias veces por semana. No necesito bastón ni andadera.',
        familiar:
          'Camina de manera independiente y sigue saliendo de casa.'
      },

      fragilidad: {
        paciente:
          'Todavía puedo realizar mis actividades y no siento que haya perdido fuerza de manera importante.',
        familiar:
          'No hemos observado una disminución importante de su actividad física o su fuerza.'
      },

      redApoyo: {
        paciente:
          'Vivo sola, pero mi hija me visita con frecuencia y hablamos casi todos los días.',
        familiar:
          'Soy su hija. La visito varias veces por semana, aunque ella sigue siendo independiente.'
      },

      sintomasDepresivos: {
        paciente:
          'No me siento triste la mayor parte del tiempo. Todavía disfruto mis actividades.',
        familiar:
          'No hemos observado tristeza persistente ni abandono de sus actividades.'
      },

      alucinaciones: {
        paciente:
          'No, nunca he visto ni escuchado cosas que otras personas no puedan percibir.',
        familiar:
          'No hemos observado alucinaciones.'
      },

      fluctuaciones: {
        paciente:
          'No he tenido episodios en los que esté muy confundida y después vuelva a estar bien.',
        familiar:
          'No hemos observado cambios marcados de alerta o confusión durante el día.'
      },

      conducta: {
        paciente:
          'No creo que mi manera de comportarme haya cambiado.',
        familiar:
          'Su personalidad y su comportamiento se mantienen prácticamente iguales.'
      },

      antecedentesFamiliares: {
        paciente:
          'Mi madre tuvo problemas de memoria cuando era muy mayor, pero no sé qué diagnóstico tenía.',
        familiar:
          'La abuela materna tuvo dificultades de memoria a edad avanzada, sin un diagnóstico confirmado.'
      }
    },

    exploracion: {
      signosVitales: {
        presionArterial: '132/78 mmHg',
        frecuenciaCardiaca: '72 lpm',
        temperatura: '36.5 °C',
        saturacionOxigeno: '97%'
      },

      neurologica:
        'Sin focalización neurológica evidente en la exploración clínica.',

      marcha:
        'Marcha independiente, sin alteraciones evidentes.',

      pruebasCognitivas: {
        moca: {
          puntuacion: 24,
          maximo: 30,
          observacion:
            'Dificultades predominantes en evocación diferida y algunas tareas ejecutivas.'
        }
      }
    },

    estudios: {
      biometriaHematica:
        'Sin alteraciones clínicamente relevantes.',
      tsh: '2.1 mUI/L',
      vitaminaB12: '420 pg/mL',
      resonancia:
        'Cambios leves de volumen cerebral asociados con la edad, sin lesiones focales relevantes.'
    },

    objetivosEducativos: [
      'Caracterizar el inicio y la evolución de los síntomas cognitivos.',
      'Explorar diferentes dominios cognitivos.',
      'Distinguir síntomas cognitivos de pérdida de independencia funcional.',
      'Obtener información de un familiar o informante.',
      'Identificar factores que pueden modificar el rendimiento cognitivo.',
      'Interpretar pruebas cognitivas considerando edad y escolaridad.',
      'Formular un diagnóstico diferencial razonado.'
    ]
  }
};

export function obtenerCasoClinico(id) {
  return casosClinicos[id] || null;
}
