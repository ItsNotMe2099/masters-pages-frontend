import styles from "components/Chat/ChatMessageText/index.module.scss";

export const getMediaPath = (path) => {
  return `https://masterspages.com/api/s3/uploads/${path}`
}

export const getMediaExt = (file) => {
  return file.split('.').pop().toLowerCase();
}
export const isMediaImage = (file) => {
  return ['jpg', 'jpeg', 'png', 'gif'].includes(getMediaExt(file));
}
export const isMediaVideo = (file) => {
  return ['mp4', 'avi'].includes(getMediaExt(file));
}

