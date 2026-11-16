
import React, { useState } from 'react';
import {
  ArrowLeft,
  Send,
  UserRound,
  Users,
  Stethoscope,
  ClipboardList,
  Brain,
  CheckCircle2
} from 'lucide-react';

import { responderEntrevista } from './motorEntrevista.js';
import { obtenerCasoClinico } from './casosClinicos.js';
import { obtenerEvaluacionClinica } from './evaluacionesClinicas.js';
import { evaluarCaso } from './motorEvaluacion.js';

const exploraciones = [
  { id: 'signosVitales', nombre: 'Signos vitales' },
  { id: 'neurologica', nombre: 'Exploración neurológica' },
  { id: 'marcha', nombre: 'Marcha y equilibrio' },
  { id: 'orientacion', nombre: 'Orientación' },
  { id: 'memoriaInmediata', nombre: 'Memoria inmediata' },
  { id: 'memoriaDiferida', nombre: 'Memoria diferida' },
  { id: 'moca', nombre: 'MoCA' }
];

const estudios = [
  { id: 'biometriaHematica', nombre: 'Biometría hemática' },
  { id: 'quimicaSanguinea', nombre: 'Química sanguínea' },
  { id: 'tsh', nombre: 'TSH' },
  { id: 'vitaminaB12', nombre: 'Vitamina B12' },
  { id: 'resonancia', nombre: 'Resonancia magnética cerebral' },
  { id: 'electroencefalograma', nombre: 'Electroencefalograma' }
];

const estiloBoton = {
  padding: '11px 16px',
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: '9px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px'
};

const estiloCampo = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px',
  border: '1px solid #cbd5e1',
  borderRadius: '9px',
  background: '#fff',
  color: '#0f172a',
  fontSize: '15px'
};

function obtenerResultadoExploracion(caso, id) {
  const exploracion = caso?.exploracion;
  if (!exploracion) return null;

  if (id === 'signosVitales') {
    const signos = exploracion.signosVitales;
    if (!signos) return null;

    return [
      `Presión arterial: ${signos.presionArterial}`,
      `Frecuencia cardiaca: ${signos.frecuenciaCardiaca}`,
      `Temperatura: ${signos.temperatura}`,
      `Saturación de oxígeno: ${signos.saturacionOxigeno}`
    ].join('\n');
  }

  if (id === 'neurologica') return exploracion.neurologica || null;
  if (id === 'marcha') return exploracion.marcha || null;

  if (id === 'moca') {
    const moca = exploracion.pruebasCognitivas?.moca;
    if (!moca) return null;

    return [
      `Puntuación: ${moca.puntuacion}/${moca.maximo}`,
      moca.observacion
    ].filter(Boolean).join('\n');
  }

  return null;
}

function obtenerResultadoEstudio(caso, id) {
  const resultado = caso?.estudios?.[id];

  return typeof resultado === 'string' && resultado.trim()
    ? resultado
    : null;
}

