import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { X, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { colors } from '@/constants/Colors';

interface AlertBannerProps {
  message: string;
  onDismiss: () => void;
}

export default function AlertBanner({ message, onDismiss }: AlertBannerProps) {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    // Auto dismiss after 8 seconds
    const timeout = setTimeout(() => {
      handleDismiss();
    }, 8000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const handleDismiss = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onDismiss();
    });
  };
  
  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
      <View style={styles.content}>
        <AlertTriangle size={20} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.message}>{message}</Text>
      </View>
      
      <TouchableOpacity style={styles.dismissButton} onPress={handleDismiss}>
        <X size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.alert,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 12,
  },
  message: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
  dismissButton: {
    padding: 4,
  },
});