import { ClickHouseClient, createClient } from "@clickhouse/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ClickhouseService {
    private client: ClickHouseClient

    constructor() {
        this.client = createClient({
            host: 'http://localhost:8123',
            database: 'moweex_analysis',
            username: 'default',
            password: 'default',
        })
    }

    async insertSearchLog(searchData: any) {
        console.log(searchData)
        await this.client.insert({
            table: 'search_logs',
            values: [searchData],
            format: 'JSONEachRow',
        });
    }
}
