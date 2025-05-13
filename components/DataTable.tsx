import { useState } from 'react';
import { View, StyleSheet, ScrollView, useWindowDimensions, TouchableOpacity, Platform } from 'react-native';
import Typography from './Typography';
import { useTheme } from '@/hooks/useTheme';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

interface Column<T> {
  key: string;
  title: string;
  width?: number;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  onRowPress?: (item: T) => void;
  emptyComponent?: React.ReactNode;
}

export default function DataTable<T>({
  data,
  columns,
  keyExtractor,
  onRowPress,
  emptyComponent,
}: DataTableProps<T>) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const isWeb = Platform.OS === 'web';
  const isMobile = width < 768;

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    
    // @ts-ignore - Dynamic access
    const aValue = a[sortKey];
    // @ts-ignore - Dynamic access
    const bValue = b[sortKey];
    
    if (aValue === bValue) return 0;
    
    let result = 0;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      result = aValue.localeCompare(bValue);
    } else {
      result = aValue < bValue ? -1 : 1;
    }
    
    return sortDirection === 'asc' ? result : -result;
  });

  if (data.length === 0 && emptyComponent) {
    return <>{emptyComponent}</>;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={isWeb}>
        <View>
          {/* Header Row */}
          <View style={[styles.headerRow, { backgroundColor: colors.background }]}>
            {columns.map((column) => (
              <TouchableOpacity
                key={column.key}
                style={[
                  styles.headerCell,
                  { width: column.width || 150, borderBottomColor: colors.border }
                ]}
                onPress={() => column.sortable && handleSort(column.key)}
                disabled={!column.sortable}
              >
                <View style={styles.headerContent}>
                  <Typography
                    variant="label"
                    weight="medium"
                    color={column.sortable ? colors.primary : undefined}
                  >
                    {column.title}
                  </Typography>
                  {column.sortable && sortKey === column.key && (
                    <View style={styles.sortIcon}>
                      {sortDirection === 'asc' ? (
                        <ChevronUp size={16} color={colors.primary} />
                      ) : (
                        <ChevronDown size={16} color={colors.primary} />
                      )}
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Data Rows */}
          <ScrollView>
            {sortedData.map((item) => (
              <TouchableOpacity
                key={keyExtractor(item)}
                style={[
                  styles.row,
                  { backgroundColor: colors.card, borderBottomColor: colors.border }
                ]}
                onPress={() => onRowPress && onRowPress(item)}
                disabled={!onRowPress}
              >
                {columns.map((column) => (
                  <View
                    key={`${keyExtractor(item)}-${column.key}`}
                    style={[styles.cell, { width: column.width || 150 }]}
                  >
                    {column.render ? (
                      column.render(item)
                    ) : (
                      // @ts-ignore - Dynamic access
                      <Typography>{String(item[column.key] || '')}</Typography>
                    )}
                  </View>
                ))}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  headerCell: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortIcon: {
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  cell: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
});