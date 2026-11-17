
import { obtenerEvaluacionClinica } from './evaluacionesClinicas.js';

/*
 * Simulador de Consulta Geriátrica
 * Motor de evaluación clínica - Versión 6
 *
 * Caso 01: Elena Martínez
 * Caso 02: María Hernández
 *
 * Evaluación local sin servicios externos.
 * Reglas específicas por caso.
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

function reglas(positivos, contradictorios = []) {
  return { positivos, contradictorios };
}

/*
 * REGLAS COMPARTIDAS
 */

const reglasCompartidas = {
  informante: reglas(
    [
      /\b(corroborad[oa]s?|confirmad[oa]s?|referid[oa]s?|reportad[oa]s?)\s+(por|mediante)\s+(su\s+|un\s+|una\s+)?(hija|hijo|familiar|informante)\b/,
      /\b(su\s+)?(hija|hijo|familiar|informante)\s+(confirma|corrobora|refiere|reporta|describe|nota|observa)\b/,
      /\b(informacion|testimonio|reporte)\s+(de|del|por)\s+(la\s+|el\s+|su\s+)?(hija|hijo|familiar|informante)\b/,
      /\b(segun|de acuerdo con)\s+(su\s+|la\s+|el\s+)?(hija|hijo|familiar|informante)\b/,
      /\b(heteroanamnesis|informacion corroborada por la hija)\b/
    ],
    [
      /\b(familiar|hija|hijo|informante)\s+(niega|descarta)\s+(los\s+)?(cambios|problemas|sintomas)\s+cognitivos\b/,
      /\b(no hay|sin)\s+(informante|corroboracion familiar)\b/
    ]
  )
};

/*
 * CASO 01: ELENA MARTÍNEZ
 *
 * Se conservan las reglas clínicas de V5.
 */

