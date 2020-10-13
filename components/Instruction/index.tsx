import styles from './index.module.scss'

interface Props {
  fluid?: boolean
}

export default function Instruction(props: Props) {
  return (
    <>
      <div className={styles.title}>Как это работает?</div>
      <div className={styles.columnFirst}> 
        <div className={styles.columnItem}>
          <img className={styles.icon} src='img/icons/form1.svg' alt=''/>
          <div className={styles.text}>Заполните<br/> критерии подбора</div>
        </div>
        <img className={styles.wave} src='img/icons/wave1.svg' alt=''/>
        <div className={styles.columnItem}>
          <img className={styles.icon} src='img/icons/form2.svg' alt=''/>
          <div className={styles.text}>Посмотрите анкеты<br/> подобранных специалистов</div>
        </div>
        <img className={styles.wave} src='img/icons/wave2.svg' alt=''/>
        <div className={styles.columnItem}>
          <img className={styles.icon} src='img/icons/chat.svg' alt=''/>
          <div className={styles.text}>Общайтесь в чате<br/> и выберите подходящего</div>
        </div>
      </div>
      <div className={styles.column}> 
        <div className={styles.columnItem}>
          <img src='img/icons/pay.svg' alt=''/>
        </div>
        <div className={styles.columnItem}>
          <img src='img/icons/man.svg' alt=''/>
        </div>
        <div className={styles.columnItem}>
          <img src='img/icons/review.svg' alt=''/>
        </div>
        <div className={styles.columnItem}>
          <img src='img/icons/smartphone.svg' alt=''/>
        </div>
        </div>
        <div className={styles.columnText}>
        <div className={styles.columnItem}>
          <div className={styles.text}>Удобная и<br/> безопасная оплата</div>
        </div>
        <div className={styles.columnItem}>
          <div className={styles.text}>Надежные<br/> исполнители</div>
        </div>
        <div className={styles.columnItem}>
          <div className={styles.text}>Достоверные<br/> отзывы</div>
        </div>
        <div className={styles.columnItem}>
          <div className={styles.text}>Wedo4you для<br/> бизнеса</div>
        </div>
        </div> 
        <div className={styles.columnDesc}>
        <div className={styles.columnItem}>
          <div className={styles.text__desc}>При орлате через <span>Сделку без риска YouDo</span><br/>вернет деньги, если что-то пойдет не так</div>
        </div>
        <div className={styles.columnItem}>
          <div className={styles.text__desc}><span>Проверенные исполнители</span><br/>подтвердили свои документы на YouDo</div>
        </div>
        <div className={styles.columnItem}>
          <div className={styles.text__desc}>Более <span>1 000 000 отзывов от заказчиков</span><br/>помогут выбрать подходящего<br/>исполнителя</div>
        </div>
        <div className={styles.columnItem}>
          <div className={styles.text__desc}>Безналичная оплата <span>бизнес-заданий</span><br/>с предоставлением закрывающих<br/>документов</div>
        </div>
        </div> 
    </>
  )
}
