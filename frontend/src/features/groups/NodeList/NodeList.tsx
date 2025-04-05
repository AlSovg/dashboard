import React from 'react';
import {NodeItem} from "../NodeItem/NodeItem";
import {useGroup} from "../useGroup";
import {MetricList} from "../../metrics/MetricList/MetricList";
import styles from "./NodeList.module.css"

interface Props {
    className?: string;
}


export const NodeList: React.FC<Props> = ({className}) => {
    const {filteredNodes, loading, error, selectNode, selectedNodeId, selectedNode} = useGroup();

    if (loading) return <div className={styles["nodes__loading"]}>Загрузка...</div>;
    if (error) return <div className={styles["nodes__error"]}>Ошибка: {error}</div>;

    return (
        <div className={`${styles.nodes} ${className}`}>
            <div className={styles.list}>
                <h1 className={styles.list__header}>Ноды</h1>
                <ul className={styles.list__content}>
                    {filteredNodes.map((node, index) => (
                        <NodeItem
                            key={`${node.node_id}-${index}`}
                            node={node}
                            onSelect={selectNode}
                            isSelected={node.node_id === selectedNodeId}
                        />
                    ))}
                </ul>
            </div>

            <div className={styles.list}>
                <MetricList className={styles.metrics}/>
                {
                    selectedNodeId ?
                        <div className={styles.statistic}>
                            {
                                selectedNode?.interface_status ?
                            <div className={styles.statistic__item}>
                                <h3 className={styles.statistic__item__header}>Интерфейс</h3>
                                <p className={styles.statistic__item__text}>Id: {selectedNode?.interface_id}</p>
                                <p className={styles.statistic__item__text}>Имя: {selectedNode?.interface_caption}</p>
                                <p className={styles.statistic__item__text}>Статус: {selectedNode?.interface_status}</p>
                            </div> : ""}

                            <div className={styles.statistic__item}>
                                <h3 className={styles.statistic__item__header}>Администратор</h3>
                                <p>Id: {selectedNode?.admin_id}</p>
                                <p>Имя: {selectedNode?.admin_name}</p>
                            </div>
                            <div className={styles.statistic__item}>
                                <h3 className={styles.statistic__item__header}>Приложение</h3>
                                <p className={styles.statistic__item__text}>Id: {selectedNode?.application_id}</p>
                                <p className={styles.statistic__item__text}>Имя: {selectedNode?.application_caption}</p>
                            </div>
                        </div> : ""
                }

            </div>
        </div>
    );
};
