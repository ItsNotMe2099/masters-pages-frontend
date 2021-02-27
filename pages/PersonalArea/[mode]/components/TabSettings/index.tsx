import { confirmOpen } from "components/Modal/actions";
import { deleteSkillCategory } from "components/Skill/actions";
import Button from "components/ui/Button";
import TabSettingsForm from "pages/PersonalArea/[mode]/components/TabSettings/components/TabSettingsForm";
import * as React from "react";
import { getCategoryTranslation } from "utils/translations";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
interface Props {
  t?: (string) => string,
}
const TabSettings= (props: Props) => {
  const {t} = props;
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    console.log("Settings submit", data);
  }
  const handleRemoveAccount = () => {
    dispatch(confirmOpen({
      description: `Do you want to delete your account?`,
      onConfirm: () => {

      }
    }));
  }
  return (
    <div className={styles.root}>
      <div className={styles.form}>
     <TabSettingsForm onSubmit={handleSubmit}/>
      </div>
      <Button className={styles.button} black={true}  size={'12px 70px'}  type={'button'} onClick={handleRemoveAccount}>Delete my account</Button>

    </div>
  )
}

export default TabSettings
