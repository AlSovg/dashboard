import React from "react";
import {useNodeStore} from "./metricStore";
import {useGroupsStore} from "../groups/groupStore";

export const useMetric = () => {
    const {metrics, loading, error, fetchMetric, startAutoUpdate} = useNodeStore();
    const selectedNodeId = useGroupsStore((state) => state.selectedNodeId);

    const getFilteredMetrics = () => {
        return selectedNodeId
            ? metrics.filter((node) => node.node_id === selectedNodeId)
            : [];
    };


    React.useEffect(() => {
        fetchMetric().then();
        startAutoUpdate()
    }, [fetchMetric, startAutoUpdate]);

    return {
        filteredNodes: getFilteredMetrics(),
        loading,
        error
    }
};

