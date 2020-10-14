import Link from 'next/link'
import styles from './index.module.scss'

interface Props {
  comment1?: boolean
  comment2?: boolean
  comment3?: boolean
}

export default function Comment(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.border}>
          {props.comment1 ? <img src="img/Comment/photo1.png"/> : null}
          {props.comment2 ? <img src="img/Comment/photo2.png"/> : null}
          {props.comment3 ? <img src="img/Comment/photo3.png"/> : null}
        </div>
        <div className={styles.comment}>
          <div className={styles.inner}>
            <img src="img/icons/comment.svg" alt=''/>
            {props.comment1 ? <div className={styles.positive}>64</div>: null}
            {props.comment2 ? <div className={styles.positive}>126</div>: null}
            {props.comment3 ? <div className={styles.positive}>15</div>: null}
            {props.comment1 ? <div className={styles.negative}>2</div>: null}
            {props.comment2 ? <div className={styles.negative}>1</div>: null}
          </div>
        </div>
      </div>
      <div>
        {props.comment1 ? <div className={styles.name}>Татьяна Кравченко</div>: null}
        {props.comment1 ? <Link href="/"><a><div className={styles.service}>Клининговые услуги</div></a></Link>: null}
        {props.comment2 ? <div className={styles.name}>Михаил Терентьев</div>: null}
        {props.comment2 ? <Link href="/"><a><div className={styles.service}>Фото и видео услуги</div></a></Link>: null}
        {props.comment3 ? <div className={styles.name}>Елена Яковлева</div>: null}
        {props.comment3 ? <Link href="/"><a><div className={styles.service}>Услуги перевода</div></a></Link>: null}
        <div className={styles.text}>
          Данный текст не несёт ни какой смысловой нагрузки<br/> 
          а является лишь имитацией наполнения текстовых блоков сайта. Данный<br/>
          текст не несёт ни какой смысловой нагрузки а является лишь<br/> 
          имитацией наполнения текстовых блоков сайта.
        </div>
      </div>
    </div>
  )
}
