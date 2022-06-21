import { IField, InputStyleType, IOption } from 'types/types'
import {Form, FormikProvider, useField, useFormik} from 'formik'
import {useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
import styles from 'components/PublicProfile/components/view/CardCategories/components/Form/index.module.scss'
import * as React from 'react'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import {changeArrayOrder} from 'utils/array'
import LanguageListItem from 'components/PublicProfile/components/view/CardLanguages/components/LanguageListItem'

import LanguageForm from 'components/fields/LanguageFormField/Form'
import Button from 'components/PublicProfile/components/Button'

interface Props<T> extends IField<T> {
  styleType?: InputStyleType
  categoryId?: number
}

export default function LanguageFormField(props: Props<any[]>) {
  const [field, meta, helpers] = useField<any[]>(props)
  const [options, setOptions] = useState<IOption<number>[]>([])
  const { t, i18n } = useTranslation('common')

  const [showForm, setShowForm] = useState(false);
  const handleMenuOpen = async () => {

  }
  const handleSubmit =  async (data) => {
    helpers.setValue([...(field.value || []), data.language]);
    setShowForm(false);
  }

  const handleDelete = (data, index: number) => {
    const newArray = [...field.value]
    newArray.splice(index, 1)
    helpers.setValue(newArray);
  }
  const handleMoveUp = (model, index: number) => {
    helpers.setValue(changeArrayOrder(field.value, index, index - 1))
  }

  const handleMoveDown = (model, index: number) => {
    helpers.setValue(changeArrayOrder(field.value, index, index + 1));
  }
  return (
    <div className={styles.root}>
      <div className={styles.items}>
        {(field.value || []).map((item, index) => <LanguageListItem isEdit={true} index={index} model={item} onMoveUp={(index > 0  && field.value?.length > 1) ? handleMoveUp : null} onMoveDown={(index == 0  && field.value?.length > 1) ? handleMoveDown : null} onDelete={handleDelete} />)}
      </div>
      {!showForm && <Button size={'small'} color={'grey'} type={'submit'} onClick={() => setShowForm(true)}>{t('addLang')}</Button>}
      {showForm && <LanguageForm onSubmit={handleSubmit} onCancel={() => setShowForm(false)}/>}
    </div>
    )
}
