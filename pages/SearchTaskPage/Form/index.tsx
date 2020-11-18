import InputCategory from 'components/ui/Inputs/InputCategory'
import { Field, reduxForm,formValueSelector } from 'redux-form'
import InputLocation from 'components/ui/Inputs/InputLocation'
import styles from './index.module.scss'
import { connect } from 'react-redux'
import InputSubCategory from 'components/ui/Inputs/InputSubCategory'

let SearchTaskForm = props => {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
        <div className={styles.root}>
          <Field
            name="categoryId"
            component={InputCategory}
            label="Category"
          />
          <Field
            name="radius"
            label="Radius of search"
            component={InputCategory}
          />
          <Field
            name="type"
            label="Type of task"
            component={InputCategory}
          />
          <Field
            name="price"
            label="Price"
            component={InputCategory}
          />
          <Field
            name="subCategoryId"
            component={InputSubCategory}
            label="Subcategory"
            categoryId={props.categoryId}
          />
          <Field
            name="geonameid"
            component={InputLocation}
            label="Location"
          />
          <Field
            name="rating"
            label="Client rating"
            component={InputCategory}
          />
          <Field
            name="payment"
            label="Payment type"
            component={InputCategory}
          />
        </div>
      </form>
  )
}

SearchTaskForm   = reduxForm ({
  form: 'searchTaskForm',
}) (SearchTaskForm)

const selector = formValueSelector('searchTaskForm') // <-- same as form name
SearchTaskForm = connect(state => {
  // can select values individually
  const categoryId = selector(state, 'categoryId')
  console.log("getCategoryId", categoryId)
  return {
    categoryId
  }
})(SearchTaskForm)
export default SearchTaskForm
