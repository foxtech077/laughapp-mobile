import React from 'react';
import { isLiquidGlassSupported, LiquidGlassView } from '@callstack/liquid-glass';
import { BlurView } from '@react-native-community/blur';
import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

const GLASS_BORDER_COLOR = 'rgba(255, 255, 255, 0.07)';
const GLASS_TINT_COLOR = 'rgba(45, 43, 44, 0.2)';

type GlassCardProps = {
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
    effect?: 'clear' | 'regular' | 'none';
    interactive?: boolean;
};

const glassSurfaceStyle: ViewStyle = {
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: GLASS_BORDER_COLOR,
};

const GlassCard = ({ style, children, effect = 'clear', interactive = true }: GlassCardProps) => {
    if (isLiquidGlassSupported) {
        return (
            <LiquidGlassView style={[glassSurfaceStyle, style]} effect={effect} interactive={interactive}>
                {children}
            </LiquidGlassView>
        );
    }

    const isAndroid = Platform.OS === 'android';

    return (
        <View style={[glassSurfaceStyle, style]}>
            <BlurView
                style={StyleSheet.absoluteFill}
                blurType={isAndroid ? 'light' : 'ultraThinMaterialLight'}
                blurAmount={isAndroid ? 32 : 24}
                overlayColor={GLASS_TINT_COLOR}
                reducedTransparencyFallbackColor={GLASS_TINT_COLOR}
                autoUpdate={isAndroid}
            />
            {children}
        </View>
    );
};

export default GlassCard;
