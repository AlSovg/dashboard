import {useGroup} from "../useGroup";
import React from "react";
import styles from "./StatusBlock.module.css"

export const StatusBlock: React.FC = () => {
    const {worstStatusNode} = useGroup();

    if (!worstStatusNode) return <div>Нет данных о статусах</div>;

    return (
        <p className={styles.status}
           style={{backgroundColor: worstStatusNode.node_status_color, padding: 10, borderRadius: 10}}>
            Статус: {worstStatusNode.node_status_description}
        </p>
    );
};