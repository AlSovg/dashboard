import {create} from "zustand";
import axios from "axios";
import {Group, Node, GroupData} from "./types";
import {mapGroupData} from "./groupLib";

type GroupState = {
    groups: Group[];
    nodes: Node[];
    selectedGroupId: number | null;
    selectedNodeId: number | null;
    selectedNode: Node | null;
    loading: boolean;
    error: string | null;
    fetchGroups: () => Promise<void>;
    onGroupSelect: (groupId: number) => void;
    onNodeSelect: (nodeId: number) => void;
    clearSelection: () => void;
    startAutoUpdate: () => void;
};
let intervalId: NodeJS.Timeout | null = null;

export const useGroupsStore = create<GroupState>((set, get) => ({
    groups: [],
    nodes: [],
    selectedGroupId: null,
    selectedNodeId: null,
    selectedNode: null,
    loading: false,
    error: null,

    //Получение данных с апи
    fetchGroups: async () => {
        set({loading: true});
        try {
            const response = await axios.get<GroupData[]>("/api/groups");
            const {groups, nodes} = mapGroupData(response.data);
            set({
                groups,
                nodes,
                loading: false
            });
        } catch (error) {
            set({
                loading: false,
                error: "Ошибка при загрузке групп."
            });
        }
    },

    // Выбор группы
    onGroupSelect: (groupId: number) => set({selectedGroupId: groupId, selectedNodeId: 0,}),

    // Выбор ноды
    onNodeSelect: (nodeId: number) => {
        const node = get().nodes.find((n) => n.node_id === nodeId);
        if (node) {
            set({selectedNodeId: nodeId, selectedNode: node});
        }
    },

    // Сброс выбора
    clearSelection: () => set({selectedGroupId: null, selectedNodeId: null}),

    //Обновление раз в минуту
    startAutoUpdate: () => {
        if (!intervalId) {
            intervalId = setInterval(() => {
                get().fetchGroups();
            }, 60000);
        }
    },
}));