import { default as React, useEffect, useState } from 'react'
import { ITaskNegotiation, ITaskNegotiationState, ITaskNegotiationType, ITaskStatus } from 'types'
import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import StarRatings from 'react-star-ratings'
import Avatar from 'components/ui/Avatar'
import Button from 'components/ui/Button'
import ProfileActionButton from 'components/ui/Profile/components/ActionButton'
import BookmarkSvg from 'components/svg/Bookmark'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import Routes from "pages/routes"
import { getCategoryTranslation } from 'utils/translations'
import { IProfile, ProfileRole } from 'data/intefaces/IProfile'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import { SkillData } from 'types'
import ArrowDown from 'components/svg/ArrowDown'
import ChatSvg from 'components/svg/ChatSvg'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { confirmOpen, taskEditConditionsOpen, taskHireMasterOpen } from 'components/Modal/actions'
import { taskNegotiationAcceptConditions, taskNegotiationAcceptTaskOffer, taskNegotiationAcceptTaskResponse, taskNegotiationDeclineConditions, taskNegotiationDeclineTaskOffer, taskNegotiationDeclineTaskResponse, taskNegotiationFetchLastConditions, taskNegotiationSetCurrentNegotiation, taskNegotiationSetCurrentTask } from 'components/TaskNegotiation/actions'
import NegotiationRepository from 'data/repositories/NegotiationRepository'
import { taskCancel } from 'components/TaskUser/actions'

interface Props {
  res: ITaskNegotiation,
  actionsType: 'public' | 'client' | 'master'
  className?: string
}

