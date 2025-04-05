//Тип группы для запроса /api/groups
export type Group = {
    group_id: number;
    group_caption: string;
    node_id: number;
};
//Тип ноды для запроса /api/groups
export type Node = {
    node_id: number;
    node_caption: string;
    node_status_color: string;
    node_status_description: string;
    interface_id: number | null;
    interface_caption: string | null;
    interface_status: string | null;
    application_id: number;
    application_caption: string;
    admin_id: number;
    admin_name: string;
    group_id : number;
    cpu_utilization : number,
    memory_utilization : number,
    disk_utilization : number
};

export type GroupData = Group & Node

//Статус
export const STATUS_PRIORITY: Record<string, number> = {
    darkred: 5,
    red: 4,
    yellow: 3,
    grey: 2,
    lightgreen: 1
};