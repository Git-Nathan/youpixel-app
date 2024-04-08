import {Button, Input} from '@rneui/themed';
import {useState} from 'react';
import {Text, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NewVideoIcon from '../../assets/icons/video-add.svg';
import {TitleHeader} from '../../components/header/titleHeader';
import {PickImage} from '../../components/upload/pickImage';
import {VideoRequest} from '../../interface';

export interface SelectedFile {
  uri: string;
  type: string;
  name: string;
  blob: Blob;
}

export interface IVideoFormScreenProps {}

export function VideoFormScreen(props: IVideoFormScreenProps) {
  const [video, setVideo] = useState(undefined);
  const [videoPerc, setVideoPerc] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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

  const handleSelectVideo = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      console.log('doc', doc);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleUpload = async () => {};

  return (
    <>
      <TitleHeader title="New video">
        <Button
          disabled
          onPress={handleUpload}
          className="rounded-md bg-blue-700 px-4">
          <Text className="text-white">Confirm</Text>
        </Button>
      </TitleHeader>
      <TouchableOpacity
        onPress={handleSelectVideo}
        className="mb-3 flex aspect-[16/9] w-full items-center justify-center rounded-lg border border-dotted border-gray-400">
        <View className="flex items-center">
          <NewVideoIcon color="white" />
          <Text className="mt-2 text-white">Pick a video</Text>
        </View>
      </TouchableOpacity>
      <Input
        value={title}
        onChangeText={text => {
          setTitle(text);
        }}
        style={{
          color: 'white',
        }}
        placeholder="Title"
      />
      <Input
        value={description}
        multiline={true}
        numberOfLines={4}
        onChangeText={text => {
          setDescription(text);
        }}
        style={{
          color: 'white',
        }}
        placeholder="Description"
      />
      <PickImage inputs={inputs} setInputs={setInputs} />
    </>
  );
}
