import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {useCallback, useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import NewImageIcon from '../../assets/icons/add-image.svg';
import {VideoRequest} from '../../interface';
import {SelectedFile} from '../../screens/studio/videoFormScreen';
import {storage} from '../../utils/firebase';

export interface IPickImageProps {
  inputs: VideoRequest;
  setInputs: React.Dispatch<React.SetStateAction<VideoRequest>>;
  img: SelectedFile | undefined;
  setImg: React.Dispatch<React.SetStateAction<SelectedFile | undefined>>;
  imgPerc: number;
  setImgPerc: React.Dispatch<React.SetStateAction<number>>;
}

export function PickImage({
  inputs,
  setInputs,
  img,
  imgPerc,
  setImg,
  setImgPerc,
}: IPickImageProps) {
  const handleSelectThumbnail = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
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
        setImg(file);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const uploadImage = useCallback(
    (file: SelectedFile) => {
      const fileName = new Date().getTime() + file.name;
      const imagePath = `images/${fileName}`;
      const storageRef = ref(storage, imagePath);
      const uploadTask = uploadBytesResumable(storageRef, file.blob);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImgPerc(Math.round(progress));
        },
        error => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setInputs(prev => {
              return {
                ...prev,
                imgUrl: downloadURL,
                imgPath: imagePath,
              };
            });
          });
        },
      );
    },
    [inputs?.imgPath],
  );

  useEffect(() => {
    if (!inputs?.imgPath) {
      img && uploadImage(img);
    }
  }, [uploadImage, img, inputs?.imgPath]);

  if (imgPerc === 0) {
    return (
      <TouchableOpacity
        onPress={handleSelectThumbnail}
        className="mb-3 flex aspect-[16/9] w-full items-center justify-center rounded-lg border border-dotted border-gray-400">
        <View className="flex items-center">
          <NewImageIcon color="white" />

          <Text className="mt-2 text-white">Pick a thumbnail</Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (imgPerc > 0 && imgPerc < 100) {
    return (
      <View className="mb-3 flex aspect-[16/9] w-full items-center justify-center rounded-lg border border-dotted border-gray-400">
        <Text className="mt-2 text-white">{'Uploading: ' + imgPerc + '%'}</Text>
      </View>
    );
  }

  return (
    <Image
      className="mb-3 flex aspect-[16/9] w-full items-center justify-center rounded-lg border border-dotted border-gray-400"
      source={{
        uri: inputs?.imgUrl,
      }}
    />
  );
}
