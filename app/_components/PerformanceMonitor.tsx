import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { usePerformanceMetrics } from "../hooks/usePerformanceMetrics";

interface PerformanceMonitorProps {
  visible?: boolean;
  onToggle?: () => void;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  visible = false,
  onToggle,
}) => {
  const { metrics, networkInfo, getPerformanceGrade, recommendations } =
    usePerformanceMetrics();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = useCallback(() => {
    setIsExpanded(!isExpanded);
    onToggle?.();
  }, [isExpanded, onToggle]);

  const performanceGrade = useMemo(
    () => getPerformanceGrade,
    [getPerformanceGrade]
  );

  const gradeColor = useMemo(() => {
    switch (performanceGrade) {
      case "A":
        return "#4CAF50";
      case "B":
        return "#8BC34A";
      case "C":
        return "#FFC107";
      case "D":
        return "#FF9800";
      case "F":
        return "#F44336";
      default:
        return "#757575";
    }
  }, [performanceGrade]);

  if (!visible && !__DEV__) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.toggleButton, { backgroundColor: gradeColor }]}
        onPress={handleToggle}
      >
        <Text style={styles.toggleText}>
          {performanceGrade} {isExpanded ? "▼" : "▲"}
        </Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.panel}>
          <View style={styles.header}>
            <Text style={styles.title}>Performance Monitor</Text>
            <Text style={[styles.grade, { color: gradeColor }]}>
              Grade: {performanceGrade}
            </Text>
          </View>

          <View style={styles.metricsGrid}>
            <MetricItem
              label="Load Time"
              value={`${metrics.loadTime}ms`}
              status={
                metrics.loadTime < 1000
                  ? "good"
                  : metrics.loadTime < 2000
                  ? "warning"
                  : "poor"
              }
            />
            <MetricItem
              label="Memory"
              value={`${metrics.memoryUsage}MB`}
              status={
                metrics.memoryUsage < 50
                  ? "good"
                  : metrics.memoryUsage < 100
                  ? "warning"
                  : "poor"
              }
            />
            <MetricItem
              label="Frame Drops"
              value={metrics.frameDrops.toString()}
              status={
                metrics.frameDrops < 5
                  ? "good"
                  : metrics.frameDrops < 10
                  ? "warning"
                  : "poor"
              }
            />
            <MetricItem
              label="Interaction"
              value={`${metrics.interactionLatency.toFixed(1)}ms`}
              status={
                metrics.interactionLatency < 50
                  ? "good"
                  : metrics.interactionLatency < 100
                  ? "warning"
                  : "poor"
              }
            />
          </View>

          {networkInfo && (
            <View style={styles.networkSection}>
              <Text style={styles.sectionTitle}>Network</Text>
              <Text style={styles.networkText}>
                {networkInfo.effectiveType.toUpperCase()} -{" "}
                {networkInfo.downlink}Mbps - {networkInfo.rtt}ms RTT
              </Text>
            </View>
          )}

          {recommendations.length > 0 && (
            <View style={styles.recommendationsSection}>
              <Text style={styles.sectionTitle}>Recommendations</Text>
              {recommendations.map((rec, index) => (
                <Text key={index} style={styles.recommendation}>
                  • {rec}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

interface MetricItemProps {
  label: string;
  value: string;
  status: "good" | "warning" | "poor";
}

const MetricItem: React.FC<MetricItemProps> = ({ label, value, status }) => {
  const statusColor = {
    good: "#4CAF50",
    warning: "#FFC107",
    poor: "#F44336",
  }[status];

  return (
    <View style={styles.metricItem}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, { color: statusColor }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: Platform.OS === "web" ? 10 : 50,
    right: 10,
    zIndex: 9999,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 50,
    alignItems: "center",
  },
  toggleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  panel: {
    marginTop: 5,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderRadius: 8,
    padding: 12,
    minWidth: 250,
    maxWidth: 300,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  grade: {
    fontWeight: "bold",
    fontSize: 14,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  metricItem: {
    width: "48%",
    marginBottom: 8,
  },
  metricLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 10,
    marginBottom: 2,
  },
  metricValue: {
    fontWeight: "bold",
    fontSize: 12,
  },
  networkSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
  },
  sectionTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 4,
  },
  networkText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 10,
  },
  recommendationsSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
  },
  recommendation: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 10,
    marginBottom: 2,
  },
});

export default PerformanceMonitor;
