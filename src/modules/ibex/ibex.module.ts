import { Module } from '@nestjs/common';
import { IbexController } from './ibex.controller';
import { IbexService } from './ibex.service';

@Module({
  controllers: [IbexController],
  providers: [IbexService],
  exports: [IbexService],
})

export class IbexModule {}
