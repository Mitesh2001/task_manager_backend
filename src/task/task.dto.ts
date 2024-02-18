export class TaskCreateDto {
    readonly title: string;
    readonly description?: string;
    readonly status: string;
    readonly due_date?: string;
    readonly creationDate?: string;
    readonly lastUpdatedDate?: string;
    readonly comments?: string;
}