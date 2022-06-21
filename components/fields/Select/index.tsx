import styles from './index.module.scss'
import {InputStyleType, IOption, LabelStyleType} from 'types/types'
import ReactSelect, {components, InputActionMeta} from 'react-select'
import AsyncSelect from 'react-select/async';
import {DropdownIndicatorProps} from 'react-select/dist/declarations/src/components/indicators'
import {GroupBase} from 'react-select/dist/declarations/src/types'
import classNames from 'classnames'
import usePressAndHover from 'hooks/usePressAndHover'
import Label from 'components/fields/Label'
import React, {useEffect, useState} from 'react'

interface Props<T> {
  key?: string
  label?: string
  styleType: InputStyleType
  labelType?: LabelStyleType
  options: IOption<T>[]
  value: T
  onChange: (value: T) => void
  hasError?: boolean
  placeholder?: string
  onMenuOpen?: () => void
  loadOptions?: (initialValue) => Promise<IOption<T>[]>
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void
  className?: string
}

const CustomOption = (props) => {
  const {innerProps, isDisabled, isSelected, data: {label, value}} = props

  return !isDisabled ? (
    <div {...innerProps} className={styles.option}>
      <div
        className={classNames({[styles.circle]: true, [styles.active]: isSelected})}/>
      {label}</div>
  ) : null
}
export default function Select<T>(props: Props<T>) {
  const [ref, press, hover] = usePressAndHover()
  const [lastOptions, setLastOptions] = useState([]);
  const [isInit, setIsInit] = useState(false);
  const selected = (props.loadOptions ? lastOptions || [] : props.options || []).find(item => item.value == props.value)
  useEffect(() => {

  if(props.loadOptions){
    handleLoadOptions(null, (res) => null)
  }else{
    setIsInit(false);
  }
  }, []);

  const handleLoadOptions = async (val, cb) => {
    const res = await props.loadOptions(val);
    setLastOptions(res);
    if(!isInit){
      setIsInit(true);
    }
    cb(res);
  }
  const getProps = () => {
    return {
      defaultValue: selected,
      value: selected,
      isMulti: false,
      onMenuOpen: props.onMenuOpen,
      className: classNames({
        [styles.input]: true,
        [styles.error]: props.hasError,
        [styles.hover]: hover,
        [styles.press]: press,
      }, styles[props.styleType]),
      classNamePrefix: "ma-select",
      isSearchable: true,
      placeholder: props.placeholder,
      onInputChange: props.onInputChange,
      onChange: (option) => {
        props.onChange((option as IOption<T>).value)
      },
      components: {DropdownIndicator, Option: CustomOption}
    }
  }
  return (
    <div className={classNames(styles.root, props.className)} ref={ref}>
      <Label label={props.label} style={props.labelType} hasError={props.hasError} />
      {props.loadOptions ?
        <AsyncSelect<IOption<T>> {...getProps() as any} key={props.key} isLoading={!isInit} loadOptions={handleLoadOptions} defaultOptions={lastOptions}/> :
        <ReactSelect {...getProps()} options={props.options}/>
      }

    </div>
  )
}

const DropdownIndicator = (props: DropdownIndicatorProps<IOption<any>, false, GroupBase<IOption<any>>>) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <img src="/img/field/arrowDown.svg" alt="" className={classNames({
          [styles.indicator]: true,
          [styles.indicatorInverse]: props.selectProps.menuIsOpen,
        })}/>
      </components.DropdownIndicator>
    )
  )
}
