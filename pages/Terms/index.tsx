import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import MainSectionFooter from 'components/for_pages/MainUserPage/Footer'
import MainSectionHeader from 'components/for_pages/MainUserPage/Header'
import Modals from 'components/layout/Modals'
import {getAuthServerSide} from 'utils/auth'

interface Props {
  isOpen?: boolean
  onRequestClose?: () => void,
}

const Terms = (props: Props) =>  {

  const { t } = useTranslation('common')

  return (
    <>
    <MainSectionHeader/>
    <div className={styles.root}>
      <div className={styles.mainTitle}>{t('terms&Conditions.termsOfService.title')}</div>
      <div className={styles.text}>{t('terms&Conditions.termsOfService.welcome')}</div>
      <div className={styles.text}>{t('terms&Conditions.termsOfService.1')}</div>
      <div className={styles.text}>{t('terms&Conditions.termsOfService.2')}</div>
      <div className={styles.text}>{t('terms&Conditions.termsOfService.3')}</div>
      <div className={styles.title}>{t('terms&Conditions.servicesWeProvide.title')}</div>
      <div className={styles.text}>{t('terms&Conditions.servicesWeProvide.1')}</div>
      <div className={styles.text}>{t('terms&Conditions.servicesWeProvide.2')}</div>
      <div className={styles.text}>{t('terms&Conditions.servicesWeProvide.3')}</div>
      <div className={styles.text}>{t('terms&Conditions.servicesWeProvide.4')}</div>
      <div className={styles.text}>{t('terms&Conditions.servicesWeProvide.5')}</div>
      <div className={styles.text}>{t('terms&Conditions.servicesWeProvide.6')}</div>
      <div className={styles.text}>{t('terms&Conditions.servicesWeProvide.7')}</div>
      <div className={styles.text}>{t('terms&Conditions.servicesWeProvide.8')}</div>
      <div className={styles.text}>{t('terms&Conditions.servicesWeProvide.9')}</div>
      <div className={styles.text}>{t('terms&Conditions.servicesWeProvide.10')}</div>
      <div className={styles.text}>{t('terms&Conditions.servicesWeProvide.11')}</div>
      <div className={styles.text}>{t('terms&Conditions.servicesWeProvide.12')}</div>
      <div className={styles.text}>{t('terms&Conditions.servicesWeProvide.13')}</div>
      <div className={styles.text}>{t('terms&Conditions.servicesWeProvide.14')}</div>
      <div className={styles.text}>{t('terms&Conditions.servicesWeProvide.15')}</div>
      <div className={styles.text}>{t('terms&Conditions.servicesWeProvide.16')}</div>
      <div className={styles.text}>{t('terms&Conditions.servicesWeProvide.17')}</div>
      <div className={styles.title}>{t('terms&Conditions.funded.title')}</div>
      <div className={styles.text}>{t('terms&Conditions.funded.1')}</div>
      <div className={styles.text}>{t('terms&Conditions.funded.2')}</div>
      <div className={styles.text}>{t('terms&Conditions.funded.3')}</div>
      <div className={styles.text}>{t('terms&Conditions.funded.4')}</div>
      <div className={styles.title}>{t('terms&Conditions.commitments.title')}</div>
      <div className={styles.text}>{t('terms&Conditions.commitments.1')}</div>
      <div className={styles.text}>{t('terms&Conditions.commitments.2')}</div>
      <div className={styles.text}>{t('terms&Conditions.commitments.3')}</div>
      <ul className={styles.disc}>
        <li className={styles.text}>{t('terms&Conditions.commitments.4')}</li>
        <li className={styles.text}>{t('terms&Conditions.commitments.5')}</li>
        <li className={styles.text}>{t('terms&Conditions.commitments.6')}</li>
        <li className={styles.text}>{t('terms&Conditions.commitments.7')}</li>
      </ul>
      <div className={styles.text}>{t('terms&Conditions.commitments.8')}</div>
      <ul className={styles.disc}>
        <li className={styles.text}>{t('terms&Conditions.commitments.9')}</li>
        <li className={styles.text}>{t('terms&Conditions.commitments.10')}</li>
        <li className={styles.text}>{t('terms&Conditions.commitments.11')}</li>
        <li className={styles.text}>{t('terms&Conditions.commitments.12')}</li>
      </ul>
      <div className={styles.text}>{t('terms&Conditions.commitments.13')}</div>
      <div className={styles.text}>{t('terms&Conditions.commitments.14')}</div>
      <ol>
        <li className={styles.text}>{t('terms&Conditions.commitments.15')}</li>
        <ul className={styles.disc}>
          <li className={styles.text}>{t('terms&Conditions.commitments.16')}</li>
          <li className={styles.text}>{t('terms&Conditions.commitments.17')}</li>
          <li className={styles.text}>{t('terms&Conditions.commitments.18')}</li>
        </ul>
        <li className={styles.text}>{t('terms&Conditions.commitments.19')}</li>
        <li className={styles.text}>{t('terms&Conditions.commitments.20')}</li>
      </ol>
      <div className={styles.text}>{t('terms&Conditions.commitments.21')}</div>
      <div className={styles.text}>{t('terms&Conditions.commitments.22')}</div>
      <div className={styles.text}>{t('terms&Conditions.commitments.23')}</div>
      <div className={styles.text}>{t('terms&Conditions.commitments.24')}</div>
      <div className={styles.text}>{t('terms&Conditions.commitments.25')}</div>
      <div className={styles.text}>{t('terms&Conditions.commitments.26')}</div>
      <ol>
        <li className={styles.text}>
          <div className={styles.text}>{t('terms&Conditions.commitments.27')}</div>
          <div className={styles.text}>{t('terms&Conditions.commitments.28')}</div>
          <div className={styles.text}>{t('terms&Conditions.commitments.29')}</div>
          <div className={styles.text}>{t('terms&Conditions.commitments.30')}</div>
          <div className={styles.text}>{t('terms&Conditions.commitments.31')}</div>
          <div className={styles.text}>{t('terms&Conditions.commitments.32')}</div>
          <ul className={styles.disc}>
            <li className={styles.text}>{t('terms&Conditions.commitments.33')}</li>
            <li className={styles.text}>{t('terms&Conditions.commitments.34')}</li>
            <li className={styles.text}>{t('terms&Conditions.commitments.35')}</li>
            <ul className={styles.disc}>
              <li className={styles.text}>{t('terms&Conditions.commitments.36')}</li>
              <li className={styles.text}>{t('terms&Conditions.commitments.37')}</li>
              <li className={styles.text}>{t('terms&Conditions.commitments.38')}</li>
            </ul>
          </ul>
          <div className={styles.text}>{t('terms&Conditions.commitments.39')}</div>
          <div className={styles.text}>{t('terms&Conditions.commitments.40')}</div>
        </li>
        <li className={styles.text}>{t('terms&Conditions.commitments.41')}</li>
        <li className={styles.text}>{t('terms&Conditions.commitments.42')}</li>
      </ol>
      <div className={styles.text}>{t('terms&Conditions.commitments.43')}</div>
      <div className={styles.text}>{t('terms&Conditions.commitments.44')}</div>
      <div className={styles.title}>{t('terms&Conditions.additional.1')}</div>
      <div className={styles.text}>{t('terms&Conditions.additional.2')}</div>
      <div className={styles.text}>{t('terms&Conditions.additional.3')}</div>
      <div className={styles.text}>{t('terms&Conditions.additional.4')}</div>
      <div className={styles.text}>{t('terms&Conditions.additional.5')}</div>
      <div className={styles.text}>{t('terms&Conditions.additional.6')}</div>
      <div className={styles.text}>{t('terms&Conditions.additional.7')}</div>
      <div className={styles.text}>{t('terms&Conditions.additional.8')}</div>
      <div className={styles.text}>{t('terms&Conditions.additional.9')}</div>
      <div className={styles.text}>{t('terms&Conditions.additional.10')}</div>
      <div className={styles.text}>{t('terms&Conditions.additional.11')}</div>
      <div className={styles.text}>{t('terms&Conditions.additional.12')}</div>
      <div className={styles.text}>{t('terms&Conditions.additional.13')}</div>
      <div className={styles.text}>{t('terms&Conditions.additional.14')}</div>
      <div className={styles.text}>{t('terms&Conditions.additional.15')}</div>
      <div className={styles.title}>{t('terms&Conditions.other.title')}</div>
      <ol>
        <li className={styles.text}>{t('terms&Conditions.other.1')}</li>
        <li className={styles.text}>{t('terms&Conditions.other.2')}</li>
        <li className={styles.text}>{t('terms&Conditions.other.3')}</li>
        <li className={styles.text}>{t('terms&Conditions.other.4')}</li>
        <li className={styles.text}>{t('terms&Conditions.other.5')}</li>
        <li className={styles.text}>{t('terms&Conditions.other.6')}</li>
        <li className={styles.text}>{t('terms&Conditions.other.7')}</li>
        <li className={styles.text}>{t('terms&Conditions.other.8')}</li>
        <li className={styles.text}>{t('terms&Conditions.other.9')}</li>
      </ol>
      <div className={styles.text}>{t('terms&Conditions.other.10')}</div>
    </div>
    <MainSectionFooter/>
    <Modals/>
    </>
  )
}
export const getServerSideProps = getAuthServerSide()
export default Terms
