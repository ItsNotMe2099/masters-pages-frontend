import Link from 'next/link'
import { useState } from 'react'
import styles from './index.module.scss'

interface Props {}

export default function LangSwitch(props: Props) {
  return (
        <button className={`
        ${styles.dropBtn}
        `}>RU
        </button>
  )
}
