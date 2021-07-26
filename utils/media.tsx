import styles from "components/Chat/ChatMessageText/index.module.scss";

export const getMediaPath = (path) => {
  return `${process.env.NEXT_API_URL || process.env.NEXT_PUBLIC_API_URL}/api/s3/${path}`
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

