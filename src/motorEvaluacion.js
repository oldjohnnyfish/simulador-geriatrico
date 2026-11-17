
import { obtenerEvaluacionClinica } from './evaluacionesClinicas.js';

/*
 * Simulador de Consulta Geriátrica
 * Motor de evaluación clínica - Versión 9
 *
 * Caso 01: Elena Martínez
 * Caso 02: María Hernández
 * Caso 03: Roberto Salgado
 * Caso 04: Jorge Villaseñor
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
 * Se conservan las reglas clínicas de V6.
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
 *
 * Se conservan las reglas clínicas de V6.
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

/*
 * CASO 03: ROBERTO SALGADO
 *
 * Trastorno neurocognitivo mayor de origen vascular.
 * Enfermedad cerebral de pequeños vasos.
 * Empeoramiento brusco después de ictus subcortical.
 *
 * Reglas nuevas en V7.
 */

const reglasRoberto = {
  inicio_evolucion: reglas(
    [
      /\b(4|cuatro)\s+anos\b.{0,120}\b(ictus|infarto|derrame|evento vascular|empeoramiento|brusco)\b/,
      /\b(gradual|progresiv[oa]|lentamente|insidios[oa])\b.{0,120}\b(ictus|infarto|derrame|evento vascular|brusc[oa]|abrupt[oa]|repentin[oa])\b/,
      /\b(ictus|infarto cerebral|derrame|evento vascular)\b.{0,100}\b(empeoramiento|deterioro|declive|brusc[oa]|abrupt[oa]|marcad[oa]|repentin[oa])\b/,
      /\b(empeoramiento|deterioro|declive)\s+(brusc[oa]|abrupt[oa]|repentin[oa]|marcad[oa])\b/,
      /\b(deterioro|evolucion)\s+(escalonad[oa]|en escalones)\b/,
      /\b(antes|previo|previamente)\b.{0,100}\b(ictus|infarto cerebral|derrame|evento vascular)\b/,
      /\b(8|ocho)\s+meses\b.{0,100}\b(ictus|infarto|derrame|deterioro|empeoramiento)\b/,
      /\b(ictus|infarto|derrame)\b.{0,100}\b(8|ocho)\s+meses\b/
    ],
    [
      /\b(no|sin)\s+(empeoramiento|deterioro|cambios)\s+(tras|despues de|posterior al)\s+(ictus|infarto|derrame)\b/,
      /\b(ictus|infarto cerebral|derrame)\s+(sin repercusion cognitiva|sin deterioro cognitivo)\b/,
      /\b(deterioro cognitivo)\s+(exclusivamente|unicamente)\s+(agudo|subito)\b/,
      /\b(no hubo|sin)\s+(deterioro|cambios|sintomas)\s+(previos|antes del ictus)\b/
    ]
  ),

  alteracion_cognitiva: reglas(
    [
      /\b(disfuncion|deterioro|alteracion|deficit|problemas|dificultades)\s+(de\s+|en\s+|las\s+)?(funciones ejecutivas|funcion ejecutiva|atencion|concentracion|planificacion|organizacion)\b/,
      /\b(funciones ejecutivas|funcion ejecutiva)\s+(alteradas|afectadas|deterioradas|comprometidas)\b/,
      /\b(lentitud|enlentecimiento|bradipsiquia)\s+(cognitiv[oa]|mental|del pensamiento|de procesamiento)?\b/,
      /\b(velocidad de procesamiento)\b/,
      /\b(procesamiento)\s+(lent[oa]|enlentecid[oa]|alterad[oa])\b/,
      /\b(deficit|dificultad|alteracion)\s+(atencional|ejecutiv[oa])\b/,
      /\b(perfil|predominio)\s+(ejecutiv[oa]|atencional|subcortical)\b/,
      /\b(dificultad|dificultades|problemas)\s+(para|al)\s+(planificar|organizar|concentrarse)\b/,
      /\b(evocacion|recuerdo)\b.{0,60}\b(pistas|claves|ayuda)\b/
    ],
    [
      /\b(funciones ejecutivas|atencion|concentracion)\s+(normales|intactas|conservadas|sin alteraciones)\b/,
      /\b(no hay|sin)\s+(disfuncion ejecutiva|alteraciones ejecutivas|dificultades atencionales)\b/,
      /\b(no presenta|sin)\s+(lentitud cognitiva|enlentecimiento cognitivo)\b/,
      /\b(perfil cognitivo)\s+(completamente normal|sin alteraciones)\b/
    ]
  ),

  funcionalidad: reglas(
    [
      /\b(perdida|perdio|ha perdido)\s+(de\s+|su\s+|la\s+)?(independencia|autonomia)\b/,
      /\b(deterioro|declive|compromiso|afectacion)\s+funcional\b/,
      /\b(dependencia)\s+(funcional|instrumental|en actividades|para actividades)\b/,
      /\b(actividades instrumentales|aivd)\b.{0,90}\b(afectadas|alteradas|deterioradas|dependencia|ayuda|supervision|dificultad)\b/,
      /\b(necesita|requiere)\s+(ayuda|supervision|apoyo)\b/,
      /\b(ya no puede|dejo de poder)\s+(manejar|administrar|organizar)\b/,
      /\b(errores|problemas|dificultades)\s+(con|en|para)\s+(los\s+|las\s+)?(pagos|finanzas|medicamentos|medicinas)\b/,
      /\b(esposa|familiar|cuidadora)\b.{0,70}\b(supervisa|ayuda|administra|organiza|prepara)\b/,
      /\b(ayuda|apoyo|supervision)\s+(para|en|con)\s+(el\s+|las\s+|los\s+)?(bano|vestido|medicamentos|finanzas|actividades)\b/,
      /\b(actividades basicas|abvd)\b.{0,70}\b(ayuda|dependencia|afectadas|limitadas)\b/
    ],
    [
      /\b(independencia|autonomia|funcionalidad)\s+(completamente\s+)?(conservada|preservada|intacta)\b/,
      /\b(conserva|mantiene)\s+(toda\s+)?(su\s+)?(independencia|autonomia|funcionalidad)\b/,
      /\b(sin|no presenta)\s+(dependencia funcional|deterioro funcional|perdida de independencia)\b/,
      /\b(no necesita|sin necesidad de)\s+(ayuda|supervision)\b/,
      /\b(actividades instrumentales|aivd)\s+(conservadas|independientes|intactas)\b/
    ]
  ),

  informante: reglas(
    [
      /\b(esposa|familiar|informante|cuidadora)\s+(confirma|corrobora|refiere|reporta|describe|nota|observa|explica|documenta)\b/,
      /\b(segun|de acuerdo con)\s+(su\s+|la\s+)?(esposa|familiar|informante|cuidadora)\b/,
      /\b(informacion|testimonio|reporte|relato)\s+(de|del|por)\s+(la\s+|su\s+)?(esposa|familiar|informante|cuidadora)\b/,
      /\b(corroborad[oa]s?|confirmad[oa]s?|referid[oa]s?|reportad[oa]s?)\s+(por|mediante)\s+(su\s+|la\s+|una\s+)?(esposa|familiar|informante|cuidadora)\b/,
      /\b(heteroanamnesis|informacion corroborada por la esposa)\b/,
      /\b(esposa)\b.{0,100}\b(evolucion|deterioro|cambios|ictus|dependencia)\b/
    ],
    [
      /\b(esposa|familiar|informante|cuidadora)\s+(niega|descarta)\s+(los\s+)?(cambios|problemas|sintomas)\s+cognitivos\b/,
      /\b(no hay|sin)\s+(informante|corroboracion familiar|informacion familiar)\b/
    ]
  ),

  evaluacion_cognitiva: reglas(
    [
      /\b(moca|montreal cognitive assessment)\s*(es\s+de|es|de|:|=|con|fue|obtuvo)?\s*17\s*(\/|de)\s*30\b/,
      /\b17\s*(\/|de)\s*30\s*(en|de|del)\s*(el\s+)?moca\b/,
      /\b(moca|prueba cognitiva|tamizaje cognitivo)\b.{0,90}\b(alterad[oa]|baj[oa]|deterioro|deficit|afectacion|ejecutiv[oa]|atencion)\b/,
      /\b(hemiparesia)\s+(derecha|residual|leve)\b/,
      /\b(debilidad)\s+(del\s+lado\s+)?derech[oa]\b/,
      /\b(marcha)\s+(asimetrica|lenta|alterada)\b/,
      /\b(focalizacion|focalidad)\s+neurologica\b/,
      /\b(alteracion|deterioro)\s+cognitiv[oa]\s+(objetiv[oa]|significativ[oa])\b/
    ],
    [
      /\b(moca|prueba cognitiva|tamizaje cognitivo)\s+(normal|intacto|sin alteraciones)\b/,
      /\bmoca\s*(es\s+de|es|de|:|=|con|fue)?\s*30\s*(\/|de)\s*30\b/,
      /\b(moca|montreal cognitive assessment)\s*(es\s+de|es|de|:|=|con|fue|obtuvo)?\s*(16|24)\s*(\/|de)\s*30\b/,
      /\b(no hay|sin)\s+(alteraciones|dificultades)\s+(en\s+)?(el\s+)?moca\b/,
      /\b(no hay|sin)\s+(secuelas neurologicas|focalizacion neurologica)\s+(tras|despues del)\s+(ictus|infarto)\b/
    ]
  ),

  diagnostico_diferencial: reglas(
    [
      /\b(resonancia|rm cerebral|neuroimagen)\b.{0,110}\b(pequenos vasos|sustancia blanca|lacunares|subcortical|vascular|isquemic[oa])\b/,
      /\b(enfermedad cerebral de pequenos vasos|enfermedad de pequenos vasos)\b/,
      /\b(hiperintensidades)\b.{0,70}\b(sustancia blanca|confluentes|extensas)\b/,
      /\b(infartos lacunares|infarto lacunar|lesiones lacunares)\b/,
      /\b(infarto|lesion|isquemia)\s+(subcortical|isquemic[oa])\b/,
      /\b(lesiones|cambios)\s+(vasculares|isquemicos|de sustancia blanca)\b/,
      /\b(diagnosticos diferenciales|diagnostico diferencial)\b/,
      /\b(considerar|descartar|evaluar|investigar|explorar)\b.{0,90}\b(alzheimer|demencia mixta|depresion|delirium|b12|tsh|causas reversibles)\b/,
      /\b(posible|posibilidad de|considerar)\s+(patologia mixta|demencia mixta|componente mixto)\b/,
      /\b(tsh|vitamina b12|b12)\b.{0,50}\b(normal|normales|sin alteraciones)\b/
    ],
    [
      /\b(resonancia|neuroimagen)\s+(normal|sin alteraciones|sin lesiones)\b/,
      /\b(no hay|sin)\s+(lesiones vasculares|enfermedad de pequenos vasos|infartos lacunares)\b/,
      /\b(lesiones vasculares)\s+(ausentes|descartadas)\b/,
      /\b(no es necesario|no requiere)\s+(descartar|considerar|evaluar)\s+(otras causas|diagnosticos diferenciales)\b/,
      /\b(alzheimer)\s+(confirmad[oa]|demostrad[oa])\s+(por|mediante)\s+(biomarcadores)\b/
    ]
  )
};

