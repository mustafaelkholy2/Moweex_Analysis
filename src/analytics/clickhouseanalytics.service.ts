import { ClickHouseClient, createClient } from "@clickhouse/client";
import { Injectable } from "@nestjs/common";
import { AnalyticsStore } from "./analytics.interface";

@Injectable()
export class ClickhouseService implements AnalyticsStore {
    private client: ClickHouseClient

    constructor() {
        this.client = createClient({
            host: 'http://localhost:8123/',
            database: 'moweex_analysis',
            username: 'default',
            password: 'default',
        })
    }

    async insertSearchLog(searchData: any, user: any) {

        const now = new Date();
        const search_date = now.toISOString().slice(0, 19).replace('T', ' '); // "yyyy-MM-dd HH:mm:ss"

        const searchLogs = searchData.map(data => ({
            product_name: data.productName,
            user_id: user.id,
            user_email: user.email,
            search_date: search_date,
        }));

        await this.client.insert({
            table: 'search_logs',
            values: [searchLogs],
            format: 'JSONEachRow',
        });
    }

}
