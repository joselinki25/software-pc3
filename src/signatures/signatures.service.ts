import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SignaturesService {
  private readonly logger = new Logger(SignaturesService.name);

  // Base de Datos en memoria para la prueba
  private readonly tablaFirmas: Array<{
    propuestaId: string;
    dni: string;
    fecha: Date;
  }> = [];

  // Metodo principal
  async registrarFirma(propuestaId: string, dni: string) {
    this.logger.log(`[Servicio Real] Guardando firma en BD para DNI ${dni}`);

    const nuevaFirma = {
      propuestaId,
      dni,
      fecha: new Date(),
    };

    this.tablaFirmas.push(nuevaFirma);

    return {
      exito: true,
      mensaje: 'Firma registrada correctamente',
      totalFirmas: this.tablaFirmas.filter((f) => f.propuestaId === propuestaId)
        .length,
    };
  }

  // Metodo para que el Proxy pueda consultar si ya existe la firma
  obtenerFirmas() {
    return this.tablaFirmas;
  }
}
