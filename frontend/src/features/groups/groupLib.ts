import {Group, GroupData, Node} from "./types";


export const mapGroupData = (groupData: GroupData[]): { groups: Group[], nodes: Node[] } => {
    const groups: Group[] = [];
    const nodes: Node[] = [];

    groupData.forEach(item => {
        // Маппим группу
        const group: Group = {
            group_id: item.group_id,
            group_caption: item.group_caption,
            node_id: item.node_id
        };

        // Маппим ноду
        const node: Node = {
            node_id: item.node_id,
            node_caption: item.node_caption,
            node_status_color: item.node_status_color,
            node_status_description: item.node_status_description,
            interface_id: item.interface_id,
            interface_caption: item.interface_caption,
            interface_status: item.interface_status,
            application_id: item.application_id,
            application_caption: item.application_caption,
            cpu_utilization : item.cpu_utilization,
            memory_utilization : item.memory_utilization,
            disk_utilization : item.disk_utilization,
            admin_id: item.admin_id,
            admin_name: item.admin_name,
            group_id : item.group_id,
        };

        groups.push(group);
        nodes.push(node);
    });

    return { groups, nodes };
};

export const getColor = (value: number) => {
    if (value > 95) return "rgba(255, 0, 0, 0.9)"; // Красный
    if (value > 85) return "rgba(255, 215, 0, 0.98)"; // Желтый
    return "rgb(54, 162, 235)"; // Синий (по умолчанию)
};
