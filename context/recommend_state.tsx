import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useAppContext } from 'context/state'
import useInterval from 'use-interval'
import useWindowFocus from 'use-window-focus'
import { useNetworkStatus } from 'use-network-status'

import { debounce, uniqBy } from 'lodash'
import ProfileRecommendationRepository from "data/repositories/ProfileRecommendationRepisitory";
 interface INotificationUnreadStoreItem {
  eId: number
  id: number
}
 type NotificationUnreadStoreType = INotificationUnreadStoreItem[]

const initStore = []
const tmpList: number[] = []
const deleteRecordList: { id: number, recordId: number }[] = []
interface IState {
  store: INotificationUnreadStoreItem[],
  sending: number[],
  addRecord(id: number): void
  addRecords(ids: number[]): void
  removeRecord(id: number): void
  removeRecords(id: number[]): void
  createRecommend(profileId: number): void
  deleteRecommend(profileId: number): void
}


const defaultValue: IState = {
  store: initStore,
  sending: [],
  addRecord: (id) => null,
  addRecords: (ids) => null,
  removeRecord: (id) => null,
  removeRecords: (ids) => null,
  createRecommend: (profileId) => null,
  deleteRecommend: (profileId) => null,
}

const RecommendStateContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}
export function RecommendWrapper(props: Props) {
  const appContext = useAppContext()
  const windowFocused = useWindowFocus()
  const isOnline = useNetworkStatus()
  const isLogged = appContext.isLogged
  const isLoggedRef = useRef<boolean>(isLogged)
  const [sending, setSending] = useState<number[]>([])
  const [store, setStore] = useState<INotificationUnreadStoreItem[]>([] )
  const storeRef = useRef<INotificationUnreadStoreItem[]>(store)
  const sendingRef = useRef<number[]>([])
  const mutate = () => {
    if (!isLoggedRef.current) {
      return
    }

  }

  useEffect(() => {
    storeRef.current = store
  }, [store])
  useEffect(() => {
    sendingRef.current = sending
  }, [sending])




  const debouncedSave = debounce(async () => {

    if (isLoggedRef.current && tmpList.length > 0) {
      const list = await ProfileRecommendationRepository.fetchStatus(tmpList)
      if (list) {
        setStore(join( [...storeRef.current], list.map(i => ({eId: i.recommendedProfileId, id: i.id}))))
      }
    }
  }, 500)

  const debouncedDeleteRecord = debounce(async () => {
    const notificationIds = deleteRecordList.filter(i => i.id !== 0).map(i => i.id)
    const newStore = store.filter(i => !notificationIds.includes(i.id))
    for (const mark of deleteRecordList) {
      const index = tmpList.findIndex(i => i === mark.recordId)
      if (index >= 0) {
        tmpList.splice(index, 1)
      }
    }
    setStore(newStore)
    deleteRecordList.length = 0
  }, 200)
  const addRecord = (id: number) => {
    if (!tmpList.find(i => i === id)) {
      tmpList.push(id)
      debouncedSave()
    }
  };
  const  removeRecord = (recordId: number) => {
    const inStore = store.filter(i => i.eId === recordId)
    for (const item of inStore) {
      deleteRecordList.push({ recordId, id: item.id })
    }
    const inTmpList = tmpList.filter(i => i === recordId)
    for (const item of inTmpList) {
      deleteRecordList.push({ id: 0, recordId: item })
    }
    debouncedDeleteRecord()
  }
  const createRecommend = async (profileId: number) => {
    console.log("createRecommend", profileId)
    sendingRef.current = [...sendingRef.current, profileId]
    setSending([...sendingRef.current, profileId])
    const res = await ProfileRecommendationRepository.create(profileId);
    if(res?.id) {
      setStore(join([...storeRef.current], [{eId: profileId, id: res.id}]))
    }
    sendingRef.current = sendingRef.current.filter(i => i !== profileId)
    setSending(sendingRef.current)
  }
  const deleteRecommend = async (profileId: number) => {
    sendingRef.current = [...sendingRef.current, profileId]
    setSending([...sendingRef.current, profileId])
    const res = await ProfileRecommendationRepository.delete(profileId);
    setStore(storeRef.current.filter(i => i.eId !== profileId));
    sendingRef.current = sendingRef.current.filter(i => i !== profileId)
    setSending(sendingRef.current)


  }
  const value: IState = {
    store,
    sending,
    addRecord,
    removeRecord,
    removeRecords(ids: number[]) {
      const inStore = store.filter(i => ids.includes(i.eId))
      for (const item of inStore) {
        deleteRecordList.push({ recordId: item.eId, id: item.id })
      }
      const inTmpList = tmpList.filter(i =>  ids.includes(i))
      for (const item of inTmpList) {
        deleteRecordList.push({ id: 0, recordId: item })
      }
      debouncedDeleteRecord()
    },
    addRecords(ids: number[]) {
      for (const id of ids) {
        if (!tmpList.find(i => i === id)) {
          tmpList.push(id)
        }
      }
      debouncedSave()
    },
    createRecommend,
    deleteRecommend,
  }

  return (
    <RecommendStateContext.Provider value={value}>
      {props.children}
    </RecommendStateContext.Provider>
  )
}

export function useRecommendContext() {
  return useContext(RecommendStateContext)
}

function join(a: NotificationUnreadStoreType, b: NotificationUnreadStoreType): NotificationUnreadStoreType {
   console.log("Arrays1212", a, b)
  let result: NotificationUnreadStoreType =  Array.from([...a, ...b])
    result = uniqBy(result, (e) => {
      return `${e.eId}.${e.id}`
    })
  return result
}
