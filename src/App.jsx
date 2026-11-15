
import React, { useState } from 'react';
import {
  Brain,
  ArrowRight,
  UserRound,
  ArrowLeft
} from 'lucide-react';

import Consulta from './Consulta.jsx';

const pacientes = [
  {
    id: 'caso-01',
    nombre: 'Elena Martínez',
    edad: 72,
    motivo: 'Problemas de memoria'
  },
  {
    id: 'caso-02',
    nombre: 'María Hernández',
    edad: 79,
    motivo: 'Olvidos frecuentes'
  },
  {
    id: 'caso-03',
    nombre: 'Roberto Salgado',
    edad: 76,
    motivo: 'Dificultades cotidianas'
  },
  {
    id: 'caso-04',
    nombre: 'Jorge Villaseñor',
    edad: 74,
    motivo: 'Cambios recientes'
  },
  {
    id: 'caso-05',
    nombre: 'Arturo Mendoza',
    edad: 66,
    motivo: 'Consulta familiar'
  },
  {
    id: 'caso-06',
    nombre: 'Carmen Ríos',
    edad: 70,
    motivo: 'Cambios cognitivos'
  }
];

const styles = {
  pagina: {
    minHeight: '100vh',
    background: '#f4f7fb',
    fontFamily: 'Arial, sans-serif',
    color: '#243247',
    padding: '32px 16px',
    boxSizing: 'border-box'
  },
  contenedor: {
    maxWidth: '960px',
    margin: '0 auto'
  },
  tarjeta: {
    background: '#ffffff',
    padding: '28px',
    borderRadius: '16px',
    boxShadow: '0 6px 24px rgba(0,0,0,0.06)'
  },
  boton: {
    padding: '12px 18px',
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  botonSecundario: {
    padding: '10px 14px',
    background: '#ffffff',
    color: '#334155',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  }
};

export default function App() {
  const [nombre, setNombre] = useState('');
  const [pantalla, setPantalla] = useState('inicio');
  const [pacienteSeleccionado, setPacienteSeleccionado] =
    useState(null);

  const comenzar = (e) => {
    e.preventDefault();

    if (!nombre.trim()) return;

    setPantalla('pacientes');
  };

  const seleccionarPaciente = (paciente) => {
    setPacienteSeleccionado(paciente);
    setPantalla('consulta');
  };

  return (
    <div style={styles.pagina}>
      <div style={styles.contenedor}>

        {pantalla === 'inicio' && (
          <div style={{
            ...styles.tarjeta,
            maxWidth: '480px',
            margin: '70px auto',
            textAlign: 'center'
          }}>
            <Brain size={54} color="#2563eb" />

            <h1>Simulador de Consulta Geriátrica</h1>

            <p style={{
              color: '#64748b',
              lineHeight: 1.6
            }}>
              Entrenamiento en evaluación cognitiva y
              diagnóstico diferencial de demencias.
            </p>

            <form onSubmit={comenzar}>
              <label
                htmlFor="nombre"
                style={{
                  display: 'block',
                  textAlign: 'left',
                  marginTop: '30px',
                  marginBottom: '8px'
                }}
              >
                Nombre del estudiante
              </label>

              <input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Escribe tu nombre"
                maxLength={100}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  boxSizing: 'border-box',
                  fontSize: '16px'
                }}
              />

              <button
                type="submit"
                style={{
                  ...styles.boton,
                  width: '100%',
                  marginTop: '20px'
                }}
              >
                Comenzar
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        )}

        {pantalla === 'pacientes' && (
          <>
            <div style={{ marginBottom: '28px' }}>
              <Brain size={38} color="#2563eb" />

              <h1>Selecciona un paciente</h1>

              <p style={{ color: '#64748b' }}>
                Bienvenido, {nombre.trim()}.
                Elige un caso para comenzar tu práctica clínica.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '18px'
            }}>
              {pacientes.map((paciente) => (
                <div
                  key={paciente.id}
                  style={styles.tarjeta}
                >
                  <UserRound
                    size={38}
                    color="#2563eb"
                  />

                  <h2 style={{ fontSize: '20px' }}>
                    {paciente.nombre}
                  </h2>

                  <p style={{ color: '#64748b' }}>
                    {paciente.edad} años
                  </p>

                  <p>
                    <strong>Motivo de consulta:</strong>
                    <br />
                    {paciente.motivo}
                  </p>

                  <button
                    style={{
                      ...styles.boton,
                      width: '100%',
                      marginTop: '12px'
                    }}
                    onClick={() =>
                      seleccionarPaciente(paciente)
                    }
                  >
                    Iniciar consulta
                    <ArrowRight size={18} />
                  </button>
                </div>
              ))}
            </div>

            <button
              style={{
                ...styles.botonSecundario,
                marginTop: '28px'
              }}
              onClick={() => setPantalla('inicio')}
            >
              <ArrowLeft size={18} />
              Volver al inicio
            </button>
          </>
        )}

        {pantalla === 'consulta' &&
          pacienteSeleccionado && (
          <Consulta
            key={pacienteSeleccionado.id}
            paciente={pacienteSeleccionado}
            volver={() => {
              setPacienteSeleccionado(null);
              setPantalla('pacientes');
            }}
          />
        )}

        <p style={{
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: '12px',
          marginTop: '36px'
        }}>
          Plataforma educativa con pacientes ficticios.
          No utilizar para atención clínica real.
        </p>

      </div>
    </div>
  );
}
