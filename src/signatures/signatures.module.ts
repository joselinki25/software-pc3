import { Module } from '@nestjs/common';
import { SignaturesController } from './signatures.controller';
import { SignaturesService } from './signatures.service';
import { ReniecAdapter } from '../common/adapters/reniec.adapter';
import { IDENTITY_VALIDATOR_TOKEN } from '../common/interfaces/identity-validator.interface';

@Module({
  controllers: [SignaturesController],
  providers: [
    SignaturesService,
    {
      provide: IDENTITY_VALIDATOR_TOKEN, // Cuando alguien requiers este token
      useClass: ReniecAdapter, // se entregara una instancia de esta clase
    },
  ],
})
export class SignaturesModule {}
