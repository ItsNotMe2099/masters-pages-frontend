import * as React from "react";
import {IRootState, ITask, ProfileData, SkillData} from "types";
import styles from './index.module.scss'
import {useTranslation, withTranslation} from "react-i18next";
import {getAuthServerSide} from 'utils/auth'
import Avatar from 'components/ui/Avatar'
import StarRatings from 'react-star-ratings';
import Card from 'components/PublicProfile/components/Card'
import Button from 'components/PublicProfile/components/Button'
import {taskNegotiationSetCurrentProfile} from 'components/TaskNegotiation/actions'
import {taskOfferOpen} from 'components/Modal/actions'
import DynamicOverflow from "react-dynamic-overflow";
import { useDispatch, useSelector } from 'react-redux'
import {getCategoryTranslation} from 'utils/translations'
import {SkillDropDown} from 'components/Contacts/ContactItem/SkillDropDown'
import Link from "next/link"
interface Props {
  profile: ProfileData,
}

const ContactIemSkills = ({profile}: Props) => {

  const getRootClass = () => {
    switch (profile.role){
      case 'master':
        return styles.master;
      case 'client':
        return styles.client;
      case 'volunteer':
        return styles.volunteer;
    }
  }
  const getDropDownClass = () => {
    switch (profile.role){
      case 'master':
        return styles.master;
      case 'client':
        return styles.client;
      case 'volunteer':
        return styles.volunteer;
    }
  }
  return (
    <div className={styles.mainRoot}>
        <DynamicOverflow
          list={({ tabRef }) => (profile.skills.filter(item => item.subCategory).map((item, index)  => (
            <Link href={`/PublicProfile/${profile.id}?subCategoryId=${item.subCategoryId}`}>
            <a ref={index === 0 ? tabRef : null} className={styles.skill}>
              {getCategoryTranslation(item.subCategory).name}
            </a>
            </Link>
          )))}
        >
          {
            ({ visibleElements, overflowElements, containerRef }) => {
              return (
                <div ref={containerRef}  className={`${styles.root} ${getRootClass()}`}>
                  <div className={styles.wrapper}>
                  {visibleElements}
                  </div>
                  {overflowElements.length > 0 && <div className={styles.dropDownWrapper}>
                    <SkillDropDown dropdownClassName={`${styles.dropDown} ${getDropDownClass()}`}>
                      {overflowElements}
                    </SkillDropDown>
                  </div>}

                </div>
              );
            }
          }
        </DynamicOverflow></div>
  )
}
export default ContactIemSkills;
export const getServerSideProps = getAuthServerSide({redirect: true});
