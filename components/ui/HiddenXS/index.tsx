import { useAppContext } from 'context/state' 
interface Props {   
  children: JSX.Element 
} 
export default function HiddenXs(props: Props): JSX.Element | null {   
  const appContext = useAppContext()   
  if (appContext.isDesktop) {     
    return props.children   
  }   
  return null 
}