/*
 * CASO 04: JORGE VILLASEÑOR
 * Trastorno neurocognitivo mayor con demencia con cuerpos de Lewy probable.
 * El trastorno de conducta del sueño REM es clínicamente sugestivo,
 * pero no está confirmado mediante polisomnografía.
 */

const reglasJorge = {
  inicio_evolucion: reglas(
    [
      /\b(4|cuatro)\s+anos\b.{0,130}\b(sueno|suenos|gritos|patadas|movimientos nocturnos|rem)\b/,
      /\b(sueno|suenos|movimientos nocturnos|rem)\b.{0,130}\b(4|cuatro)\s+anos\b/,
      /\b(sueno|suenos|rem)\b.{0,100}\b(antes|precedio|precedieron|previo|primero)\b/,
      /\b(primero|inicialmente)\b.{0,100}\b(sueno|suenos|rem|nocturnos)\b/,
      /\b(2|dos)\s+anos\b.{0,100}\b(cognitiv|atencion|visuoespacial|memoria)\b/,
      /\b(18|dieciocho)\s+meses\b.{0,90}\b(fluctuacion|fluctuaciones|alerta|atencion)\b/,
      /\b(10|diez)\s+meses\b.{0,90}\b(alucinaciones|visiones)\b/,
      /\b(6|seis)\s+meses\b.{0,100}\b(parkinsonismo|bradicinesia|rigidez|lentitud|marcha)\b/,
      /\b(cognitiv|deterioro|demencia)\b.{0,100}\b(antes|precedio|precedieron|previo|anterior)\b.{0,70}\b(parkinsonismo|motor|motores|rigidez|bradicinesia)\b/,
      /\b(parkinsonismo|sintomas motores|rigidez|bradicinesia)\b.{0,100}\b(despues|posterior|tras)\b.{0,70}\b(cognitiv|deterioro|demencia)\b/
    ],
    [
      /\b(parkinsonismo|enfermedad de parkinson|sintomas motores)\b.{0,100}\b(anos antes|mucho antes|precedio|precedieron|antes)\b.{0,60}\b(cognitiv|deterioro|demencia)\b/,
      /\b(cognitiv|deterioro|demencia)\b.{0,100}\b(despues|posterior)\b.{0,70}\b(parkinsonismo|enfermedad de parkinson)\b/,
      /\b(no hay|sin)\s+(evolucion|cronologia|sintomas previos)\b/
    ]
  ),

  alteracion_cognitiva: reglas(
    [
      /\b(fluctuaciones?|fluctuante|confusion intermitente|episodios de confusion)\b/,
      /\b(atencion|alerta|lucidez)\b.{0,80}\b(variable|fluctuante|cambia|alternante|somnolencia)\b/,
      /\b(somnolencia|mirada al vacio|periodos de desconexion)\b/,
      /\b(alucinaciones visuales|visiones recurrentes|visiones bien formadas)\b/,
      /\b(ve|observa|describe)\b.{0,70}\b(personas|animales|figuras)\b.{0,70}\b(no existen|nadie mas ve|inexistentes)\b/,
      /\b(dificultades|alteraciones|deficit|deterioro)\b.{0,60}\b(atencionales?|ejecutiv[oa]s?|visuoespaciales?)\b/,
      /\b(funciones ejecutivas|disfuncion ejecutiva|alteracion visuoespacial|deficit atencional)\b/,
      /\b(parkinsonismo espontaneo|bradicinesia|rigidez)\b/
    ],
    [
      /\b(no hay|sin|niega|ausencia de|no presenta|no tiene|no existen)\s+(fluctuaciones|alucinaciones visuales|alteraciones cognitivas|deterioro cognitivo|parkinsonismo|alteraciones de atencion|alteraciones ejecutivas)\b/,
      /\b(memoria|atencion|funciones ejecutivas|habilidades visuoespaciales)\b.{0,100}\b(conservad[oa]s?|intact[oa]s?|normales|sin alteraciones)\b/,
      /\b(no presenta|no tiene|sin|niega|ausencia de)\b.{0,30}\b(alucinaciones visuales|fluctuaciones cognitivas|parkinsonismo|alteraciones del sueno rem)\b/,
      /\b(no presenta|no tiene|sin|niega|ausencia de)\b.{0,35}\b(deterioro cognitivo|deficit cognitivo|dificultades cognitivas)\b/,
      /\b(alucinaciones)\b.{0,50}\b(exclusivamente|solo)\s+(durante el sueno|al dormir)\b/
    ]
  ),

  funcionalidad: reglas(
    [
      /\b(perdida|perdio|ha perdido)\s+(de\s+|su\s+|la\s+)?(independencia|autonomia)\b/,
      /\b(deterioro|declive|compromiso|afectacion)\s+funcional\b/,
      /\b(dependencia)\s+(funcional|instrumental|en actividades|para actividades)\b/,
      /\b(actividades instrumentales|aivd)\b.{0,90}\b(afectadas|alteradas|deterioradas|dependencia|ayuda|supervision|dificultad)\b/,
      /\b(necesita|requiere)\s+(ayuda|supervision|apoyo)\b/,
      /\b(ya no puede|dejo de poder)\s+(manejar|administrar|organizar)\b/,
      /\b(esposa|familiar|cuidadora)\b.{0,80}\b(supervisa|ayuda|administra|organiza|prepara)\b/,
      /\b(supervision|ayuda|apoyo)\b.{0,80}\b(finanzas|cuentas|pagos|medicamentos|traslados)\b/,
      /\b(finanzas|cuentas|pagos|medicamentos|traslados)\b.{0,80}\b(supervision|ayuda|apoyo|dependencia)\b/
    ],
    [
      /\b(independencia|autonomia|funcionalidad)\s+(completamente\s+)?(conservada|preservada|intacta)\b/,
      /\b(conserva|mantiene)\s+(toda\s+)?(su\s+)?(independencia|autonomia|funcionalidad)\b/,
      /\b(sin|no presenta)\s+(dependencia funcional|deterioro funcional|perdida de independencia)\b/,
      /\b(no necesita|sin necesidad de)\s+(ayuda|supervision)\b/,
      /\b(actividades instrumentales|aivd)\s+(conservadas|independientes|intactas)\b/
    ]
  ),

  informante: reglas(
    [
      /\b(esposa|familiar|informante|cuidadora)\s+(confirma|corrobora|refiere|reporta|describe|nota|observa|explica|documenta)\b/,
      /\b(segun|de acuerdo con)\s+(su\s+|la\s+)?(esposa|familiar|informante|cuidadora)\b/,
      /\b(informacion|testimonio|reporte|relato)\s+(de|del|por)\s+(la\s+|su\s+)?(esposa|familiar|informante|cuidadora)\b/,
      /\b(corroborad[oa]s?|confirmad[oa]s?|referid[oa]s?|reportad[oa]s?)\s+(por|mediante)\s+(su\s+|la\s+|una\s+)?(esposa|familiar|informante|cuidadora)\b/,
      /\b(heteroanamnesis|informacion corroborada por la esposa)\b/,
      /\b(esposa)\b.{0,110}\b(suenos|fluctuaciones|alucinaciones|evolucion|deterioro|dependencia|parkinsonismo)\b/
    ],
    [
      /\b(esposa|familiar|informante|cuidadora)\s+(niega|descarta)\s+(los\s+)?(cambios|problemas|sintomas)\s+cognitivos\b/,
      /\b(no hay|sin)\s+(informante|corroboracion familiar|informacion familiar)\b/
    ]
  ),

  evaluacion_cognitiva: reglas(
    [
      /\b(moca|montreal cognitive assessment)\s*(es\s+de|es|de|:|=|con|fue|obtuvo)?\s*18\s*(\/|de)\s*30\b/,
      /\b18\s*(\/|de)\s*30\s*(en|de|del)\s*(el\s+)?moca\b/,
      /\b(moca|prueba cognitiva|tamizaje cognitivo)\b.{0,90}\b(alterad[oa]|baj[oa]|deterioro|deficit|afectacion|ejecutiv[oa]|atencion|visuoespacial)\b/,
      /\b(bradicinesia|rigidez)\b.{0,90}\b(exploracion|neurologica|marcha|braceo|pasos cortos)\b/,
      /\b(exploracion neurologica)\b.{0,90}\b(bradicinesia|rigidez|parkinsonismo|pasos cortos|marcha lenta)\b/,
      /\b(marcha)\s+(lenta|de pasos cortos)\b/,
      /\b(alteracion|deterioro)\s+cognitiv[oa]\s+(objetiv[oa]|significativ[oa])\b/
    ],
    [
      /\b(moca|prueba cognitiva|tamizaje cognitivo)\s+(es\s+)?(normal|intacto|sin alteraciones)\b/,
      /\b(moca)\s+(es|fue|resulta|esta)\s+normal\b/,
      /\bmoca\s*(es\s+de|es|de|:|=|con|fue)?\s*(30|24|17|16)\s*(\/|de)\s*30\b/,
      /\b(no hay|sin)\s+(alteraciones|dificultades)\s+(en\s+)?(el\s+)?moca\b/,
      /\b(no hay|sin)\s+(bradicinesia|rigidez|parkinsonismo)\b/
    ]
  ),

  diagnostico_diferencial: reglas(
    [
      /\b(diagnosticos diferenciales|diagnostico diferencial)\b/,
      /\b(considerar|descartar|diferenciar|evaluar|investigar|explorar)\b.{0,100}\b(alzheimer|parkinson|delirium|depresion|medicamentos|antipsicoticos|b12|tsh)\b/,
      /\b(regla de un ano|regla del ano)\b/,
      /\b(demencia con cuerpos de lewy|demencia por cuerpos de lewy|cuerpos de lewy probable)\b/,
      /\b(cognitiv|deterioro|demencia)\b.{0,100}\b(antes|precedio|precedieron|previo|anterior)\b.{0,70}\b(parkinsonismo|parkinson|motor|motores)\b/,
      /\b(parkinsonismo|parkinson|motor|motores)\b.{0,100}\b(despues|posterior|tras)\b.{0,70}\b(cognitiv|deterioro|demencia)\b/,
      /\b(polisomnografia)\b.{0,100}\b(pendiente|no realizada|no se realizo|sin confirmar|confirmacion)\b/,
      /\b(no hay|sin)\s+(polisomnografia|confirmacion polisomnografica|biomarcadores confirmatorios)\b/,
      /\b(resonancia|rm cerebral|neuroimagen)\b.{0,90}\b(inespecifica|no confirma|no excluye|sin lesiones explicativas)\b/,
      /\b(tsh|vitamina b12|b12)\b.{0,50}\b(normal|normales|sin alteraciones)\b/
    ],
    [
      /\b(polisomnografia)\b.{0,70}\b(confirmo|confirmada|demostro|positiva)\b/,
      /\b(trastorno de conducta del sueno rem)\b.{0,70}\b(confirmado por polisomnografia|confirmacion polisomnografica)\b/,
      /\b(enfermedad de parkinson)\b.{0,100}\b(anos antes|mucho antes|precedio|precedieron)\b.{0,70}\b(deterioro|demencia|cognitiv)\b/,
      /\b(resonancia|neuroimagen)\b.{0,90}\b(confirma|demuestra)\b.{0,70}\b(cuerpos de lewy)\b/,
      /\b(no es necesario|no requiere)\s+(descartar|considerar|evaluar)\s+(otras causas|diagnosticos diferenciales)\b/
    ]
  )
};

/*
 * REGISTRO DE REGLAS POR CASO
 */

const reglasPorCaso = {
  'caso-01': reglasElena,
  'caso-02': reglasMaria,
  'caso-03': reglasRoberto,
  'caso-04': reglasJorge
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
