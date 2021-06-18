import { confirmOpen, taskOfferAcceptOpen, taskOfferOpen, taskShareOpen } from "components/Modal/actions";
import { saveProfileRequest } from "components/SavedPeople/actions";
import { deleteSkill } from "components/Skill/actions";
import ArrowRight from "components/svg/ArrowRight";

import StarRatings from 'react-star-ratings';
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
        <Avatar image={profile.photo}/>
        <div className={styles.mobileWrapper}>
        <div className={styles.name__mobile} onClick={() => router.push(`/id${profile.id}`)}>
              <div className={styles.nameText}>{`${profile.firstName}${profile.lastName ? ` ${profile.lastName}` : ''}`}</div>
              <img src="/img/iconsTck.svg" alt=''/>
            </div>
        <div className={styles.icons}>
          <img src="/img/SearchTaskPage/icons/case.svg" alt=''/>
          <div>{profile.tasksCount || 0}</div>
          <img src="/img/SearchTaskPage/icons/like.svg" alt=''/>
          <div>{profile.feedbacksCount || 0}</div>
        </div>
        <div className={styles.stars}>
          <StarRatings
            rating={profile.rating || 0}
            starRatedColor="#F2B705"
            starEmptyColor={'#616161'}
            numberOfStars={5}
            name='rating'
            svgIconPath={'M4.08729 13.7644C3.74325 13.9408 3.35287 13.6316 3.42239 13.2367L4.16216 9.0209L1.02213 6.02971C0.728899 5.74985 0.88131 5.23824 1.27437 5.18298L5.63993 4.56264L7.58651 0.706016C7.7621 0.358411 8.23716 0.358411 8.41274 0.706016L10.3593 4.56264L14.7249 5.18298C15.1179 5.23824 15.2704 5.74985 14.9771 6.02971L11.8371 9.0209L12.5769 13.2367C12.6464 13.6316 12.256 13.9408 11.912 13.7644L7.99829 11.7536L4.0864 13.7644H4.08729Z'}
            svgIconViewBox={'0 0 16 14'}
            starDimension={'16px'}
            starSpacing={'1px'}

          />
          <div className={styles.comments}>({profile.rating || 0})</div>
        </div>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.mainInfo}>
          <div className={styles.top}>
            <div className={styles.name}>
              <div onClick={() => router.push(`/id${profile.id}`)}
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
            <div className={styles.statItemValue}>{profile.tasksCount || 'N/A'}</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statItemLabel}>Total hours:</div>
            <div className={styles.statItemValue}>{profile.totalHours || 'N/A'}</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statItemLabel}>Tasks earned:</div>
            <div className={styles.statItemValue}>{profile.totalAmount || 'N/A'}</div>
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
