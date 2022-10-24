import styles from 'components/for_pages/Corporate/HowToUse/index.module.scss'
import { useTranslation } from 'next-i18next'

interface TipProps{
  title: string
  text: string
  img: string
}


const HowToUse = (props) => {

  const { t } = useTranslation('common')

  const Tip = (props: TipProps) => {
    return (
      <div className={styles.tip}>
        <div className={styles.title}>
          <img src={props.img} alt=''/>{props.title}
        </div>
        <div className={styles.text}>
          {props.text}
        </div>
      </div>
    )
  }

  const tips = [
    {title: 'Sign up for FREE', text: 'Fill in an organization account application.  Applications are usually approved within 2 business days.  Confirm your email by following the link in the welcome message.', img: '/img/Corporate/icons/sign-up.svg'},
    {title: 'Set up your organization’s profile', text: 'An organization’s profile provides general information and addresses potential volunteers.  The profile page also features an organization’s volunteering projects.  For details see “How to set up an organization’s profile” video.', img: '/img/Corporate/icons/id.svg'},
    {title: 'Create a volunteering project ad', text: 'A project ad sets mandatory and optional parameters.  For details see “How to launch a volunteering project ad” video.', img: '/img/Corporate/icons/folder.svg'},
    {title: 'Promote your project', text: 'Copy your project ad link and place it on your promotion materials –online volunteering ad boards, your organization’s website, your social media profiles, your printed ads.  For details see the “How to launch a volunteering project ad” video.', img: '/img/Corporate/icons/promote.svg'},
    {title: 'Manage volunteers', text: 'Get volunteer applications, study volunteer profiles, invite suitable candidates, track their contribution, provide feedback, etc.  For details see the “How to manage volunteers” video.', img: '/img/Corporate/icons/manage.svg'},
    {title: 'Manage projects', text: 'Track a projects’ status – an applications intake, executions, completions.  Set up events, communicate using group and individual chats, get project statistics.  For details see the “How to manage a volunteering project” video.', img: '/img/Corporate/icons/projects.svg'},
    {title: 'Social media', text: 'Post news about your organization, your volunteering activities and collect likes and comments', img: '/img/Corporate/icons/social.svg'}
  ]

  return (
    <div className={styles.root}>
      <div className={styles.container}>
      <div className={styles.title}>
          How to use
      </div>
      <div className={styles.tips}>
        {tips.map(i => 
          <Tip title={i.title} text={i.text} img={i.img}/>
        )}
      </div>
      </div>
    </div>
  )
}
export default HowToUse
