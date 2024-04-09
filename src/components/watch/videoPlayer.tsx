import {Skeleton} from '@rneui/base';
import {Slider} from '@rneui/themed';
import {useRef, useState} from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Video, {OnProgressData, VideoRef} from 'react-native-video';
import BackwardIcon from '../../assets/icons/backward-10-seconds.svg';
import ForwardIcon from '../../assets/icons/forward-10-seconds.svg';
import FullscreenIcon from '../../assets/icons/full-screen.svg';
import PauseIcon from '../../assets/icons/pause.svg';
import PlayIcon from '../../assets/icons/play.svg';
import {globalStyles} from '../../styles/globalStyles';
import {videoTimeFormat} from '../../utils/videoTimeFormat';

export interface IVideoPlayer {
  videoUri: string;
  setDuration?: (duration: number) => void;
}

export const VideoPlayer = ({videoUri, setDuration}: IVideoPlayer) => {
  // Auto hidden controls
  const hiddenTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePressControls = () => {
    setClicked(true);
    if (hiddenTimeoutRef.current) {
      clearTimeout(hiddenTimeoutRef.current);
    }
    hiddenTimeoutRef.current = setTimeout(() => {
      setClicked(false);
    }, 2000);
  };

  // Video player
  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState<OnProgressData>(
    {} as OnProgressData,
  );
  const [fullScreen, setFullScreen] = useState(false);
  const videoRef = useRef<VideoRef>(null);

  const handlePause = () => {
    handlePressControls();
    setPaused(prev => !prev);
  };

  const handleSeek = (seekTime: number) => {
    handlePressControls();
    videoRef.current?.seek(seekTime);
  };

  const handleFullscreen = () => {
    if (fullScreen) {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false);
    } else {
      StatusBar.setHidden(true);
      Orientation.lockToLandscape();
    }
    setFullScreen(!fullScreen);
  };

  if (!videoUri) {
    return (
      <View className="aspect-[16/9] w-full">
        <Skeleton height="100%" />
      </View>
    );
  }

  return (
    <View className="flex">
      <TouchableOpacity className="w-full" onPress={handlePressControls}>
        <Video
          resizeMode="contain"
          onLoad={data => {
            if (setDuration) {
              setDuration(data.duration);
            }
          }}
          style={{
            width: '100%',
            height: fullScreen ? '100%' : undefined,
            aspectRatio: fullScreen ? undefined : 1.77,
            backgroundColor: 'black',
          }}
          source={{uri: videoUri}}
          ref={videoRef}
          paused={paused}
          onProgress={x => {
            setProgress(x);
          }}
        />
        {clicked && (
          <TouchableOpacity
            className="absolute left-0 top-0 flex h-full w-full flex-row items-center justify-center"
            style={{
              backgroundColor: 'rgba(0,0,0,.5)',
            }}
            onPress={() => {
              handlePressControls();
            }}>
            <View className="flex flex-row items-center">
              <TouchableOpacity
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  backgroundColor: 'rgba(0,0,0,.5)',
                }}
                onPress={() => {
                  handleSeek(progress.currentTime - 10);
                }}>
                <BackwardIcon color={'white'} height="26px" width="26px" />
              </TouchableOpacity>
              <TouchableOpacity
                className="mx-[14vw] flex h-14 w-14 items-center justify-center rounded-full"
                style={{
                  backgroundColor: 'rgba(0,0,0,.5)',
                }}
                onPress={handlePause}>
                {paused ? (
                  <PlayIcon color={'white'} height="32px" width="32px" />
                ) : (
                  <PauseIcon color={'white'} height="32px" width="32px" />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  backgroundColor: 'rgba(0,0,0,.5)',
                }}
                onPress={() => {
                  handleSeek(progress.currentTime + 10);
                }}>
                <ForwardIcon color={'white'} height="26px" width="26px" />
              </TouchableOpacity>
            </View>
            <View className="absolute bottom-0 flex w-full flex-row items-center justify-between px-5">
              <Text className="text-white">
                {videoTimeFormat(progress.currentTime?.toFixed(0))}
              </Text>
              <Slider
                style={{
                  width: '80%',
                }}
                thumbStyle={{
                  height: 14,
                  width: 14,
                  backgroundColor: globalStyles.primaryColor,
                }}
                minimumValue={0}
                maximumValue={progress.seekableDuration}
                value={progress.currentTime}
                onValueChange={x => {
                  handleSeek(x);
                }}
              />
              <Text className="text-white">
                {videoTimeFormat(progress.seekableDuration?.toFixed(0))}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleFullscreen}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full"
              style={{
                backgroundColor: 'rgba(0,0,0,.5)',
              }}>
              <FullscreenIcon color={'white'} height="26px" width="26px" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};
