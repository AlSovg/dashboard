import React from "react";
import styles from "./ClearSelectionButton.module.css";
import {useGroupsStore} from "../groupStore";

export const ClearSelectionButton: React.FC = () => {
    const { clearSelection, selectedGroupId, selectedNodeId } = useGroupsStore();

    const handleClear = () => {
        clearSelection();
    };

    // Показываем кнопку только если что-то выбрано
    if (!selectedGroupId && !selectedNodeId) return null;

    return (
        <button className={styles.clearButton} onClick={handleClear}>
            Сбросить фильтры
        </button>
    );
};
