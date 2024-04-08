import {Button, Input} from '@rneui/themed';
import {useState} from 'react';
import {Text} from 'react-native';
import {TitleHeader} from '../../components/header/titleHeader';
import {PickImage} from '../../components/upload/pickImage';
import {PickVideo} from '../../components/upload/pickVideo';
import {VideoRequest} from '../../interface';

export interface SelectedFile {
  uri: string;
  type: string;
  name: string;
  blob: Blob;
}

export interface IVideoFormScreenProps {}

export function VideoFormScreen(props: IVideoFormScreenProps) {
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

      <PickVideo inputs={inputs} setInputs={setInputs} />

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
