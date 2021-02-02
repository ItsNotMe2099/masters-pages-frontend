import { changeRole, fetchProfile } from "components/Profile/actions";
import Tabs from "components/ui/Tabs";
import { useEffect, useState } from "react";
import * as React from "react";
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Button from "components/ui/Button";
import { Router, useRouter } from "next/router";
import ProfileSection from "pages/PublicProfile/components/ProfileSection";
import TabPortfolio from "pages/PublicProfile/components/TabPortfolio";
import TabReviews from "pages/PublicProfile/components/TabReviews";
import styles from './index.module.scss'
import Avatar from "components/ui/Avatar";

const Profile = (props) => {


  return (
            <div className={styles.profile}>
              <Avatar/>
              <div className={styles.mobileWrapper}>
                <div className={styles.name__mobile}>
                  <div className={styles.nameText}>Jenny Wilson</div>
                  <img src="/img/SearchTaskPage/icons/verification.svg" alt=''/>
                </div>
              <div className={styles.icons}>
                <img src="/img/SearchTaskPage/icons/case.svg" alt=''/>
                <div>0</div>
                <img src="/img/SearchTaskPage/icons/like.svg" alt=''/>
                <div>0</div>
              </div>
              <div className={styles.stars}>
                <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
                <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
                <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
                <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
                <img src="/img/SearchTaskPage/icons/halfStar.svg" alt=''/>
                <div className={styles.comments}>(0)</div>
              </div>
            </div>
           </div>
  )
}

export default Profile
