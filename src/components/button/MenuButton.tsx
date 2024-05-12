import clsx from 'clsx';
import * as React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export interface IMenuButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
}

export default function MenuButton({
  title,
  onPress,
  className,
}: IMenuButtonProps) {
  return (
    <TouchableOpacity
      className={clsx('flex items-center justify-center py-2', className)}
      onPress={onPress}>
      <Text className="text-lg text-white">{title}</Text>
    </TouchableOpacity>
  );
}
