export interface AnalyticsStore {
    insertSearchLog(searchData: Record<string, any>, user: any): Promise<void>
}