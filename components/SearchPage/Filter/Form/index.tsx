import InputCategory from 'components/ui/Inputs/InputCategory'
import InputPriceFilter from "components/ui/Inputs/InputPriceFilter";
import SelectInput from "components/ui/Inputs/SelectInput";
import { Field, reduxForm,formValueSelector } from 'redux-form'
import InputLocation from 'components/ui/Inputs/InputLocation'
import styles from './index.module.scss'
import { connect } from 'react-redux'
import InputSubCategory from 'components/ui/Inputs/InputSubCategory'

interface Props{
  collapsed: boolean
  handleSubmit:() => void
  onChange?:(data: any) => void
  categoryId: number
  initialValues: any
}
let SearchProfileForm = (props) => {
  const { handleSubmit, collapsed } = props
  console.log("SearchProfileForm", props.form)
  return (
    <form onSubmit={handleSubmit}>

        <div className={styles.root}>
          {!collapsed && <>
            <Field
              name="categoryId"
              component={InputCategory}
              label="Category"
              noMargin={true}
              withIcon={false}
              showEmpty={true}
            />
            <Field
              name="radius"
              label="Radius of search"
              component={SelectInput}
              options={[
                {label: '10 km', value: 10},
                {label: '50 km', value: 50},
                {label: '100 km', value: 100},
                {label: 'Провинция', value: 500},
                {label: 'Страна', value: 2000},
                {label: 'Весь мир', value: 100000000},
              ]}

              withIcon={false}
              noMargin={true}
            />
            <Field
              name="type"
              label="Type of task"
              component={SelectInput}
              options={[
                {label: 'Online', value: 'online'},
              ]}

              withIcon={false}
              noMargin={true}
              showEmpty={true}
            />
            <Field
              name="price"
              label="Price"
              component={InputPriceFilter}
              noMargin={true}
              formKey={`${collapsed ? 'collapsed' : ''}${props.form}`}
              withIcon={false}
            />
            <Field
              name="subCategoryId"
              component={InputSubCategory}
              label="Subcategory"
              categoryId={props.categoryId}
              noMargin={true}
              withIcon={false}
              showEmpty={true}
            />
            <Field
              name="geonameid"
              component={InputLocation}
              label="Location"
              noMargin={true}
              withIcon={false}
              showEmpty={true}
            />
            <Field
              name="rating"
              label="Client rating"
              component={SelectInput}
              options={[
                {label: '1', value: 1},
                {label: '2', value: 2},
                {label: '3', value: 3},
                {label: '4', value: 4},
                {label: '5', value: 5},
              ]}
              noMargin={true}
              withIcon={false}
              showEmpty={true}
            />
            <Field
              name="payment"
              label="Payment type"
              component={SelectInput}
              options={[
                {label: 'Any', value: null},
                {label: 'Cash', value: 'cash'},
                {label: 'Card', value: 'card'},
              ]}
              noMargin={true}
              withIcon={false}
              showEmpty={true}
            />
          </>}
          {collapsed && <>
            <Field
              name="categoryId"
              component={InputCategory}
              label="Category"
              noMargin={true}
              withIcon={false}
              showEmpty={true}
            />
            <Field
              name="subCategoryId"
              component={InputSubCategory}
              label="Subcategory"
              categoryId={props.categoryId}
              noMargin={true}
              withIcon={false}
              showEmpty={true}
            />
            <Field
              name="geonameid"
              component={InputLocation}
              label="Location"
              noMargin={true}
              withIcon={false}
              showEmpty={true}
            />
            <Field
              name="price"
              label="Price"
              component={InputPriceFilter}
              noMargin={true}
              formKey={`${collapsed ? 'collapsed' : ''}${props.form}`}
              withIcon={false}
            />
          </>}
        </div>
      </form>
  )
}

SearchProfileForm  = reduxForm ({
  form: 'searchTaskForm',
}) (SearchProfileForm)

const selector = formValueSelector('searchTaskForm') // <-- same as form name
SearchProfileForm = connect(state => {
  const categoryId = selector(state, 'categoryId')
  return {
    categoryId,
  }
})(SearchProfileForm)

export default SearchProfileForm
