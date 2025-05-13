import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import Card from '@/components/Card';
import DataTable from '@/components/DataTable';
import TextField from '@/components/TextField';
import EmptyState from '@/components/EmptyState';
import { useTheme } from '@/hooks/useTheme';
import { mockMaterials } from '@/data/mock';
import { Material } from '@/types';
import { Search, Package, CirclePlus as PlusCircle, Download, Upload, ArrowUpDown } from 'lucide-react-native';

export default function Inventory() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>(mockMaterials);
  
  const isSmallScreen = width < 768;

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMaterials(materials);
    } else {
      const filtered = materials.filter(
        (material) =>
          material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          material.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMaterials(filtered);
    }
  }, [searchQuery, materials]);

  const renderStockStatus = (material: Material) => {
    const isLowStock = material.stock <= material.threshold;
    
    return (
      <View style={styles.stockContainer}>
        <Typography
          color={isLowStock ? colors.warning : colors.success}
          weight="medium"
        >
          {material.stock} {material.unitOfMeasure}
        </Typography>
        {isLowStock && (
          <Typography
            variant="caption"
            color={colors.warning}
            style={styles.lowStockText}
          >
            Low Stock
          </Typography>
        )}
      </View>
    );
  };

  const columns = [
    {
      key: 'code',
      title: 'Code',
      width: 120,
      sortable: true,
    },
    {
      key: 'name',
      title: 'Material',
      width: 200,
      sortable: true,
    },
    {
      key: 'stock',
      title: 'Stock',
      width: 150,
      sortable: true,
      render: renderStockStatus,
    },
    {
      key: 'location',
      title: 'Location',
      width: 180,
      sortable: true,
    },
    {
      key: 'supplier',
      title: 'Supplier',
      width: 180,
      sortable: true,
    },
  ];

  const handleViewMaterial = (material: Material) => {
    // In a real app, navigate to material details
    console.log('View material:', material);
  };

  const emptyState = (
    <EmptyState
      title="No materials found"
      description="Try adjusting your search or add a new material."
      icon={<Package size={48} color={colors.textSecondary} />}
      actionLabel="Add Material"
      onAction={() => console.log('Add material')}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Typography variant="h1" style={styles.title}>
              Inventory
            </Typography>
            <View style={styles.actions}>
              <Button
                title="Export"
                variant="outline"
                size={isSmallScreen ? 'small' : 'medium'}
                icon={<Download size={18} color={colors.primary} />}
                style={styles.actionButton}
                onPress={() => console.log('Export')}
              />
              <Button
                title="Import"
                variant="outline"
                size={isSmallScreen ? 'small' : 'medium'}
                icon={<Upload size={18} color={colors.primary} />}
                style={styles.actionButton}
                onPress={() => console.log('Import')}
              />
              <Button
                title="Add Material"
                size={isSmallScreen ? 'small' : 'medium'}
                icon={<PlusCircle size={18} color="#FFFFFF" />}
                onPress={() => console.log('Add material')}
              />
            </View>
          </View>

          <Card style={styles.filterCard}>
            <View style={styles.searchContainer}>
              <TextField
                placeholder="Search by name or code..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                startIcon={<Search size={20} color={colors.textSecondary} />}
                style={styles.searchInput}
              />
              <Button
                title="Filters"
                variant="outline"
                size={isSmallScreen ? 'small' : 'medium'}
                icon={<ArrowUpDown size={18} color={colors.primary} />}
                style={styles.filterButton}
                onPress={() => console.log('Show filters')}
              />
            </View>
          </Card>

          <View style={styles.tableContainer}>
            <DataTable
              data={filteredMaterials}
              columns={columns}
              keyExtractor={(item) => item.id}
              onRowPress={handleViewMaterial}
              emptyComponent={emptyState}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  title: {
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  actionButton: {
    marginRight: 8,
  },
  filterCard: {
    padding: 16,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginBottom: 0,
  },
  filterButton: {
    marginLeft: 8,
  },
  tableContainer: {
    marginBottom: 16,
  },
  stockContainer: {
    flexDirection: 'column',
  },
  lowStockText: {
    marginTop: 4,
  },
});