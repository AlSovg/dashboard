import React from "react";
import styles from "./GroupItem.module.css";

interface GroupItemProps {
    group: {
        group_id: number;
        group_caption: string;
    };
    isSelected: boolean;
    onSelect: (groupId: number) => void;
}

export const GroupItem: React.FC<GroupItemProps> = ({ group, isSelected, onSelect }) => {
    return (
        <li
            className={`${styles.listItem} ${isSelected ? styles.selected : ""}`}
            onClick={() => onSelect(group.group_id)}
        >
            {group.group_caption}
        </li>
    );
};
