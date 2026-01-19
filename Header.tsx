import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { ChevronLeft, BellRing, Shield, X } from 'lucide-react-native';
import { router, usePathname } from 'expo-router';
import { colors } from '@/constants/Colors';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showProfile?: boolean;
  showBranding?: boolean;
}

export default function Header({ title, showBack, showProfile = false, showBranding = false }: HeaderProps) {
  const pathname = usePathname();
  
  const renderBackButton = () => (
    <TouchableOpacity 
      style={styles.backButton}
      onPress={() => router.back()}
    >
      <ChevronLeft size={24} color={colors.textPrimary} />
    </TouchableOpacity>
  );
  
  const renderNotificationButton = () => (
    <TouchableOpacity style={styles.notificationButton}>
      <BellRing size={24} color={colors.textPrimary} />
      <View style={styles.notificationBadge} />
    </TouchableOpacity>
  );
  
  const [showProfileModal, setShowProfileModal] = useState(false);

  const renderProfileButton = () => (
    <TouchableOpacity 
      style={styles.profileButton}
      onPress={() => setShowProfileModal(true)}
    >
      <Image 
        source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
        style={styles.profileImage}
      />
    </TouchableOpacity>
  );

  // User data - should match ProfileModal or come from a shared source
  const user = {
    name: 'Demo',
    email: 'demo123@gmail.com',
    role: 'Security Officer',
    lastLogin: '2025-07-20T10:30:00',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  };

  const renderProfileModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showProfileModal}
      onRequestClose={() => setShowProfileModal(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setShowProfileModal(false)}
          >
            <X size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: user.avatar }} 
              style={styles.largeProfileImage} 
            />
          </View>
          
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userRole}>{user.role}</Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Login:</Text>
              <Text style={styles.infoValue}>
                {new Date().toLocaleString()}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderBranding = () => (
    <View style={styles.brandingContainer}>
      <Shield size={28} color={colors.primary} />
      <Text style={styles.brandingText}>SecuVision</Text>
    </View>
  );
  
  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          {showBack && renderBackButton()}
          {showBranding ? renderBranding() : <Text style={styles.title}>{title}</Text>}
          <View style={styles.rightContainer}>
            {renderNotificationButton()}
            {showProfile && renderProfileButton()}
          </View>
        </View>
      </View>
      {renderProfileModal()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingTop: 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.textPrimary,
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.alert,
    borderWidth: 2,
    borderColor: colors.cardBackground,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  largeProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '85%',
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 5,
  },
  avatarContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  userRole: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    marginBottom: 25,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  logoutButton: {
    width: '100%',
    backgroundColor: colors.alert,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  brandingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  brandingText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: colors.textPrimary,
    marginLeft: 8,
  },
});