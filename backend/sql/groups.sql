WITH latest_metrics AS (
    SELECT
        m.node_id,
        m.cpu_utilization,
        m.memory_utilization,
        m.disk_utilization,
        m.datetime,
        ROW_NUMBER() OVER (PARTITION BY m.node_id ORDER BY m.datetime DESC) AS rn
    FROM metrics m
)
SELECT
    g.id AS group_id,
    g.caption AS group_caption,
    n.id AS node_id,
    n.caption AS node_caption,
    s.color AS node_status_color,
    s.description AS node_status_description,
    i.id AS interface_id,
    i.caption AS interface_caption,
    i.status AS interface_status,
    a.id AS application_id,
    a.caption AS application_caption,
    u.id AS admin_id,
    u.firstname || ' ' || u.lastname AS admin_name,

    lm.cpu_utilization,
    lm.memory_utilization,
    lm.disk_utilization,
    lm.datetime AS last_metric_time

FROM groups g
LEFT JOIN groups_nodes gn ON g.id = gn.group_id
LEFT JOIN nodes n ON gn.node_id = n.id
LEFT JOIN statuses s ON n.status = s.id
LEFT JOIN interfaces i ON n.interface = i.id
LEFT JOIN nodes_applications na ON n.id = na.node_id
LEFT JOIN applications a ON na.application_id = a.id
LEFT JOIN users u ON n.admin = u.id

LEFT JOIN latest_metrics lm ON n.id = lm.node_id AND lm.rn = 1;
