import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HealthModule } from './modules/health/health.module';
import { LoggingInterceptor } from './common/logging.interceptor';
import { IbexModule } from './modules/ibex/ibex.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    HealthModule,
    IbexModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
