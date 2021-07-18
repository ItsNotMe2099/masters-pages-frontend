import styles from './index.module.scss'
import Link from 'next/link'
import FormEditIcon from 'components/svg/FormEditIcon'
import AddCircleIcon from 'components/svg/AddCircleIcon'
import FormArrowDownIcon from 'components/svg/FormArrowDownIcon'
import FormArrowUpIcon from 'components/svg/FormArrowUpIcon'
import FormDeleteIcon from 'components/svg/FormDeleteIcon'

interface Props {
  type: 'edit' | 'create' | 'moveDown' | 'moveUp' | 'delete',
  title: string,
  children?: any
  onClick: () => void
}

export default function FormActionButton({type, title, children, onClick}: Props) {

  const getIcon = () => {
   switch (type){
     case 'edit':
       return <FormEditIcon className={styles.icon}/>
     case 'create':
       return <AddCircleIcon className={styles.icon}/>
     case 'moveDown':
       return <FormArrowDownIcon className={styles.icon}/>
     case 'moveUp':
       return <FormArrowUpIcon className={styles.icon}/>
     case 'delete':
       return <FormDeleteIcon className={styles.icon}/>
   }
  }

  return (
          <button onClick={onClick} className={styles.root}>
            {getIcon()}
            {children ? children : <div className={styles.title}>{title}</div>}
          </button>
  )
}

FormActionButton.defaultProps = {
  type: 'button',
  color: 'white',
  size: 'normal'
}