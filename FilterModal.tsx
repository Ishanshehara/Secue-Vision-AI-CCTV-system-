import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TouchableWithoutFeedback
} from 'react-native';
import { Calendar, X, CircleAlert as AlertCircle, ArrowUpDown } from 'lucide-react-native';
import { colors } from '@/constants/Colors';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

export default function FilterModal({ visible, onClose, onApplyFilters }: FilterModalProps) {
  const [dateRange, setDateRange] = useState('today');
  const [confidenceLevel, setConfidenceLevel] = useState('all');
  const [status, setStatus] = useState('all');
  
  const handleApplyFilters = () => {
    onApplyFilters({
      dateRange,
      confidenceLevel,
      status
    });
  };
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filter Alerts</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <X size={20} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.filterSection}>
                <View style={styles.filterHeader}>
                  <Calendar size={20} color={colors.primary} />
                  <Text style={styles.filterTitle}>Date Range</Text>
                </View>
                
                <View style={styles.optionsContainer}>
                  <TouchableOpacity 
                    style={[
                      styles.optionButton,
                      dateRange === 'today' && styles.optionButtonSelected
                    ]}
                    onPress={() => setDateRange('today')}
                  >
                    <Text style={[
                      styles.optionText,
                      dateRange === 'today' && styles.optionTextSelected
                    ]}>Today</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.optionButton,
                      dateRange === 'week' && styles.optionButtonSelected
                    ]}
                    onPress={() => setDateRange('week')}
                  >
                    <Text style={[
                      styles.optionText,
                      dateRange === 'week' && styles.optionTextSelected
                    ]}>This Week</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.optionButton,
                      dateRange === 'month' && styles.optionButtonSelected
                    ]}
                    onPress={() => setDateRange('month')}
                  >
                    <Text style={[
                      styles.optionText,
                      dateRange === 'month' && styles.optionTextSelected
                    ]}>This Month</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.optionButton,
                      dateRange === 'custom' && styles.optionButtonSelected
                    ]}
                    onPress={() => setDateRange('custom')}
                  >
                    <Text style={[
                      styles.optionText,
                      dateRange === 'custom' && styles.optionTextSelected
                    ]}>Custom Range</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.filterSection}>
                <View style={styles.filterHeader}>
                  <ArrowUpDown size={20} color={colors.primary} />
                  <Text style={styles.filterTitle}>Confidence Level</Text>
                </View>
                
                <View style={styles.optionsContainer}>
                  <TouchableOpacity 
                    style={[
                      styles.optionButton,
                      confidenceLevel === 'all' && styles.optionButtonSelected
                    ]}
                    onPress={() => setConfidenceLevel('all')}
                  >
                    <Text style={[
                      styles.optionText,
                      confidenceLevel === 'all' && styles.optionTextSelected
                    ]}>All</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.optionButton,
                      confidenceLevel === 'high' && styles.optionButtonSelected
                    ]}
                    onPress={() => setConfidenceLevel('high')}
                  >
                    <Text style={[
                      styles.optionText,
                      confidenceLevel === 'high' && styles.optionTextSelected
                    ]}>High (80%+)</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.optionButton,
                      confidenceLevel === 'medium' && styles.optionButtonSelected
                    ]}
                    onPress={() => setConfidenceLevel('medium')}
                  >
                    <Text style={[
                      styles.optionText,
                      confidenceLevel === 'medium' && styles.optionTextSelected
                    ]}>Medium (50-79%)</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.optionButton,
                      confidenceLevel === 'low' && styles.optionButtonSelected
                    ]}
                    onPress={() => setConfidenceLevel('low')}
                  >
                    <Text style={[
                      styles.optionText,
                      confidenceLevel === 'low' && styles.optionTextSelected
                    ]}>Low (Below 50%)</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.filterSection}>
                <View style={styles.filterHeader}>
                  <AlertCircle size={20} color={colors.primary} />
                  <Text style={styles.filterTitle}>Alert Status</Text>
                </View>
                
                <View style={styles.optionsContainer}>
                  <TouchableOpacity 
                    style={[
                      styles.optionButton,
                      status === 'all' && styles.optionButtonSelected
                    ]}
                    onPress={() => setStatus('all')}
                  >
                    <Text style={[
                      styles.optionText,
                      status === 'all' && styles.optionTextSelected
                    ]}>All</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.optionButton,
                      status === 'new' && styles.optionButtonSelected
                    ]}
                    onPress={() => setStatus('new')}
                  >
                    <Text style={[
                      styles.optionText,
                      status === 'new' && styles.optionTextSelected
                    ]}>New</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.optionButton,
                      status === 'reviewing' && styles.optionButtonSelected
                    ]}
                    onPress={() => setStatus('reviewing')}
                  >
                    <Text style={[
                      styles.optionText,
                      status === 'reviewing' && styles.optionTextSelected
                    ]}>Reviewing</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.optionButton,
                      status === 'resolved' && styles.optionButtonSelected
                    ]}
                    onPress={() => setStatus('resolved')}
                  >
                    <Text style={[
                      styles.optionText,
                      status === 'resolved' && styles.optionTextSelected
                    ]}>Resolved</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.resetButton}
                  onPress={() => {
                    setDateRange('today');
                    setConfidenceLevel('all');
                    setStatus('all');
                  }}
                >
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.applyButton}
                  onPress={handleApplyFilters}
                >
                  <Text style={styles.applyButtonText}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingBottom: 32,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 16,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.textPrimary,
  },
  closeButton: {
    padding: 8,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
    marginLeft: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: -4,
    marginRight: -4,
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  optionButtonSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  optionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textSecondary,
  },
  optionTextSelected: {
    color: colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  resetButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    marginRight: 8,
  },
  resetButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
  },
  applyButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginLeft: 8,
  },
  applyButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});