
/*
 * Simulador de Consulta Geriátrica
 * Fichas clínicas estructuradas
 *
 * Datos ficticios para uso educativo.
 *
 * IMPORTANTE:
 * No mostrar el diagnóstico ni la información
 * reservada directamente al estudiante.
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
          'Comencé a notar los olvidos hace aproximadamente catorce meses.',
        familiar:
          'Los primeros cambios aparecieron hace poco más de un año y han sido graduales.'
      },

      memoria: {
        paciente:
          'A veces olvido dónde dejé mis llaves o alguna cita. Utilizo una agenda para organizarme.',
        familiar:
          'Tiene algunos olvidos recientes, pero suele recordar con pistas o al revisar sus anotaciones.'
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
          'Ella se encarga de sus medicamentos.'
      },

      antecedentes: {
        paciente:
          'Tengo hipertensión arterial y recibo tratamiento.',
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
          'Me cuesta escuchar cuando hay mucho ruido.',
        familiar:
          'Tiene cierta dificultad para escuchar cuando hablan varias personas.'
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
          'Tiene dieciséis años de escolaridad.'
      },

      sueno: {
        paciente:
          'No he notado cambios importantes en mi sueño.',
        familiar:
          'No conozco problemas importantes relacionados con el sueño.'
      },

      caidas: {
        paciente:
          'No recuerdo haber tenido caídas recientes.',
        familiar:
          'No tenemos conocimiento de caídas recientes.'
      }
    },

    dominiosPendientes: {
      atencion: null,
      funcionesEjecutivas: null,
      habilidadesVisuoespaciales: null,
      nutricion: null,
      fragilidad: null,
      redApoyo: null,
      pruebasCognitivas: null,
      exploracionFisica: null,
      estudiosComplementarios: null
    }
  }
};

export function obtenerCasoClinico(id) {
  return casosClinicos[id] || null;
}
