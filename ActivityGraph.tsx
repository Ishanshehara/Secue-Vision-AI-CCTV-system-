import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');
const GRAPH_WIDTH = width - 64;
const GRAPH_HEIGHT = 120;
const BAR_WIDTH = 24;
const BAR_MARGIN = 12;

// Mock data for the activity graph
const activityData = [
  { day: 'Mon', count: 12 },
  { day: 'Tue', count: 8 },
  { day: 'Wed', count: 15 },
  { day: 'Thu', count: 6 },
  { day: 'Fri', count: 10 },
  { day: 'Sat', count: 4 },
  { day: 'Sun', count: 7 },
];

const maxCount = Math.max(...activityData.map(d => d.count));

export default function ActivityGraph() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Alert Activity</Text>
      
      <View style={styles.graphContainer}>
        {activityData.map((data, index) => {
          const barHeight = (data.count / maxCount) * GRAPH_HEIGHT;
          const isHighest = data.count === maxCount;
          
          return (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barLabelContainer}>
                <Text style={[styles.barValue, isHighest && styles.barValueHighlighted]}>
                  {data.count}
                </Text>
              </View>
              
              <View style={[
                styles.bar, 
                { height: barHeight },
                isHighest && styles.barHighlighted
              ]} />
              
              <Text style={styles.barLabel}>{data.day}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  graphContainer: {
    height: GRAPH_HEIGHT + 40, // Extra space for labels
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  barContainer: {
    alignItems: 'center',
    width: BAR_WIDTH + BAR_MARGIN,
  },
  barLabelContainer: {
    marginBottom: 4,
    height: 20,
    justifyContent: 'center',
  },
  barValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.textSecondary,
  },
  barValueHighlighted: {
    color: colors.primary,
    fontFamily: 'Inter-Bold',
  },
  bar: {
    width: BAR_WIDTH,
    backgroundColor: colors.primaryLight,
    borderRadius: 4,
  },
  barHighlighted: {
    backgroundColor: colors.primary,
  },
  barLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
  },
});