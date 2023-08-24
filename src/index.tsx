import React, { useState, type FC } from 'react';
import { Dimensions, View } from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
  TapGestureHandler,
  type HandlerStateChangeEvent,
  type PanGestureHandlerEventPayload,
  type TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

type Pattern = Array<
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'tap'
  | 'tapLeft'
  | 'tapRight'
  | 'tapCenter'
>;

const windowWidth = Dimensions.get('window').width;

interface KonamiCodeProps {
  children: React.ReactNode;
  pattern?: Pattern;
  onPatternComplete?: () => void;
  onPatternFail?: () => void;
}

const defaultPattern = [
  'up',
  'up',
  'down',
  'down',
  'left',
  'right',
  'left',
  'right',
  'tapLeft',
  'tapRight',
  'tapCenter',
];

const KonamiCode: FC<KonamiCodeProps> = ({
  children,
  onPatternComplete,
  onPatternFail,
  pattern = defaultPattern,
}) => {
  const gestureHandlerRef = React.useRef(null);
  const [interactionPattern, setInteractionPattern] = useState<Pattern>([]);

  const handleSwipe = (
    event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>
  ) => {
    const { translationX, translationY, state } = event.nativeEvent;
    if (state !== State.END) return;
    let interaction;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        interaction = 'right' as const;
      } else {
        interaction = 'left' as const;
      }
    } else {
      if (translationY > 0) {
        interaction = 'down' as const;
      } else {
        interaction = 'up' as const;
      }
    }

    if (interaction) {
      checkPattern([...interactionPattern, interaction]);
    }
  };

  const handleTap = (
    event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>
  ) => {
    const { state } = event.nativeEvent;
    if (state !== State.END) return;
    const { absoluteX } = event.nativeEvent;
    let interaction;

    if (absoluteX < windowWidth / 3) {
      interaction = 'tapLeft' as const;
    } else if (absoluteX > (windowWidth * 2) / 3) {
      interaction = 'tapRight' as const;
    } else {
      interaction = 'tapCenter' as const;
    }

    checkPattern([...interactionPattern, interaction]);
  };

  const checkPattern = (currentPattern: Pattern) => {
    const useful = currentPattern.length - 1;
    const lastInteraction = currentPattern[useful];
    const expectedInteraction = pattern[useful];

    if (currentPattern.length === pattern.length) {
      onPatternComplete?.();
      setInteractionPattern([]);
      return;
    }

    if (lastInteraction === expectedInteraction) {
      setInteractionPattern(currentPattern);
      return;
    }

    if (lastInteraction === pattern[0]) {
      setInteractionPattern([pattern[0]!]);
      onPatternFail?.();
      return;
    }

    onPatternFail?.();
    setInteractionPattern([]);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        ref={gestureHandlerRef}
        onHandlerStateChange={handleSwipe}
      >
        <TapGestureHandler
          ref={gestureHandlerRef}
          onHandlerStateChange={handleTap}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            {children}
          </View>
        </TapGestureHandler>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export type { KonamiCodeProps };

export { KonamiCode };

export default KonamiCode;
