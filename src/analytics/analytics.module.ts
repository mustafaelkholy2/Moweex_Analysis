import { Module } from '@nestjs/common';
import { ClickhouseService } from './clickhouseanalytics.service';
import { AnalyticsService } from './analytics.service';

@Module({
  providers: [
    AnalyticsService,
    ClickhouseService,
    {
      provide: 'AnalyticsStore',
      useFactory: (
        clickhouse: ClickhouseService,
      ) => [clickhouse],
      inject: [ClickhouseService],
    }
  ],
  exports: [AnalyticsService]
})
export class AnalyticsModule { }
