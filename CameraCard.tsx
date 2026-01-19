import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Video, VideoOff, Shield, ShieldOff } from 'lucide-react-native';
import { colors } from '@/constants/Colors';

interface CameraCardProps {
  camera: {
    id: string;
    name: string;
    location: string;
    streamUrl: string;
    isActive: boolean;
    hasAlert: boolean;
  };
  isSelected: boolean;
  onSelect: () => void;
}

export default function CameraCard({ camera, isSelected, onSelect }: CameraCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onSelect}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: camera.streamUrl }} style={styles.image} />
        
        {camera.hasAlert && (
          <View style={styles.alertBadge}>
            <Shield size={12} color="#FFFFFF" />
          </View>
        )}
        
        <View style={[styles.statusBadge, !camera.isActive && styles.inactiveStatusBadge]}>
          {camera.isActive ? (
            <Video size={12} color="#FFFFFF" />
          ) : (
            <VideoOff size={12} color="#FFFFFF" />
          )}
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <Text 
          style={[styles.nameText, isSelected && styles.selectedText]} 
          numberOfLines={1}
        >
          {camera.name}
        </Text>
        
        <Text style={styles.locationText} numberOfLines={1}>
          {camera.location}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.cardBackground,
    marginHorizontal: 4,
  },
  selectedContainer: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  imageContainer: {
    height: 90,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  alertBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.alert,
    borderRadius: 4,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: colors.success,
    borderRadius: 4,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveStatusBadge: {
    backgroundColor: colors.textSecondary,
  },
  infoContainer: {
    padding: 12,
  },
  nameText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  selectedText: {
    color: colors.primary,
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
});