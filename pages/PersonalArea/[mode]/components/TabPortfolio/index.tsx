import { fetchSkillList } from "components/Skill/actions";
import Loader from "components/ui/Loader";
import Skill from "pages/PersonalArea/[mode]/components/TabPortfolio/components/Skill";
import SkillCategoryHeader from "pages/PersonalArea/[mode]/components/TabPortfolio/components/SkillCategoryHeader";
import { useEffect } from "react";
import * as React from "react";
import { IRootState } from "types";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
interface Props {

}
const TabPortfolio = (props: Props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const list = useSelector((state: IRootState) => state.skill.list)
  const loading = useSelector((state: IRootState) => state.skill.listLoading)

  useEffect(() => {
    if(!profile?.id){
      return
    }
    dispatch(fetchSkillList(profile.id))
  }, [profile])
  useEffect(() => {
    console.log("List", list);
  }, [list])
  return (
    <div className={styles.root}>
      {loading && <Loader/>}
      {!loading && <div>
        {list.map((category) =>
          (<div>
            <SkillCategoryHeader item={category}/>
            <div className={styles.skillList}>
            {category.skills.map((skill) =>
              (
                <Skill item={skill}/>
              )
            )}
            </div>
          </div>))}
      </div>}
    </div>
  )
}

export default TabPortfolio
