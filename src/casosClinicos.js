
/*
 * Simulador de Consulta Geriátrica
 * Fichas clínicas ficticias - Versión 5
 * Uso exclusivamente educativo.
 */

export const casosClinicos = {
  'caso-01': {
    id: 'caso-01',

    identidad: {
      nombre: 'Elena Martínez',
      edad: 72,
      escolaridad: 16,
      ocupacion: 'Jubilada'
    },

    presentacion:
      'Mujer de 72 años que acude por preocupación relacionada con su memoria.',

    informacionReservada: {
      diagnostico: 'Deterioro cognitivo leve',
      evolucionMeses: 14,
      curso: 'Gradual',
      independenciaFuncional: true
    },

    entrevista: {
      motivo: {
        paciente: 'He notado algunos olvidos y me preocupa que puedan empeorar.',
        familiar: 'La acompañé porque últimamente está preocupada por su memoria.'
      },
      cronologia: {
        paciente: 'Comencé a notar los olvidos hace aproximadamente catorce meses. No fue algo repentino.',
        familiar: 'Los primeros cambios aparecieron hace poco más de un año y han sido graduales.'
      },
      memoria: {
        paciente: 'A veces olvido dónde dejé mis llaves o alguna cita. Utilizo una agenda para organizarme.',
        familiar: 'Tiene algunos olvidos recientes, pero suele recordar con pistas o al revisar sus anotaciones.'
      },
      atencion: {
        paciente: 'Puedo seguir una conversación y leer sin mayores dificultades. A veces me distraigo si hay mucho ruido.',
        familiar: 'No he notado dificultades importantes para mantener la atención.'
      },
      funcionesEjecutivas: {
        paciente: 'Las tareas complicadas me toman un poco más de tiempo, pero todavía puedo organizar mis actividades.',
        familiar: 'En ocasiones tarda más en planificar algo nuevo, aunque finalmente consigue hacerlo por su cuenta.'
      },
      visuoespacial: {
        paciente: 'No he tenido problemas para reconocer lugares ni para encontrar el camino a casa.',
        familiar: 'No hemos observado dificultades para orientarse en espacios conocidos.'
      },
      funcionalidad: {
        paciente: 'Me baño, me visto, cocino y hago mis compras sin ayuda.',
        familiar: 'Sigue siendo independiente para sus actividades habituales.'
      },
      finanzas: {
        paciente: 'Yo misma administro mi dinero y pago mis cuentas.',
        familiar: 'No hemos tenido que asumir el manejo de sus finanzas.'
      },
      medicamentos: {
        paciente: 'Tomo medicamento para controlar mi presión arterial y yo misma organizo mis tomas.',
        familiar: 'Ella se encarga de sus medicamentos y no hemos detectado errores importantes.'
      },
      antecedentes: {
        paciente: 'Tengo hipertensión arterial y recibo tratamiento. No recuerdo otros problemas médicos importantes.',
        familiar: 'Sabemos que tiene hipertensión arterial controlada.'
      },
      orientacion: {
        paciente: 'No me he perdido. Reconozco los lugares que frecuento.',
        familiar: 'No hemos observado que se desoriente en lugares conocidos.'
      },
      animo: {
        paciente: 'En general me siento bien y disfruto mis actividades, aunque los olvidos me preocupan.',
        familiar: 'La noto preocupada por su memoria, pero sigue participando en sus actividades.'
      },
      audicion: {
        paciente: 'Me cuesta escuchar cuando hay mucho ruido, sobre todo si hablan varias personas.',
        familiar: 'Tiene cierta dificultad para escuchar en ambientes ruidosos.'
      },
      lenguaje: {
        paciente: 'No he notado dificultades importantes para hablar o entender conversaciones.',
        familiar: 'No hemos observado cambios importantes en su lenguaje.'
      },
      escolaridad: {
        paciente: 'Estudié dieciséis años y actualmente estoy jubilada.',
        familiar: 'Tiene dieciséis años de escolaridad y está jubilada.'
      },
      sueno: {
        paciente: 'Duermo alrededor de siete horas. En ocasiones despierto durante la noche, pero generalmente descanso bien.',
        familiar: 'No conocemos alteraciones importantes del sueño.'
      },
      caidas: {
        paciente: 'No he tenido caídas durante el último año.',
        familiar: 'No tenemos conocimiento de caídas recientes.'
      },
      nutricion: {
        paciente: 'Como tres veces al día y no he notado que haya bajado de peso sin proponérmelo.',
        familiar: 'Mantiene su alimentación habitual y no hemos observado pérdida de peso importante.'
      },
      movilidad: {
        paciente: 'Salgo a caminar varias veces por semana. No necesito bastón ni andadera.',
        familiar: 'Camina de manera independiente y sigue saliendo de casa.'
      },
      fragilidad: {
        paciente: 'Todavía puedo realizar mis actividades y no siento que haya perdido fuerza de manera importante.',
        familiar: 'No hemos observado una disminución importante de su actividad física o su fuerza.'
      },
      redApoyo: {
        paciente: 'Vivo sola, pero mi hija me visita con frecuencia y hablamos casi todos los días.',
        familiar: 'Soy su hija. La visito varias veces por semana, aunque ella sigue siendo independiente.'
      },
      sintomasDepresivos: {
        paciente: 'No me siento triste la mayor parte del tiempo. Todavía disfruto mis actividades.',
        familiar: 'No hemos observado tristeza persistente ni abandono de sus actividades.'
      },
      alucinaciones: {
        paciente: 'No, nunca he visto ni escuchado cosas que otras personas no puedan percibir.',
        familiar: 'No hemos observado alucinaciones.'
      },
      fluctuaciones: {
        paciente: 'No he tenido episodios en los que esté muy confundida y después vuelva a estar bien.',
        familiar: 'No hemos observado cambios marcados de alerta o confusión durante el día.'
      },
      conducta: {
        paciente: 'No creo que mi manera de comportarme haya cambiado.',
        familiar: 'Su personalidad y su comportamiento se mantienen prácticamente iguales.'
      },
      antecedentesFamiliares: {
        paciente: 'Mi madre tuvo problemas de memoria cuando era muy mayor, pero no sé qué diagnóstico tenía.',
        familiar: 'La abuela materna tuvo dificultades de memoria a edad avanzada, sin un diagnóstico confirmado.'
      }
    },

    seguimientos: {
      memoria: {
        ejemplo: {
          paciente: 'Por ejemplo, a veces no recuerdo dónde dejé las llaves o se me pasa alguna cita.',
          familiar: 'En ocasiones no recuerda dónde dejó sus cosas o algún compromiso.'
        },
        solucion: {
          paciente: 'Empecé a utilizar una agenda para anotar mis compromisos y eso me ayuda bastante.',
          familiar: 'Utiliza una agenda y notas para organizarse.'
        },
        frecuencia: {
          paciente: 'No llevo la cuenta exacta. Me sucede de vez en cuando, pero no todos los días.',
          familiar: 'No sabría darle una frecuencia exacta. Son olvidos ocasionales.'
        },
        evolucion: {
          paciente: 'Comenzó hace poco más de un año. Los olvidos se han hecho un poco más notorios, pero no he tenido cambios repentinos.',
          familiar: 'Ha sido algo gradual durante aproximadamente catorce meses. No hemos observado un deterioro brusco.'
        },
        repercusion: {
          paciente: 'Hasta ahora puedo hacer mis actividades sola. La agenda me ayuda a no olvidar mis compromisos.',
          familiar: 'Sigue siendo independiente. No hemos tenido que asumir sus actividades por estos olvidos.'
        }
      },
      funcionesEjecutivas: {
        ejemplo: {
          paciente: 'Cuando tengo que organizar varias cosas nuevas, a veces necesito más tiempo para decidir por dónde empezar.',
          familiar: 'Cuando tiene que organizar algo complicado, suele tardar un poco más, pero lo resuelve sola.'
        },
        frecuencia: {
          paciente: 'Lo noto principalmente cuando tengo que organizar varias cosas complicadas al mismo tiempo.',
          familiar: 'No ocurre en todas las actividades. Se nota más cuando tiene que planificar algo nuevo.'
        },
        repercusion: {
          paciente: 'Me toma más tiempo, pero puedo terminar lo que necesito hacer.',
          familiar: 'Hasta ahora no ha necesitado que otra persona se encargue de esas tareas.'
        }
      },
      audicion: {
        ejemplo: {
          paciente: 'Cuando estoy en una reunión y todos hablan al mismo tiempo, me cuesta seguir la conversación.',
          familiar: 'En reuniones familiares a veces necesita que le repitamos lo que dijimos.'
        },
        frecuencia: {
          paciente: 'Principalmente cuando hay mucho ruido alrededor.',
          familiar: 'Lo notamos sobre todo en reuniones o ambientes ruidosos.'
        },
        repercusion: {
          paciente: 'A veces tengo que pedir que me repitan las cosas, pero puedo conversar.',
          familiar: 'En ocasiones necesita que le hablemos más claramente.'
        }
      },
      animo: {
        ejemplo: {
          paciente: 'Me preocupa que los olvidos empeoren, aunque sigo disfrutando mis actividades.',
          familiar: 'A veces expresa preocupación por su memoria, pero mantiene sus actividades habituales.'
        },
        repercusion: {
          paciente: 'La preocupación no me ha impedido seguir haciendo mis actividades.',
          familiar: 'No hemos observado que haya abandonado actividades por su preocupación.'
        }
      },
      movilidad: {
        repercusion: {
          paciente: 'Puedo salir a caminar y desplazarme sin ayuda.',
          familiar: 'Continúa caminando de forma independiente.'
        }
      }
    },

    exploracion: {
      signosVitales: {
        presionArterial: '132/78 mmHg',
        frecuenciaCardiaca: '72 lpm',
        temperatura: '36.5 °C',
        saturacionOxigeno: '97%'
      },
      neurologica:
        'Sin focalización neurológica evidente en la exploración clínica.',
      marcha:
        'Marcha independiente, sin alteraciones evidentes.',
      pruebasCognitivas: {
        moca: {
          puntuacion: 24,
          maximo: 30,
          observacion:
            'Dificultades predominantes en evocación diferida y algunas tareas ejecutivas.'
        }
      }
    },

    estudios: {
      biometriaHematica:
        'Sin alteraciones clínicamente relevantes.',
      tsh: '2.1 mUI/L',
      vitaminaB12: '420 pg/mL',
      resonancia:
        'Cambios leves de volumen cerebral asociados con la edad, sin lesiones focales relevantes.'
    },

    objetivosEducativos: [
      'Caracterizar el inicio y la evolución de los síntomas cognitivos.',
      'Explorar diferentes dominios cognitivos.',
      'Distinguir síntomas cognitivos de pérdida de independencia funcional.',
      'Obtener información de un familiar o informante.',
      'Identificar factores que pueden modificar el rendimiento cognitivo.',
      'Interpretar pruebas cognitivas considerando edad y escolaridad.',
      'Formular un diagnóstico diferencial razonado.'
    ]
  },

  'caso-02': {
    id: 'caso-02',

    identidad: {
      nombre: 'María Hernández',
      edad: 79,
      escolaridad: 9,
      ocupacion: 'Ama de casa'
    },

    presentacion:
      'Mujer de 79 años que acude acompañada de su hija por olvidos progresivos y cambios en sus actividades cotidianas.',

    informacionReservada: {
      diagnostico:
        'Trastorno neurocognitivo mayor probablemente debido a enfermedad de Alzheimer',
      evolucionMeses: 36,
      curso: 'Insidioso y progresivo',
      independenciaFuncional: false
    },

    entrevista: {
      motivo: {
        paciente:
          'Mi hija dice que estoy olvidando muchas cosas, pero yo creo que son cosas normales de la edad.',
        familiar:
          'La traje porque cada vez olvida más cosas y ya necesita ayuda para actividades que antes hacía sola.'
      },

      cronologia: {
        paciente:
          'No recuerdo exactamente cuándo empezó. Creo que ha sido poco a poco; mi hija dice que desde hace años.',
        familiar:
          'Comenzó hace aproximadamente tres años, de manera lenta. Primero repetía preguntas y olvidaba conversaciones; después tuvo problemas con pagos y medicamentos.'
      },

      memoria: {
        paciente:
          'A veces se me olvidan cosas. Mi hija dice que repito preguntas, pero yo no lo noto tanto.',
        familiar:
          'Repite la misma pregunta varias veces al día, olvida conversaciones recientes y extravía objetos.'
      },

      atencion: {
        paciente:
          'Puedo conversar, aunque me molesta cuando me hacen muchas preguntas.',
        familiar:
          'Habitualmente está despierta y atenta; no tiene episodios repentinos de confusión que se resuelvan en horas.'
      },

      funcionesEjecutivas: {
        paciente:
          'Antes hacía todas las cuentas; ahora mi hija quiere encargarse.',
        familiar:
          'Hace dos años empezó a equivocarse al pagar servicios y organizar recetas conocidas.'
      },

      visuoespacial: {
        paciente:
          'Conozco mi colonia, aunque alguna vez me confundí de calle.',
        familiar:
          'Se ha desorientado en lugares conocidos y una vez necesitó ayuda para volver a casa.'
      },

      funcionalidad: {
        paciente:
          'Todavía me baño, me visto y como sola; no necesito que hagan todo por mí.',
        familiar:
          'Conserva alimentación, vestido y aseo en general, aunque requiere recordatorios ocasionales. Necesita supervisión para medicamentos, finanzas y algunas tareas domésticas.'
      },

      finanzas: {
        paciente:
          'Mi hija paga las cuentas porque dice que me equivoco.',
        familiar:
          'Dejó de manejar sus pagos hace aproximadamente dos años por errores y cuentas duplicadas.'
      },

      medicamentos: {
        paciente:
          'Tomo pastillas para la presión; mi hija me prepara el pastillero.',
        familiar:
          'Olvidaba tomas y en ocasiones quería repetirlas. Ahora supervisamos su medicación.'
      },

      antecedentes: {
        paciente:
          'Tengo presión alta desde hace años.',
        familiar:
          'Tiene hipertensión arterial en tratamiento; no conocemos un accidente cerebrovascular previo.'
      },

      orientacion: {
        paciente:
          'Sé dónde estoy; a veces se me confunde el día.',
        familiar:
          'Confunde fechas y en ocasiones se desorienta fuera de casa.'
      },

      animo: {
        paciente:
          'Me enojo porque todos quieren mandarme. Ya no tengo tantas ganas de salir.',
        familiar:
          'Desde hace alrededor de un año está más apática e irritable, pero no refiere tristeza persistente.'
      },

      audicion: {
        paciente:
          'Escucho bien si me hablan de frente.',
        familiar:
          'A veces pide que le repitamos, especialmente con ruido.'
      },

      lenguaje: {
        paciente:
          'A veces se me escapa una palabra, pero luego me acuerdo.',
        familiar:
          'En ocasiones busca palabras, aunque mantiene conversaciones habituales.'
      },

      escolaridad: {
        paciente:
          'Terminé la secundaria y me dediqué a mi familia.',
        familiar:
          'Cursó nueve años de estudios y administraba el hogar sin ayuda.'
      },

      sueno: {
        paciente:
          'Duermo bien, aunque a veces despierto temprano.',
        familiar:
          'No hemos observado conductas violentas durante el sueño ni sueños actuados.'
      },

      caidas: {
        paciente:
          'No recuerdo haberme caído.',
        familiar:
          'No ha tenido caídas en el último año.'
      },

      nutricion: {
        paciente:
          'Como bien si me dejan la comida preparada.',
        familiar:
          'Conserva el apetito, pero a veces olvida que ya comió o deja incompleta la preparación de alimentos.'
      },

      movilidad: {
        paciente:
          'Camino sin bastón.',
        familiar:
          'Camina sin ayuda y no hemos notado lentitud ni rigidez.'
      },

      fragilidad: {
        paciente:
          'Me siento con fuerza para caminar.',
        familiar:
          'No observamos una pérdida importante de fuerza, aunque hace menos actividades por iniciativa propia.'
      },

      redApoyo: {
        paciente:
          'Vivo en mi casa y mi hija viene a verme.',
        familiar:
          'Soy su hija y ahora la acompaño diariamente; organizamos turnos para supervisarla.'
      },

      sintomasDepresivos: {
        paciente:
          'No estoy triste, solo me fastidia que no me dejen hacer cosas.',
        familiar:
          'Ha perdido interés en algunas actividades, pero los olvidos comenzaron antes de estos cambios.'
      },

      alucinaciones: {
        paciente:
          'No veo personas ni cosas que los demás no vean.',
        familiar:
          'No hemos observado alucinaciones visuales ni auditivas.'
      },

      fluctuaciones: {
        paciente:
          'Tengo días mejores que otros, pero no me desconecto.',
        familiar:
          'No hay fluctuaciones marcadas de alerta o atención de una hora a otra.'
      },

      conducta: {
        paciente:
          'A veces creo que me mueven las cosas y me molesto.',
        familiar:
          'En el último año ha estado más irritable y suspicaz; a veces nos acusa de esconder objetos que ella extravió.'
      },

      antecedentesFamiliares: {
        paciente:
          'Mi madre tuvo olvidos cuando era mayor.',
        familiar:
          'La abuela materna presentó problemas de memoria a edad avanzada, sin diagnóstico confirmado.'
      }
    },

    seguimientos: {
      cronologia: {
        ejemplo: {
          paciente:
            'Lo primero fueron algunos olvidos; no sabría decir cuándo.',
          familiar:
            'Lo primero fue repetir preguntas y olvidar conversaciones, hace unos tres años.'
        },
        frecuencia: {
          paciente:
            'No sé decirle cada cuánto ocurría.',
          familiar:
            'Al principio pasaba de vez en cuando; ahora los olvidos ocurren todos los días.'
        },
        evolucion: {
          paciente:
            'Creo que ha sido lento; mi hija dice que he cambiado.',
          familiar:
            'Fue gradual, sin un inicio brusco. Después de los olvidos aparecieron errores con pagos y medicinas; los cambios de conducta son más recientes.'
        },
        repercusion: {
          paciente:
            'Ahora mi hija me ayuda con algunas cosas.',
          familiar:
            'La progresión ha hecho necesaria supervisión diaria para actividades instrumentales.'
        }
      },

      memoria: {
        ejemplo: {
          paciente:
            'Me dicen que vuelvo a preguntar lo mismo.',
          familiar:
            'Puede preguntar varias veces a qué hora es una cita y olvidar la respuesta pocos minutos después.'
        },
        solucion: {
          paciente:
            'A veces una pista me ayuda, pero mi hija suele recordármelo.',
          familiar:
            'Las pistas no siempre le permiten recuperar lo que olvidó.'
        },
        frecuencia: {
          paciente:
            'Me pasa algunas veces.',
          familiar:
            'Los olvidos son diarios y se han vuelto más frecuentes.'
        },
        evolucion: {
          paciente:
            'No sé si estoy peor.',
          familiar:
            'Los problemas de memoria iniciaron hace tres años y han progresado.'
        },
        repercusion: {
          paciente:
            'Mi hija me ayuda con las pastillas y las cuentas.',
          familiar:
            'Ya no puede manejar sola pagos ni medicamentos.'
        }
      },

      funcionalidad: {
        ejemplo: {
          paciente:
            'Me visto y me baño sola.',
          familiar:
            'Puede bañarse y vestirse, pero necesita supervisión para pastillas, dinero y cocina.'
        },
        evolucion: {
          paciente:
            'Antes hacía todo por mi cuenta.',
          familiar:
            'Primero fallaron las actividades instrumentales; las básicas están relativamente conservadas.'
        },
        repercusion: {
          paciente:
            'Mi hija viene todos los días.',
          familiar:
            'Necesita acompañamiento y supervisión cotidiana.'
        }
      },

      funcionesEjecutivas: {
        ejemplo: {
          paciente:
            'A veces me confundo con los recibos.',
          familiar:
            'Pagó dos veces un servicio y olvidó otros pagos.'
        },
        evolucion: {
          paciente:
            'Antes llevaba bien las cuentas.',
          familiar:
            'Los errores de organización comenzaron después de los primeros olvidos.'
        },
        repercusion: {
          paciente:
            'Mi hija lleva las cuentas ahora.',
          familiar:
            'Dejó de administrar finanzas y medicamentos de forma independiente.'
        }
      },

      conducta: {
        ejemplo: {
          paciente:
            'Me molesta que cambien mis cosas.',
          familiar:
            'A veces nos acusa de haber escondido objetos que ella misma extravió.'
        },
        frecuencia: {
          paciente:
            'No ocurre siempre.',
          familiar:
            'La irritabilidad y desconfianza aparecen varias veces por semana.'
        },
        evolucion: {
          paciente:
            'Últimamente discuto más con mi hija.',
          familiar:
            'Los cambios de conducta aparecieron aproximadamente hace un año, después de los problemas de memoria.'
        },
        repercusion: {
          paciente:
            'Discutimos, pero luego se me pasa.',
          familiar:
            'Ha generado tensión familiar y requiere más acompañamiento.'
        }
      },

      orientacion: {
        ejemplo: {
          paciente:
            'Una vez me confundí de calle.',
          familiar:
            'Una vez necesitó ayuda para regresar de una zona conocida.'
        },
        frecuencia: {
          paciente:
            'No pasa seguido.',
          familiar:
            'Ha ocurrido en algunas ocasiones, por eso evitamos que salga sola lejos de casa.'
        },
        repercusion: {
          paciente:
            'Ahora prefieren acompañarme.',
          familiar:
            'La acompañamos para prevenir que se extravíe.'
        }
      },

      animo: {
        evolucion: {
          paciente:
            'Me enojo más porque me supervisan.',
          familiar:
            'La apatía y la irritabilidad comenzaron después de los olvidos.'
        },
        repercusion: {
          paciente:
            'Salgo menos.',
          familiar:
            'Ha dejado algunas actividades que antes disfrutaba.'
        }
      }
    },

    exploracion: {
      signosVitales: {
        presionArterial: '138/82 mmHg',
        frecuenciaCardiaca: '74 lpm',
        temperatura: '36.4 °C',
        saturacionOxigeno: '97%'
      },
      neurologica:
        'Alerta, colaboradora, sin focalización neurológica, rigidez ni bradicinesia evidentes.',
      marcha:
        'Marcha independiente, velocidad discretamente reducida, sin signos parkinsonianos evidentes.',
      pruebasCognitivas: {
        moca: {
          puntuacion: 16,
          maximo: 30,
          observacion:
            'Dificultades en evocación diferida, orientación, atención y funciones ejecutivas; interpretar según escolaridad y contexto clínico.'
        }
      }
    },

    estudios: {
      biometriaHematica:
        'Sin anemia ni alteraciones clínicamente relevantes.',
      quimicaSanguinea:
        'Glucosa y función renal sin alteraciones relevantes.',
      tsh: '2.3 mUI/L',
      vitaminaB12: '455 pg/mL',
      resonancia:
        'Atrofia cerebral de predominio temporomedial, sin lesiones vasculares extensas ni hallazgos agudos.'
    },

    objetivosEducativos: [
      'Investigar el inicio insidioso y los primeros síntomas de la enfermedad.',
      'Reconstruir la progresión temporal de los síntomas cognitivos y conductuales.',
      'Contrastar el relato de la paciente con el de su hija.',
      'Identificar dependencia instrumental y preservación relativa de actividades básicas.',
      'Explorar síntomas neuropsiquiátricos y diagnósticos diferenciales.',
      'Interpretar el MoCA en relación con escolaridad, funcionalidad y evolución.',
      'Formular un diagnóstico sindromático y etiológico razonado.'
    ]
  },

  // CASO 03: ROBERTO SALGADO
  'caso-03': {
    id: 'caso-03',

    identidad: {
      nombre: 'Roberto Salgado',
      edad: 76,
      escolaridad: 12,
      ocupacion: 'Contador jubilado'
    },

    presentacion:
      'Hombre de 76 años que acude acompañado de su esposa por dificultades cognitivas y funcionales que empeoraron después de un evento cerebrovascular.',

    informacionReservada: {
      diagnostico: 'Trastorno neurocognitivo mayor de origen vascular asociado con enfermedad cerebral de pequeños vasos e ictus subcortical',
      evolucionMeses: 48,
      curso: 'Gradual durante años, con empeoramiento brusco después de un ictus hace ocho meses',
      independenciaFuncional: false
    },

    entrevista: {
      motivo: {
        paciente: 'Desde que me dio el derrame pienso más despacio y me cuesta hacer varias cosas. Mi esposa está preocupada.',
        familiar: 'Soy su esposa. Ya llevaba años más lento y desorganizado, pero desde el infarto cerebral de hace ocho meses empeoró mucho.'
      },
      cronologia: {
        paciente: 'Antes del derrame ya me tardaba más en hacer las cosas. Hace ocho meses tuve el infarto y desde entonces estoy peor.',
        familiar: 'Hace unos cuatro años comenzó lentamente con dificultades para organizarse y concentrarse. Hace dos años necesitó ayuda con pagos y medicinas. Hace ocho meses sufrió un ictus y tuvo un deterioro marcado.'
      },
      memoria: {
        paciente: 'A veces se me va lo que iba a hacer, sobre todo si me interrumpen. Con una pista suelo acordarme.',
        familiar: 'Olvida algunas indicaciones, pero lo que más destaca es que se distrae, tarda en responder y no logra organizar lo que debe hacer. Suele recordar mejor con pistas.'
      },
      atencion: {
        paciente: 'Me cuesta concentrarme si hay ruido o varias personas hablando.',
        familiar: 'Pierde el hilo de conversaciones largas y le cuesta hacer dos cosas al mismo tiempo. Esto empeoró tras el ictus.'
      },
      funcionesEjecutivas: {
        paciente: 'Antes llevaba las cuentas de la casa; ahora me confundo con los pasos y me tardo mucho.',
        familiar: 'El primer cambio fue la lentitud para planificar y resolver problemas. Después cometió errores con pagos y medicamentos; tras el ictus ya no puede encargarse de esas tareas.'
      },
      visuoespacial: {
        paciente: 'Reconozco mi casa y las calles conocidas. Me cuesta moverme en lugares con muchos obstáculos.',
        familiar: 'Reconoce lugares familiares. Sus dificultades para desplazarse se relacionan más con la marcha y la lentitud que con perderse.'
      },
      funcionalidad: {
        paciente: 'Me baño con algo de ayuda porque me cuesta mantener el equilibrio. Mi esposa lleva las cuentas y las pastillas.',
        familiar: 'Antes del ictus ya necesitaba ayuda con finanzas y medicamentos. Desde el evento requiere supervisión diaria y ayuda parcial para bañarse y vestirse por la debilidad y la dificultad para organizar los pasos.'
      },
      finanzas: {
        paciente: 'Ya no llevo los pagos; me cuesta revisar las cuentas.',
        familiar: 'Comenzó a equivocarse con recibos hace dos años. Después del ictus dejamos de permitirle administrar dinero solo.'
      },
      medicamentos: {
        paciente: 'Mi esposa prepara las pastillas. Si no me recuerda, puedo saltarme alguna.',
        familiar: 'Antes del ictus confundía horarios. Ahora yo preparo y superviso todas sus tomas.'
      },
      antecedentes: {
        paciente: 'Tengo presión alta, diabetes y colesterol elevado. Hace ocho meses tuve un infarto cerebral y me quedó algo débil el lado derecho.',
        familiar: 'Hipertensión de larga evolución, diabetes tipo 2 y dislipidemia. Hace ocho meses sufrió un ictus isquémico subcortical izquierdo con hemiparesia derecha residual. No conocemos otros ictus clínicos previos.'
      },
      orientacion: {
        paciente: 'Sé dónde estoy y qué día es casi siempre, aunque a veces me equivoco con la fecha.',
        familiar: 'Generalmente está orientado. A veces confunde la fecha, sobre todo cuando cambia su rutina.'
      },
      animo: {
        paciente: 'Me frustra no poder hacer lo mismo que antes. A veces estoy desanimado.',
        familiar: 'Se frustra por sus limitaciones y tiene menos iniciativa, pero los problemas de planificación comenzaron años antes del ictus.'
      },
      audicion: {
        paciente: 'Escucho bien si me hablan de frente.',
        familiar: 'A veces necesita que le repitamos las preguntas, especialmente si está distraído.'
      },
      lenguaje: {
        paciente: 'Sé lo que quiero decir, pero tardo en encontrar las palabras.',
        familiar: 'Habla más lentamente desde el ictus, pero comprende instrucciones sencillas. No presenta una afasia importante.'
      },
      escolaridad: {
        paciente: 'Estudié doce años y trabajé como contador.',
        familiar: 'Tiene doce años de escolaridad; antes administraba cuentas complejas por su trabajo.'
      },
      sueno: {
        paciente: 'Duermo unas seis o siete horas. A veces me despierto por la noche.',
        familiar: 'No hemos observado conductas de actuación de sueños ni cambios bruscos de alerta durante el día.'
      },
      caidas: {
        paciente: 'Me he tropezado algunas veces desde el derrame.',
        familiar: 'Tuvo una caída sin lesión grave hace tres meses y varios tropiezos por su marcha asimétrica.'
      },
      nutricion: {
        paciente: 'Como bien. A veces necesito que me corten la carne porque la mano derecha es torpe.',
        familiar: 'Mantiene el apetito y no ha tenido pérdida de peso importante. Come por sí mismo con algunas adaptaciones.'
      },
      movilidad: {
        paciente: 'Camino despacio con bastón. Arrastro un poco el pie derecho.',
        familiar: 'La marcha se había vuelto lenta antes del ictus. Desde entonces tiene marcha asimétrica y usa bastón por la debilidad derecha.'
      },
      fragilidad: {
        paciente: 'Me canso más y hago menos ejercicio desde el infarto.',
        familiar: 'Ha reducido su actividad física por las secuelas del ictus; necesita apoyo para algunas actividades.'
      },
      redApoyo: {
        paciente: 'Vivo con mi esposa; ella me ayuda con las medicinas y las citas.',
        familiar: 'Soy su esposa y cuidadora principal. Una hija nos visita y apoya con traslados y compras.'
      },
      sintomasDepresivos: {
        paciente: 'Hay días en que estoy triste por lo que ya no puedo hacer, pero también disfruto ver a mi familia.',
        familiar: 'Tiene frustración y algunos días de desánimo. Los cambios cognitivos empezaron antes de estos síntomas.'
      },
      alucinaciones: {
        paciente: 'No veo ni escucho cosas que los demás no perciban.',
        familiar: 'No ha presentado alucinaciones visuales.'
      },
      fluctuaciones: {
        paciente: 'Me canso durante el día, pero no tengo episodios repentinos de confusión.',
        familiar: 'No presenta fluctuaciones importantes de alerta; su lentitud es relativamente constante.'
      },
      conducta: {
        paciente: 'Me impaciento cuando no puedo hacer algo rápido.',
        familiar: 'Está más irritable y con menos iniciativa, pero no ha tenido desinhibición marcada ni cambios graves de personalidad.'
      },
      antecedentesFamiliares: {
        paciente: 'Mi padre tenía presión alta y sufrió un derrame cuando era mayor.',
        familiar: 'Su padre tuvo hipertensión y un evento cerebrovascular; no conocemos antecedentes familiares de demencia diagnosticada.'
      }
    },

    seguimientos: {
      cronologia: {
        ejemplo: {
          paciente: 'Primero me costaba organizar las cuentas y tardaba más. Después vino el infarto cerebral.',
          familiar: 'Lo primero, hace cuatro años, fue la lentitud para pensar, planear y concentrarse. Los olvidos no eran lo principal.'
        },
        frecuencia: {
          paciente: 'Al principio era ocasional; ahora me cuesta todos los días.',
          familiar: 'Las dificultades eran cada vez más frecuentes antes del ictus y se volvieron cotidianas después.'
        },
        evolucion: {
          paciente: 'Fui empeorando poco a poco, pero después del derrame el cambio fue mucho más grande.',
          familiar: 'Primero hubo un deterioro gradual durante años. Hace ocho meses, después del ictus, tuvo un descenso brusco y marcado en cognición, marcha e independencia.'
        },
        repercusion: {
          paciente: 'Antes hacía más cosas solo. Ahora necesito ayuda para las cuentas, medicinas y a veces para bañarme.',
          familiar: 'Antes del ictus ya había perdido independencia instrumental; después requirió ayuda también para algunas actividades básicas.'
        }
      },
      memoria: {
        ejemplo: {
          paciente: 'Si me dan varias instrucciones, olvido alguna. Cuando me recuerdan el contexto, muchas veces me acuerdo.',
          familiar: 'Si le pedimos tres tareas seguidas, olvida una; con pistas puede recuperar parte de la información.'
        },
        solucion: {
          paciente: 'Las notas y que me repitan los pasos me ayudan.',
          familiar: 'Las indicaciones breves, las listas y las pistas ayudan parcialmente.'
        },
        frecuencia: {
          paciente: 'Me pasa casi todos los días si tengo muchas cosas que hacer.',
          familiar: 'Las dificultades de atención y organización son diarias.'
        },
        evolucion: {
          paciente: 'La memoria me falla más desde el infarto.',
          familiar: 'Los problemas ejecutivos precedieron al ictus; después empeoraron la atención y los olvidos.'
        },
        repercusion: {
          paciente: 'Mi esposa me recuerda lo que tengo que hacer.',
          familiar: 'Necesita instrucciones paso a paso y supervisión de sus tareas.'
        }
      },
      funcionesEjecutivas: {
        ejemplo: {
          paciente: 'Si tengo que pagar varios recibos, no sé por cuál empezar y me confundo.',
          familiar: 'Comenzó a duplicar pagos y a perder el orden de las tareas. Después del ictus no logra organizar ni una actividad de varios pasos sin guía.'
        },
        frecuencia: {
          paciente: 'Cada vez que algo requiere varios pasos.',
          familiar: 'Ocurre diariamente en actividades que requieren planificación.'
        },
        evolucion: {
          paciente: 'Antes me tardaba más; después del derrame dejé de poder hacerlo solo.',
          familiar: 'Hace cuatro años apareció lentitud ejecutiva; hace dos años errores funcionales; hace ocho meses empeoramiento brusco tras el ictus.'
        },
        repercusion: {
          paciente: 'Ya no manejo las cuentas ni organizo mis medicinas.',
          familiar: 'La disfunción ejecutiva contribuye a la dependencia instrumental y a la necesidad de supervisión.'
        }
      },
      funcionalidad: {
        ejemplo: {
          paciente: 'Puedo comer solo, pero a veces necesito ayuda para bañarme y abotonarme la ropa.',
          familiar: 'Requiere ayuda parcial para baño y vestido, y supervisión completa para finanzas y medicación.'
        },
        evolucion: {
          paciente: 'Primero dejé las cuentas; después del derrame empecé a necesitar ayuda para bañarme.',
          familiar: 'La dependencia instrumental apareció antes del ictus; la ayuda para actividades básicas se hizo necesaria después.'
        },
        repercusion: {
          paciente: 'Mi esposa tiene que estar pendiente de mí todos los días.',
          familiar: 'Necesita supervisión diaria y ayuda física parcial por las secuelas motoras.'
        }
      },
      movilidad: {
        ejemplo: {
          paciente: 'Arrastro un poco el pie derecho y uso bastón.',
          familiar: 'Tiene debilidad derecha residual y marcha asimétrica; usa bastón.'
        },
        evolucion: {
          paciente: 'Ya caminaba algo lento, pero el derrame empeoró mucho mi marcha.',
          familiar: 'La lentitud de marcha precedía al ictus; la asimetría y hemiparesia aparecieron después.'
        },
        repercusion: {
          paciente: 'Necesito apoyo para caminar fuera de casa.',
          familiar: 'Tiene mayor riesgo de caídas y necesita acompañamiento para trayectos largos.'
        }
      },
      antecedentes: {
        ejemplo: {
          paciente: 'Me dio un infarto cerebral hace ocho meses y quedé débil del lado derecho.',
          familiar: 'El ictus isquémico subcortical izquierdo ocurrió hace ocho meses y dejó hemiparesia derecha leve.'
        },
        evolucion: {
          paciente: 'El cambio fue repentino cuando tuve el derrame.',
          familiar: 'El evento vascular produjo un empeoramiento súbito sobre un deterioro cognitivo previo y gradual.'
        },
        repercusion: {
          paciente: 'Desde entonces camino peor y necesito más ayuda.',
          familiar: 'Desde el ictus aumentó notablemente la dependencia funcional.'
        }
      },
      animo: {
        evolucion: {
          paciente: 'Me desanimé más después del infarto.',
          familiar: 'La frustración aumentó después del ictus; la lentitud cognitiva era previa.'
        },
        repercusion: {
          paciente: 'A veces no tengo ganas de salir.',
          familiar: 'Participa menos en actividades, en parte por las limitaciones motoras.'
        }
      }
    },

    exploracion: {
      signosVitales: {
        presionArterial: '146/84 mmHg',
        frecuenciaCardiaca: '76 lpm',
        temperatura: '36.5 °C',
        saturacionOxigeno: '97%'
      },
      neurologica:
        'Alerta, orientado en persona y lugar, con lentitud de respuesta. Hemiparesia derecha residual leve (4+/5), reflejos osteotendinosos aumentados a la derecha y discreta torpeza motora derecha. Sin signos de parkinsonismo.',
      marcha:
        'Marcha lenta y asimétrica, con discreta circunducción de la pierna derecha. Utiliza bastón; dificultad en giros y marcha en tándem.',
      pruebasCognitivas: {
        moca: {
          puntuacion: 17,
          maximo: 30,
          observacion:
            'Alteraciones prominentes en funciones ejecutivas, atención y velocidad de procesamiento, con dificultades de evocación parcialmente facilitadas por pistas. Interpretar según escolaridad y limitaciones motoras.'
        }
      }
    },

    estudios: {
      biometriaHematica:
        'Sin anemia ni alteraciones clínicamente relevantes.',
      quimicaSanguinea:
        'Glucosa de 148 mg/dL; creatinina de 1.0 mg/dL.',
      tsh: '2.0 mUI/L',
      vitaminaB12: '480 pg/mL',
      resonancia:
        'Hiperintensidades extensas y confluentes de sustancia blanca compatibles con enfermedad cerebral de pequeños vasos, múltiples infartos lacunares crónicos e infarto subcortical izquierdo crónico en territorio de perforantes. Sin lesión aguda.',
      tomografia:
        'Sin hemorragia ni lesión intracraneal aguda; cambios isquémicos crónicos de sustancia blanca y secuela subcortical izquierda.'
    },

    objetivosEducativos: [
      'Reconstruir el inicio gradual del deterioro cognitivo previo al ictus.',
      'Identificar el predominio de disfunción ejecutiva, lentitud cognitiva y alteración de la atención.',
      'Distinguir los cambios graduales por enfermedad de pequeños vasos del empeoramiento brusco posterior al ictus.',
      'Determinar la pérdida de independencia instrumental y la ayuda parcial para actividades básicas.',
      'Corroborar la cronología y la repercusión funcional mediante la entrevista con la esposa.',
      'Interpretar el MoCA junto con los hallazgos neurológicos y la escolaridad.',
      'Relacionar las lesiones vasculares de neuroimagen con el patrón clínico y su cronología.',
      'Considerar diagnósticos alternativos y posibles contribuciones mixtas sin atribuir todo deterioro a lesiones incidentales.'
    ]
  }
};

export function obtenerCasoClinico(id) {
  return casosClinicos[id] || null;
}
