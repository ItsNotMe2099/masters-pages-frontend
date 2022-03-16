import styles from './index.module.scss'
import {FieldAttributes, FieldHookConfig, FieldProps, useField, useFormikContext} from 'formik'
import cx from 'classnames';
import {CustomCheckbox} from 'components/ui/CustomCheckbox'
import Label from 'components/fields/Label'
import {LabelStyleType} from 'types/types'
interface ICheckboxValue{
  value: any
  label: string
}
interface Props {
  label?: string
  options: ICheckboxValue[],
  labelType?: LabelStyleType
  value: any[]
  onChange: (values) => void
  labelStyle?: 'normal' | 'large'
}

export default function CheckBoxListField(props: Props & any) {
  const [field, meta] = useField({ ...props });
   const { options, onChange, label} = props;
   const {value} = field;
  const { setFieldValue, setFieldTouched } = useFormikContext();
    const handleChange = (item: ICheckboxValue, checked) => {
      const selected = value || [];
      let newValues = selected;

      if(checked){
        if(!selected.includes(item.value)){
          newValues = [...selected, item.value];
        }
      }else{
          newValues = selected.filter(i => i !== item.value);
      }
      if(newValues.length !== selected.length){
        setFieldValue(props.name, newValues);
        if(onChange) {
          onChange(newValues);
        }
      }

    }

    const hasError = meta.error && meta.touched;
  return (
    <div className={cx(styles.root, {[styles.hasError]: hasError})}>
      <Label style={props.labelStyle} label={label} hasError={hasError}/>
      <div className={styles.sizes}>
      {options.map(item =>
        <div className={styles.checkbox}>
          <CustomCheckbox
            checked={(value || []).includes(item.value)}
            label={item.label}
            onChange={(val) => handleChange(item, val)}
          />
        </div>
         )}
      </div>
    </div>
  )
}
