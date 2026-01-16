import React, { useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  Animated,
  Easing
} from 'react-native';
import { TriangleAlert as AlertTriangle, ChevronRight, ChevronDown, Clock, MapPin, Percent } from 'lucide-react-native';
import { colors } from '@/constants/Colors';

interface AlertItemProps {
  alert: {
    id: string;
    timestamp: string;
    location: string;
    camera: string;
    confidence: number;
    status: string;
    imageUrl: string;
    description: string;
  };
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function AlertItem({ alert, isExpanded, onToggleExpand }: AlertItemProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);
  
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return colors.alert;
    if (confidence >= 50) return colors.warning;
    return colors.textSecondary;
  };
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new': return colors.alert;
      case 'reviewing': return colors.warning;
      case 'resolved': return colors.success;
      default: return colors.textSecondary;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  return (
    <View style={[styles.container, isExpanded && styles.expandedContainer]}>
      <TouchableOpacity 
        style={styles.header}
        onPress={onToggleExpand}
        activeOpacity={0.7}
      >
        <View style={styles.statusIndicator}>
          <AlertTriangle size={16} color={getStatusColor(alert.status)} />
        </View>
        
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>{alert.camera}</Text>
            <View style={[
              styles.statusBadge, 
              { backgroundColor: getStatusColor(alert.status) }
            ]}>
              <Text style={styles.statusText}>{alert.status}</Text>
            </View>
          </View>
          
          <View style={styles.headerBottom}>
            <View style={styles.infoItem}>
              <Clock size={12} color={colors.textSecondary} style={styles.infoIcon} />
              <Text style={styles.infoText}>{formatDate(alert.timestamp)}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <MapPin size={12} color={colors.textSecondary} style={styles.infoIcon} />
              <Text style={styles.infoText}>{alert.location}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Percent size={12} color={getConfidenceColor(alert.confidence)} style={styles.infoIcon} />
              <Text style={[
                styles.infoText, 
                { color: getConfidenceColor(alert.confidence) }
              ]}>
                {alert.confidence}%
              </Text>
            </View>
          </View>
        </View>
        
        <Animated.View style={{ transform: [{ rotate }] }}>
          <ChevronRight size={20} color={colors.textSecondary} />
        </Animated.View>
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.expandedContent}>
          <Image source={{ uri: alert.imageUrl }} style={styles.alertImage} />
          
          <Text style={styles.descriptionTitle}>Details</Text>
          <Text style={styles.descriptionText}>{alert.description}</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
              <Text style={styles.secondaryButtonText}>Mark as Reviewed</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
              <Text style={styles.primaryButtonText}>View Full Footage</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  expandedContainer: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  statusIndicator: {
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  headerBottom: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  infoIcon: {
    marginRight: 4,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
  expandedContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  alertImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 16,
  },
  descriptionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  descriptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  primaryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textPrimary,
  },
});