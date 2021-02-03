import { confirmOpen, taskOfferAcceptOpen, taskOfferOpen, taskShareOpen } from "components/Modal/actions";
import { saveProfileRequest } from "components/SavedPeople/actions";
import { deleteSkill } from "components/Skill/actions";
import ArrowRight from "components/svg/ArrowRight";
import {
  taskNegotiationSendOfferSetLoading,
  taskNegotiationSetCurrentProfile
} from "components/TaskNegotiation/actions";
import Avatar from "components/ui/Avatar";
import Button from 'components/ui/Button'
import ProfileActionButton from "components/ui/Profile/components/ActionButton";
import SliderControl from "components/ui/SliderControl";
import Tabs from "components/ui/Tabs";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { default as React, useState } from "react";
import { IRootState, ITask, ProfileData } from "types";
import { getMediaPath } from "utils/media";
import { getCategoryTranslation } from "utils/translations";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import Slider from "react-slick";
import { TabSelect } from "./components/TabSelect";

interface Props {
  profile: ProfileData,
  actionsType: 'public' | 'client' | 'master'
  className?: string,
  isActive?: boolean,
  selectedCategoryId?: number,
  selectedSubCategoryId?: number,
  onClick?: (task: ITask) => void,
  onEdit?: (task: ITask) => void,
  onDelete?: (task: ITask) => void,
  onPublish?: (task: ITask) => void,
  onUnPublish?: (task: ITask) => void,
}

export default function Profile({ actionsType,selectedCategoryId, selectedSubCategoryId, profile, className, isActive, onEdit, onDelete, onPublish, onUnPublish }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [currentCategoryTab, setCurrentCategoryTab] = useState(`${(selectedCategoryId ? profile.skills.find(item => item.id === selectedCategoryId) : profile.skills[0])?.id}`);
  const [currentSkill, setCurrentSkill] = useState(selectedCategoryId ? profile.skills.find(item => item.id === selectedCategoryId) : profile.skills[0]);
  const savingProfileId = useSelector((state: IRootState) => state.savedPeople.savingProfileId)

  const handleOffer = () => {
    dispatch(taskNegotiationSetCurrentProfile(profile));
    dispatch(taskOfferOpen());
  }
  const handleReadMore = () => {

  }

  const handleSave = () => {

    dispatch(saveProfileRequest(profile.id));
  }

  const handleChangeTab = (tab) => {
    console.log("onChangeTab", tab.key);

    setCurrentCategoryTab(tab.key);
    setCurrentSkill(profile.skills.find(skill => `${skill.id}` === tab.key))
  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    adaptiveHeight: true,
    arrows: true,
    nextArrow: <SliderControl taskPage direction='next' arrowClassName={styles.sliderArrow}/>,
    prevArrow: <SliderControl taskPage direction='prev' arrowClassName={styles.sliderArrow}/>,
    dotsClass: `${styles.dots}`,
    responsive: [
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          variableWidth: false,
          adaptiveHeight: true
        }
      },
      {
        breakpoint: 667,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className={`${styles.root} ${className} ${isActive && styles.isActive}`}>
      <div className={styles.profile}>
        <Avatar image={profile.avatar}/>
        <div className={styles.mobileWrapper}>
        <div className={styles.name__mobile} onClick={() => router.push(`/PublicProfile/${profile.id}`)}>
              <div className={styles.nameText}>{`${profile.firstName}${profile.lastName ? ` ${profile.lastName}` : ''}`}</div>
              <img src="/img/iconsTck.svg" alt=''/>
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
      <div className={styles.main}>
        <div className={styles.mainInfo}>
          <div className={styles.top}>
            <div className={styles.name}>
              <div onClick={() => router.push(`/PublicProfile/${profile.id}`)}
                className={styles.nameText}>{`${profile.firstName}${profile.lastName ? ` ${profile.lastName}` : ''}`}</div>
              <img src="/img/iconsTck.svg" alt=''/>
            </div>
            <div className={styles.status}>
              Online
            </div>
          </div>

          <div className={styles.desc}>
            <Tabs style={'roundSmall'} onChange={handleChangeTab} activeTab={currentCategoryTab} tabs={profile.skills.map(skill => ({key: `${skill.id}`, name: getCategoryTranslation(skill)?.name, }))}/>
          </div>

          <div className={styles.skillsContainer}>
            {currentSkill?.skills.filter(skill => selectedSubCategoryId && selectedSubCategoryId === skill.subCategoryId).map(skill => (<div className={styles.currentSubCategory}>
              <div className={`${styles.currentSubCategoryPhoto}`}>
                {skill.photos.length === 0 &&
                <img src={'/img/icons/no-image.svg'}/>}
                {skill.photos.length > 0 && <img src={getMediaPath(skill.photos[0])}/>}

              </div>
              <div className={styles.currentSubCategoryInfo}>
              <div className={styles.currentSubCategoryTitle}>{getCategoryTranslation(skill.subCategory).name}</div>
              <div className={styles.currentSubCategoryLabel}>Price:</div>
              <div className={styles.currentSubCategoryPrice}>{skill.price ? `$${skill.price}` : skill.ratePerHour ? `$${skill.ratePerHour}/hour`: 'N/A'}</div>
              <div className={styles.currentSubCategoryMore}>More</div>
              </div>
            </div>))}
            <div className={styles.skillsList}>
            {currentSkill?.skills.filter(skill => !selectedSubCategoryId || selectedSubCategoryId === skill.subCategoryId).map(skill => <div className={styles.skillItem}>{getCategoryTranslation(skill.subCategory).name}</div>)}
            </div>
            <div className={styles.nextButton}>
              <ArrowRight/>
            </div>
          </div>
          <div className={styles.bottom}>
           <ProfileActionButton title={'View profile'} icon={'arrow-right-small'} onClick={handleReadMore}/>
            <ProfileActionButton isLoading={savingProfileId === profile.id} title={'Save'} icon={'bookmark'} onClick={handleSave}/>
          </div>
        </div>


      </div>
      <div className={`${styles.payment}`}>
        <div className={styles.paymentContent}>
        <div className={styles.titleLeft}>
          Statistic:
        </div>
        <div className={styles.statItem}>
          <div className={styles.statItemLabel}>Tasks completed:</div>
          <div className={styles.statItemValue}>400</div>
        </div>

        <div className={styles.location}>{profile.geoname?.name}</div>


        </div>
        <div className={styles.btnContainer}>
          <Button bold smallFont transparent size='16px 0' onClick={handleOffer}>OFFER TASK</Button>

        </div>
      </div>
    </div>
  )
}
Profile.defaultProps = {
  showProfile: true,
  actionsType: 'public'
}
