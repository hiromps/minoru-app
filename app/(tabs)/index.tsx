import { ScrollView, View, StyleSheet, useWindowDimensions } from 'react-native';
import Typography from '@/components/Typography';
import Card from '@/components/Card';
import AlertBanner from '@/components/AlertBanner';
import { useTheme } from '@/hooks/useTheme';
import { mockInventorySummary, mockOrderSummary, mockStockAlerts } from '@/data/mock';
import { ChartBar as BarChart, Clipboard, TriangleAlert as AlertTriangle, Package, TrendingUp } from 'lucide-react-native';

export default function Dashboard() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 768;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Typography variant="h1" style={styles.title}>
          Dashboard
        </Typography>

        {/* Alerts Section */}
        <View style={styles.section}>
          <Typography variant="h2" style={styles.sectionTitle}>
            Alerts
          </Typography>
          
          {mockStockAlerts.length > 0 ? (
            mockStockAlerts.map((alert) => (
              <AlertBanner
                key={alert.materialId}
                type="warning"
                title={`Low Stock: ${alert.materialName}`}
                message={`Current stock: ${alert.currentStock} units (${alert.percentRemaining}% of threshold)`}
              />
            ))
          ) : (
            <AlertBanner
              type="success"
              title="No alerts at this time"
              message="All inventory levels are within acceptable thresholds"
            />
          )}
        </View>

        {/* Summary Cards */}
        <View style={styles.section}>
          <Typography variant="h2" style={styles.sectionTitle}>
            Overview
          </Typography>
          
          <View style={[styles.cardsContainer, isSmallScreen && styles.cardsContainerColumn]}>
            {/* Inventory Summary Card */}
            <Card
              variant="elevated"
              style={[styles.summaryCard, isSmallScreen && styles.fullWidthCard]}
            >
              <View style={styles.cardHeader}>
                <Package size={24} color={colors.primary} />
                <Typography variant="h3" style={styles.cardTitle}>
                  Inventory Summary
                </Typography>
              </View>
              
              <View style={styles.statRow}>
                <Typography variant="body">Total Items:</Typography>
                <Typography variant="body" weight="bold">
                  {mockInventorySummary.totalItems}
                </Typography>
              </View>
              
              <View style={styles.statRow}>
                <Typography variant="body">Items in Stock:</Typography>
                <Typography variant="body" weight="bold">
                  {mockInventorySummary.itemsInStock}
                </Typography>
              </View>
              
              <View style={styles.statRow}>
                <Typography variant="body">Low Stock Items:</Typography>
                <Typography
                  variant="body"
                  weight="bold"
                  color={mockInventorySummary.lowStockItems > 0 ? colors.warning : undefined}
                >
                  {mockInventorySummary.lowStockItems}
                </Typography>
              </View>
              
              <View style={styles.statRow}>
                <Typography variant="body">Out of Stock:</Typography>
                <Typography
                  variant="body"
                  weight="bold"
                  color={mockInventorySummary.outOfStockItems > 0 ? colors.error : undefined}
                >
                  {mockInventorySummary.outOfStockItems}
                </Typography>
              </View>
              
              <View style={[styles.statRow, styles.totalValueRow]}>
                <Typography variant="body">Total Value:</Typography>
                <Typography variant="body" weight="bold">
                  ${mockInventorySummary.totalValue.toLocaleString()}
                </Typography>
              </View>
            </Card>

            {/* Orders Summary Card */}
            <Card
              variant="elevated"
              style={[styles.summaryCard, isSmallScreen && styles.fullWidthCard]}
            >
              <View style={styles.cardHeader}>
                <Clipboard size={24} color={colors.primary} />
                <Typography variant="h3" style={styles.cardTitle}>
                  Orders Summary
                </Typography>
              </View>
              
              <View style={styles.statRow}>
                <Typography variant="body">Pending Orders:</Typography>
                <Typography variant="body" weight="bold">
                  {mockOrderSummary.pending}
                </Typography>
              </View>
              
              <View style={styles.statRow}>
                <Typography variant="body">Processing:</Typography>
                <Typography variant="body" weight="bold">
                  {mockOrderSummary.processing}
                </Typography>
              </View>
              
              <View style={styles.statRow}>
                <Typography variant="body">Completed:</Typography>
                <Typography variant="body" weight="bold">
                  {mockOrderSummary.completed}
                </Typography>
              </View>
              
              <View style={styles.statRow}>
                <Typography variant="body">Late Orders:</Typography>
                <Typography
                  variant="body"
                  weight="bold"
                  color={mockOrderSummary.lateOrders > 0 ? colors.error : undefined}
                >
                  {mockOrderSummary.lateOrders}
                </Typography>
              </View>
              
              <View style={[styles.statRow, styles.totalValueRow]}>
                <Typography variant="body">Total Orders:</Typography>
                <Typography variant="body" weight="bold">
                  {mockOrderSummary.total}
                </Typography>
              </View>
            </Card>
          </View>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.section}>
          <Typography variant="h2" style={styles.sectionTitle}>
            Recent Activity
          </Typography>
          
          <Card variant="outlined" style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Package size={20} color={colors.success} />
              </View>
              <View style={styles.activityContent}>
                <Typography variant="body" weight="medium">
                  Materials Received
                </Typography>
                <Typography variant="caption" color={colors.textSecondary}>
                  50 units of Aluminum Sheet 1mm added to inventory
                </Typography>
                <Typography variant="caption" color={colors.textSecondary}>
                  Today at 10:23 AM
                </Typography>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Clipboard size={20} color={colors.primary} />
              </View>
              <View style={styles.activityContent}>
                <Typography variant="body" weight="medium">
                  New Order Created
                </Typography>
                <Typography variant="caption" color={colors.textSecondary}>
                  Order #3 from Global Systems Ltd. added
                </Typography>
                <Typography variant="caption" color={colors.textSecondary}>
                  Today at 9:15 AM
                </Typography>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <AlertTriangle size={20} color={colors.warning} />
              </View>
              <View style={styles.activityContent}>
                <Typography variant="body" weight="medium">
                  Low Stock Alert
                </Typography>
                <Typography variant="caption" color={colors.textSecondary}>
                  Copper Wire 2mm is below threshold
                </Typography>
                <Typography variant="caption" color={colors.textSecondary}>
                  Yesterday at 2:30 PM
                </Typography>
              </View>
            </View>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardsContainerColumn: {
    flexDirection: 'column',
  },
  summaryCard: {
    width: '48%',
    marginBottom: 16,
    padding: 16,
  },
  fullWidthCard: {
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    marginLeft: 12,
    marginBottom: 0,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalValueRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  activityCard: {
    padding: 0,
  },
  activityItem: {
    flexDirection: 'row',
    padding: 16,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
});