const reglasElena = {
  inicio_evolucion: reglas(
    [
      /\b(inicio|comienzo|aparicion)\s+(gradual|insidios[oa]|progresiv[oa])\b/,
      /\b(gradual|insidios[oa]|progresiv[oa])\b/,
      /\b(14|catorce)\s+meses\b/,
      /\bmas de un ano\b/,
      /\b(desde hace|evolucion de)\s+\d+\s+meses\b/
    ],
    [
      /\b(inicio|comienzo|aparicion)\s+(brusc[oa]|subit[oa]|agud[oa])\b/,
      /\b(no|sin)\s+(progresion|evolucion|cambios cognitivos)\b/
    ]
  ),

  alteracion_cognitiva: reglas(
    [
      /\b(problemas|dificultades|fallas|alteraciones|deterioro)\s+(de|en|con|la|las)?\s*(memoria|recuerdo|evocacion|cognicion)\b/,
      /\b(olvidos|olvidadiz[oa])\b/,
      /\b(dificultades|alteraciones)\s+(ejecutivas|visuoespaciales)\b/,
      /\b(evocacion diferida|recuerdo diferido)\b/,
      /\b(deterioro|alteracion)\s+cognitiv[oa]\b/
    ],
    [
      /\b(no|sin)\s+(presenta|tiene|existen|hay)?\s*(problemas|dificultades|alteraciones|deterioro)\s+(de|en)?\s*(memoria|cognicion)\b/,
      /\b(memoria|cognicion)\s+(normal|intacta|sin alteraciones)\b/,
      /\bno hay deterioro cognitivo\b/
    ]
  ),

  funcionalidad: reglas(
    [
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
    [
      /\b(?<!no\s)(presenta|tiene|existe|hay)\s+(dependencia funcional|perdida de independencia|deterioro funcional)\b/,
      /\b(?<!sin\s)(dependencia funcional|perdida de independencia|deterioro funcional)\s+(importante|significativ[oa]|establecid[oa])\b/,
      /\bno conserva\s+(su\s+)?(independencia|autonomia|funcionalidad)\b/,
      /\b(?<!no\s)(ha perdido|perdio)\s+(su\s+)?(independencia|autonomia|funcionalidad)\b/,
      /\b(dependiente|requiere ayuda)\s+(para|en)\s+(sus\s+)?actividades\b/
    ]
  ),

  informante: reglasCompartidas.informante,

  evaluacion_cognitiva: reglas(
    [
      /\b(moca|montreal cognitive assessment)\s*(es\s+de|es|de|:|=|con|fue|obtuvo)?\s*24\s*(\/|de)\s*30\b/,
      /\b24\s*(\/|de)\s*30\s*(en|de|del)\s*(el\s+)?moca\b/,
      /\b(moca|prueba cognitiva|tamizaje cognitivo)\b.{0,75}\b(alterad[oa]|baj[oa]|dificultades|deficit|evocacion|ejecutiv[oa])\b/,
      /\b(evocacion diferida|recuerdo diferido)\s+(alterad[oa]|disminuid[oa]|afectad[oa])\b/
    ],
    [
      /\b(moca|prueba cognitiva|tamizaje cognitivo)\s+(normal|intacto|sin alteraciones)\b/,
      /\bmoca\s*(es\s+de|es|de|:|=|con|fue)?\s*30\s*(\/|de)\s*30\b/,
      /\b(no hay|sin)\s+(alteraciones|dificultades)\s+(en\s+)?(el\s+)?moca\b/
    ]
  ),

  diagnostico_diferencial: reglas(
    [
      /\b(considerar|descartar|evaluar|investigar|explorar)\b.{0,65}\b(delirium|depresion|hipoacusia|audicion|b12|tsh|causas reversibles)\b/,
      /\b(diagnosticos diferenciales|diagnostico diferencial)\b/,
      /\b(factores|causas)\s+(modificables|reversibles)\b/,
      /\b(hipoacusia|deficit auditivo|alteracion auditiva)\s+(puede|podria|contribuye|influir)\b/,
      /\b(descartar|evaluar)\s+(hipotiroidismo|deficiencia de vitamina b12|depresion)\b/
    ],
    [
      /\b(delirium|depresion|hipotiroidismo|deficiencia de vitamina b12)\s+(confirmad[oa]|demostrad[oa])\b/,
      /\b(no es necesario|no requiere)\s+(descartar|considerar|evaluar)\s+(otras causas|diagnosticos diferenciales)\b/
    ]
  )
};

/*
 * CASO 02: MARÍA HERNÁNDEZ
 *
 * Trastorno neurocognitivo mayor.
 * Enfermedad de Alzheimer probable clínicamente.
 */

const reglasMaria = {
  inicio_evolucion: reglas(
    [
      /\b(inicio|comienzo|aparicion)\s+(gradual|insidios[oa]|lent[oa]|progresiv[oa])\b/,
      /\b(gradual|insidios[oa]|progresiv[oa])\b/,
      /\b(poco a poco|de manera lenta|lentamente)\b/,
      /\b(3|tres)\s+anos\b/,
      /\b(desde hace|evolucion de)\s+(3|tres)\s+anos\b/,
      /\b(empeoramiento|deterioro)\s+(progresivo|gradual)\b/
    ],
    [
      /\b(inicio|comienzo|aparicion)\s+(brusc[oa]|subit[oa]|agud[oa])\b/,
      /\b(inicio repentino|comenzo de repente|empezo de golpe)\b/,
      /\b(no|sin)\s+(progresion|evolucion|cambios cognitivos)\b/
    ]
  ),

  alteracion_cognitiva: reglas(
    [
      /\b(memoria episodica|memoria reciente)\b/,
      /\b(problemas|dificultades|fallas|alteraciones|deterioro)\s+(de|en|con|la|las)?\s*(memoria|recuerdo|evocacion)\b/,
      /\b(olvidos|olvidadiz[oa])\b/,
      /\b(repite|repetia|repeticion de)\s+(las\s+)?preguntas\b/,
      /\b(olvida|olvidaba|olvido)\s+(las\s+)?conversaciones\b/,
      /\b(recuerdo diferido|evocacion diferida)\b/,
      /\b(deterioro|alteracion)\s+cognitiv[oa]\b/
    ],
    [
      /\b(memoria|cognicion)\s+(normal|intacta|sin alteraciones)\b/,
      /\b(no hay|sin)\s+(deterioro cognitivo|problemas de memoria|alteraciones cognitivas)\b/,
      /\b(no|sin)\s+(presenta|tiene)?\s*(olvidos|alteraciones de memoria)\b/
    ]
  ),

  funcionalidad: reglas(
    [
      /\b(perdida|perdio|ha perdido)\s+(de\s+|su\s+)?(independencia|autonomia)\b/,
      /\b(deterioro|declive|compromiso|afectacion)\s+funcional\b/,
      /\b(dependencia|supervision|ayuda)\s+(en|para|con|de)\s+(las\s+|sus\s+)?(actividades|aivd|medicamentos|finanzas|pagos)\b/,
      /\b(actividades instrumentales|aivd)\b.{0,70}\b(afectadas|alteradas|deterioradas|dependencia|ayuda|supervision|dificultad)\b/,
      /\b(necesita|requiere)\s+(ayuda|supervision|apoyo)\b/,
      /\b(errores|problemas|dificultades)\s+(con|en|para)\s+(los\s+|las\s+)?(pagos|finanzas|medicamentos|medicinas)\b/,
      /\b(ya no puede|dejo de poder)\s+(manejar|administrar|organizar)\b/
    ],
    [
      /\b(independencia|autonomia|funcionalidad)\s+(completamente\s+)?(conservada|preservada|intacta)\b/,
      /\b(conserva|mantiene)\s+(toda\s+)?(su\s+)?(independencia|autonomia|funcionalidad)\b/,
      /\b(sin|no presenta)\s+(dependencia funcional|deterioro funcional|perdida de independencia)\b/,
      /\b(no necesita|sin necesidad de)\s+(ayuda|supervision)\b/,
      /\b(actividades instrumentales|aivd)\s+(conservadas|independientes|intactas)\b/
    ]
  ),

  informante: reglasCompartidas.informante,

  evaluacion_cognitiva: reglas(
    [
      /\b(moca|montreal cognitive assessment)\s*(es\s+de|es|de|:|=|con|fue|obtuvo)?\s*16\s*(\/|de)\s*30\b/,
      /\b16\s*(\/|de)\s*30\s*(en|de|del)\s*(el\s+)?moca\b/,
      /\b(moca|prueba cognitiva|tamizaje cognitivo)\b.{0,75}\b(alterad[oa]|baj[oa]|deterioro|deficit|afectacion)\b/,
      /\b(alteracion|deterioro)\s+cognitiv[oa]\s+(objetiv[oa]|significativ[oa])\b/
    ],
    [
      /\b(moca|prueba cognitiva|tamizaje cognitivo)\s+(normal|intacto|sin alteraciones)\b/,
      /\bmoca\s*(es\s+de|es|de|:|=|con|fue)?\s*30\s*(\/|de)\s*30\b/,
      /\b(moca|montreal cognitive assessment)\s*(es\s+de|es|de|:|=|con|fue|obtuvo)?\s*24\s*(\/|de)\s*30\b/,
      /\b(no hay|sin)\s+(alteraciones|dificultades)\s+(en\s+)?(el\s+)?moca\b/
    ]
  ),

  diagnostico_diferencial: reglas(
    [
      /\b(diagnosticos diferenciales|diagnostico diferencial)\b/,
      /\b(considerar|descartar|evaluar|investigar|explorar)\b.{0,80}\b(delirium|depresion|vascular|lewy|frontotemporal|b12|tsh|hipotiroidismo)\b/,
      /\b(resonancia|rm cerebral|imagen cerebral)\b.{0,90}\b(atrofia|temporomedial|vascular|lesiones)\b/,
      /\b(atrofia temporomedial|atrofia de predominio temporomedial)\b/,
      /\b(tsh|vitamina b12|b12)\b.{0,50}\b(normal|normales|sin alteraciones)\b/,
      /\b(causas reversibles|causas alternativas)\b/,
      /\b(sin focalizacion neurologica|ausencia de focalizacion)\b/,
      /\b(no hay|sin)\s+(evidencia|datos)\s+de\s+(delirium|evento vascular agudo)\b/
    ],
    [
      /\b(delirium|depresion|hipotiroidismo|deficiencia de vitamina b12)\s+(confirmad[oa]|demostrad[oa])\b/,
      /\b(no es necesario|no requiere)\s+(descartar|considerar|evaluar)\s+(otras causas|diagnosticos diferenciales)\b/,
      /\b(alzheimer)\s+(confirmad[oa]|demostrad[oa])\s+(por|mediante)\s+(biomarcadores)\b/,
      /\b(biomarcadores)\s+(confirmaron|demostraron)\s+(alzheimer)\b/
    ]
  )
};

const reglasPorCaso = {
  'caso-01': reglasElena,
  'caso-02': reglasMaria
};

/*
 * EVALUACIÓN DE CADA CRITERIO
 */

function evaluarCriterio(texto, criterio, reglasCaso) {
  const reglasDelCriterio = reglasCaso?.[criterio.id];

  if (!reglasDelCriterio) {
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
    coincide(oracion, reglasDelCriterio.positivos)
  );

  const tieneContradiccion = oraciones.some((oracion) =>
    coincide(oracion, reglasDelCriterio.contradictorios)
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

/*
 * EVALUACIÓN GLOBAL DEL CASO
 */

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

  const reglasCaso = reglasPorCaso[pacienteId];

  if (!reglasCaso) {
    return {
      error: 'No existen reglas de evaluación para este caso.'
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
    evaluarCriterio(
      justificacionClinica,
      criterio,
      reglasCaso
    )
  );

  const puntosJustificacion = criterios.reduce(
    (total, criterio) =>
      total + criterio.puntosObtenidos,
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
