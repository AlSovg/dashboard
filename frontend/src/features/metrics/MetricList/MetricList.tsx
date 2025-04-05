import React from 'react';
import {useMetric} from "../useMetric";
import {MetricChart} from "../MetricChart/MetricChart";
import styles from "./MetricList.module.css";

interface Props {
    className?: string;
}

//Список графиков метрик
export const MetricList: React.FC<Props> = ({className}) => {
    const {filteredNodes} = useMetric()

    if (filteredNodes.length === 0) {
        return(<div className={`${className} ${styles["metric"]}`}>
            <h1 className={styles.metrics__header}>Метрики</h1>
                <div className={styles["metrics__items"]}>
                    <h2 className={styles.metrics__header}>Выберите ноду</h2>
                </div>
            </div>
        )
    }
    return (
        <div className={`${className} ${styles["metric"]}`}>
            <h1 className={styles.metrics__header}>Метрики</h1>
            <div className={styles["metrics__items"]}>
                {
                    filteredNodes.map((node, index) => (
                        <MetricChart key={`${node.node_id}-${index}`} node={node}/>
                    ))
                }
            </div>
        </div>
    );
};

