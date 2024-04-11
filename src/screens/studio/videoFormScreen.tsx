import {
  NavigationContext,
  RouteProp,
  StackActions,
  useRoute,
} from '@react-navigation/native';
import {Button, Input} from '@rneui/themed';
import {deleteObject, ref} from 'firebase/storage';
import {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {api} from '../../axios';
import {AppDialog} from '../../components/common/appDialog';
import {TitleHeader} from '../../components/header/titleHeader';
import {PickImage} from '../../components/upload/pickImage';
import {PickVideo} from '../../components/upload/pickVideo';
import {VideoRequest} from '../../interface';
import {Params} from '../../types';
import {storage} from '../../utils/firebase';

export interface SelectedFile {
  uri: string;
  type: string;
  name: string;
  blob: Blob;
}

export interface IVideoFormScreenProps {
  isEdit?: boolean;
}

export function VideoFormScreen(props: IVideoFormScreenProps) {
  const navigation = useContext(NavigationContext);

  const route = useRoute<RouteProp<Params, 'watchScreenParams'>>();
  const videoId = route.params?.v as string;

  const [img, setImg] = useState<SelectedFile | undefined>(undefined);
  const [imgPerc, setImgPerc] = useState(0);

  const [video, setVideo] = useState<SelectedFile | undefined>(undefined);
  const [videoPerc, setVideoPerc] = useState(0);

  const [inputs, setInputs] = useState({
    title: '',
    desc: '',
    duration: 0,
    imgUrl: '',
    imgPath: '',
    videoUrl: '',
    videoPath: '',
    status: 'pending',
  } as VideoRequest);

  const handleUpload = async () => {
    try {
      if (videoId) {
        await api.video.editVideo(videoId, inputs);
      } else {
        await api.video.addVideo(inputs);
      }
      navigation?.dispatch(StackActions.replace('studio'));
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleDelete = async () => {
    try {
      const videoRef = ref(storage, inputs.videoPath);
      deleteObject(videoRef);
      const imageRef = ref(storage, inputs.imgPath);
      deleteObject(imageRef);
      await api.video.deleteVideo(videoId);
    } catch (error) {
      console.log('error', error);
    } finally {
      navigation?.dispatch(StackActions.replace('studio'));
    }
  };

  useEffect(() => {
    if (videoId) {
      (async () => {
        try {
          const res = await api.video.getVideo(videoId);

          setInputs(res?.data?.data);
          setImgPerc(100);
          setVideoPerc(100);
        } catch (error) {
          console.log('error', error);
        }
      })();
    }
  }, []);

  return (
    <>
      <TitleHeader title={videoId ? 'Edit video' : 'New video'}>
        <Button
          disabled={
            !inputs?.imgUrl ||
            !inputs?.videoUrl ||
            !inputs?.duration ||
            !inputs?.title
          }
          onPress={handleUpload}
          className="rounded-md bg-blue-700 px-4">
          <Text className="text-white">Confirm</Text>
        </Button>
      </TitleHeader>
      <ScrollView className="px-2">
        <Text className="mb-1 text-lg text-white">Video:</Text>
        <PickVideo
          inputs={inputs}
          setInputs={setInputs}
          setVideo={setVideo}
          setVideoPerc={setVideoPerc}
          video={video}
          videoPerc={videoPerc}
        />

        <Text className="mb-1 text-lg text-white">Title:</Text>
        <Input
          value={inputs.title}
          onChangeText={text => {
            setInputs(prev => ({...prev, title: text}));
          }}
          style={{
            color: 'white',
          }}
          placeholder="Title"
        />

        <Text className="mb-1 text-lg text-white">Description:</Text>
        <Input
          value={inputs.desc}
          multiline={true}
          numberOfLines={4}
          onChangeText={text => {
            setInputs(prev => ({...prev, desc: text}));
          }}
          style={{
            color: 'white',
          }}
          placeholder="Description"
        />

        <Text className="mb-1 text-lg text-white">Thumbnail:</Text>
        <PickImage
          inputs={inputs}
          setInputs={setInputs}
          img={img}
          imgPerc={imgPerc}
          setImg={setImg}
          setImgPerc={setImgPerc}
        />

        {videoId && (
          <AppDialog
            onConfirm={handleDelete}
            title="Confirm Delete"
            content={<Text>Are you sure you want to delete this video?</Text>}>
            {handleToggle => (
              <Button
                color="error"
                onPress={handleToggle}
                className="rounded-md px-4">
                <Text className="text-white">Delete</Text>
              </Button>
            )}
          </AppDialog>
        )}

        <View className="h-20"></View>
      </ScrollView>
    </>
  );
}
