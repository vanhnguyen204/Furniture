import {
  createNavigationContainerRef,
  StackActions,
  NavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

// Tạo tham chiếu navigation container
const navigationRef = createNavigationContainerRef();

// Export tham chiếu navigation container để sử dụng ở các file khác
export {navigationRef};

export const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

interface NavigationParams {
  [key: string]: any;
}

export const navigate = (name: any, params?: NavigationParams) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const navigatePush = (name: string, params?: NavigationParams) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
};

export const navigateAndReset = (routes: string[], index: number = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: routes.map(route => ({name: route})),
      }),
    );
  }
};

export function navigateReplace(name: string, param?: NavigationParams) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      StackActions.replace(name, {
        param,
      }),
    );
  }
}

export const goBackNavigation = () => {
  navigationRef.goBack();
};
