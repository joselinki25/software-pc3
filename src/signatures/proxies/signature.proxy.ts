import {
  Injectable,
  Inject,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { SignaturesService } from '../signatures.service';
import {
  IdentityValidator,
  IDENTITY_VALIDATOR_TOKEN,
} from 'src/common/interfaces/identity-validator.interface';

@Injectable()
export class SignatureProxy {
  private readonly logger = new Logger(SignatureProxy.name);

  // Simlamos la tabla de propuestas para validad la regla de los 90 dias
  private readonly mockPropuestas = [
    {
      id: 'prop-activa',
      titulo: 'Ley de Hierbas',
      fecha_publicacion: new Date('2026-05-01'),
    },
    {
      id: 'prop-vencida',
      titulo: 'Ley de Cimientos',
      fecha_publicacion: new Date('2025-01-01'),
    },
  ];

  constructor(
    @Inject(IDENTITY_VALIDATOR_TOKEN)
    private readonly validadorIdentidad: IdentityValidator,
    private readonly signaturesService: SignaturesService,
  ) {}

  async registrarFirma(propuestaId: string, dni: string) {
    this.logger.log(`
      [Proxy] Interceptando peticion de firma para DNI: ${dni}`);

    // 1: Validar Identidad
    const esCiudadanoValido =
      await this.validadorIdentidad.esCiudadanoValido(dni);

    if (!esCiudadanoValido) {
      this.logger.error(`[Proxy] Error: DNI ${dni} no es valido en RENIEC.`);
      throw new BadRequestException(
        'El ciudadano no esta habilitado para firmar.',
      );
    }
    // 2: Validar Plazo
    const propuesta = this.mockPropuestas.find((p) => p.id === propuestaId);
    if (!propuesta) throw new BadRequestException('Propuesta no encontrada.');

    const milisegPorDia = 1000 * 60 * 60 * 24;
    const diasTranscurridos =
      new Date().getTime() -
      propuesta.fecha_publicacion.getTime() / milisegPorDia;

    if (diasTranscurridos > 90) {
      this.logger.error(
        `[Proxy] Error: Plazo expirado. Dias transcurridos: ${Math.floor(diasTranscurridos)}`,
      );
      throw new BadRequestException(
        'El plazo valido de 90 dias ha expirado para esta propuesta.',
      );
    }

    // Si cumplio todas las validaciones, el proxy permite el paso al servicio real
    this.logger.log(
      `[Proxy] Validaciones exitosas. Delegando al servicio real...`,
    );
    return this.signaturesService.registrarFirma(propuestaId, dni);
  }
}
