
/*
 * Simulador de Consulta Geriátrica
 * Motor de evaluación diagnóstica - Versión 1
 *
 * Calificación automática orientativa.
 * Sin APIs ni servicios externos.
 */

import { obtenerEvaluacionClinica } from './evaluacionesClinicas.js';

function normalizar(texto) {
  return String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escaparRegex(texto) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function contieneConcepto(texto, concepto) {
  const expresion = new RegExp(
    `(^|\\s)${escaparRegex(concepto)}(?=\\s|$)`
  );

  return expresion.test(texto);
}

/*
 * Detecta algunas negaciones cercanas.
 * No sustituye el análisis semántico.
 */
function estaNegado(texto, concepto) {
  const posicion = texto.indexOf(concepto);

  if (posicion < 0) return false;

  const anterior = texto
    .slice(Math.max(0, posicion - 45), posicion)
    .split(/\s+/)
    .slice(-5)
    .join(' ');

  return /\b(no|sin|niega|ausencia de|carece de)\b/.test(
    anterior
  );
}

function evaluarCriterio(texto, criterio) {
  const palabras = criterio.palabrasClave || [];

  const coincidencias = palabras.filter((palabra) => {
    const concepto = normalizar(palabra);

    return (
      contieneConcepto(texto, concepto) &&
      !estaNegado(texto, concepto)
    );
  });

  const logrado = coincidencias.length > 0;

  return {
    id: criterio.id,
    nombre: criterio.nombre,
    puntosMaximos: criterio.puntos,
    puntosObtenidos: logrado ? criterio.puntos : 0,
    logrado,
    coincidencias,
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

  const texto = normalizar(justificacionClinica);

  const criterios = justificacion.criterios.map(
    (criterio) => evaluarCriterio(texto, criterio)
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
      advertencia: justificacion.advertencia
    },

    retroalimentacionFinal:
      evaluacion.retroalimentacionFinal
  };
}
