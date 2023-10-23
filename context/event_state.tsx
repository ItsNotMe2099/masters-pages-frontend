import { createContext, useContext, useEffect, useState } from 'react'
import { SnackbarType } from 'types/enums'
import { DeepPartial } from "redux";
import { useAppContext } from "context/state";
import { confirmChangeData } from "components/Modal/actions";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { IEvent, IEventExpense } from "types";
import EventRepository from "data/repositories/EventRepository";
import { formatEvent } from "context/event_calendar";

interface IState {
  eventId: number | null,
  event: IEvent | null,
  projectId: number | null
  currentExpenses: IEventExpense[]
  currentActualExpenses: IEventExpense[]
  setCurrentExpenses: (data: IEventExpense[]) => void
  setCurrentActualExpenses: (data: IEventExpense[]) => void
  update: (event: string, data: IEvent | DeepPartial<IEvent>) => void,
  create: (data: DeepPartial<IEvent>) => void,
  delete: () => void
  loading: boolean
  editLoading: boolean,
  reject: () => void,
  approve: () => void,
  decline: () => void,
  confirm: () => void,
  sendConfirmed: boolean,
  setSendConfirmed: (val: boolean) => void
}

const defaultValue: IState = {
  eventId: null,
  event: null,
  projectId: null,
  update: (event: string, data: IEvent | DeepPartial<IEvent>) => null,
  create: (data: DeepPartial<IEvent>) => null,
  delete: () => null,
  loading: false,
  editLoading: false,
  currentExpenses: [],
  currentActualExpenses: [],
  setCurrentExpenses: (data: IEventExpense[]) => null,
  setCurrentActualExpenses: (data: IEventExpense[]) => null,
  reject: () => null,
  approve: () => null,
  decline: () => null,
  confirm: () => null,
  sendConfirmed: false,
  setSendConfirmed: (val) => null
}

const EventContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  projectId?: number
  eventId?: number
  event?: IEvent
}

export function EventWrapper(props: Props) {
  const { t } = useTranslation()
  const appContext = useAppContext()
  const [event, setEvent] = useState<IEvent | null>(props.event)
  const [eventId, setEventId] = useState<number | null>(props.eventId)
  const [loading, setLoading] = useState<boolean>(true)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  const [currentExpenses, setCurrentExpenses] = useState([])
  const [currentActualExpenses, setCurrentActualExpenses] = useState([])
  const [sendConfirmed, setSendConfirmed] = useState<boolean>(false)
  const dispatch = useDispatch()
  useEffect(() => {
    setEvent(props.event)
    if (props.event?.expenses) {
      setCurrentExpenses(props.event.expenses)
    }
    if (props.event?.actualExpenses) {
      setCurrentActualExpenses(props.event.actualExpenses)
    }
  }, [props.event])

  useEffect(() => {
    if (props.eventId) {
      setLoading(true)
      fetch().then((i) => setLoading(false))
    }
  }, [props.eventId])

  const handleUpdate = (data: IEvent) => {
    appContext.eventUpdateState$.next({ ...event, ...(data as any) })
  }

  const fetch = async (_applicationId?: number) => {
    const newEvent = await EventRepository.findById(props.eventId);

    setEvent(newEvent)
    if (newEvent.expenses) {
      setCurrentExpenses(newEvent.expenses)
    }
    if (newEvent.actualExpenses) {
      setCurrentActualExpenses(newEvent.actualExpenses)
    }
    setLoading(false)
    return newEvent;
  }

  const create = async (data: DeepPartial<IEvent>) => {
    setEditLoading(true)
    try {
      const event = await EventRepository.create({ ...data, projectId: props.projectId })
      const formatted = formatEvent(event)
      console.log("FormatEvent111", formatted)
      setEvent(formatted)
      appContext.eventCreateState$.next(formatted)
    } catch (err) {

      appContext.showSnackbar(err.message, SnackbarType.error)
    }
    setEditLoading(false)

  }
  const update = async (event: string, data: DeepPartial<IEvent>) => {
    try {
      setEditLoading(true)
      let res = await EventRepository.update(props.eventId, data);
      if (sendConfirmed) {
        res = await EventRepository.sendConfirmed(props.eventId)
      }
      else {
        switch (event) {
          case 'complete':
            res = await EventRepository.update(props.eventId, data);
            res = await EventRepository.complete(props.eventId)
            break;
          case 'sendWithEdit':
            res = await EventRepository.update(props.eventId, data);
            res = await EventRepository.send(props.eventId)
            break;
          case 'send':
            res = await EventRepository.send(props.eventId)
            break;
          case 'draftWithEdit':
            res = await EventRepository.update(props.eventId, data);
            break;
        }
      }
      const formatted = formatEvent(res)
      setEvent(formatted)
      handleUpdate(formatted)
    } catch (err) {
      appContext.showSnackbar(err.message, SnackbarType.error)


    }
    setEditLoading(false)
  }

  const reject = async () => {
    try {
      setEditLoading(true)
      const res = await EventRepository.reject(props.eventId)
      const formatted = formatEvent(res)
      setEvent(formatted)
      handleUpdate(formatted)

    } catch (err) {
      appContext.showSnackbar(err.message, SnackbarType.error)


    }
    setEditLoading(false)
  }
  const approve = async () => {
    try {
      setEditLoading(true)
      const res = await EventRepository.approve(props.eventId)
      const formatted = formatEvent(res)
      setEvent(formatted)
      handleUpdate(formatted)

    } catch (err) {
      appContext.showSnackbar(err.message, SnackbarType.error)


    }
    setEditLoading(false)
  }
  const confirm = async () => {
    try {
      setEditLoading(true)
      const res = await EventRepository.confirm(props.eventId)
      const formatted = formatEvent(res)
      setEvent(formatted)
      handleUpdate(formatted)
    } catch (err) {
      appContext.showSnackbar(err.message, SnackbarType.error)
    }
    setEditLoading(false)
  }
  const decline = async () => {
    try {
      setEditLoading(true)
      const res = await EventRepository.decline(props.eventId)
      const formatted = formatEvent(res)
      setEvent(formatted)
      handleUpdate(formatted)
    } catch (err) {
      appContext.showSnackbar(err.message, SnackbarType.error)
    }
    setEditLoading(false)
  }
  const handleDelete = async () => {
    dispatch(confirmChangeData({ loading: true }))
    await EventRepository.delete(event.id)
    console.log("Deleted111")
    appContext.eventDeleteState$.next(event)
  }
  const value: IState = {
    ...defaultValue,
    event,
    eventId: props.eventId ?? event?.id,
    projectId: props.projectId,
    create,
    update,
    loading,
    editLoading,
    delete: handleDelete,
    currentExpenses,
    currentActualExpenses,
    sendConfirmed,
    setSendConfirmed: (val: boolean) => {
      setSendConfirmed(val)
    },
    setCurrentExpenses: (data: IEventExpense[]) => {
      setCurrentExpenses(data)
    },
    setCurrentActualExpenses: (data: IEventExpense[]) => {
      setCurrentActualExpenses(data)
    },
    reject,
    approve,
    confirm,
    decline


  }

  return (
    <EventContext.Provider value={value}>
      {props.children}
    </EventContext.Provider>
  )
}

export function useEventContext() {
  return useContext(EventContext)
}
