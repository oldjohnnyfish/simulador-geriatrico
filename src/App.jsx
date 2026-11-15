
import React, { useState } from 'react';
import { Brain, ArrowRight, UserRound, Stethoscope } from 'lucide-react';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [iniciado, setIniciado] = useState(false);

  const comenzar = (e) => {
    e.preventDefault();

    if (!nombre.trim()) return;

    setIniciado(true);
  };

  const contenedor = {
    minHeight: '100vh',
    background: '#f4f7fb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',
    fontFamily: 'Arial, sans-serif',
    color: '#243247',
    boxSizing: 'border-box'
  };

  const tarjeta = {
    width: '100%',
    maxWidth: '480px',
    background: '#ffffff',
    padding: '36px',
    borderRadius: '18px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
    textAlign: 'center',
    boxSizing: 'border-box'
  };

  const boton = {
    width: '100%',
    padding: '14px',
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  };

  return (
    <div style={contenedor}>
      <div style={tarjeta}>

        <div style={{ marginBottom: '20px', color: '#2563eb' }}>
          <Brain size={56} />
        </div>

        <h1 style={{ fontSize: '27px', marginBottom: '10px' }}>
          Simulador de Consulta Geriátrica
        </h1>

        <p style={{ color: '#64748b', lineHeight: 1.6 }}>
          Entrenamiento en evaluación cognitiva y
          diagnóstico diferencial de demencias.
        </p>

        {!iniciado ? (
          <form onSubmit={comenzar}>

            <div style={{ marginTop: '30px', textAlign: 'left' }}>
              <label
                htmlFor="nombre"
                style={{ fontWeight: 'bold', fontSize: '14px' }}
              >
                Nombre del estudiante
              </label>

              <div style={{ position: 'relative', marginTop: '10px' }}>
                <UserRound
                  size={20}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '14px',
                    color: '#94a3b8'
                  }}
                />

                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Escribe tu nombre"
                  maxLength={100}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 14px 14px 44px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '10px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <button type="submit" style={boton}>
                Comenzar
                <ArrowRight size={20} />
              </button>
            </div>

          </form>
        ) : (
          <div style={{ marginTop: '30px' }}>

            <Stethoscope size={44} color="#2563eb" />

            <h2>¡Bienvenido, {nombre.trim()}!</h2>

            <p style={{ color: '#64748b', lineHeight: 1.6 }}>
              Tu sesión de práctica está lista.
              Próximamente podrás seleccionar un paciente
              y comenzar una entrevista clínica simulada.
            </p>

            <button
              style={boton}
              onClick={() => setIniciado(false)}
            >
              Volver al inicio
            </button>

          </div>
        )}

        <p style={{
          fontSize: '12px',
          color: '#94a3b8',
          marginTop: '30px'
        }}>
          Plataforma educativa con pacientes ficticios.
          No utilizar para atención clínica real.
        </p>

      </div>
    </div>
  );
}
