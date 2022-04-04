import { IField, InputStyleType, IOption } from 'types/types'
import {Form, FormikProvider, useField, useFormik} from 'formik'
import {useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
import styles from 'components/PublicProfile/components/view/CardCategories/components/Form/index.module.scss'
import * as React from 'react'

import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import LocationForm from 'components/fields/LocationFormField/Form'
import LocationItem from 'components/fields/LocationFormField/LocationItem'
import Button from 'components/PublicProfile/components/Button'

interface Props<T> extends IField<T> {
  styleType?: InputStyleType
}

export default function LocationFormField(props: Props<any[]>) {
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
  const handleDelete = (data, index: number) => {
    const newArray = [...field.value]
    newArray.splice(index, 1)
    helpers.setValue(newArray);
  }
  return (
    <div className={styles.root}>
      <div className={styles.items}>
        {(field.value || []).map((item, index) => <LocationItem isEdit={true} index={index} model={item} onDelete={handleDelete} />)}
      </div>
      {!showForm && <Button size={'small'} color={'grey'} type={'submit'} onClick={() => setShowForm(true)}>{t('add')}</Button>}
      {showForm && <LocationForm onSubmit={handleSubmit} onCancel={() => setShowForm(false)}/>}
    </div>
    )
}
