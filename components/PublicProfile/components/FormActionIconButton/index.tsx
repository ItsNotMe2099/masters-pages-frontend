import styles from './index.module.scss'
import Link from 'next/link'
import FormEditIcon from 'components/svg/FormEditIcon'
import AddCircleIcon from 'components/svg/AddCircleIcon'
import FormArrowDownIcon from 'components/svg/FormArrowDownIcon'
import FormArrowUpIcon from 'components/svg/FormArrowUpIcon'
import FormDeleteIcon from 'components/svg/FormDeleteIcon'

interface Props {
  type: 'edit' | 'create' | 'moveDown' | 'moveUp' | 'delete',
  children?: any
  onClick: (e?) => void
}

export default function FormActionIconButton({type, children, onClick}: Props) {

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
          <button onClick={onClick} className={`${styles.root} ${type === 'delete' && styles.red}`}>
            {getIcon()}
          </button>
  )
}

FormActionIconButton.defaultProps = {
  type: 'button',
  color: 'white',
  size: 'normal'
}
