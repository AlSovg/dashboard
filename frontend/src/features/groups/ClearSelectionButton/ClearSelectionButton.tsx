import React from "react";
import styles from "./ClearSelectionButton.module.css";
import {useGroup} from "../useGroup";


//Кнопка очистки фильтров
export const ClearSelectionButton: React.FC = () => {
    const { selectedNodeId, selectedGroupId, handleClear } = useGroup();

    // Показываем кнопку только если что-то выбрано
    if (!selectedGroupId && !selectedNodeId) return null;

    return (
        <button className={styles.clearButton} onClick={handleClear}>
            Сбросить фильтры
        </button>
    );
};
