import Loader from 'components/ui/Loader'
import Modal from 'components/ui/Modal'

interface Props {
  isOpen: boolean
  onRequestClose: () => void
}

export default function ModalLoader(props: Props) {
  return (
    <Modal
      {...props}
    >
      <Loader/>
    </Modal>
  )
}
