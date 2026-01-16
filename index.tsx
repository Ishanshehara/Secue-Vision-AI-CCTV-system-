import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Bell, Video, VideoOff, Shield, ShieldAlert, Eye, MapPin, Volume2, VolumeX } from 'lucide-react-native';
import { colors } from '@/constants/Colors';
import Header from '@/components/Header';
import CameraCard from '@/components/CameraCard';
import StatCard from '@/components/StatCard';
import AlertBanner from '@/components/AlertBanner';
import { mockCameras } from '@/data/mockData';
import ActivityGraph from '@/components/ActivityGraph';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const [hasActiveAlert, setHasActiveAlert] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState(mockCameras[0]);
  const [muted, setMuted] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  
  // Simulate receiving an alert
  useEffect(() => {
    const alertTimer = setTimeout(() => {
      setHasActiveAlert(true);
    }, 3000);
    
    return () => clearTimeout(alertTimer);
  }, []);
  
  const toggleMute = () => setMuted(!muted);
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header showProfile={true} showBranding={true} title="" />
      
      {hasActiveAlert && (
        <AlertBanner 
          message="Potential security breach detected on Front Entrance"
          onDismiss={() => setHasActiveAlert(false)}
        />
      )}
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainCameraContainer}>
          <View style={styles.liveIndicator}>
            <View style={styles.liveIndicatorDot} />
            <Text style={styles.liveIndicatorText}>LIVE</Text>
          </View>
          
          <Image 
            source={{ uri: selectedCamera.streamUrl }} 
            style={styles.mainCameraFeed}
          />
          
          <View style={styles.cameraOverlay}>
            <View style={styles.cameraInfo}>
              <Text style={styles.cameraName}>{selectedCamera.name}</Text>
              <View style={styles.locationContainer}>
                <MapPin size={14} color="#FFFFFF" />
                <Text style={styles.locationText}>{selectedCamera.location}</Text>
              </View>
            </View>
            
            <View style={styles.cameraControls}>
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={toggleMute}
              >
                {muted ? (
                  <VolumeX size={20} color="#FFFFFF" />
                ) : (
                  <Volume2 size={20} color="#FFFFFF" />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.controlButton, !isConnected && styles.controlButtonDisabled]}
              >
                {isConnected ? (
                  <Video size={20} color="#FFFFFF" />
                ) : (
                  <VideoOff size={20} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>System Status</Text>
        
        <View style={styles.statsContainer}>
          <StatCard 
            title="Active Cameras"
            value={`${mockCameras.filter(c => c.isActive).length}/${mockCameras.length}`}
            icon={<Eye size={18} color={colors.primary} />}
            status="normal"
          />
          <StatCard 
            title="Active Alerts"
            value={hasActiveAlert ? "1" : "0"}
            icon={<Bell size={18} color={hasActiveAlert ? colors.alert : colors.success} />}
            status={hasActiveAlert ? "alert" : "normal"}
          />
          <StatCard 
            title="System Status"
            value={isConnected ? "Online" : "Offline"}
            icon={<Shield size={18} color={isConnected ? colors.success : colors.warning} />}
            status={isConnected ? "normal" : "warning"}
          />
        </View>
        
        <Text style={styles.sectionTitle}>Activity</Text>
        <View style={styles.graphContainer}>
          <ActivityGraph />
        </View>
        
        <Text style={styles.sectionTitle}>Connected Cameras</Text>
        
        <ScrollView 
          horizontal 
          style={styles.camerasScrollView}
          contentContainerStyle={styles.camerasScrollContent}
          showsHorizontalScrollIndicator={false}
        >
          {mockCameras.map((camera) => (
            <CameraCard
              key={camera.id}
              camera={camera}
              isSelected={selectedCamera.id === camera.id}
              onSelect={() => setSelectedCamera(camera)}
            />
          ))}
        </ScrollView>
        
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={[styles.actionButton, styles.warningButton]}>
            <ShieldAlert size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Trigger Alarm</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
            <Bell size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Silence Alerts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  mainCameraContainer: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  mainCameraFeed: {
    width: '100%',
    height: '100%',
  },
  liveIndicator: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 10,
  },
  liveIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.alert,
    marginRight: 6,
  },
  liveIndicatorText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cameraInfo: {
    flex: 1,
  },
  cameraName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginLeft: 4,
  },
  cameraControls: {
    flexDirection: 'row',
  },
  controlButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  controlButtonDisabled: {
    opacity: 0.5,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  graphContainer: {
    marginHorizontal: 16,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  camerasScrollView: {
    marginBottom: 24,
  },
  camerasScrollContent: {
    paddingHorizontal: 12,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  warningButton: {
    backgroundColor: colors.alert,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  actionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});