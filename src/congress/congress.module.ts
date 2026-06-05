import { Module } from '@nestjs/common';
import { CongressService } from './congress.service';

@Module({
  providers: [CongressService]
})
export class CongressModule {}
