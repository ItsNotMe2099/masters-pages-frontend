import FormNewCategory from "components/ui/Form/MasterProfile/CheckboxSubCategory/components/Form";
import { useCallback, useState } from "react";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import nextId from "react-id-generator";
interface Props {

}
interface SubCategoryItem{
  id: number
  name: string
}

interface CategoryItem{
  id?: number
  name?: string
  key?: string
  subCategories?: SubCategoryItem[]
}
interface Props {
  categories: CategoryItem[],
  handleEdit?: (type, category, key) => void,
}

export default function CheckboxSubCategory(props) {
  const dispatch = useDispatch()
  const generateKey = () => {
    return nextId("category-id-");

  }
  const [categories, setCategories] = useState<CategoryItem[]>([{key: generateKey()}])
  const [inEditMode, setInEditMode] = useState([]);

  const handleEdit = useCallback((category, keyEl) => {
    let newCategories = [...categories];
    const key = categories.findIndex((item => item.key === keyEl));
    newCategories[key] = {...category, key: keyEl};
    newCategories = [...newCategories, ...(key === categories.length - 1 ? [{key: generateKey()}] : [])];
    setCategories(newCategories);
    props.input.onChange(newCategories.filter(data => data.id));
    setInEditMode([]);
    }, [categories])

  const handleRemove = useCallback((category, key) => {

    const newCategories = categories.filter((item) => (item as any).id !== category.id);
    setCategories(newCategories);
    props.input.onChange(newCategories.filter(data => data.id));
  }, [categories])

  const handleEditClick = useCallback((category, key) => {
    setInEditMode([ category.id]);
  }, [inEditMode])

  const renderListItem = (category, key) => {
    return  (
      <div className={styles.item}>
        <div className={styles.title}>{key + 1}. {category.name}: {category.subCategories?.map((item, key) => `${item.name}`).join(', ')}
        </div>
        <div className={styles.actions}>
          <div className={styles.action} onClick={() => handleEditClick(category,  category.key)}><img src="/img/icons/pencil.svg"/></div>
          <div className={styles.action} onClick={() => handleRemove(category, category.key)}><img src="/img/icons/delete.svg"/></div>
        </div>
      </div>
    )
  }
  const renderForm = (category, key) => {
    return (
      <div className={styles.listItemForm}>
      <FormNewCategory form={`newCategory${category.key}`} initialValues={{
      category: {value: category.id, label: category.name},
      subCategories: category.subCategories?.map((item) => {
        return {
          value: item.id,
          label: item.name
        }
      })}} onSubmit={(data) => {

        return handleEdit({id: data.category.value, name: data.category.label, subCategories: data.subCategories.map(item => {
          return {
            id: item.value,
            name: item.label
          }
        })}, category.key)
    }}/>
      </div>)
  }
  return (
      <ol className={styles.root}>
        {categories.map((category, key) =>
          <li  key={category.key}>
            {category.id && inEditMode.indexOf(category.id) < 0 ?
              renderListItem(category, key)
              :
              renderForm(category, key)}
          </li>)}

      </ol>

  )
}

