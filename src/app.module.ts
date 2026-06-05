import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProposalsModule } from './proposals/proposals.module';
import { SignaturesModule } from './signatures/signatures.module';
import { CongressModule } from './congress/congress.module';

@Module({
  imports: [ProposalsModule, SignaturesModule, CongressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
