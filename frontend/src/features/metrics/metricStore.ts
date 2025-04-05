import { create } from 'zustand';
import { z } from 'zod';
import axios from 'axios';

const MetricSchema = z.object({
    metric_id: z.number(),
    datetime: z.string(),
    cpu_utilization: z.number().min(0).max(100),
    memory_utilization: z.number().min(0).max(100),
    disk_utilization: z.number().min(0).max(100),
    node_id: z.number(),
    node_caption: z.string(),
});

export type Metric = z.infer<typeof MetricSchema>;

interface NodesState {
    metrics: Metric[];
    loading: boolean;
    error: string | null;
    fetchMetric: () => Promise<void>;
    startAutoUpdate: () => void;
}

let intervalId: NodeJS.Timeout | null = null;

export const useNodeStore = create<NodesState>((set, get) => ({
    metrics: [],
    loading: false,
    error: null,
    fetchMetric: async () => {
        set({ loading: true });

        try {
            const response = await axios.get<Metric[]>("/api/metrics");
            const validatedData = response.data.map((node) => MetricSchema.parse(node));
            set({ metrics: validatedData, loading: false });
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            set({ error: 'Ошибка загрузки данных', loading: false });
        }
    },

    startAutoUpdate: () => {
        if (!intervalId) {
            intervalId = setInterval(() => {
                get().fetchMetric();
            }, 60000);
        }
    },
}));
