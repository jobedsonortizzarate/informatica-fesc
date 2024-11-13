/**
 * Class: model.ts
 * Description:
 *
 * Identifica si un modelo es modelo.
 *
 *
 * @author Ángel Oswaldo Jiménez Pérez
 * @email aojimenezp@desarrollo-ultrasist.com.mx
 *
 * @created 29 de julio de 2023
 * @version 1.0
 * @category Modelo
 */

export class Modelo {
  /**
   * Proporciona todas las propiedades para ser visualizadas correctamente en los logs.
   *
   * @returns Entrega la informacion relacionada al modelo
   */
  public toString(): string {
    let resultado = '{';
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        if (Array.isArray(this[key])) {
          resultado += ' [ ';
          for (const iterator of this[key] as Array<Modelo>) {
            if (iterator) resultado += iterator.toString();
          }
          resultado += ' ] ';
        } else if (this[key]) {
          const compuesto = `${key}: ${this[key].toString()}, `;
          resultado += compuesto;
        }
      }
    }
    resultado += '}';
    return resultado;
  }

  /**
   * Crea instancia a partir de un objeto en bruto
   *
   * NOTA: No debe ser usada para mapear entre modelos,
   * unicamente es para convertir objetos en bruto
   * recibidos de fuentes externas.
   *
   * @param {T} constructor Clase a ser utilizada
   * @param {any} objeto Objeto en bruto
   * @returns {T} Instancia de clase
   */
  public static generarInstancia<T>(
    constructor: new () => T,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    objeto: any,
  ): T {
    return Object.assign( objeto);
  }
}
