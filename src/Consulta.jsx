
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

const exploraciones = [
  'Signos vitales',
  'Exploración neurológica',
  'Marcha y equilibrio',
  'Orientación',
  'Memoria inmediata',
  'Memoria diferida',
  'MoCA (resultado predefinido)'
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

export default function Consulta({ paciente, volver }) {
  const [pestana, setPestana] = useState('paciente');
  const [mensaje, setMensaje] = useState('');

  const [conversaciones, setConversaciones] = useState({
    paciente: [],
    familiar: []
  });

  // Memoria conversacional independiente para cada interlocutor
  const [ultimosTemas, setUltimosTemas] = useState({
    paciente: null,
    familiar: null
  });

  const [solicitudes, setSolicitudes] = useState([]);
  const [temasExplorados, setTemasExplorados] = useState([]);

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

    // Guardar pregunta y respuesta
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

    // Actualizar el tema solamente cuando es clínico
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

  const solicitar = (nombre) => {
    if (solicitudes.includes(nombre)) return;

    setSolicitudes((prev) => [...prev, nombre]);
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

      {(pestana === 'exploracion' ||
        pestana === 'estudios') && (
        <div>
          <h2>
            {pestana === 'exploracion'
              ? 'Exploración clínica'
              : 'Estudios complementarios'}
          </h2>

          <p style={{ color: '#64748b' }}>
            Selecciona lo que deseas solicitar.
          </p>

          {(pestana === 'exploracion'
            ? exploraciones
            : estudios
          ).map((nombre) => (
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
                  background: solicitudes.includes(nombre)
                    ? '#e2e8f0'
                    : '#2563eb',
                  color: solicitudes.includes(nombre)
                    ? '#475569'
                    : '#fff'
                }}
                disabled={solicitudes.includes(nombre)}
                onClick={() => solicitar(nombre)}
              >
                {solicitudes.includes(nombre)
                  ? 'Solicitado'
                  : 'Solicitar'}
              </button>
            </div>
          ))}

          {solicitudes.length > 0 && (
            <div style={{
              marginTop: '22px',
              padding: '14px',
              background: '#eff6ff',
              borderRadius: '10px'
            }}>
              <strong>Solicitudes registradas:</strong>

              <ul>
                {solicitudes.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>

              <p style={{ fontSize: '13px' }}>
                Los resultados específicos de cada caso
                se incorporarán posteriormente.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
