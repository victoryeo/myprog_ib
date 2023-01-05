import { Module } from '@nestjs/common';
import { HftradingController } from './hftrading.controller';
import { HftradingService } from './hftrading.service';
import { IbexModule } from '../ibex/ibex.module';

@Module({
  imports: [
    IbexModule,
  ],
  controllers: [HftradingController],
  providers: [HftradingService],
})

export class HftradingModule {}
