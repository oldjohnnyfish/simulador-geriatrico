
import { obtenerEvaluacionClinica } from './evaluacionesClinicas.js';

/*
 * Motor de evaluación clínica V5
 * Evaluación local, sin servicios externos.
 *
 * Corrección V5:
 * Reconocimiento de "El MoCA es de 24/30".
 */

function normalizar(texto) {
  return String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s/.,;:!?-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function dividirOraciones(texto) {
  return normalizar(texto)
    .split(/[.;:!?\n]+/)
    .map((oracion) => oracion.trim())
    .filter(Boolean);
}

function coincide(texto, patrones) {
  return patrones.some((patron) => patron.test(texto));
}

const reglasClinicas = {
  inicio_evolucion: {
    positivos: [
      /\b(inicio|comienzo|aparicion)\s+(gradual|insidios[oa]|progresiv[oa])\b/,
      /\b(gradual|insidios[oa]|progresiv[oa])\b/,
      /\b(14|catorce)\s+meses\b/,
      /\bmas de un ano\b/,
      /\b(desde hace|evolucion de)\s+\d+\s+meses\b/
    ],
    contradictorios: [
      /\b(inicio|comienzo|aparicion)\s+(brusc[oa]|subit[oa]|agud[oa])\b/,
      /\b(no|sin)\s+(progresion|evolucion|cambios cognitivos)\b/
    ]
  },

  alteracion_cognitiva: {
    positivos: [
      /\b(problemas|dificultades|fallas|alteraciones|deterioro)\s+(de|en|con|la|las)?\s*(memoria|recuerdo|evocacion|cognicion)\b/,
      /\b(olvidos|olvidadiz[oa])\b/,
      /\b(dificultades|alteraciones)\s+(ejecutivas|visuoespaciales)\b/,
      /\b(evocacion diferida|recuerdo diferido)\b/,
      /\b(deterioro|alteracion)\s+cognitiv[oa]\b/
    ],
    contradictorios: [
      /\b(no|sin)\s+(presenta|tiene|existen|hay)?\s*(problemas|dificultades|alteraciones|deterioro)\s+(de|en)?\s*(memoria|cognicion)\b/,
      /\b(memoria|cognicion)\s+(normal|intacta|sin alteraciones)\b/,
      /\bno hay deterioro cognitivo\b/
    ]
  },

  funcionalidad: {
    positivos: [
      /\b(independencia|autonomia)\s+(conservada|preservada|mantenida)\b/,
      /\b(funcionalidad|funcion)\s+(conservada|preservada|mantenida)\b/,
      /\b(independiente|autonoma|autonomo)\s+(para|en|con)\b/,
      /\b(conserva|mantiene|preserva)\s+(su\s+)?(independencia|autonomia|funcionalidad)\b/,
      /\b(sin|no presenta)\s+(perdida de independencia|dependencia funcional|deterioro funcional)\b/,
      /\bno\s+(ha\s+)?perdido\s+(su\s+)?(independencia|autonomia|funcionalidad)\b/,
      /\bno\s+(ha\s+)?perdido\s+la\s+capacidad\s+de\s+(realizar|hacer)\b/,
      /\b(no depende|no necesita ayuda)\s+(de terceros\s+)?(para|en)\b/,
      /\b(actividades de la vida diaria|actividades instrumentales)\s+(conservadas|preservadas|independientes)\b/
    ],
    contradictorios: [
      /\b(?<!no\s)(presenta|tiene|existe|hay)\s+(dependencia funcional|perdida de independencia|deterioro funcional)\b/,
      /\b(?<!sin\s)(dependencia funcional|perdida de independencia|deterioro funcional)\s+(importante|significativ[oa]|establecid[oa])\b/,
      /\bno conserva\s+(su\s+)?(independencia|autonomia|funcionalidad)\b/,
      /\b(?<!no\s)(ha perdido|perdio)\s+(su\s+)?(independencia|autonomia|funcionalidad)\b/,
      /\b(dependiente|requiere ayuda)\s+(para|en)\s+(sus\s+)?actividades\b/
    ]
  },

  informante: {
    positivos: [
      /\b(corroborad[oa]s?|confirmad[oa]s?|referid[oa]s?|reportad[oa]s?)\s+(por|mediante)\s+(su\s+|un\s+|una\s+)?(hija|hijo|familiar|informante)\b/,
      /\b(su\s+)?(hija|hijo|familiar|informante)\s+(confirma|corrobora|refiere|reporta|describe|nota|observa)\b/,
      /\b(informacion|testimonio|reporte)\s+(de|del|por)\s+(la\s+|el\s+|su\s+)?(hija|hijo|familiar|informante)\b/,
      /\b(segun|de acuerdo con)\s+(su\s+|la\s+|el\s+)?(hija|hijo|familiar|informante)\b/
    ],
    contradictorios: [
      /\b(familiar|hija|hijo|informante)\s+(niega|descarta)\s+(los\s+)?(cambios|problemas|sintomas)\s+cognitivos\b/,
      /\b(no hay|sin)\s+(informante|corroboracion familiar)\b/
    ]
  },

  evaluacion_cognitiva: {
    positivos: [
      /\b(moca|montreal cognitive assessment)\s*(es\s+de|es|de|:|=|con|fue|obtuvo)?\s*24\s*(\/|de)\s*30\b/,
      /\b24\s*(\/|de)\s*30\s*(en|de|del)\s*(el\s+)?moca\b/,
      /\b(moca|prueba cognitiva|tamizaje cognitivo)\b.{0,75}\b(alterad[oa]|baj[oa]|dificultades|deficit|evocacion|ejecutiv[oa])\b/,
      /\b(evocacion diferida|recuerdo diferido)\s+(alterad[oa]|disminuid[oa]|afectad[oa])\b/
    ],
    contradictorios: [
      /\b(moca|prueba cognitiva|tamizaje cognitivo)\s+(normal|intacto|sin alteraciones)\b/,
      /\bmoca\s*(es\s+de|es|de|:|=|con|fue)?\s*30\s*(\/|de)\s*30\b/,
      /\b(no hay|sin)\s+(alteraciones|dificultades)\s+(en\s+)?(el\s+)?moca\b/
    ]
  },

  diagnostico_diferencial: {
    positivos: [
      /\b(considerar|descartar|evaluar|investigar|explorar)\b.{0,65}\b(delirium|depresion|hipoacusia|audicion|b12|tsh|causas reversibles)\b/,
      /\b(diagnosticos diferenciales|diagnostico diferencial)\b/,
      /\b(factores|causas)\s+(modificables|reversibles)\b/,
      /\b(hipoacusia|deficit auditivo|alteracion auditiva)\s+(puede|podria|contribuye|influir)\b/,
      /\b(descartar|evaluar)\s+(hipotiroidismo|deficiencia de vitamina b12|depresion)\b/
    ],
    contradictorios: [
      /\b(delirium|depresion|hipotiroidismo|deficiencia de vitamina b12)\s+(confirmad[oa]|demostrad[oa])\b/,
      /\b(no es necesario|no requiere)\s+(descartar|considerar|evaluar)\s+(otras causas|diagnosticos diferenciales)\b/
    ]
  }
};

function evaluarCriterio(texto, criterio) {
  const reglas = reglasClinicas[criterio.id];

  if (!reglas) {
    return {
      id: criterio.id,
      nombre: criterio.nombre,
      puntosMaximos: criterio.puntos,
      puntosObtenidos: 0,
      logrado: false,
      coincidencias: [],
      retroalimentacion: criterio.retroalimentacion
    };
  }

  const oraciones = dividirOraciones(texto);

  const tieneEvidencia = oraciones.some((oracion) =>
    coincide(oracion, reglas.positivos)
  );

  const tieneContradiccion = oraciones.some((oracion) =>
    coincide(oracion, reglas.contradictorios)
  );

  const logrado = tieneEvidencia && !tieneContradiccion;

  return {
    id: criterio.id,
    nombre: criterio.nombre,
    puntosMaximos: criterio.puntos,
    puntosObtenidos: logrado ? criterio.puntos : 0,
    logrado,
    coincidencias: logrado
      ? ['Concepto clínico identificado']
      : [],
    retroalimentacion: criterio.retroalimentacion
  };
}

export function evaluarCaso({
  pacienteId,
  diagnosticoSindromatico,
  diagnosticoEtiologico,
  justificacionClinica
}) {
  const evaluacion = obtenerEvaluacionClinica(pacienteId);

  if (!evaluacion) {
    return {
      error: 'No existe una evaluación definida para este caso.'
    };
  }

  const sindromatico = evaluacion.diagnosticoSindromatico;
  const etiologico = evaluacion.diagnosticoEtiologico;
  const justificacion = evaluacion.justificacionClinica;

  const sindromaticoCorrecto =
    diagnosticoSindromatico === sindromatico.respuestaCorrecta;

  const etiologicoCorrecto =
    diagnosticoEtiologico === etiologico.respuestaCorrecta;

  const puntosSindromatico = sindromaticoCorrecto
    ? sindromatico.puntuacionMaxima
    : 0;

  const puntosEtiologico = etiologicoCorrecto
    ? etiologico.puntuacionMaxima
    : 0;

  const criterios = justificacion.criterios.map((criterio) =>
    evaluarCriterio(justificacionClinica, criterio)
  );

  const puntosJustificacion = criterios.reduce(
    (total, criterio) => total + criterio.puntosObtenidos,
    0
  );

  const puntuacionTotal =
    puntosSindromatico +
    puntosEtiologico +
    puntosJustificacion;

  const puntuacionMaxima =
    sindromatico.puntuacionMaxima +
    etiologico.puntuacionMaxima +
    justificacion.puntuacionMaxima;

  return {
    pacienteId,
    puntuacionTotal,
    puntuacionMaxima,

    sindromatico: {
      correcto: sindromaticoCorrecto,
      puntosObtenidos: puntosSindromatico,
      puntosMaximos: sindromatico.puntuacionMaxima,
      respuestaCorrecta: sindromatico.respuestaCorrecta,
      explicacion: sindromatico.explicacion
    },

    etiologico: {
      correcto: etiologicoCorrecto,
      puntosObtenidos: puntosEtiologico,
      puntosMaximos: etiologico.puntuacionMaxima,
      respuestaCorrecta: etiologico.respuestaCorrecta,
      explicacion: etiologico.explicacion
    },

    justificacion: {
      puntosObtenidos: puntosJustificacion,
      puntosMaximos: justificacion.puntuacionMaxima,
      criterios,
      advertencia:
        'La calificación automática es orientativa. Las reglas identifican patrones clínicos, pero no sustituyen la valoración docente.'
    },

    retroalimentacionFinal:
      evaluacion.retroalimentacionFinal
  };
}
