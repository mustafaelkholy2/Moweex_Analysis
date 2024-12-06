import { Module } from '@nestjs/common';
import { ClickhouseService } from './clickhouseanalytics.service';

@Module({
  providers: [ClickhouseService]
})
export class AnalyticsModule { }
