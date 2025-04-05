import React from "react";
import styles from "./NodeItem.module.css";
import {Node} from "../types"
import {getColor} from "../groupLib";

interface NodeItemProps {
    node: Node;
    isSelected: boolean;
    onSelect: (groupId: number) => void;
}


export const NodeItem: React.FC<NodeItemProps> = ({ node, onSelect, isSelected }) => {
    return (
        <div
            onClick={() => onSelect(node.node_id)}
            className={`${styles.nodeItem} ${isSelected ? styles.selected : ""}`
            }
        >
            <h1 className={styles.nodeItem__status} style={{color : node.node_status_color}}>{node.node_status_description}</h1>
            <p className={styles.nodeItem__caption}>{node.node_caption}</p>
            <div className={styles.nodeItem__metrics}>
                <p className={styles.nodeItem__metric} style={{color: getColor(node.cpu_utilization)}}>CPU: {node.cpu_utilization}%</p>
                <p className={styles.nodeItem__metric}  style={{color: getColor(node.memory_utilization)}}>RAM: {node.memory_utilization}%</p>
                <p className={styles.nodeItem__metric}  style={{color: getColor(node.disk_utilization)}}>DISK: {node.disk_utilization}%</p>
            </div>
        </div>
    );
};

