import { FC, SyntheticEvent, useContext, useEffect, useState } from 'react';
import { A11y, EffectFlip, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardReview from '../CardReview/CardReview';
import { TCardProjectProps } from './TCardProject';
import {
  StyledCardProject,
  StyledCardProjectContent,
  StyledCardProjectDesc,
  StyledCardProjectInfo,
  StyledCardProjectPrice,
  StyledCardProjectSliderButtons,
  StyledCardProjectSliderNext,
  StyledCardProjectSliderPrev,
  StyledCardProjectTitle,
} from './StyledCardProject';

import { ProjectsContext } from '../../../pages/projects';
import { deleteProject } from '../../../api/api';
import { useRouter } from 'next/router';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-flip';
import EditButtons from '../../Elements/EditButtons/EditButtons';
import { StyledFullText } from '../../../commonStyles/StyledFullText';

const CardProject: FC<TCardProjectProps> = ({
  project,
  updateProjectFormHandler,
}) => {
  const { auth } = useContext(ProjectsContext);
  const router = useRouter();
  const [smallImage, setSmallImage] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: 576px)`);
    if (media.matches) {
      setSmallImage(true);
    }
  }, []);

  const targetWidth = smallImage ? 250 : 450;

  const imageLoadHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const image = e.target as HTMLImageElement;

    setAspectRatio(
      Number((image.naturalWidth / image.naturalHeight).toFixed(2)),
    );
  };

  const deleteProjectHandler = async (id?: number) => {
    await deleteProject(id);
    router.push('./projects');
  };

  const showFullTextHandler = () => {
    setShowText(!showText);
  };

  return (
    <StyledCardProject>
      <StyledCardProjectTitle>{project.name}</StyledCardProjectTitle>
      <Swiper
        modules={[Navigation, EffectFlip, A11y]}
        grabCursor={true}
        slidesPerView={1}
        effect={'flip'}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
      >
        <StyledCardProjectSliderButtons>
          <StyledCardProjectSliderPrev className="swiper-button-prev" />
          <StyledCardProjectSliderNext className="swiper-button-next" />
        </StyledCardProjectSliderButtons>
        {project.images.map((image) => (
          <SwiperSlide
            key={project.id + image}
            style={{
              width: `${targetWidth}`,
              height: `calc(${targetWidth}px / ${aspectRatio})`,
            }}
          >
            <Image
              fill
              src={image}
              alt={project.name}
              onLoad={imageLoadHandler}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <StyledCardProjectContent active={auth}>
        <StyledCardProjectInfo>
          <StyledCardProjectPrice>
            {project.price + ' тг'}
          </StyledCardProjectPrice>
          <StyledCardProjectDesc>
            {!showText &&
            project?.description &&
            project?.description.length > 200 ? (
              <>
                {project?.description.slice(0, 200) + '...'}
                <StyledFullText onClick={showFullTextHandler}>
                  Читать
                </StyledFullText>
              </>
            ) : !project?.description ? (
              ''
            ) : project?.description.length > 200 ? (
              <>
                {project?.description + '   '}
                <StyledFullText onClick={showFullTextHandler}>
                  Скрыть
                </StyledFullText>
              </>
            ) : (
              project.description
            )}
          </StyledCardProjectDesc>
        </StyledCardProjectInfo>
        <CardReview review={project.projectReview} />
      </StyledCardProjectContent>
      {auth && (
        <EditButtons
          entityId={project.id as number}
          updateBtnHandler={updateProjectFormHandler}
          deleteBtnHandler={deleteProjectHandler}
          styles="project"
        />
      )}
    </StyledCardProject>
  );
};

export default CardProject;
