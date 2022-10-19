import { FileUploadAcceptType } from 'types/enums'

export default class Converter {

  static getFileUploadAccept(type: FileUploadAcceptType): string[] {
    const images = ['.png','.jpg', '.jpeg']
    const videos = ['.mp4','.mov', '.avi']
    const scans =['.pdf']
    const docs =
      ['.xls', '.xlsx', '.docx', '.doc', '.csv', '.txt', '.odt']
    switch (type) {
      case FileUploadAcceptType.Image:
        return images
      case FileUploadAcceptType.Scan:
        return [...images, ...scans]
      case FileUploadAcceptType.Document:
        return [...scans, ...docs]
      case FileUploadAcceptType.Media:
        return [...images, ...videos]
      default:
        return []
    }

  }
}
