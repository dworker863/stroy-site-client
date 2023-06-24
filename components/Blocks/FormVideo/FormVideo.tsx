import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import { FC, useState } from 'react';
import * as Yup from 'yup';
import { StyledLabel } from '../../../commonStyles/StyledLabel';
import { StyledErrorMessage } from '../../../commonStyles/StyledErrorMessage';
import Button from '../../Elements/Button/Button';
import Dropzone from 'react-dropzone';
import { StyledDropZone } from '../../../commonStyles/StyledDropzone';
import { StyledPlus } from '../../../commonStyles/StyledPlus';
import Thumbnails from '../../Elements/Thumbnails/Thumbnails';
import { postVideo, updateVideo } from '../../../api/api';
import { StyledField } from '../../../commonStyles/StyledField';
import { IVideo } from '../../../commonTypesInterfaces/IVideo';
import { TFormVideoProps } from './TFormVideo';
import { useRouter } from 'next/router';

const FormVideo: FC<TFormVideoProps> = ({ video }) => {
  const [dropVideos, setDropVideos] = useState<any>([]);
  const [err, setErr] = useState('');

  const router = useRouter();

  const videoFormats = [
    'video/mp4',
    'video/avi',
    'video/wmv',
    'video/mov',
    'video/webm',
  ];

  return (
    <Formik
      initialValues={{
        name: video?.name || '',
        description: video?.description || '',
        video: video?.video || null,
        link: video?.link || '',
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Укажите название видео'),
        description: Yup.string(),
        video: Yup.mixed()
          .test('fileType', 'Недопустимый формат видео', (video) => {
            if (video) {
              return video && videoFormats.includes((video as File).type);
            }

            return true;
          })
          .nullable(),
        link: Yup.string(),
      })}
      onSubmit={async (
        values: IVideo,
        { setSubmitting }: FormikHelpers<IVideo>,
      ) => {
        if (video) {
          const res = await updateVideo({ id: video.id, ...values });

          if (typeof res === 'string') {
            setErr(res);
          }
        } else {
          const res = await postVideo(values);

          if (typeof res === 'string') {
            setErr(res);
          }
        }

        router.push(router.pathname, undefined, { scroll: false });
        setSubmitting(false);
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <StyledLabel htmlFor="name">Название</StyledLabel>
          <StyledField id="name" type="text" name="name" />
          <ErrorMessage name="name">
            {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>
          <StyledLabel htmlFor="description">Описание</StyledLabel>
          <StyledField id="description" type="text" name="description" />
          <ErrorMessage name="description">
            {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>
          <StyledLabel htmlFor="link">Ссылка</StyledLabel>
          <StyledField id="link" type="text" name="link" />
          <ErrorMessage name="link">
            {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>
          <StyledLabel htmlFor="video">Видео</StyledLabel>
          <Dropzone
            onDrop={(acceptedFiles) => {
              setDropVideos([...dropVideos, ...acceptedFiles]);
              setFieldValue('video', acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <StyledDropZone {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Загрузите или перетащите видео</p>
                <StyledPlus>+</StyledPlus>
              </StyledDropZone>
            )}
          </Dropzone>
          <Thumbnails
            thumbnails={dropVideos}
            changeFilesHandler={setFieldValue}
          />
          <ErrorMessage name="video">
            {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>
          <StyledErrorMessage>{err}</StyledErrorMessage>
          <Button type="submit" text="Загрузить" />
        </Form>
      )}
    </Formik>
  );
};

export default FormVideo;