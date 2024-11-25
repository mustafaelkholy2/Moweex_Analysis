import { ClickHouseClient, createClient } from "@clickhouse/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ClickhouseService {
    private client: ClickHouseClient

    constructor() {
        this.client = createClient({
            host: 'http://localhost:8123',
            database: 'products_analysis',
            username: 'default',
            password: '',
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