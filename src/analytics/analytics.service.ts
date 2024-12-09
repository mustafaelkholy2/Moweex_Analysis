import { Inject, Injectable } from '@nestjs/common';
import { AnalyticsStore } from './analytics.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AnalyticsService {
    private analyticsStore: AnalyticsStore

    constructor(@Inject('AnalyticsStore') private analyticsStores: AnalyticsStore[],
        private configService: ConfigService
    ) {
        this.analyticsStore = this.selectDatabase()
    }

    private selectDatabase(): AnalyticsStore {
        const dbType = this.configService.get<string>('analyticsDatabaseType')
        const selectedDatabase = this.analyticsStores.find(store => store.constructor.name.toLowerCase() === dbType.toLowerCase())
        if (!selectedDatabase) {
            throw new Error(`Database type ${dbType} is not supported`);
        }
        return selectedDatabase
    }

    async insertSearchLog(searchData: Record<string, any>, user: any): Promise<void> {
        await this.analyticsStore.insertSearchLog(searchData, user)
    }
}
