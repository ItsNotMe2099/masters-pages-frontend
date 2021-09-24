import {getAuthServerSide} from 'utils/auth'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'
import {default as React, useEffect, useState} from "react";
import {useTranslation} from "i18n";
import {useRouter} from 'next/router'
import Layout from 'components/layout/Layout'

import {IProfileGalleryItem, IRootState} from 'types'
import Modals from 'components/layout/Modals'
import Tabs from 'components/ui/Tabs'
import ContactsList from 'components/Contacts/ContactsMessages'
import { TabSelect } from 'components/TabSelect';
const SharePersonalLabel = dynamic(() => import('components/Share/PersonalLabel'), {
  ssr: false
})

const ContactsTypePage = (props) => {
  const {t} = useTranslation()
  const router = useRouter();
  const { type } = router.query
  const dispatch = useDispatch()


  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)

  const limit = 30;
  const tabs = [
    {name: t('contacts.menu.messages'), key: 'chat'},
    {name: t('contacts.menu.subscriptions'), key: 'subscriptions'},
    {name: t('contacts.menu.saved'), key: 'saved'},
    {name: t('contacts.menu.recommendations'), key: 'recommendations'},
  ].map(item => ({...item, link: `/Contacts/${item.key}`}));

  const [activeTab, setActiveTab] = useState(tabs[0].key);


  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
        <div className={styles.desktop}>
          <Tabs style={'round'} tabs={tabs} activeTab={type as string}/>
        </div>
          <div className={styles.mobile}>
          <TabSelect
            tabs={tabs}
            activeTab={type as string}
          />
        </div>
        </div>
        <ContactsList type={type as string}/>

      </div>
    <Modals/>
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default ContactsTypePage
