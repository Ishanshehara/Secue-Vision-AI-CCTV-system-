import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type AlertStatus = 'new' | 'reviewing' | 'resolved';

type Alert = {
  id: number;
  title: string;
  date: string;
  location: string;
  confidence: number;
  status: AlertStatus;
  icon: string;
  color: string;
};

const alerts: Alert[] = [
  {
    id: 1,
    title: 'Front Entrance',
    date: '10/05/2025, 14:32:10',
    location: 'Main Building',
    confidence: 89,
    status: 'new',
    icon: 'warning',
    color: '#ef4444',
  },
  {
    id: 2,
    title: 'Warehouse',
    date: '10/05/2025, 12:15:45',
    location: 'Storage Area',
    confidence: 76,
    status: 'reviewing',
    icon: 'report-problem',
    color: '#f59e0b',
  },
  {
    id: 3,
    title: 'Parking Lot',
    date: '09/05/2025, 18:22:33',
    location: 'North Side',
    confidence: 92,
    status: 'resolved',
    icon: 'check-circle',
    color: '#22c55e',
  },
  {
    id: 4,
    title: 'Office Area',
    date: '10/05/2025, 13:45:02',
    location: 'Admin Block',
    confidence: 81,
    status: 'reviewing',
    icon: 'report-problem',
    color: '#f59e0b',
  },
];

const AlertsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Main Title */}
      <Text style={styles.header}>Alerts & History</Text>

      {/* Summary Boxes */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryNumber}>5</Text>
          <Text style={styles.summaryLabel}>Total</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryNumber}>1</Text>
          <Text style={styles.summaryLabel}>New</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryNumber}>3</Text>
          <Text style={styles.summaryLabel}>High Confidence</Text>
        </View>
      </View>

      {/* Subheading */}
      <View style={styles.subHeader}>
        <Text style={styles.subTitle}>Recent Alerts</Text>
        <MaterialIcons name="history" size={20} color="#94a3b8" />
      </View>

      {/* Alerts List */}
      <ScrollView style={styles.scrollArea}>
        {alerts.map((alert) => (
          <View key={alert.id} style={styles.alertCard}>
            <View style={styles.alertHeader}>
              <MaterialIcons name={alert.icon as any} size={20} color={alert.color} />
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <View style={[styles.statusTag, styles[alert.status]]}>
                <Text style={styles.statusText}>{alert.status}</Text>
              </View>
            </View>
            <Text style={styles.alertDetail}>
              {alert.date} • {alert.location}
            </Text>
            <Text style={styles.alertConfidence}>% {alert.confidence}</Text>
          </View>
        ))}

        {/* Panic Button */}
        <TouchableOpacity style={styles.panicButton}>
          <MaterialIcons name="error" size={20} color="#fff" />
          <Text style={styles.panicText}> Panic Button</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="dashboard" size={24} color="#fff" />
          <Text style={styles.navLabel}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="notifications" size={24} color="#facc15" />
          <Text style={[styles.navLabel, { color: '#facc15' }]}>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="image" size={24} color="#fff" />
          <Text style={styles.navLabel}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="cog" size={22} color="#fff" />
          <Text style={styles.navLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AlertsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  summaryNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryLabel: {
    color: '#94a3b8',
    marginTop: 4,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
  },
  scrollArea: {
    flex: 1,
    marginBottom: 70, // for nav bar
  },
  alertCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alertTitle: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    marginLeft: 8,
  },
  alertDetail: {
    color: '#cbd5e1',
    fontSize: 13,
    marginTop: 4,
  },
  alertConfidence: {
    color: '#ef4444',
    fontWeight: 'bold',
    marginTop: 6,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  new: {
    backgroundColor: '#ef4444',
  },
  reviewing: {
    backgroundColor: '#f59e0b',
  },
  resolved: {
    backgroundColor: '#22c55e',
  },
  panicButton: {
    flexDirection: 'row',
    backgroundColor: '#ef4444',
    borderRadius: 20,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  panicText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#1e293b',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: '#334155',
    borderTopWidth: 1,
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
});
