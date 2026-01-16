import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  TextInput,
  Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, Calendar, Image as ImageIcon, Video, SlidersHorizontal, X } from 'lucide-react-native';
import { colors } from '@/constants/Colors';
import Header from '@/components/Header';
import { mockMedia } from '@/data/mockData';
import MediaViewer from '@/components/MediaViewer';
import DateFilterPicker from '@/components/DateFilterPicker';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const ITEM_WIDTH = (width - 48) / COLUMN_COUNT;

export default function GalleryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mediaType, setMediaType] = useState<'all' | 'image' | 'video'>('all');
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
  const [dateFilter, setDateFilter] = useState<{startDate: string | null, endDate: string | null}>({
    startDate: null,
    endDate: null
  });
  
  // Log available dates on component mount
  React.useEffect(() => {
    console.log('Available dates in mockMedia:');
    mockMedia.forEach(item => {
      const date = new Date(item.timestamp);
      const isoDate = date.toISOString().split('T')[0];
      console.log(`ID: ${item.id}, Date: ${isoDate}, Timestamp: ${item.timestamp}`);
    });
  }, []);
  
  const filteredMedia = mockMedia.filter(item => {
    const itemDate = new Date(item.timestamp);
    
    // Filter by date range from calendar picker
    if (dateFilter.startDate || dateFilter.endDate) {
      const itemDateOnly = itemDate.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      if (dateFilter.startDate && itemDateOnly < dateFilter.startDate) {
        return false;
      }
      if (dateFilter.endDate && itemDateOnly > dateFilter.endDate) {
        return false;
      }
    }
    
    // Filter by search query (date search)
    if (searchQuery) {
      const searchDate = searchQuery.trim();
      
      // Get date components for this item
      const itemDay = itemDate.getDate(); // 1-31
      const itemMonth = itemDate.getMonth() + 1; // 1-12
      const itemYear = itemDate.getFullYear();
      
      // Format date strings for comparison
      const dayStr = itemDay.toString().padStart(2, '0');
      const monthStr = itemMonth.toString().padStart(2, '0');
      const yearStr = itemYear.toString();
      const isoDate = `${yearStr}-${monthStr}-${dayStr}`; // 2025-05-10
      
      let isMatch = false;
      
      // Check for day range pattern (e.g., "8-10", "07-09", "5-8")
      const rangePattern = /^(\d{1,2})-(\d{1,2})$/;
      const rangeMatch = searchDate.match(rangePattern);
      
      if (rangeMatch) {
        const startDay = parseInt(rangeMatch[1]);
        const endDay = parseInt(rangeMatch[2]);
        
        if (startDay <= endDay) {
          isMatch = itemDay >= startDay && itemDay <= endDay;
          console.log(`🔍 Range search "${searchDate}": Item ${item.id} (day ${itemDay}) ${isMatch ? '✅ MATCH' : '❌ NO MATCH'}`);
        }
      } else {
        // Simple string search in various date formats
        const searchTermLower = searchDate.toLowerCase();
        const searchTargets = [
          isoDate, // 2025-05-10
          `${monthStr}/${dayStr}/${yearStr}`, // 05/10/2025
          `${dayStr}/${monthStr}/${yearStr}`, // 10/05/2025
          dayStr, // 10
          monthStr, // 05
          yearStr, // 2025
          itemDay.toString(), // 10 (without padding)
          itemMonth.toString() // 5 (without padding)
        ];
        
        isMatch = searchTargets.some(target => 
          target.toLowerCase().includes(searchTermLower)
        );
        
        console.log(`🔎 Text search "${searchDate}": Item ${item.id} (${isoDate}) ${isMatch ? '✅ MATCH' : '❌ NO MATCH'}`);
      }
      
      if (!isMatch) {
        return false;
      }
    }
    
    // Filter by media type
    if (mediaType === 'image' && item.type !== 'image') {
      return false;
    }
    if (mediaType === 'video' && item.type !== 'video') {
      return false;
    }
    
    return true;
  });
  
  // Log filtered results for debugging
  if (searchQuery) {
    console.log(`\n🔎 SEARCH RESULTS for "${searchQuery}"`);
    console.log(`📊 Found ${filteredMedia.length} items out of ${mockMedia.length} total`);
    if (filteredMedia.length > 0) {
      console.log('📝 Matching items:');
      filteredMedia.forEach(item => {
        const date = new Date(item.timestamp);
        console.log(`   • ID:${item.id} → Day ${date.getDate()} (${date.toISOString().split('T')[0]})`);
      });
    }
    console.log(''); // Empty line for readability
  }
  
  const groupedByDate = filteredMedia.reduce((groups: Record<string, any[]>, item) => {
    const date = new Date(item.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});
  
  const renderMediaItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.mediaItem}
      onPress={() => setSelectedMedia(item)}
    >
      <Image source={{ uri: item.thumbnailUrl }} style={styles.mediaThumbnail} />
      {item.type === 'video' && (
        <View style={styles.videoIndicator}>
          <Video size={16} color="#FFFFFF" />
        </View>
      )}
    </TouchableOpacity>
  );
  
  const renderDateSection = ({ item }: { item: any }) => (
    <View style={styles.dateSection}>
      <Text style={styles.dateSectionTitle}>{item.date}</Text>
      <FlatList
        data={item.media}
        renderItem={renderMediaItem}
        keyExtractor={(item) => item.id}
        numColumns={COLUMN_COUNT}
        scrollEnabled={false}
        contentContainerStyle={styles.mediaSectionContent}
      />
    </View>
  );
  
  const sections = Object.keys(groupedByDate).map(date => ({
    date,
    media: groupedByDate[date]
  }));
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header title="Media Gallery" />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Calendar size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by date (Try: 2025-05-10, 8-10, 7-9)..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={(text) => {
              console.log('Search input changed:', text);
              setSearchQuery(text);
            }}
          />
          {searchQuery ? (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <X size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
        
        <TouchableOpacity 
          style={[
            styles.filterButton,
            (dateFilter.startDate || dateFilter.endDate) && styles.filterButtonActive
          ]}
          onPress={() => setShowDatePicker(true)}
        >
          <Calendar size={20} color={
            (dateFilter.startDate || dateFilter.endDate) ? colors.primary : colors.textPrimary
          } />
        </TouchableOpacity>
      </View>
      
      <View style={styles.typeFilterContainer}>
        {(dateFilter.startDate || dateFilter.endDate) && (
          <View style={styles.dateFilterInfo}>
            <Text style={styles.dateFilterText}>
              {dateFilter.startDate && dateFilter.endDate 
                ? `${dateFilter.startDate} to ${dateFilter.endDate}`
                : dateFilter.startDate 
                ? `From ${dateFilter.startDate}`
                : `Until ${dateFilter.endDate}`
              }
            </Text>
            <TouchableOpacity 
              style={styles.clearDateButton}
              onPress={() => setDateFilter({ startDate: null, endDate: null })}
            >
              <X size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        )}
        
        <TouchableOpacity 
          style={[
            styles.typeFilterButton, 
            mediaType === 'all' && styles.typeFilterButtonActive
          ]}
          onPress={() => setMediaType('all')}
        >
          <Text style={[
            styles.typeFilterText,
            mediaType === 'all' && styles.typeFilterTextActive
          ]}>All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.typeFilterButton, 
            mediaType === 'image' && styles.typeFilterButtonActive
          ]}
          onPress={() => setMediaType('image')}
        >
          <ImageIcon size={16} color={mediaType === 'image' ? colors.primary : colors.textSecondary} />
          <Text style={[
            styles.typeFilterText,
            mediaType === 'image' && styles.typeFilterTextActive
          ]}>Images</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.typeFilterButton, 
            mediaType === 'video' && styles.typeFilterButtonActive
          ]}
          onPress={() => setMediaType('video')}
        >
          <Video size={16} color={mediaType === 'video' ? colors.primary : colors.textSecondary} />
          <Text style={[
            styles.typeFilterText,
            mediaType === 'video' && styles.typeFilterTextActive
          ]}>Videos</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={sections}
        renderItem={renderDateSection}
        keyExtractor={(item) => item.date}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ImageIcon size={64} color={colors.textSecondary} style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>No Media Found</Text>
            <Text style={styles.emptyDescription}>
              {searchQuery 
                ? `No media items found for the searched date "${searchQuery}".`
                : (dateFilter.startDate || dateFilter.endDate)
                ? `No media items found for the selected date range.`
                : "There are no media items matching your current filters."
              }
            </Text>
          </View>
        }
      />
      
      {selectedMedia && (
        <MediaViewer 
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}
      
      <DateFilterPicker 
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onApplyFilter={(startDate, endDate) => {
          console.log('Date filter applied:', startDate, endDate);
          setDateFilter({
            startDate: startDate ? startDate.toISOString().split('T')[0] : null,
            endDate: endDate ? endDate.toISOString().split('T')[0] : null
          });
          setShowDatePicker(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.textPrimary,
  },
  clearButton: {
    padding: 8,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  filterButtonActive: {
    backgroundColor: colors.primaryLight,
  },
  typeFilterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  dateFilterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 12,
    marginBottom: 8,
  },
  dateFilterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.primary,
    marginRight: 8,
  },
  clearDateButton: {
    padding: 4,
  },
  typeFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: colors.cardBackground,
  },
  typeFilterButtonActive: {
    backgroundColor: colors.primaryLight,
  },
  typeFilterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  typeFilterTextActive: {
    color: colors.primary,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  dateSection: {
    marginBottom: 24,
  },
  dateSectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  mediaSectionContent: {
    marginLeft: -4,
    marginRight: -4,
  },
  mediaItem: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  mediaThumbnail: {
    width: '100%',
    height: '100%',
  },
  videoIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 4,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 60,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  emptyDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});