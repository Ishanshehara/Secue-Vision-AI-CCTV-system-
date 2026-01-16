import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import { X, Share, Download, Play, Pause, SkipBack, SkipForward } from 'lucide-react-native';
import { colors } from '@/constants/Colors';
import { WebView } from 'react-native-webview';
import { Video, ResizeMode } from 'expo-av';

const { width, height } = Dimensions.get('window');

interface MediaViewerProps {
  media: {
    id: string;
    type: 'image' | 'video';
    url: string;
    thumbnailUrl: string;
    timestamp: string;
    location: string;
    camera: string;
  };
  onClose: () => void;
}

export default function MediaViewer({ media, onClose }: MediaViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const handleShare = () => {
    // Share functionality would be implemented here
    console.log('Share media:', media.id);
  };
  
  const handleDownload = () => {
    // Download functionality would be implemented here
    console.log('Download media:', media.id);
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const renderControls = () => (
    <View style={styles.controlsContainer}>
      <TouchableOpacity style={styles.controlButton} onPress={() => console.log('Skip back')}>
        <SkipBack size={24} color="#FFFFFF" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
        {isPlaying ? (
          <Pause size={32} color="#FFFFFF" />
        ) : (
          <Play size={32} color="#FFFFFF" />
        )}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.controlButton} onPress={() => console.log('Skip forward')}>
        <SkipForward size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Text style={styles.mediaTitle}>{media.camera}</Text>
            <Text style={styles.mediaSubtitle}>{formatDate(media.timestamp)}</Text>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Share size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
              <Download size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableWithoutFeedback onPress={() => setShowControls(!showControls)}>
          <View style={styles.mediaContainer}>
            {media.type === 'image' ? (
              <Image
                source={{ uri: media.url }}
                style={styles.image}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.videoContainer}>
                {Platform.OS === 'web' ? (
                  <WebView
                    source={{ uri: media.url }}
                    style={styles.video}
                    allowsInlineMediaPlayback={true}
                    mediaPlaybackRequiresUserAction={false}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                  />
                ) : (
                  <Video
                    source={{ uri: media.url }}
                    style={styles.video}
                    useNativeControls
                    shouldPlay={isPlaying}
                    isLooping={false}
                    resizeMode={ResizeMode.CONTAIN}
                    onPlaybackStatusUpdate={(status) => {
                      if ('isPlaying' in status) {
                        setIsPlaying(status.isPlaying || false);
                      }
                    }}
                  />
                )}
                
                {showControls && media.type === 'video' && Platform.OS === 'web' && renderControls()}
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
        
        <View style={styles.footer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>{media.location}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Camera</Text>
            <Text style={styles.infoValue}>{media.camera}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Timestamp</Text>
            <Text style={styles.infoValue}>{formatDate(media.timestamp)}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  closeButton: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  mediaTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  mediaSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height * 0.6,
  },
  videoContainer: {
    width: width,
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
});