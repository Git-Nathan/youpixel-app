import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {useCallback, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import NewVideoIcon from '../../assets/icons/video-add.svg';
import {VideoRequest} from '../../interface';
import {SelectedFile} from '../../screens/studio/videoFormScreen';
import {storage} from '../../utils/firebase';
import {VideoPlayer} from '../watch/videoPlayer';

export interface IPickVideoProps {
  inputs: VideoRequest;
  setInputs: React.Dispatch<React.SetStateAction<VideoRequest>>;
  video: SelectedFile | undefined;
  setVideo: React.Dispatch<React.SetStateAction<SelectedFile | undefined>>;
  videoPerc: number;
  setVideoPerc: React.Dispatch<React.SetStateAction<number>>;
}

export function PickVideo({
  inputs,
  setInputs,
  setVideo,
  setVideoPerc,
  video,
  videoPerc,
}: IPickVideoProps) {
  const handleSelectVideo = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      if (doc[0]?.uri) {
        const filePath = doc[0]?.uri;

        const blob: Blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', doc[0]?.uri, true);
          xhr.send(null);
        });

        const file = {
          uri: filePath,
          type: doc[0]?.type as string,
          name: doc[0]?.name as string,
          blob,
        };
        setVideo(file);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const uploadVideo = useCallback(
    (file: SelectedFile) => {
      const fileName = new Date().getTime() + file.name;
      const videoPath = `videos/${fileName}`;
      const storageRef = ref(storage, videoPath);
      const uploadTask = uploadBytesResumable(storageRef, file.blob);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setVideoPerc(Math.round(progress));
        },
        error => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setInputs(prev => {
              return {
                ...prev,
                videoUrl: downloadURL,
                videoPath: videoPath,
              };
            });
          });
        },
      );
    },
    [inputs?.videoPath],
  );

  const handleGetDuration = (duration: number) => {
    setInputs(prev => ({...prev, duration}));
  };

  useEffect(() => {
    if (!inputs?.videoPath) {
      video && uploadVideo(video);
    }
  }, [uploadVideo, video, inputs?.videoPath]);

  if (videoPerc === 0) {
    return (
      <TouchableOpacity
        onPress={handleSelectVideo}
        className="mb-3 flex aspect-[16/9] w-full items-center justify-center rounded-lg border border-dotted border-gray-400">
        <View className="flex items-center">
          <NewVideoIcon color="white" />

          <Text className="mt-2 text-white">Pick a video</Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (videoPerc > 0 && videoPerc < 100) {
    return (
      <View className="mb-3 flex aspect-[16/9] w-full items-center justify-center rounded-lg border border-dotted border-gray-400">
        <Text className="mt-2 text-white">
          {'Uploading: ' + videoPerc + '%'}
        </Text>
      </View>
    );
  }

  return (
    <VideoPlayer setDuration={handleGetDuration} videoUri={inputs?.videoUrl} />
  );
}
