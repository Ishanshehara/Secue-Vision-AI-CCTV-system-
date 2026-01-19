import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Animated,
  PanResponder
} from 'react-native';
import { X, TriangleAlert as AlertTriangle, ShieldCheck } from 'lucide-react-native';
import { colors } from '@/constants/Colors';

interface SensitivitySliderProps {
  visible: boolean;
  onClose: () => void;
}

export default function SensitivitySlider({ visible, onClose }: SensitivitySliderProps) {
  const [sensitivity, setSensitivity] = useState(0.7);
  const sliderWidth = 300;
  const thumbSize = 28;
  
  const translateX = new Animated.Value(sensitivity * (sliderWidth - thumbSize));
  
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        translateX.extractOffset();
      },
      onPanResponderMove: (_, gestureState) => {
        const newValue = Math.max(
          0,
          Math.min(gestureState.dx, sliderWidth - thumbSize)
        );
        translateX.setValue(newValue);
        
        // Calculate and set sensitivity based on the thumb position (0-1 range)
        const newSensitivity = parseFloat(
          Math.max(0, Math.min(1, newValue / (sliderWidth - thumbSize))).toFixed(2)
        );
        setSensitivity(newSensitivity);
      },
      onPanResponderRelease: () => {
        translateX.flattenOffset();
      },
    })
  ).current;
  
  const getTrackColorStyle = () => {
    if (sensitivity < 0.4) {
      return { backgroundColor: colors.alert };
    } else if (sensitivity < 0.7) {
      return { backgroundColor: colors.warning };
    } else {
      return { backgroundColor: colors.success };
    }
  };
  
  const getMessage = () => {
    if (sensitivity < 0.4) {
      return "Low sensitivity: May miss legitimate alerts but reduces false positives.";
    } else if (sensitivity < 0.7) {
      return "Medium sensitivity: Balanced detection with moderate false positives.";
    } else {
      return "High sensitivity: Catches most security concerns but may have more false positives.";
    }
  };
  
  const getIcon = () => {
    if (sensitivity < 0.4) {
      return <AlertTriangle size={24} color={colors.alert} />;
    } else if (sensitivity < 0.7) {
      return <AlertTriangle size={24} color={colors.warning} />;
    } else {
      return <ShieldCheck size={24} color={colors.success} />;
    }
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
                <Text style={styles.modalTitle}>Detection Sensitivity</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <X size={20} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.sensitivityValueContainer}>
                <Text style={[
                  styles.sensitivityValue,
                  sensitivity < 0.4 ? { color: colors.alert } :
                  sensitivity < 0.7 ? { color: colors.warning } :
                  { color: colors.success }
                ]}>
                  {(sensitivity * 100).toFixed(0)}%
                </Text>
              </View>
              
              <View style={styles.sliderContainer}>
                <View style={styles.trackBackground} />
                <Animated.View
                  style={[
                    styles.track,
                    getTrackColorStyle(),
                    { width: translateX.interpolate({
                      inputRange: [0, sliderWidth - thumbSize],
                      outputRange: [0, sliderWidth],
                    }) }
                  ]}
                />
                <Animated.View
                  style={[
                    styles.thumb,
                    { transform: [{ translateX }] }
                  ]}
                  {...panResponder.panHandlers}
                />
              </View>
              
              <View style={styles.labelsContainer}>
                <Text style={styles.labelText}>Low</Text>
                <Text style={styles.labelText}>Medium</Text>
                <Text style={styles.labelText}>High</Text>
              </View>
              
              <View style={styles.messageContainer}>
                {getIcon()}
                <Text style={styles.messageText}>{getMessage()}</Text>
              </View>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.resetButton}
                  onPress={() => {
                    setSensitivity(0.7);
                    translateX.setValue(0.7 * (sliderWidth - thumbSize));
                  }}
                >
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.applyButton}
                  onPress={onClose}
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
    marginBottom: 24,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.textPrimary,
  },
  closeButton: {
    padding: 4,
  },
  sensitivityValueContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  sensitivityValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
  },
  sliderContainer: {
    height: 28,
    width: 300,
    alignSelf: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  trackBackground: {
    position: 'absolute',
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    left: 0,
    right: 0,
    top: 10,
  },
  track: {
    position: 'absolute',
    height: 8,
    borderRadius: 4,
    left: 0,
    top: 10,
  },
  thumb: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    alignSelf: 'center',
    marginBottom: 24,
  },
  labelText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textSecondary,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  messageText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textPrimary,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
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