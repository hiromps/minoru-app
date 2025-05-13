import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import Card from '@/components/Card';
import DataTable from '@/components/DataTable';
import TextField from '@/components/TextField';
import EmptyState from '@/components/EmptyState';
import { useTheme } from '@/hooks/useTheme';
import { mockOrders } from '@/data/mock';
import { Order } from '@/types';
import { Search, Clipboard, CirclePlus as PlusCircle, Calendar, ArrowUpDown } from 'lucide-react-native';

export default function Orders() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders);
  
  const isSmallScreen = width < 768;

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) =>
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.id.includes(searchQuery)
      );
      setFilteredOrders(filtered);
    }
  }, [searchQuery, orders]);

  const renderOrderStatus = (order: Order) => {
    let statusColor;
    switch (order.status) {
      case 'completed':
        statusColor = colors.success;
        break;
      case 'processing':
        statusColor = colors.primary;
        break;
      case 'cancelled':
        statusColor = colors.error;
        break;
      default:
        statusColor = colors.warning;
    }
    
    return (
      <View style={[styles.statusBadge, { backgroundColor: `${statusColor}15` }]}>
        <Typography
          color={statusColor}
          weight="medium"
          variant="caption"
        >
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Typography>
      </View>
    );
  };

  const renderPriority = (order: Order) => {
    let priorityColor;
    switch (order.priority) {
      case 'high':
        priorityColor = colors.error;
        break;
      case 'medium':
        priorityColor = colors.warning;
        break;
      default:
        priorityColor = colors.textSecondary;
    }
    
    return (
      <Typography
        color={priorityColor}
        weight="medium"
      >
        {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
      </Typography>
    );
  };

  const columns = [
    {
      key: 'id',
      title: 'Order ID',
      width: 100,
      sortable: true,
    },
    {
      key: 'customerName',
      title: 'Customer',
      width: 200,
      sortable: true,
    },
    {
      key: 'status',
      title: 'Status',
      width: 120,
      sortable: true,
      render: renderOrderStatus,
    },
    {
      key: 'priority',
      title: 'Priority',
      width: 100,
      sortable: true,
      render: renderPriority,
    },
    {
      key: 'dueDate',
      title: 'Due Date',
      width: 120,
      sortable: true,
    },
    {
      key: 'createdAt',
      title: 'Created',
      width: 120,
      sortable: true,
    },
  ];

  const handleViewOrder = (order: Order) => {
    // In a real app, navigate to order details
    console.log('View order:', order);
  };

  const emptyState = (
    <EmptyState
      title="No orders found"
      description="Try adjusting your search or create a new order."
      icon={<Clipboard size={48} color={colors.textSecondary} />}
      actionLabel="Create Order"
      onAction={() => console.log('Create order')}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Typography variant="h1" style={styles.title}>
              Orders
            </Typography>
            <Button
              title="Create Order"
              size={isSmallScreen ? 'small' : 'medium'}
              icon={<PlusCircle size={18} color="#FFFFFF" />}
              onPress={() => console.log('Create order')}
            />
          </View>

          <Card style={styles.filterCard}>
            <View style={styles.searchContainer}>
              <TextField
                placeholder="Search by customer or order ID..."
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
            
            <View style={styles.quickFilters}>
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  { borderColor: colors.primary, backgroundColor: `${colors.primary}15` }
                ]}
                onPress={() => console.log('Filter by All')}
              >
                <Typography variant="caption" color={colors.primary}>
                  All Orders
                </Typography>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  { borderColor: colors.border }
                ]}
                onPress={() => console.log('Filter by Pending')}
              >
                <Typography variant="caption" color={colors.textSecondary}>
                  Pending
                </Typography>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  { borderColor: colors.border }
                ]}
                onPress={() => console.log('Filter by Processing')}
              >
                <Typography variant="caption" color={colors.textSecondary}>
                  Processing
                </Typography>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  { borderColor: colors.border }
                ]}
                onPress={() => console.log('Filter by Completed')}
              >
                <Typography variant="caption" color={colors.textSecondary}>
                  Completed
                </Typography>
              </TouchableOpacity>
            </View>
          </Card>

          <View style={styles.tableContainer}>
            <DataTable
              data={filteredOrders}
              columns={columns}
              keyExtractor={(item) => item.id}
              onRowPress={handleViewOrder}
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
    marginBottom: 16,
  },
  title: {
    marginBottom: 0,
  },
  filterCard: {
    padding: 16,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginBottom: 0,
  },
  filterButton: {
    marginLeft: 8,
  },
  quickFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  tableContainer: {
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
});