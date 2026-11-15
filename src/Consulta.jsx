
import React, { useState } from 'react';
import {
  ArrowLeft,
  Send,
  UserRound,
  Users,
  Stethoscope,
  ClipboardList
} from 'lucide-react';

import { responderEntrevista } from './motorEntrevista.js';
import { obtenerCasoClinico } from './casosClinicos.js';

const exploraciones = [
  {
    id: 'signosVitales',
    nombre: 'Signos vitales'
  },
  {
    id: 'neurologica',
    nombre: 'Exploración neurológica'
  },
  {
    id: 'marcha',
    nombre: 'Marcha y equilibrio'
  },
  {
    id: 'orientacion',
    nombre: 'Orientación'
  },
  {
    id: 'memoriaInmediata',
    nombre: 'Memoria inmediata'
  },
  {
    id: 'memoriaDiferida',
    nombre: 'Memoria diferida'
  },
  {
    id: 'moca',
    nombre: 'MoCA'
  }
];

const estudios = [
  'Biometría hemática',
  'Química sanguínea',
  'TSH',
  'Vitamina B12',
  'Resonancia magnética cerebral',
  'Electroencefalograma'
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

function obtenerResultadoExploracion(caso, id) {
  const exploracion = caso?.exploracion;

  if (!exploracion) {
    return null;
  }

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

  if (id === 'neurologica') {
    return exploracion.neurologica || null;
  }

  if (id === 'marcha') {
    return exploracion.marcha || null;
  }

  if (id === 'moca') {
    const moca = exploracion.pruebasCognitivas?.moca;

    if (!moca) return null;

    return [
      `Puntuación: ${moca.puntuacion}/${moca.maximo}`,
      moca.observacion
    ].join('\n');
  }

  return null;
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

  const caso = obtenerCasoClinico(paciente.id);

  const enviar = (e) => {
    e.preventDefault();

    const texto = mensaje.trim();
    if (!texto) return;

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
        {
          autor: 'estudiante',
          texto
        },
        {
          autor: 'sistema',
          texto: resultado.respuesta
        }
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

      setTemasExplorados((prev) =>
        prev.includes(resultado.tema)
          ? prev
          : [...prev, resultado.tema]
      );
    }

    setMensaje('');
  };

  const solicitar = (id) => {
    if (solicitudes.includes(id)) return;

    setSolicitudes((prev) => [...prev, id]);
  };

  const pestanas = [
    {
      id: 'paciente',
      nombre: 'Paciente',
      Icono: UserRound
    },
    {
      id: 'familiar',
      nombre: 'Familiar',
      Icono: Users
    },
    {
      id: 'exploracion',
      nombre: 'Exploración',
      Icono: Stethoscope
    },
    {
      id: 'estudios',
      nombre: 'Estudios',
      Icono: ClipboardList
    }
  ];

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
              background:
                pestana === id ? '#2563eb' : '#f1f5f9',
              color:
                pestana === id ? '#fff' : '#334155'
            }}
          >
            <Icono size={17} />
            {nombre}
          </button>
        ))}
      </div>

      {(pestana === 'paciente' ||
        pestana === 'familiar') && (
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
              <div
                key={i}
                style={{
                  background:
                    item.autor === 'estudiante'
                      ? '#dbeafe'
                      : '#fff',
                  padding: '12px',
                  borderRadius: '10px',
                  marginBottom: '10px'
                }}
              >
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
            style={{
              display: 'flex',
              gap: '10px'
            }}
          >
            <input
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe tu pregunta..."
              maxLength={1500}
              style={{
                flex: 1,
                minWidth: 0,
                padding: '12px',
                border: '1px solid #cbd5e1',
                borderRadius: '9px'
              }}
            />

            <button
              type="submit"
              style={{
                ...estiloBoton,
                opacity: mensaje.trim() ? 1 : 0.5
              }}
              disabled={!mensaje.trim()}
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

          {exploraciones.map((item) => {
            const resultado =
              obtenerResultadoExploracion(caso, item.id);

            const solicitado =
              solicitudes.includes(item.id);

            return (
              <div
                key={item.id}
                style={{
                  padding: '16px 0',
                  borderBottom: '1px solid #e2e8f0'
                }}
              >
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
                      background: solicitado
                        ? '#e2e8f0'
                        : '#2563eb',
                      color: solicitado
                        ? '#475569'
                        : '#fff'
                    }}
                    disabled={solicitado}
                    onClick={() => solicitar(item.id)}
                  >
                    {solicitado
                      ? 'Realizada'
                      : 'Realizar'}
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
          })}
        </div>
      )}

      {pestana === 'estudios' && (
        <div>
          <h2>Estudios complementarios</h2>

          <p style={{ color: '#64748b' }}>
            Selecciona los estudios que deseas solicitar.
          </p>

          {estudios.map((nombre) => {
            const id = `estudio-${nombre}`;
            const solicitado = solicitudes.includes(id);

            return (
              <div
                key={nombre}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 0',
                  borderBottom: '1px solid #e2e8f0'
                }}
              >
                <span>{nombre}</span>

                <button
                  style={{
                    ...estiloBoton,
                    background: solicitado
                      ? '#e2e8f0'
                      : '#2563eb',
                    color: solicitado
                      ? '#475569'
                      : '#fff'
                  }}
                  disabled={solicitado}
                  onClick={() => solicitar(id)}
                >
                  {solicitado
                    ? 'Solicitado'
                    : 'Solicitar'}
                </button>
              </div>
            );
          })}

          <p style={{
            marginTop: '20px',
            color: '#64748b',
            fontSize: '14px'
          }}>
            Los resultados de laboratorio y gabinete
            se incorporarán en el siguiente paso.
          </p>
        </div>
      )}
    </div>
  );
}
