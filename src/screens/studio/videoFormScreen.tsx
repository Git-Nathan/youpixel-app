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

  console.log('inputs', inputs);

  const handleUpload = async () => {};

  return (
    <>
      <TitleHeader title="New video">
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

      <PickVideo inputs={inputs} setInputs={setInputs} />

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

      <PickImage inputs={inputs} setInputs={setInputs} />
    </>
  );
}
