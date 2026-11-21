import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({
      ok: false,
      mensaje: 'Método no permitido'
    });
  }

  const url = process.env.VITE_SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secret) {
    return res.status(503).json({
      ok: false,
      mensaje: 'Configuración incompleta'
    });
  }

  try {
    const supabase = createClient(url, secret, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
      }
    });

    const { error } = await supabase
      .from('alumnos')
      .select('id', { head: true, count: 'exact' });

    if (error) {
      return res.status(503).json({
        ok: false,
        mensaje: 'Error de conexión con la base de datos'
      });
    }

    return res.status(200).json({
      ok: true,
      mensaje: 'Conexión con Supabase exitosa'
    });

  } catch {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error interno del servidor'
    });
  }
}
