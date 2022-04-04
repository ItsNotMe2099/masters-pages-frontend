import { IField, InputStyleType, IOption } from 'types/types'
import {Form, FormikProvider, useField, useFormik} from 'formik'
import SelectField from 'components/fields/SelectField'
import {useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
import styles from 'components/PublicProfile/components/view/CardCategories/components/Form/index.module.scss'
import Button from 'components/PublicProfile/components/Button'
import * as React from 'react'
import ServiceCategoryField from 'components/fields/ServiceCategoryField'
import Validator from 'utils/validator'
import Accordion from './Accordion'
import {getCategoryTranslation} from 'utils/translations'
import Tab from 'components/PublicProfile/components/Tab'
import FormActionIconButton from 'components/PublicProfile/components/FormActionIconButton'
import {IServiceCategory} from 'data/intefaces/IServiceCategory'
import ServiceCategoryForm from 'components/fields/ServiceCategoryFormField/Form'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'

interface Props<T> extends IField<T> {
  styleType?: InputStyleType
  categoryId?: number
}

export default function ServiceCategoryFormField(props: Props<any[]>) {
  const [field, meta, helpers] = useField<any[]>(props)
  const [options, setOptions] = useState<IOption<number>[]>([])
  const { t, i18n } = useTranslation('common')

  const [showForm, setShowForm] = useState(false);
  const handleMenuOpen = async () => {

  }
  const handleSubmit =  async (data) => {
    helpers.setValue([...(field.value || []), data]);
    setShowForm(false);
  }

  const handleRemoveSkill = (data) => {
    console.log("HandleRemove111", data, field.value[0]);
    helpers.setValue([...(field.value || []).filter(i => i.subCategory.id !== data.subCategory.id)]);
  }
  const prepareCategories = (data) => {
    const categoriesMap = {};
    for(const item of data){

      if(!categoriesMap[item.categoryId]) {
        categoriesMap[item.categoryId] = {skills: [], category: item.category};
      }
      categoriesMap[item.categoryId].skills.push(item);
    }

    return Object.keys(categoriesMap).map(i => categoriesMap[i])
  }
  return (
    <div className={styles.root}>
      <div className={styles.items}>
        {prepareCategories(field.value || []).map((category) =>
          <Accordion title={<div className={styles.accordionTitle}>{getCategoryTranslation(category.mainCategory, i18n.language)?.name}/{getCategoryTranslation(category.category, i18n.language)?.name}</div>} >
            {category.skills.map(category => <Tab>
            <div className={styles.tabTitle}>
              {getCategoryTranslation(category.category, i18n.language)?.name}/{getCategoryTranslation(category.subCategory, i18n.language)?.name}/{getCategoryTranslation(category.subCategory, i18n.language)?.name}
            </div>
            <FormActionIconButton type={'delete'} onClick={() => handleRemoveSkill(category)}/>
          </Tab>)}
          </Accordion>
        )}
      </div>
      {!showForm && <Button size={'small'} color={'grey'} type={'submit'} onClick={() => setShowForm(true)}>{t('add')}</Button>}
      {showForm && <ServiceCategoryForm onSubmit={handleSubmit} onCancel={() => setShowForm(false)}/>}
    </div>
    )
}
