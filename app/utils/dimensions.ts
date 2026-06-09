import { Dimensions, PixelRatio, ScaledSize } from 'react-native';

const { width: BASE_SCREEN_WIDTH, height: BASE_SCREEN_HEIGHT } = {
  width: 375,
  height: 812,
};

let screenWidth: number = Dimensions.get('window').width;
let screenHeight: number = Dimensions.get('window').height;

export type Orientation = 'portrait' | 'landscape';

export interface OrientationState {
  orientation: Orientation;
}

export interface OrientationComponent {
  setState: (state: Partial<OrientationState>) => void;
}

const toNumber = (value: number | string): number => {
  if (typeof value === 'number') {
    return value;
  }

  return parseFloat(value.replace('%', ''));
};

Dimensions.addEventListener('change', ({ window }: { window: ScaledSize }) => {
  screenWidth = window.width;
  screenHeight = window.height;
});

export const widthPercentageToDP = (widthPercent: number | string): number => {
  const elemWidth = toNumber(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

export const heightPercentageToDP = (heightPercent: number | string): number => {
  const elemHeight = toNumber(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export const getScreenWidth = (): number => screenWidth;

export const getScreenHeight = (): number => screenHeight;

export const getOrientation = (): Orientation => {
  return screenWidth < screenHeight ? 'portrait' : 'landscape';
};

export const isPortrait = (): boolean => getOrientation() === 'portrait';

export const isLandscape = (): boolean => getOrientation() === 'landscape';

export const isSmallDevice = (): boolean => screenWidth < 360;

const [shortDimension, longDimension] = screenWidth < screenHeight ? [screenWidth, screenHeight] : [screenHeight, screenWidth];

export const scale = (size: number): number => {
  return (shortDimension / BASE_SCREEN_WIDTH) * size;
};

export const horizontalScale = (size: number): number => {
  return (longDimension / BASE_SCREEN_WIDTH) * size;
};
export const verticalScale = (size: number): number => {
  return (longDimension / BASE_SCREEN_HEIGHT) * size;
};

export const moderateScale = (size: number, factor = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

export const moderateVerticalScale = (size: number, factor = 0.5): number => {
  return size + (verticalScale(size) - size) * factor;
};


export const fontScale = (size: number, factor = 0.5): number => {
  return PixelRatio.roundToNearestPixel(moderateScale(size, factor));
};

export const spacing = (value: number): number => {
  return PixelRatio.roundToNearestPixel(scale(value));
};

export const onDimensionChange = (
  callback: (window: ScaledSize, orientation: Orientation) => void,
): (() => void) => {
  const subscription = Dimensions.addEventListener('change', ({ window }) => {
    callback(window, window.width < window.height ? 'portrait' : 'landscape');
  });

  return () => {
    subscription.remove();
  };
};
