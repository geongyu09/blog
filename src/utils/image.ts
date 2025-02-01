import BASE_IMAGE_PATH from '@/constants/path/ImagePath';

export const getImagePath = (path: string) => {
  return process.env.NODE_ENV === 'development'
    ? path
    : `${BASE_IMAGE_PATH}/${path}`;
};

export default Object.freeze({ getImagePath });
