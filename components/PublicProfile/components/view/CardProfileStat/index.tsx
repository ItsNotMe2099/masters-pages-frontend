import styles from './index.module.scss'
import {IProfileTab, IRootState, ProfileData, ProfileWorkExperience, SkillData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import {default as React, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import {fetchProfileStat} from 'components/ProfileStat/actions'
import ProfileStatItem from 'components/PublicProfile/components/view/CardProfileStat/components/ProfileStatItem'

interface Props{
  profile: ProfileData
}
const CardProfileStat = (props: Props) => {
  const { profile } = props;
  const dispatch = useDispatch();
  const list = useSelector((state: IRootState) => state.profileStat.list);
  const isLoading = useSelector((state: IRootState) => state.profileStat.isLoading);


  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchProfileStat( profile.id));

  }, [profile]);
  return (
    <Card isLoading={false} className={styles.root} >
      {list.filter(model => model.subCategoryId).map(model => <ProfileStatItem model={model} profile={profile}/>)}

    </Card>
  );
}

export default CardProfileStat
