import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  Animated 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Filter, ChevronRight, CircleAlert as AlertCircle, Calendar, ArrowDownUp } from 'lucide-react-native';
import { colors } from '@/constants/Colors';
import Header from '@/components/Header';
import { mockAlerts } from '@/data/mockData';
import AlertItem from '@/components/AlertItem';
import FilterModal from '@/components/FilterModal';

export default function AlertsScreen() {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [expandedAlertId, setExpandedAlertId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  
  const toggleExpandAlert = (id: string) => {
    setExpandedAlertId(expandedAlertId === id ? null : id);
  };
  
  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    setSortOrder(newSortOrder);
    
    const sortedAlerts = [...alerts].sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return newSortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
    
    setAlerts(sortedAlerts);
  };
  
  const renderHeader = () => (
    <View style={styles.listHeader}>
      <View style={styles.listHeaderTop}>
        <Text style={styles.listTitle}>Recent Alerts</Text>
        
        <View style={styles.listHeaderActions}>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Filter size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.sortButton}
            onPress={toggleSortOrder}
          >
            <ArrowDownUp size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{alerts.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{alerts.filter(a => a.status === 'new').length}</Text>
          <Text style={styles.statLabel}>New</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {alerts.filter(a => a.confidence >= 80).length}
          </Text>
          <Text style={styles.statLabel}>High Confidence</Text>
        </View>
      </View>
    </View>
  );
  
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <AlertCircle size={64} color={colors.textSecondary} style={styles.emptyIcon} />
      <Text style={styles.emptyTitle}>No Alerts Found</Text>
      <Text style={styles.emptyDescription}>
        There are no alerts matching your current filters.
      </Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header title="Alerts & History" />
      
      <FlatList
        data={alerts}
        renderItem={({ item }) => (
          <AlertItem 
            alert={item} 
            isExpanded={expandedAlertId === item.id}
            onToggleExpand={() => toggleExpandAlert(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
      />
      
      <TouchableOpacity style={styles.panicButton}>
        <AlertCircle size={24} color="#FFFFFF" />
        <Text style={styles.panicButtonText}>Panic Button</Text>
      </TouchableOpacity>
      
      <FilterModal 
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={(filters) => {
          console.log('Applied filters:', filters);
          setShowFilterModal(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: 120,
  },
  listHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  listHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  listTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.textPrimary,
  },
  listHeaderActions: {
    flexDirection: 'row',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sortButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 60,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  emptyDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  panicButton: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: colors.alert,
    borderRadius: 28,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panicButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});