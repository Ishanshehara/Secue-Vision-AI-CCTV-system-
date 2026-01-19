import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TouchableWithoutFeedback 
} from 'react-native';
import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/Colors';

interface DateFilterPickerProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilter: (startDate: Date, endDate: Date) => void;
}

export default function DateFilterPicker({ visible, onClose, onApplyFilter }: DateFilterPickerProps) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingStartDate, setSelectingStartDate] = useState(true);
  
  const getMonthDays = (year: number, month: number) => {
    const days = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Add padding for the first day of the month
    const paddingDays = firstDay.getDay();
    for (let i = 0; i < paddingDays; i++) {
      days.push(null);
    }
    
    // Add all days in the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };
  
  const getDayClassName = (day: Date | null) => {
    if (!day) return styles.emptyDay;
    
    const isStartDate = day.toDateString() === startDate.toDateString();
    const isEndDate = day.toDateString() === endDate.toDateString();
    const isInRange = day > startDate && day < endDate;
    
    if (isStartDate && isEndDate) {
      return styles.selectedDay;
    }
    
    if (isStartDate) {
      return styles.startDay;
    }
    
    if (isEndDate) {
      return styles.endDay;
    }
    
    if (isInRange) {
      return styles.inRangeDay;
    }
    
    return styles.day;
  };
  
  const handleDayPress = (day: Date | null) => {
    if (!day) return;
    
    if (selectingStartDate) {
      setStartDate(day);
      setEndDate(day);
      setSelectingStartDate(false);
    } else {
      if (day < startDate) {
        setStartDate(day);
      } else {
        setEndDate(day);
        setSelectingStartDate(true);
      }
    }
  };
  
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const days = getMonthDays(currentMonth.getFullYear(), currentMonth.getMonth());
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
                <Text style={styles.modalTitle}>Select Date Range</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <X size={20} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.dateSelectionHeader}>
                <View style={styles.dateSelectionItem}>
                  <Text style={styles.dateSelectionLabel}>Start Date</Text>
                  <Text style={styles.dateSelectionValue}>{formatDate(startDate)}</Text>
                </View>
                
                <View style={styles.dateSelectionItem}>
                  <Text style={styles.dateSelectionLabel}>End Date</Text>
                  <Text style={styles.dateSelectionValue}>{formatDate(endDate)}</Text>
                </View>
              </View>
              
              <View style={styles.calendarHeader}>
                <TouchableOpacity onPress={previousMonth} style={styles.monthNavigationButton}>
                  <ChevronLeft size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                
                <Text style={styles.monthText}>
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </Text>
                
                <TouchableOpacity onPress={nextMonth} style={styles.monthNavigationButton}>
                  <ChevronRight size={24} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.weekdaysContainer}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <Text key={day} style={styles.weekdayText}>{day}</Text>
                ))}
              </View>
              
              <View style={styles.daysContainer}>
                {days.map((day, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={getDayClassName(day)}
                    onPress={() => handleDayPress(day)}
                    disabled={!day}
                  >
                    {day && <Text style={styles.dayText}>{day.getDate()}</Text>}
                  </TouchableOpacity>
                ))}
              </View>
              
              <Text style={styles.selectingText}>
                {selectingStartDate 
                  ? 'Select start date' 
                  : 'Select end date'
                }
              </Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.resetButton}
                  onPress={() => {
                    const today = new Date();
                    setStartDate(today);
                    setEndDate(today);
                    setCurrentMonth(today);
                    setSelectingStartDate(true);
                  }}
                >
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.applyButton}
                  onPress={() => onApplyFilter(startDate, endDate)}
                >
                  <Text style={styles.applyButtonText}>Apply</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 24,
    width: '90%',
    maxWidth: 400,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.textPrimary,
  },
  closeButton: {
    padding: 4,
  },
  dateSelectionHeader: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 12,
  },
  dateSelectionItem: {
    flex: 1,
  },
  dateSelectionLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  dateSelectionValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.textPrimary,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  monthNavigationButton: {
    padding: 4,
  },
  monthText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
  },
  weekdaysContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.textSecondary,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  day: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  emptyDay: {
    width: '14.28%',
    aspectRatio: 1,
  },
  selectedDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    marginBottom: 8,
  },
  startDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    marginBottom: 8,
  },
  endDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    marginBottom: 8,
  },
  inRangeDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    marginBottom: 8,
  },
  dayText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textPrimary,
  },
  selectingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
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