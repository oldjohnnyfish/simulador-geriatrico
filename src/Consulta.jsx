
import React, { useState } from 'react';
import {
  ArrowLeft,
  Send,
  UserRound,
  Users,
  Stethoscope,
  ClipboardList
} from 'lucide-react';

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

const boton = {
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
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const enviar = async (e) => {
    e.preventDefault();

    const texto = mensaje.trim();

    if (!texto || cargando) return;

    const canal = pestana;

    setError('');
    setMensaje('');
    setCargando(true);

    setConversaciones((prev) => ({
      ...prev,
      [canal]: [
        ...prev[canal],
        { autor: 'estudiante', texto }
      ]
    }));

    try {
      const respuesta = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mensaje: texto
        })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.error || 'Error de comunicación'
        );
      }

      setConversaciones((prev) => ({
        ...prev,
        [canal]: [
          ...prev[canal],
          {
            autor: 'sistema',
            texto: datos.respuesta
          }
        ]
      }));

    } catch (err) {
      setError(err.message || 'Error desconocido');
    } finally {
      setCargando(false);
    }
  };

  const solicitar = (nombre) => {
    if (solicitudes.includes(nombre)) return;

    setSolicitudes((prev) => [...prev, nombre]);
  };

  const pestanas = [
    { id: 'paciente', nombre: 'Paciente', Icono: UserRound },
    { id: 'familiar', nombre: 'Familiar', Icono: Users },
    { id: 'exploracion', nombre: 'Exploración', Icono: Stethoscope },
    { id: 'estudios', nombre: 'Estudios', Icono: ClipboardList }
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
          ...boton,
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
            onClick={() => setPestana(id)}
            style={{
              ...boton,
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
                    : 'Simulador'}
                </strong>

                <p style={{ marginBottom: 0 }}>
                  {item.texto}
                </p>
              </div>
            ))}

            {cargando && (
              <p style={{ color: '#64748b' }}>
                El paciente está respondiendo...
              </p>
            )}
          </div>

          {error && (
            <p style={{
              color: '#b91c1c',
              background: '#fef2f2',
              padding: '12px',
              borderRadius: '9px'
            }}>
              {error}
            </p>
          )}

          <form
            onSubmit={enviar}
            style={{ display: 'flex', gap: '10px' }}
          >
            <input
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe tu pregunta..."
              disabled={cargando}
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
              style={boton}
              disabled={!mensaje.trim() || cargando}
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
                  ...boton,
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
                Los resultados estarán disponibles
                cuando incorporemos los casos clínicos.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
