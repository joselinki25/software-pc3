export interface IdentityValidator {
  /**
   * Verifica si un DNI corresponde a un ciudadano habilitado para firmar (debe ser mayor de edad)
   * @param dni Documento Nacional de Identidad
   * @returns true si es valido, false en caso contrario.
   */
  esCiudadanoValido(dni: string): Promise<boolean>;
}

// Token que usaremos para la inyeccion de dependencias en NestJS
export const IDENTITY_VALIDATOR_TOKEN = 'IdentityValidatorToken';
