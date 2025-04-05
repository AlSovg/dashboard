import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import {Metric} from "../metricStore"
import styles from "./MetricChart.module.css"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface NodeMetricsChartProps {
    node: Metric
}

const getColor = (value: number) => {
    if (value > 95) return "rgba(255, 0, 0, 0.7)"; // Красный
    if (value > 85) return "rgba(255, 215, 0, 0.7)"; // Желтый
    return "rgba(54, 162, 235, 0.7)"; // Синий (по умолчанию)
};

export const MetricChart: React.FC<NodeMetricsChartProps> = ({ node }) => {
    const data = {
        labels: ["CPU", "RAM", "Disk"],
        datasets: [
            {
                label: "Использование (%)",
                data: [node.cpu_utilization, node.memory_utilization, node.disk_utilization],
                backgroundColor: [
                    getColor(node.cpu_utilization),
                    getColor(node.memory_utilization),
                    getColor(node.disk_utilization),
                ]
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
    };
    const date : string =    new Date(node.datetime).toLocaleDateString() + " " + new Date(node.datetime).toLocaleTimeString();

    return (
        <div className={styles.metric}>
            <Bar className={styles.metric__graph} data={data} options={options}/>
            <p className={styles.metric__text}>{date}</p>
        </div>
    );
};