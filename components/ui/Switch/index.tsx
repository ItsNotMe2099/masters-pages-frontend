import React from 'react'
import RSwitch from 'react-switch'
interface Props {
  checked?: boolean
  onChange?: (val: boolean) => void
}

export default function Switch(props: Props) {


  return (
      <RSwitch
        onChange={props.onChange}
        checked={props.checked}
        handleDiameter={26}
        uncheckedIcon={false}
        checkedIcon={false}
        height={30}
        width={51}
        offColor="#C4C4C4"
        onColor="#6EDC5F"
        offHandleColor="#fff"
        onHandleColor="#fff"
      />
  )
}