const TaskResponse = ({ actionsType, res, className }: Props) => {

  const appContext = useAppContext()
  const profile = appContext.profile

  const router = useRouter()

  const { t, i18n } = useTranslation('common')

  const [mastersProfile, setMastersProfile] = useState<IProfile | null>(null)

  const [show, setShow] = useState<boolean>(false)

  const fetchMasterProfileById = async () => {
    await ProfileRepository.fetchById(res.profile.id).then(i => {
      if (i) {
        setMastersProfile(i)
      }
    })
  }

  const [lastNegotiation, setLastNegotiation] = useState<ITaskNegotiation | null>(null)

  const fetchTaskLastNegotiations = async () => {
    await NegotiationRepository.taskNegotiationFetchLastConditions(res.task.id, profile.id).then(i => {
      if (i) {
        setLastNegotiation(i)
      }
    }
    )
  }

  useEffect(() => {
    dispatch(taskNegotiationFetchLastConditions(res.task.id, profile.id))
    fetchTaskLastNegotiations()
  }, [])

  useEffect(() => {
    const fetchMasterProfile = async () => {
      await fetchMasterProfileById()
    }
    fetchMasterProfile()
  }, [])

  const renderCategory = (skill: SkillData) => {
    return <div className={styles.category}>
      <div>{getCategoryTranslation(skill.mainCategory, i18n.language)?.name}/{getCategoryTranslation(skill.category, i18n.language)?.name}/{getCategoryTranslation(skill.subCategory, i18n.language)?.name}</div>
    </div>
  }

  const handleMessages = () => {
    if (actionsType === 'master') {

      router.push(`/Chat/task-dialog/${res.task.id}/${profile.id}`)
    } else if (actionsType === 'client') {
      router.push(`/Chat/task-dialog/${res.task.id}/${res.task.masterId}`)
    } else if (actionsType === 'public') {
      const response = res.task.lastNegotiation
      router.push(`/Chat/task-dialog/${response.taskId}/${response.profileId}`)
    }

  }

  const dispatch = useDispatch()

  const handleDecline = (e) => {
    if(res.type === ITaskNegotiationType.TaskOffer){
      dispatch(confirmOpen({
        description: t('task.confirmDecline'),
        onConfirm: () => {
          dispatch(taskNegotiationDeclineTaskOffer(res))
        }
      }))
    }else{
      dispatch(confirmOpen({
        description: t('chat.rejectConditions'),
        onConfirm: () => {
          dispatch(taskNegotiationDeclineConditions(res.id))
        }
      }))
    }
  }

  const handleCancel = () => {
    dispatch(confirmOpen({
      description: t('chat.cancelTask'),
      onConfirm: () => {
        dispatch(taskCancel(res.task.id))
      }
    }))
  }

  const handleAccept = () => {
    if(res.type === ITaskNegotiationType.TaskOffer) {
      dispatch(confirmOpen({
        description: t('chat.acceptOffer'),
        onConfirm: () => {
          dispatch(taskNegotiationAcceptTaskOffer(res))
        }
      }))
    }else{
      dispatch(confirmOpen({
        description: t('chat.acceptConditions'),
        onConfirm: () => {
          dispatch(taskNegotiationAcceptConditions(res.id))
        }
      }))
    }
  }

  /*const handleAccept = (e) => {
    dispatch(confirmOpen({
      description: `${t('taskResponse.confirmAccept')} ${res.profile?.firstName} ${res.profile?.lastName}?`,
      onConfirm: () => {
        if (res.state === ITaskNegotiationState.SentToClient || res.state === ITaskNegotiationState.SentToMaster && res.type !== ITaskNegotiationType.TaskNegotiation) {
          dispatch(taskNegotiationAcceptTaskOffer(res))
        }
        else {
          dispatch(taskNegotiationAcceptTaskResponse(res))
        }
      }
    }))
  }*/

  const handleHireMaster = () => {
    dispatch(taskNegotiationSetCurrentTask(res.task))
    dispatch(taskHireMasterOpen())
  }

  const handleEditConditions = () => {
    dispatch(taskNegotiationSetCurrentTask(res.task))
    dispatch(taskNegotiationSetCurrentNegotiation(lastNegotiation))
    dispatch(taskEditConditionsOpen())
  }

  const Buttons = (role: ProfileRole, state: ITaskNegotiationState) => {
    if (role === ProfileRole.Master) {
      switch (state) {
        case ITaskNegotiationState.SentToMaster:
          return <>
            <Button bold smallFont transparent size='16px 0' onClick={handleAccept}>ACCEPT</Button>
            <Button bold smallFont transparent size='16px 0' onClick={handleEditConditions}>COUNTER OFFER</Button>
            <Button bold smallFont transparent size='16px 0' onClick={handleDecline}>DECLINE</Button></>
      }
    }
    else {
      switch (state) {
        case ITaskNegotiationState.Accepted:
          return <><Button bold smallFont transparent size='16px 0' onClick={handleHireMaster}>HIRE</Button>
            <Button bold smallFont transparent size='16px 0' onClick={handleEditConditions}>EDIT</Button>
            <Button bold smallFont transparent size='16px 0' onClick={handleCancel}>CANCEL</Button>
          </>
        case ITaskNegotiationState.SentToClient:
          return <><Button bold smallFont transparent size='16px 0' onClick={handleHireMaster}>HIRE</Button>
            <Button bold smallFont transparent size='16px 0' onClick={handleEditConditions}>EDIT</Button>
            <Button bold smallFont transparent size='16px 0' onClick={handleDecline}>REJECT</Button>
          </>
      }
    }
  }

  return (
    <div className={`${styles.root} ${className}`}>
      <div className={styles.profile}>
        <Avatar image={profile.photo} href={''} />
        <div className={styles.mobileWrapper}>
          <div className={styles.name__mobile} >
            <Link href={`${Routes.profile(mastersProfile)}`}>
              <a className={styles.nameText}>{`${profile.firstName}${profile.lastName ? ` ${profile.lastName}` : ''}`}</a></Link>
          </div>
          <div className={styles.nameText}>{res.profile.firstName} {res.profile.lastName}</div>
          <div className={styles.icons}>
            <img src="/img/SearchTaskPage/icons/case.svg" alt='' />
            <div>{profile.tasksCount || 0}</div>
            <img src="/img/SearchTaskPage/icons/like.svg" alt='' />
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
              <div className={styles.titleRes}>{res.task.title}</div>
              <div className={styles.status}>
                {res.state === ITaskNegotiationState.SentToMaster ?
                  'Private order created by client' : res.state === ITaskNegotiationState.SentToClient ?
                    'Private order created by master' : null}
              </div>
            </div>
            {mastersProfile && mastersProfile.skills && (
              <div className={styles.skills}>
                {mastersProfile.skills.map((skill, index) =>
                  renderCategory(skill)
                )}
              </div>
            )}
          </div>

          <div className={classNames(styles.desc, { [styles.showed]: show })}>
            {res.message}
          </div>
          <div className={styles.bottom}>
            <div className={styles.right}>
              <ProfileActionButton className={styles.actionBtn} isLoading={false} title={show ? 'Hide' : 'Read more'}
                icon={<ArrowDown className={classNames({ [styles.arrow]: show })} color='#000' />} onClick={() => setShow(!show)} />
              <div className={styles.sep} />
              <ProfileActionButton className={styles.actionBtn} isLoading={false}
                title={profile.isSavedByCurrentProfile ? t('saved') : t('save')}
                icon={<BookmarkSvg color='black' isSaved={profile.isSavedByCurrentProfile} />}
                onClick={null} />
            </div>
            <div className={styles.left}>
              <div className={styles.chat} onClick={handleMessages}>
                <ChatSvg />
                <div className={styles.text}>Chat</div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className={`${styles.payment}`}>
        <div className={styles.btnContainer}>
          {Buttons(profile.role, res.state)}
        </div>
      </div>
    </div>
  )
}

export default TaskResponse
