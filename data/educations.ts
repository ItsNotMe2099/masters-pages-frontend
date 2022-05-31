import { useTranslation } from "next-i18next"

export const Educations = () => {

const {t} = useTranslation('common')

  return [
  {value: 'student', label: `${t('educations.student')}`},
  {value: 'graduate', label: `${t('educations.graduate')}`},
  {value: 'undergraduate', label: `${t('educations.undergraduate')}`},
  {value: 'bachelor', label: `${t('educations.bachelor')}`},
  {value: 'master',label: `${t('educations.master')}`},
  {value: 'phd', label: `${t('educations.phd')}`},
]

}