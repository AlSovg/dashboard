import React, {useCallback, useMemo} from "react";
import {useGroupsStore} from "./groupStore";
import {STATUS_PRIORITY} from "./types";

export const useGroup = () => {
    const { groups, nodes, selectedGroupId, selectedNodeId, error, loading, fetchGroups, onGroupSelect, onNodeSelect, selectedNode } = useGroupsStore();

    React.useEffect(() => {
        fetchGroups().then();
    }, [fetchGroups]);

    // Фильтруем и сортируем группы по выбранной ноде
    const filteredGroups = React.useMemo(() => {
        const seen = new Set<number>();
        return groups
            .filter((group) =>
                selectedNodeId ? group.node_id === selectedNodeId : true
            )
            .filter((group) => {
                if (seen.has(group.group_id)) return false;
                seen.add(group.group_id);
                return true;
            });
    }, [groups, selectedNodeId]);

    // Фильтруем и сортируем ноды по выбранной группе
    const filteredNodes = React.useMemo(() => {
        return nodes
            .filter((node) => {
                if (selectedGroupId) {
                    return node.group_id === selectedGroupId;
                }
                return true;
            })
    }, [nodes, selectedGroupId]);


    const worstStatusNode = useMemo(() => {
        if (!filteredNodes.length) return null;

        return filteredNodes.reduce((worst, current) => {
            const priority = STATUS_PRIORITY[current.node_status_color] ?? 0;
            const worstPriority = STATUS_PRIORITY[worst.node_status_color] ?? 0;
            return priority > worstPriority ? current : worst;
        }, filteredNodes[0]);
    }, [filteredNodes]);

    // Функция для выбора группы
    const selectGroup = useCallback((groupId: number) => {
        onGroupSelect(groupId);
    }, [onGroupSelect]);

    // Функция для выбора ноды
    const selectNode = useCallback((nodeId: number) => {
        onNodeSelect(nodeId);
    }, [onNodeSelect]);

    return {
        filteredGroups,
        selectGroup,
        selectedGroupId,
        loading,
        error,
        filteredNodes,
        selectNode,
        selectedNodeId,
        worstStatusNode,
        selectedNode
    };
};

