import {Dialog} from '@rneui/themed';
import {ReactNode, useState} from 'react';

export interface IAppDialogProps {
  children: (handleToggle: () => void) => ReactNode;
  onConfirm: () => void;
  title: string;
  content: ReactNode;
}

export function AppDialog(props: IAppDialogProps) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(prev => !prev);
  };

  return (
    <>
      {props.children(handleToggle)}
      <Dialog isVisible={open} onBackdropPress={handleToggle}>
        <Dialog.Title title={props.title} />
        {props.content}
        <Dialog.Actions>
          <Dialog.Button title="Confirm" onPress={props.onConfirm} />
          <Dialog.Button title="Cancel" onPress={handleToggle} />
        </Dialog.Actions>
      </Dialog>
    </>
  );
}
