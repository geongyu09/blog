import BASE_IMAGE_PATH from '@/constants/path/ImagePath';

export const getImagePath = (path: string) => `${BASE_IMAGE_PATH}/${path}`;

export default Object.freeze({ getImagePath });