function ResultadoEvaluacion({ resultado }) {
  const secciones = [
    {
      titulo: 'Diagnóstico sindromático',
      datos: resultado.sindromatico
    },
    {
      titulo: 'Diagnóstico etiológico',
      datos: resultado.etiologico
    }
  ];

  return (
    <div style={{ marginTop: '28px' }}>
      <div style={{
        background: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '14px',
        padding: '24px'
      }}>
        <h2 style={{ marginTop: 0 }}>
          Evaluación final
        </h2>

        <div style={{
          fontSize: '38px',
          fontWeight: 700,
          color: '#1d4ed8'
        }}>
          {resultado.puntuacionTotal}/
          {resultado.puntuacionMaxima}
        </div>

        <div style={{
          height: '12px',
          background: '#dbeafe',
          borderRadius: '20px',
          overflow: 'hidden',
          marginTop: '14px'
        }}>
          <div style={{
            height: '100%',
            width: `${
              resultado.puntuacionMaxima > 0
                ? 100 * resultado.puntuacionTotal /
                  resultado.puntuacionMaxima
                : 0
            }%`,
            background: '#2563eb'
          }} />
        </div>
      </div>

      {secciones.map(({ titulo, datos }) => (
        <div key={titulo} style={{
          padding: '20px 0',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <h3>{titulo}</h3>

          <p>
            <strong>
              {datos.puntosObtenidos}/{datos.puntosMaximos}
              {' '}puntos
            </strong>
            {' · '}
            {datos.correcto
              ? 'Respuesta correcta'
              : 'Respuesta incorrecta'}
          </p>

          <p>{datos.explicacion}</p>
        </div>
      ))}

      <div style={{ marginTop: '24px' }}>
        <h3>
          Justificación clínica
        </h3>

        <p>
          <strong>
            {resultado.justificacion.puntosObtenidos}/
            {resultado.justificacion.puntosMaximos}
            {' '}puntos
          </strong>
        </p>

        {resultado.justificacion.criterios.map(
          (criterio) => (
            <div key={criterio.id} style={{
              padding: '14px',
              marginBottom: '10px',
              borderRadius: '10px',
              background: '#f8fafc'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                <strong>{criterio.nombre}</strong>

                <strong>
                  {criterio.puntosObtenidos}/
                  {criterio.puntosMaximos}
                </strong>
              </div>

              <p style={{
                color: criterio.logrado
                  ? '#166534'
                  : '#9a3412',
                marginBottom: '6px'
              }}>
                {criterio.logrado
                  ? 'Concepto identificado por el sistema'
                  : 'Concepto no identificado por el sistema'}
              </p>

              <p style={{ marginBottom: 0 }}>
                {criterio.retroalimentacion}
              </p>
            </div>
          )
        )}

        <p style={{
          color: '#64748b',
          fontSize: '13px'
        }}>
          {resultado.justificacion.advertencia}
        </p>
      </div>

      {resultado.retroalimentacionFinal && (
        <div style={{
          background: '#f8fafc',
          padding: '20px',
          borderRadius: '12px',
          marginTop: '24px'
        }}>
          <h3>
            {resultado.retroalimentacionFinal.titulo}
          </h3>

          <p>
            {resultado.retroalimentacionFinal.mensaje}
          </p>

          <h4>Recomendaciones</h4>

          <ul>
            {resultado.retroalimentacionFinal.recomendaciones.map(
              (recomendacion, i) => (
                <li key={i} style={{ marginBottom: '8px' }}>
                  {recomendacion}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Consulta({ paciente, volver }) {
  const [pestana, setPestana] = useState('paciente');
  const [mensaje, setMensaje] = useState('');

  const [conversaciones, setConversaciones] = useState({
    paciente: [],
    familiar: []
  });

  const [ultimosTemas, setUltimosTemas] = useState({
    paciente: null,
    familiar: null
  });

  const [solicitudes, setSolicitudes] = useState([]);
  const [temasExplorados, setTemasExplorados] = useState([]);

  const [diagnosticoSindromatico, setDiagnosticoSindromatico] =
    useState('');

  const [diagnosticoEtiologico, setDiagnosticoEtiologico] =
    useState('');

  const [justificacionClinica, setJustificacionClinica] =
    useState('');

  const [evaluacionEnviada, setEvaluacionEnviada] =
    useState(false);

  const [resultadoEvaluacion, setResultadoEvaluacion] =
    useState(null);

  const caso = obtenerCasoClinico(paciente.id);
  const evaluacion = obtenerEvaluacionClinica(paciente.id);

  const enviar = (e) => {
    e.preventDefault();

    const texto = mensaje.trim();
    if (!texto || evaluacionEnviada) return;

    const canal = pestana;

    const resultado = responderEntrevista({
      pacienteId: paciente.id,
      interlocutor: canal,
      mensaje: texto,
      ultimoTema: ultimosTemas[canal]
    });

    setConversaciones((prev) => ({
      ...prev,
      [canal]: [
        ...prev[canal],
        { autor: 'estudiante', texto },
        { autor: 'sistema', texto: resultado.respuesta }
      ]
    }));

    if (
      resultado.reconocido &&
      resultado.tema &&
      !['saludo', 'despedida'].includes(resultado.tema)
    ) {
      setUltimosTemas((prev) => ({
        ...prev,
        [canal]: resultado.tema
      }));

      setTemasExplorados((prev) => prev.includes(resultado.tema)
        ? prev
        : [...prev, resultado.tema]
      );
    }

    setMensaje('');
  };

  const solicitar = (id) => {
    if (evaluacionEnviada) return;

    setSolicitudes((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  const finalizarEvaluacion = (e) => {
    e.preventDefault();

    if (
      evaluacionEnviada ||
      !evaluacion ||
      !diagnosticoSindromatico ||
      !diagnosticoEtiologico ||
      !justificacionClinica.trim()
    ) {
      return;
    }

    const resultado = evaluarCaso({
      pacienteId: paciente.id,
      diagnosticoSindromatico,
      diagnosticoEtiologico,
      justificacionClinica
    });

    if (resultado.error) {
      window.alert(resultado.error);
      return;
    }

    setResultadoEvaluacion(resultado);
    setEvaluacionEnviada(true);
  };

  const pestanas = [
    { id: 'paciente', nombre: 'Paciente', Icono: UserRound },
    { id: 'familiar', nombre: 'Familiar', Icono: Users },
    { id: 'exploracion', nombre: 'Exploración', Icono: Stethoscope },
    { id: 'estudios', nombre: 'Estudios', Icono: ClipboardList },
    { id: 'diagnostico', nombre: 'Diagnóstico', Icono: Brain }
  ];

  const renderSolicitud = (item, tipo) => {
    const clave = `${tipo}-${item.id}`;
    const solicitado = solicitudes.includes(clave);

    const resultado =
      tipo === 'exploracion'
        ? obtenerResultadoExploracion(caso, item.id)
        : obtenerResultadoEstudio(caso, item.id);

    return (
      <div key={clave} style={{
        padding: '16px 0',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px'
        }}>
          <strong>{item.nombre}</strong>

          <button
            style={{
              ...estiloBoton,
              background: solicitado ? '#e2e8f0' : '#2563eb',
              color: solicitado ? '#475569' : '#fff'
            }}
            disabled={solicitado || evaluacionEnviada}
            onClick={() => solicitar(clave)}
          >
            {solicitado
              ? tipo === 'exploracion' ? 'Realizada' : 'Solicitado'
              : tipo === 'exploracion' ? 'Realizar' : 'Solicitar'}
          </button>
        </div>

        {solicitado && (
          <div style={{
            marginTop: '12px',
            background: '#f1f5f9',
            borderRadius: '10px',
            padding: '14px',
            whiteSpace: 'pre-line'
          }}>
            {resultado ||
              'Resultado detallado todavía no disponible para este caso.'}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      background: '#fff',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 6px 24px rgba(0,0,0,0.06)'
    }}>
      <button
        onClick={volver}
        style={{
          ...estiloBoton,
          background: '#f1f5f9',
          color: '#334155',
          marginBottom: '20px'
        }}
      >
        <ArrowLeft size={18} />
        Volver a pacientes
      </button>

      <h1 style={{ marginBottom: '5px' }}>
        Consulta geriátrica
      </h1>

      <p style={{ color: '#64748b' }}>
        {paciente.nombre} · {paciente.edad} años
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        margin: '24px 0'
      }}>
        {pestanas.map(({ id, nombre, Icono }) => (
          <button
            key={id}
            onClick={() => {
              setPestana(id);
              setMensaje('');
            }}
            style={{
              ...estiloBoton,
              background: pestana === id ? '#2563eb' : '#f1f5f9',
              color: pestana === id ? '#fff' : '#334155'
            }}
          >
            <Icono size={17} />
            {nombre}
          </button>
        ))}
      </div>

      {(pestana === 'paciente' || pestana === 'familiar') && (
        <>
          <div style={{
            background: '#f8fafc',
            borderRadius: '12px',
            padding: '18px',
            minHeight: '240px',
            marginBottom: '16px'
          }}>
            <p style={{ color: '#64748b' }}>
              {pestana === 'paciente'
                ? 'Entrevista con el paciente'
                : 'Entrevista con el familiar'}
            </p>

            {conversaciones[pestana].length === 0 && (
              <p>
                {pestana === 'paciente'
                  ? 'Buenos días, doctor. ¿En qué puedo ayudarle?'
                  : 'Buenos días. Soy familiar del paciente. ¿Qué le gustaría saber?'}
              </p>
            )}

            {conversaciones[pestana].map((item, i) => (
              <div key={i} style={{
                background: item.autor === 'estudiante'
                  ? '#dbeafe'
                  : '#fff',
                padding: '12px',
                borderRadius: '10px',
                marginBottom: '10px'
              }}>
                <strong>
                  {item.autor === 'estudiante'
                    ? 'Estudiante'
                    : pestana === 'paciente'
                      ? paciente.nombre
                      : 'Familiar'}
                </strong>

                <p style={{ marginBottom: 0 }}>
                  {item.texto}
                </p>
              </div>
            ))}
          </div>

          <form
            onSubmit={enviar}
            style={{ display: 'flex', gap: '10px' }}
          >
            <input
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe tu pregunta..."
              maxLength={1500}
              disabled={evaluacionEnviada}
              style={{
                ...estiloCampo,
                flex: 1,
                minWidth: 0
              }}
            />

            <button
              type="submit"
              style={{
                ...estiloBoton,
                opacity: mensaje.trim() &&
                  !evaluacionEnviada ? 1 : 0.5
              }}
              disabled={!mensaje.trim() || evaluacionEnviada}
            >
              <Send size={18} />
              Enviar
            </button>
          </form>
        </>
      )}

      {pestana === 'exploracion' && (
        <div>
          <h2>Exploración clínica</h2>
          <p style={{ color: '#64748b' }}>
            Selecciona la exploración que deseas realizar.
          </p>

          {exploraciones.map((item) =>
            renderSolicitud(item, 'exploracion')
          )}
        </div>
      )}

      {pestana === 'estudios' && (
        <div>
          <h2>Estudios complementarios</h2>
          <p style={{ color: '#64748b' }}>
            Selecciona los estudios que deseas solicitar.
          </p>

          {estudios.map((item) =>
            renderSolicitud(item, 'estudio')
          )}
        </div>
      )}

      {pestana === 'diagnostico' && (
        <div>
          <h2>Integración diagnóstica</h2>

          {!evaluacion && (
            <p style={{ color: '#64748b' }}>
              La evaluación diagnóstica de este caso
              todavía está en preparación.
            </p>
          )}

          {evaluacion && (
            <form onSubmit={finalizarEvaluacion}>
              <p style={{ color: '#64748b' }}>
                Integra la información obtenida durante
                la consulta. Recibirás retroalimentación
                únicamente al finalizar.
              </p>

              <div style={{ marginTop: '24px' }}>
                <h3>1. Diagnóstico sindromático</h3>

                <label
                  htmlFor="diagnostico-sindromatico"
                  style={{
                    display: 'block',
                    marginBottom: '9px'
                  }}
                >
                  {evaluacion.diagnosticoSindromatico.pregunta}
                </label>

                <select
                  id="diagnostico-sindromatico"
                  value={diagnosticoSindromatico}
                  onChange={(e) =>
                    setDiagnosticoSindromatico(e.target.value)
                  }
                  disabled={evaluacionEnviada}
                  required
                  style={estiloCampo}
                >
                  <option value="">
                    Selecciona una opción
                  </option>

                  {evaluacion.diagnosticoSindromatico.opciones.map(
                    (opcion) => (
                      <option key={opcion.id} value={opcion.id}>
                        {opcion.texto}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div style={{ marginTop: '24px' }}>
                <h3>2. Diagnóstico etiológico</h3>

                <label
                  htmlFor="diagnostico-etiologico"
                  style={{
                    display: 'block',
                    marginBottom: '9px'
                  }}
                >
                  {evaluacion.diagnosticoEtiologico.pregunta}
                </label>

                <select
                  id="diagnostico-etiologico"
                  value={diagnosticoEtiologico}
                  onChange={(e) =>
                    setDiagnosticoEtiologico(e.target.value)
                  }
                  disabled={evaluacionEnviada}
                  required
                  style={estiloCampo}
                >
                  <option value="">
                    Selecciona una opción
                  </option>

                  {evaluacion.diagnosticoEtiologico.opciones.map(
                    (opcion) => (
                      <option key={opcion.id} value={opcion.id}>
                        {opcion.texto}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div style={{ marginTop: '24px' }}>
                <h3>3. Justificación clínica</h3>

                <label
                  htmlFor="justificacion-clinica"
                  style={{
                    display: 'block',
                    marginBottom: '9px'
                  }}
                >
                  {evaluacion.justificacionClinica.pregunta}
                </label>

                <textarea
                  id="justificacion-clinica"
                  value={justificacionClinica}
                  onChange={(e) =>
                    setJustificacionClinica(e.target.value)
                  }
                  disabled={evaluacionEnviada}
                  required
                  rows={8}
                  maxLength={6000}
                  placeholder="Describe los hallazgos que sustentan tu diagnóstico, los diagnósticos diferenciales y las limitaciones de la información disponible..."
                  style={{
                    ...estiloCampo,
                    resize: 'vertical',
                    lineHeight: 1.6
                  }}
                />
              </div>

              {!evaluacionEnviada ? (
                <div style={{ marginTop: '28px' }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    Al finalizar, se cerrará la entrevista
                    y no podrás modificar tus respuestas.
                  </p>

                  <button
                    type="submit"
                    style={estiloBoton}
                  >
                    <CheckCircle2 size={18} />
                    Finalizar caso
                  </button>
                </div>
              ) : (
                resultadoEvaluacion && (
                  <ResultadoEvaluacion
                    resultado={resultadoEvaluacion}
                  />
                )
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
}
