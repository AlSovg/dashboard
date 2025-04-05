import React from "react";
import styles from "./GroupList.module.css";
import {useGroup} from "../useGroup";
import {GroupItem} from "../GroupItem/GroupItem";
import {StatusBlock} from "../StatusBlock/StatusBlock";
import {ClearSelectionButton} from "../ClearSelectionButton/ClearSelectionButton";

interface Props {
    className?: string;
}

//Список групп
export const GroupList: React.FC<Props> = ({className}) => {
    const { filteredGroups, selectedGroupId, selectGroup } = useGroup();

    return (
        <div className={`${styles.list} ${className}`}>
            <div className={styles.list__header}>
                <h1 className={styles.list__header__text}>Группы </h1>
                <StatusBlock/>
            </div>


            <ul className={styles.list__content}>
                {filteredGroups.map((group) => (
                    <GroupItem
                        key={group.group_id}
                        group={group}
                        isSelected={group.group_id === selectedGroupId}
                        onSelect={selectGroup}
                    />
                ))}
                <ClearSelectionButton/>
            </ul>
        </div>
    );
};
