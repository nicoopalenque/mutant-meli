import { Module } from '@nestjs/common';
import { MutantRecruitModule } from './modules/mutant-recruit.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsEntity } from './entities/stats.estity';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/global-exceptions';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/database.sqlite',
      entities: [StatsEntity],
      synchronize: true,
    }),
    MutantRecruitModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule { }