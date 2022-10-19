import { FileUploadAcceptType } from 'types/enums'

export default class Converter {

  static getFileUploadAccept(type: FileUploadAcceptType): { [key: string]: string[] } {
    const images = { 'image/*': ['.png','.jpg', '.jpeg']}
    const videos = { 'video/*': ['.mp4','.mov', '.avi']}
    const scans = { 'application/pdf': ['.pdf'], 'application/msword': ['.doc', '.docx'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.doc', '.docx'] }
    const docs = { 'application/vnd.ms-excel': ['.xls', '.xlsx'], 'application/vnd.ms-excel.sheet.macroEnabled.12': ['.xls', '.xlsx'], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xls', '.xlsx'], 'text/csv': ['.csv'], 'text/plain': ['.txt'] }
    switch (type) {
      case FileUploadAcceptType.Image:
        return images
      case FileUploadAcceptType.Scan:
        return { ...images, ...scans }
      case FileUploadAcceptType.Document:
        return { ...scans, ...docs }
      case FileUploadAcceptType.Media:
        return { ...images, ...videos }
      default:
        return {}
    }
  }
}
