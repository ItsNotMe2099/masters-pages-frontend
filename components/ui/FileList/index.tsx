import { getMediaPath } from "utils/media";
import styles from './index.module.scss'

interface Props {
  files: string[]
}

export default function FileList({files}: Props) {


  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop();

    switch (ext){
      case 'psd':
        return 'psd';
      case 'eps':
        return 'eps';
      case 'pdf':
        return 'pdf';
      case 'txt':
        return 'txt';
      case 'doc':
        return 'doc';
      case 'docx':
        return 'docx';
      case 'png':
        return 'png';
      case 'ppt':
        return 'ppt';
      case 'pptx':
        return 'pptx';
      case 'ai':
        return 'ai';
      case 'tif':
        return 'tif';
      case 'tiff':
        return 'tiff';
      case 'jpg':
        return 'jpg';
      case 'jpeg':
        return 'jpg';
      case 'gif':
        return 'gif';
      case 'zip':
        return 'zip';
      case 'svg':
        return 'svg';
      case 'avi':
        return 'avi';
      case 'mov':
        return 'mov';
      default:
        return 'unknowm';

    }
  }
  return (
    <div className={styles.files}>
      {files.map((file =>  <a href={getMediaPath(file)} target={'_blank'} className={styles.file}><img src={`/img/icons/file_types/${getFileIcon(file)}.svg`}/></a>))}

    </div>
  )
}
FileList.defaultProps = {

}
