import { log } from 'app/logging/useLogger';
import { boardImagesApi } from 'services/api/endpoints/boardImages';
import { startAppListening } from '..';

const moduleLog = log.child({ namespace: 'boards' });

export const addBoardApiListeners = () => {
  // add image to board - fulfilled
  startAppListening({
    matcher: boardImagesApi.endpoints.addBoardImage.matchFulfilled,
    effect: (action, { getState, dispatch }) => {
      const { board_id, image_name } = action.meta.arg.originalArgs;

      moduleLog.debug(
        { data: { board_id, image_name } },
        'Image added to board'
      );
    },
  });

  // add image to board - rejected
  startAppListening({
    matcher: boardImagesApi.endpoints.addBoardImage.matchRejected,
    effect: (action, { getState, dispatch }) => {
      const { board_id, image_name } = action.meta.arg.originalArgs;

      moduleLog.debug(
        { data: { board_id, image_name } },
        'Problem adding image to board'
      );
    },
  });

  // remove image from board - fulfilled
  startAppListening({
    matcher: boardImagesApi.endpoints.deleteBoardImage.matchFulfilled,
    effect: (action, { getState, dispatch }) => {
      const { image_name } = action.meta.arg.originalArgs;

      moduleLog.debug({ data: { image_name } }, 'Image removed from board');
    },
  });

  // remove image from board - rejected
  startAppListening({
    matcher: boardImagesApi.endpoints.deleteBoardImage.matchRejected,
    effect: (action, { getState, dispatch }) => {
      const image_name = action.meta.arg.originalArgs;

      moduleLog.debug(
        { data: { image_name } },
        'Problem removing image from board'
      );
    },
  });

  // many images added to board - fulfilled
  startAppListening({
    matcher: boardImagesApi.endpoints.addManyBoardImages.matchFulfilled,
    effect: (action, { getState, dispatch }) => {
      const { board_id, image_names } = action.meta.arg.originalArgs;

      moduleLog.debug(
        { data: { board_id, image_names } },
        'Images added to board'
      );
    },
  });

  // many images added to board - rejected
  startAppListening({
    matcher: boardImagesApi.endpoints.addManyBoardImages.matchRejected,
    effect: (action, { getState, dispatch }) => {
      const { board_id, image_names } = action.meta.arg.originalArgs;

      moduleLog.debug(
        { data: { board_id, image_names } },
        'Problem adding many images to board'
      );
    },
  });

  // remove many images from board - fulfilled
  startAppListening({
    matcher: boardImagesApi.endpoints.deleteManyBoardImages.matchFulfilled,
    effect: (action, { getState, dispatch }) => {
      const { image_names } = action.meta.arg.originalArgs;

      moduleLog.debug({ data: { image_names } }, 'Images removed from board');
    },
  });

  // remove many images from board - rejected
  startAppListening({
    matcher: boardImagesApi.endpoints.deleteManyBoardImages.matchRejected,
    effect: (action, { getState, dispatch }) => {
      const image_names = action.meta.arg.originalArgs;

      moduleLog.debug(
        { data: { image_names } },
        'Problem removing many images from board'
      );
    },
  });
};
