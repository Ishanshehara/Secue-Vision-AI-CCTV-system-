import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/Colors';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  status: 'normal' | 'warning' | 'alert';
}

export default function StatCard({ title, value, icon, status }: StatCardProps) {
  return (
    <View style={[
      styles.container, 
      status === 'warning' && styles.warningContainer,
      status === 'alert' && styles.alertContainer
    ]}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      
      <Text style={styles.value}>{value}</Text>
      
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  warningContainer: {
    borderLeftColor: colors.warning,
  },
  alertContainer: {
    borderLeftColor: colors.alert,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  value: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.textSecondary,
  },
});