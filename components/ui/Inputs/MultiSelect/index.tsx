import { useDetectOutsideClick } from "components/hooks/useDetectOutsideClick";
import { useContext, useEffect, useRef, useState } from "react";
import styles from './index.module.scss'
import cx from 'classnames'
import nextI18 from "i18n";
import {useTranslation} from "i18n";
import ArrowDropDown from 'components/svg/ArrowDropDown'
import Checkbox from 'components/ui/Inputs/Checkbox'

interface Props {
  options: [{ value: any, label: string }],
  onSearchChange?: (string) => void,
  onOpenDropDown?: () => void;
  changeWithValue?: boolean
  allowCustomInput?: boolean,
  restrictedValues: any[],
  input?: any,
  meta?: any,
  label?: string,
  labelType?: any,
  size?: any,
  withIcon?: boolean,
  showEmpty?: boolean,
  emptyText?: string

}

const MultiSelect = (props: Props) => {
  const {t} = useTranslation()
  const {value, onChange} = props.input;
  const { meta: { error, touched },restrictedValues, input, options, onOpenDropDown, label, ...rest } = props;
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const valueInputRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [currentLabel, setCurrentLabel] = useState('');

  const getSizeClass = (size) => {
    switch (size) {
      case 'small':
        return styles.dropDownSmall;
      case 'normal':
      default:
        return styles.dropDownNormal;
    }
  }
  const onClick = (e) => {

    if (!isActive && onOpenDropDown) {
      onOpenDropDown();
    }
    console.log("OnClickCheckbox")
   setIsActive(!isActive);
  }

  const handleOptionClick = (e, item) => {
    e.stopPropagation();
    if((value as any[]).includes(item.value)){
      input.onChange((value as any[]).filter(val => val != item.value));
    }else{
      console.log("ValueItem", [(value as any[]), item.value]);
      input.onChange([...(value as any[]), item.value]);
    }
  }
  const handleAll = (e) => {
    e.stopPropagation();
    if(value.length === options.length){
      onChange([]);
    }else{
      onChange(options.map(item => item.value));
    }
  }

  return (
      <div className={styles.root}>
        <div className={`${styles.field} ${isActive && styles.fieldActive}`}  onClick={onClick}>
          <div className={styles.fieldLabel}>{label}</div>
          <div className={styles.fieldCount}>{value.length === options.length ? 'All' : value.length}</div>
          <ArrowDropDown/>
        </div>
        <div ref={dropdownRef} className={`${cx(styles.dropDown, { [styles.dropDownActive]: isActive, [styles.dropDownWithLabelCross]: props.labelType === 'cross' })} ${getSizeClass(props.size)}`}>
          <div className={styles.dropdownItem} onClick={handleAll}>
            <Checkbox className={styles.checkbox} meta={{}} input={{value: value.length === options.length, onChange: () => {}}} label={t('all')} />
          </div>

          {options.filter(item => restrictedValues.indexOf(item.value) === -1).map(item => (
            <div className={styles.dropdownItem} onClick={(e) => handleOptionClick(e, item)}>
                <Checkbox className={styles.checkbox} meta={{}} input={{value: value.includes(item.value), onChange: () => {}}} label={item.label}/>
            </div>
          ))}
      </div>
    </div>

  );
};

MultiSelect.defaultProps = {
  labelType: 'placeholder',
  onSearchChange: () => {},
  onOpenDropDown: () => {},
  restrictedValues: [],
  withIcon: true
}
export default MultiSelect
