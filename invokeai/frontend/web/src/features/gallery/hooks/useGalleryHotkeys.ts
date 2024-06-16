import { useGalleryImages } from 'features/gallery/hooks/useGalleryImages';
import { useGalleryNavigation } from 'features/gallery/hooks/useGalleryNavigation';
import { useHotkeys } from 'react-hotkeys-hook';

/**
 * Registers gallery hotkeys. This hook is a singleton.
 */
export const useGalleryHotkeys = () => {
  // TODO(psyche): Hotkeys when staging - cannot navigate gallery with arrow keys when staging!

  const {
    areMoreImagesAvailable,
    handleLoadMoreImages,
    queryResult: { isFetching },
  } = useGalleryImages();

  const { handleLeftImage, handleRightImage, handleUpImage, handleDownImage, isOnLastImage, areImagesBelowCurrent } =
    useGalleryNavigation();

  useHotkeys(
    ['left', 'alt+left'],
    (e) => {
      handleLeftImage(e.altKey);
    },
    [handleLeftImage]
  );

  useHotkeys(
    ['right', 'alt+right'],
    (e) => {
      if (isOnLastImage && areMoreImagesAvailable && !isFetching) {
        handleLoadMoreImages();
        return;
      }
      if (!isOnLastImage) {
        handleRightImage(e.altKey);
      }
    },
    [isOnLastImage, areMoreImagesAvailable, handleLoadMoreImages, isFetching, handleRightImage]
  );

  useHotkeys(
    ['up', 'alt+up'],
    (e) => {
      handleUpImage(e.altKey);
    },
    { preventDefault: true },
    [handleUpImage]
  );

  useHotkeys(
    ['down', 'alt+down'],
    (e) => {
      if (!areImagesBelowCurrent && areMoreImagesAvailable && !isFetching) {
        handleLoadMoreImages();
        return;
      }
      handleDownImage(e.altKey);
    },
    { preventDefault: true },
    [areImagesBelowCurrent, areMoreImagesAvailable, handleLoadMoreImages, isFetching, handleDownImage]
  );
};
