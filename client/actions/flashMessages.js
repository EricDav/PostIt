import { ADD_FLASH_MESSAGE } from './types';

export default function setFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
}
