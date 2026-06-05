import { Injectable, Logger } from '@nestjs/common';
import { IdentityValidator } from '../interfaces/identity-validator.interface';

// Esta clase se hace pasar como si fuera RENIEC.

@Injectable()
export class ReniecAdapter implements IdentityValidator {
  private readonly logger = new Logger(ReniecAdapter.name);

  async esCiudadanoValido(dni: string): Promise<boolean> {
    this.logger.log(
      `[Adapter] Simulando consulta a los servidores de RENIEC para el DNI: ${dni}...`,
    );

    // Simulamos un retrado de red de un segundo
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // LOGICA MOCK
    // Solo aceptaremos el DNI "12345678" como un ciudadano valido
    if (dni === '12345678') {
      this.logger.log(
        `[Adapter] Respuesta RENIEC: Ciudadano ${dni} validado exitosamente.`,
      );
      return true;
    }

    this.logger.warn(
      `[Adapter] Respuesta RENIEC: DNI ${dni} no encontrado o inhabilitado.`,
    );
    return false;
  }
}
