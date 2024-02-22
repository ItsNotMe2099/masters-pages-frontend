import styles from './index.module.scss';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const TimezonePicker = dynamic(() => import('react-timezone'), {
  ssr: false,
});

interface Props {
  input: any;
  disabled?: boolean;
  className?: string;
}

export default function TimeZoneSelectInput(props: Props) {
  const { input, disabled, className } = props;
  const { value, onChange } = input;
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const handleChange = (v) => {
    onChange(v);
    setTimezone(v);
  };

  return (
    <TimezonePicker
      // @ts-ignore
      value={timezone}
      className={styles.root}
      onChange={(selectedTimezone) => {
        console.log('New Timezone Selected:', selectedTimezone);
        handleChange(selectedTimezone);
      }}
      inputProps={{
        placeholder: 'Select Timezone...',
        name: 'timezone',
      }}
    />
  );
}
