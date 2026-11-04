# ISLR Venezuela · Calcula y comprende

Calculadora web orientativa para personas naturales residentes en Venezuela. Distingue asalariados e independientes, criterio general de declaración, impuesto causado y saldo tras retenciones.

## Uso

Abre `dist/index.html` en un navegador. No necesita instalación, servidor ni cuenta. Los ingresos se procesan en el navegador y no se envían a un servicio.

Incluye ingreso mensual Bs/USD, tasa y UT editables, gastos deducibles de actividad para independientes, ingresos anuales adicionales, desgravamen único de 774 UT y rebaja personal de 10 UT. No incluye cargas familiares ni desgravámenes detallados.

## Modelo y límites

- Ingreso anual: 12 mensualidades más ingresos adicionales.
- Enriquecimiento neto: ingreso bruto menos gastos fiscalmente admitidos de actividad para independientes.
- Criterio general de declaración: neto anual > 1.000 UT **o** bruto anual > 1.500 UT, para ambos perfiles; se evalúa antes del desgravamen.
- Base: máximo entre cero y neto menos 774 UT.
- Tarifa N.º 1 progresiva: 6%, 9%, 12%, 16%, 20%, 24%, 29% y 34% por fracciones.
- Impuesto causado: tarifa menos 10 UT de rebaja personal, con mínimo cero.
- Saldo: impuesto causado menos retenciones/anticipos acreditables, con mínimo cero; el exceso se muestra por separado.

La UT predeterminada de Bs 43 corresponde a una referencia de junio de 2025, no certifica su aplicación a cualquier ejercicio. La tasa Bs 900/USD es ilustrativa, no una cotización BCV. Confirma parámetros, conceptos gravables, exoneraciones y normas del ejercicio con un profesional. Una sola tasa simplifica el escenario y no sustituye la conversión fiscal de las operaciones. La equivalencia mensual no es una cuota ni retención obligatoria.

No cubre regímenes especiales, no residentes, rentas mixtas o extranjeras, pérdidas, dividendos ni ganancias de capital. La página contiene los supuestos completos y enlaces normativos. No constituye una liquidación oficial ni asesoría tributaria.

## Fuentes

- [Ley de ISLR, Gaceta 6.210 extraordinario, 30/12/2015](https://tributos.ivecofi.net/informacion/legislacion/leyes/ley-impuesto-sobre-renta): arts. 27, 31, 50, 56, 58, 59 y 77.
- [Referencia sobre UT, Providencia SNAT/2025/000048](https://www.pwc.com/ve/es/assets/documentos/stl/NAC-Reajuste-Valor-UT-Junio2025-v3-2.pdf).

Revisión documental del modelo: 4 de noviembre de 2026; no certifica la vigencia integral del régimen para un ejercicio específico.

## Pruebas y publicación

Con Node.js, ejecuta `node test.cjs`. Incluye 33 comprobaciones de tramos, continuidad, límites, conversión monetaria, gastos, retenciones y valores inválidos.

GitHub Actions verifica las pruebas y publica únicamente `dist/` en GitHub Pages al actualizar `main`. En Settings → Pages selecciona GitHub Actions como fuente de publicación.
