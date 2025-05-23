SELECT
    m.id AS metric_id,
    m.datetime,
    m.cpu_utilization,
    m.memory_utilization,
    m.disk_utilization,
    n.id AS node_id,
    n.caption AS node_caption
FROM metrics m
LEFT JOIN nodes n ON m.node_id = n.id;