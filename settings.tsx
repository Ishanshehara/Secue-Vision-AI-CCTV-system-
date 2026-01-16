import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Switch,
  TouchableOpacity,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Bell, Lock, CircleHelp as HelpCircle, LogOut, Moon, Bluetooth, FileSliders as Sliders, MessageSquare, ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/Colors';
import Header from '@/components/Header';
import SensitivitySlider from '@/components/SensitivitySlider';
import DeviceCard from '@/components/DeviceCard';
import ConfirmDialog from '@/components/ConfirmDialog';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showSensitivitySlider, setShowSensitivitySlider] = useState(false);
  
  const handleLogout = () => {
    setShowLogoutDialog(false);
    setTimeout(() => {
      router.replace('/auth/login');
    }, 500);
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header title="Settings & Controls" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detection Settings</Text>
          
          <TouchableOpacity 
            style={styles.settingRow}
            onPress={() => setShowSensitivitySlider(true)}
          >
            <View style={styles.settingInfo}>
              <Sliders size={20} color={colors.primary} style={styles.settingIcon} />
              <View>
                <Text style={styles.settingTitle}>Detection Sensitivity</Text>
                <Text style={styles.settingDescription}>Adjust confidence threshold for alerts</Text>
              </View>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Bell size={20} color={colors.primary} style={styles.settingIcon} />
              <View>
                <Text style={styles.settingTitle}>Push Notifications</Text>
                <Text style={styles.settingDescription}>Receive alerts on your device</Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={notifications ? colors.primary : '#F4F4F4'}
              ios_backgroundColor={colors.border}
            />
          </View>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <MessageSquare size={20} color={colors.primary} style={styles.settingIcon} />
              <View>
                <Text style={styles.settingTitle}>SMS Alerts</Text>
                <Text style={styles.settingDescription}>Receive text message alerts</Text>
              </View>
            </View>
            <Switch
              value={smsAlerts}
              onValueChange={setSmsAlerts}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={smsAlerts ? colors.primary : '#F4F4F4'}
              ios_backgroundColor={colors.border}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connected Devices</Text>
          
          <DeviceCard 
            name="Main Entrance Alarm"
            type="alarm"
            status="connected"
          />
          
          <DeviceCard 
            name="Emergency LED Light"
            type="light"
            status="connected"
          />
          
          <DeviceCard 
            name="Back Door Sensor"
            type="sensor"
            status="disconnected"
          />
          
          <TouchableOpacity style={styles.addDeviceButton}>
            <Bluetooth size={20} color={colors.primary} />
            <Text style={styles.addDeviceText}>Connect New Device</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Moon size={20} color={colors.primary} style={styles.settingIcon} />
              <View>
                <Text style={styles.settingTitle}>Dark Mode</Text>
                <Text style={styles.settingDescription}>Toggle dark theme</Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={darkMode ? colors.primary : '#F4F4F4'}
              ios_backgroundColor={colors.border}
            />
          </View>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Lock size={20} color={colors.primary} style={styles.settingIcon} />
              <View>
                <Text style={styles.settingTitle}>Change Password</Text>
                <Text style={styles.settingDescription}>Update your account password</Text>
              </View>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </View>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <HelpCircle size={20} color={colors.primary} style={styles.settingIcon} />
              <View>
                <Text style={styles.settingTitle}>Help & Support</Text>
                <Text style={styles.settingDescription}>Get assistance with the app</Text>
              </View>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => setShowLogoutDialog(true)}
        >
          <LogOut size={20} color={colors.alert} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>SecuVision v1.0.0</Text>
      </ScrollView>
      
      <ConfirmDialog 
        visible={showLogoutDialog}
        title="Confirm Logout"
        message="Are you sure you want to log out of your account?"
        confirmText="Log Out"
        cancelText="Cancel"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutDialog(false)}
        isDanger
      />
      
      <SensitivitySlider 
        visible={showSensitivitySlider}
        onClose={() => setShowSensitivitySlider(false)}
      />
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
  content: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.textPrimary,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
  addDeviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    marginTop: 8,
  },
  addDeviceText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.primary,
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.alert,
    borderRadius: 12,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.alert,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 24,
  },
});