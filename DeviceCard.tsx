import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Wifi, WifiOff, Bell, Lightbulb, Radio } from 'lucide-react-native';
import { colors } from '@/constants/Colors';

interface DeviceCardProps {
  name: string;
  type: 'alarm' | 'light' | 'sensor';
  status: 'connected' | 'disconnected';
}

export default function DeviceCard({ name, type, status }: DeviceCardProps) {
  const [isEnabled, setIsEnabled] = useState(status === 'connected');
  const [deviceStatus, setDeviceStatus] = useState(status);
  
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    
    // Simulate connection change
    setTimeout(() => {
      setDeviceStatus(isEnabled ? 'disconnected' : 'connected');
    }, 500);
  };
  
  const getDeviceIcon = () => {
    switch (type) {
      case 'alarm':
        return <Bell size={24} color={deviceStatus === 'connected' ? colors.primary : colors.textSecondary} />;
      case 'light':
        return <Lightbulb size={24} color={deviceStatus === 'connected' ? colors.primary : colors.textSecondary} />;
      case 'sensor':
        return <Radio size={24} color={deviceStatus === 'connected' ? colors.primary : colors.textSecondary} />;
      default:
        return <Bell size={24} color={deviceStatus === 'connected' ? colors.primary : colors.textSecondary} />;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {getDeviceIcon()}
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.deviceName}>{name}</Text>
        <View style={styles.statusContainer}>
          {deviceStatus === 'connected' ? (
            <>
              <Wifi size={12} color={colors.success} style={styles.statusIcon} />
              <Text style={[styles.statusText, { color: colors.success }]}>Connected</Text>
            </>
          ) : (
            <>
              <WifiOff size={12} color={colors.textSecondary} style={styles.statusIcon} />
              <Text style={styles.statusText}>Disconnected</Text>
            </>
          )}
        </View>
      </View>
      
      <View style={styles.controlContainer}>
        <Switch
          trackColor={{ false: colors.border, true: colors.primaryLight }}
          thumbColor={isEnabled ? colors.primary : '#F4F4F4'}
          ios_backgroundColor={colors.border}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  deviceName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
  controlContainer: {
    marginLeft: 16,
  },
});