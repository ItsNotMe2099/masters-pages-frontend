import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

interface Props {}

export default function DropMenu(props: Props) {
  const options = [{className: 'canada', value: '+1', label: ''}, {className: 'russia', value: '+7', label: ''}]
  const defaultOption = options[0];
  return (
    <Dropdown options={options} onChange={this._onSelect} value={defaultOption}/>
  )
}
