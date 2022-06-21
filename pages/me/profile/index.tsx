import {getAuthServerSide} from 'utils/auth'

interface Props {
}
const TabPersonal = (props: Props) => {
 return null
}

export default TabPersonal
export const getServerSideProps = getAuthServerSide({redirect: true})
