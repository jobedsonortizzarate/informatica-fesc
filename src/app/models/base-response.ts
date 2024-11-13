import { Modelo } from '../utils/modelo';

/**
 * Class: catalogo-view.ts
 * Description:
 *
 * Representa la Respuesta (genérica) para un catálogo,
 * que incluye información como código, mensaje,
 * identificador de correlación y datos asociados.
 *
 * Implementa la interfaz Modelo
 *
 * @author Pavel Perez Vargas
 * @email pperezv@desarrollo-ultrasist.com.mx
 *
 * @typeparam T - Tipo de dato genérico para los datos asociados en la respuesta.
 * @created 28 de julio de 2023
 * @version 1.0
 * @category Response
 */
export class BaseResponse<T> extends Modelo {
  code: string = "";
  internalCode: string = "";
  message: string = "";
  correlationId: string = "";
  data: T | null = null;
}
