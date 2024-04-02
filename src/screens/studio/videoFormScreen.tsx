import {Input} from '@rneui/themed';
import {useState} from 'react';
import {TitleHeader} from '../../components/header/titleHeader';

export interface IVideoFormScreenProps {}

export function VideoFormScreen(props: IVideoFormScreenProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <>
      <TitleHeader title="New video" />
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
        onChangeText={text => {
          setDescription(text);
        }}
        style={{
          color: 'white',
        }}
        placeholder="Description"
      />
    </>
  );
}
