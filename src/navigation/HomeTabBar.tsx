import { StyleSheet, View } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LightTheme } from '../theme/theme';

const Active = () => <View className="h-5 w-5 rounded-full bg-black" />;
const InActive = () => (
  <View className="h-5 w-5 rounded-full border border-black" />
);

const icons = [
  { active: <Active />, inactive: <InActive /> },
  { active: <Active />, inactive: <InActive /> },
  { active: <Active />, inactive: <InActive /> },
];

export function CustomHomeTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { buildHref } = useLinkBuilder();

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;
        const Icon = isFocused ? icons[index].active : icons[index].inactive;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
            key={route.key}
          >
            {Icon}
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: LightTheme.colors.surface,
    borderColor: LightTheme.colors.border,
    borderWidth: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16
  },
  icon: {},
});
