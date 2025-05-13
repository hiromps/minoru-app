import { View, StyleSheet, ScrollView, Switch, TouchableOpacity, useWindowDimensions } from 'react-native';
import Typography from '@/components/Typography';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import {
  BellRing,
  User,
  Building,
  Database,
  Bell,
  Moon,
  LogOut,
  ChevronRight
} from 'lucide-react-native';

export default function Settings() {
  const { colors } = useTheme();
  const { user, logout } = useAuth();
  const { width } = useWindowDimensions();
  
  const isSmallScreen = width < 768;

  const handleLogout = () => {
    logout();
    router.replace('/auth/login');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Typography variant="h1" style={styles.title}>
            Settings
          </Typography>

          {/* User Profile Section */}
          <View style={styles.section}>
            <Card variant="elevated" style={styles.profileCard}>
              <View style={styles.userInfo}>
                <View
                  style={[
                    styles.avatar,
                    { backgroundColor: `${colors.primary}15` },
                  ]}
                >
                  <Typography variant="h2" color={colors.primary}>
                    {user?.name.charAt(0) || 'U'}
                  </Typography>
                </View>
                <View style={styles.userDetails}>
                  <Typography variant="h3" style={styles.userName}>
                    {user?.name || 'User'}
                  </Typography>
                  <Typography
                    variant="body"
                    color={colors.textSecondary}
                    style={styles.userEmail}
                  >
                    {user?.email || 'user@example.com'}
                  </Typography>
                  <View
                    style={[
                      styles.roleBadge,
                      { backgroundColor: `${colors.primary}15` },
                    ]}
                  >
                    <Typography
                      variant="caption"
                      color={colors.primary}
                      weight="medium"
                    >
                      {user?.role?.toUpperCase() || 'USER'}
                    </Typography>
                  </View>
                </View>
              </View>
              <Button
                title="Edit Profile"
                variant="outline"
                size="small"
                onPress={() => console.log('Edit profile')}
                style={styles.editButton}
              />
            </Card>
          </View>

          {/* Settings Categories */}
          <View style={styles.section}>
            <Typography variant="h2" style={styles.sectionTitle}>
              App Settings
            </Typography>

            <Card style={styles.settingsCard}>
              {/* Account Settings */}
              <TouchableOpacity
                style={styles.settingsItem}
                onPress={() => console.log('Account settings')}
              >
                <View style={styles.settingsItemContent}>
                  <View
                    style={[
                      styles.settingsIcon,
                      { backgroundColor: `${colors.primary}15` },
                    ]}
                  >
                    <User size={20} color={colors.primary} />
                  </View>
                  <View style={styles.settingsTextContainer}>
                    <Typography variant="body" weight="medium">
                      Account Settings
                    </Typography>
                    <Typography
                      variant="caption"
                      color={colors.textSecondary}
                    >
                      Manage your account information
                    </Typography>
                  </View>
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
              </TouchableOpacity>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              {/* Company Settings */}
              <TouchableOpacity
                style={styles.settingsItem}
                onPress={() => console.log('Company settings')}
              >
                <View style={styles.settingsItemContent}>
                  <View
                    style={[
                      styles.settingsIcon,
                      { backgroundColor: `${colors.secondary}15` },
                    ]}
                  >
                    <Building size={20} color={colors.secondary} />
                  </View>
                  <View style={styles.settingsTextContainer}>
                    <Typography variant="body" weight="medium">
                      Company Profile
                    </Typography>
                    <Typography
                      variant="caption"
                      color={colors.textSecondary}
                    >
                      Update your company information
                    </Typography>
                  </View>
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
              </TouchableOpacity>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              {/* Data Management */}
              <TouchableOpacity
                style={styles.settingsItem}
                onPress={() => console.log('Data management')}
              >
                <View style={styles.settingsItemContent}>
                  <View
                    style={[
                      styles.settingsIcon,
                      { backgroundColor: `${colors.success}15` },
                    ]}
                  >
                    <Database size={20} color={colors.success} />
                  </View>
                  <View style={styles.settingsTextContainer}>
                    <Typography variant="body" weight="medium">
                      Data Management
                    </Typography>
                    <Typography
                      variant="caption"
                      color={colors.textSecondary}
                    >
                      Import/export and backup settings
                    </Typography>
                  </View>
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </Card>
          </View>

          {/* Preferences */}
          <View style={styles.section}>
            <Typography variant="h2" style={styles.sectionTitle}>
              Preferences
            </Typography>

            <Card style={styles.settingsCard}>
              {/* Notifications */}
              <View style={styles.settingsItem}>
                <View style={styles.settingsItemContent}>
                  <View
                    style={[
                      styles.settingsIcon,
                      { backgroundColor: `${colors.warning}15` },
                    ]}
                  >
                    <Bell size={20} color={colors.warning} />
                  </View>
                  <View style={styles.settingsTextContainer}>
                    <Typography variant="body" weight="medium">
                      Notifications
                    </Typography>
                    <Typography
                      variant="caption"
                      color={colors.textSecondary}
                    >
                      Receive alerts and notifications
                    </Typography>
                  </View>
                </View>
                <Switch
                  value={true}
                  onValueChange={() => console.log('Toggle notifications')}
                  trackColor={{
                    false: colors.border,
                    true: `${colors.primary}80`,
                  }}
                  thumbColor={colors.primary}
                />
              </View>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              {/* Low Stock Alerts */}
              <View style={styles.settingsItem}>
                <View style={styles.settingsItemContent}>
                  <View
                    style={[
                      styles.settingsIcon,
                      { backgroundColor: `${colors.error}15` },
                    ]}
                  >
                    <BellRing size={20} color={colors.error} />
                  </View>
                  <View style={styles.settingsTextContainer}>
                    <Typography variant="body" weight="medium">
                      Low Stock Alerts
                    </Typography>
                    <Typography
                      variant="caption"
                      color={colors.textSecondary}
                    >
                      Notify when inventory is low
                    </Typography>
                  </View>
                </View>
                <Switch
                  value={true}
                  onValueChange={() => console.log('Toggle low stock alerts')}
                  trackColor={{
                    false: colors.border,
                    true: `${colors.primary}80`,
                  }}
                  thumbColor={colors.primary}
                />
              </View>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              {/* Dark Mode */}
              <View style={styles.settingsItem}>
                <View style={styles.settingsItemContent}>
                  <View
                    style={[
                      styles.settingsIcon,
                      { backgroundColor: `${colors.accent}15` },
                    ]}
                  >
                    <Moon size={20} color={colors.accent} />
                  </View>
                  <View style={styles.settingsTextContainer}>
                    <Typography variant="body" weight="medium">
                      Dark Mode
                    </Typography>
                    <Typography
                      variant="caption"
                      color={colors.textSecondary}
                    >
                      Use dark theme
                    </Typography>
                  </View>
                </View>
                <Switch
                  value={false}
                  onValueChange={() => console.log('Toggle dark mode')}
                  trackColor={{
                    false: colors.border,
                    true: `${colors.primary}80`,
                  }}
                  thumbColor={colors.primary}
                />
              </View>
            </Card>
          </View>

          {/* Logout Button */}
          <View style={styles.section}>
            <Button
              title="Log Out"
              variant="outline"
              icon={<LogOut size={18} color={colors.error} />}
              style={[styles.logoutButton, { borderColor: colors.error }]}
              onPress={handleLogout}
            />
          </View>

          {/* Version Info */}
          <View style={styles.versionContainer}>
            <Typography
              variant="caption"
              color={colors.textSecondary}
              align="center"
            >
              Inventory Manager v1.0.0
            </Typography>
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
  title: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  profileCard: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    marginBottom: 2,
  },
  userEmail: {
    marginBottom: 4,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  settingsCard: {
    padding: 0,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingsItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingsTextContainer: {
    flex: 1,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  logoutButton: {
    borderWidth: 1,
  },
  versionContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
});