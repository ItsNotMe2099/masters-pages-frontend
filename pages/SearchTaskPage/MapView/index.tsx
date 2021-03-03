import Modals from "components/layout/Modals";
import Map from "components/Map";
import MapTaskMarker from "components/svg/MapTaskMarker";
import Task from "components/Task";
import {
  fetchTaskSearchList,
  resetTaskSearchList,
  setPageTaskSearch,
  setSortTaskSearch, setUseLocationFilter
} from "components/TaskSearch/actions";
import Button from "components/ui/Button";
import { DropDown } from "components/ui/DropDown";
import Loader from "components/ui/Loader";
import Tabs from "components/ui/Tabs";
import { useRouter } from "next/router";
import MapHeader from "pages/SearchTaskPage/MapView/MapHeader";
import { useEffect, useRef, useState } from "react";
import { IRootState, ITask } from "types";
import { inBounds } from "utils/locaion";
import styles from './index.module.scss'
import useSupercluster from "use-supercluster";
import { useDispatch, useSelector } from 'react-redux'
import {useTranslation} from "react-i18next";
const queryString = require('query-string')

const Marker = ({ children, lat, lng }) => children;

interface Props {
  onShowList: () => void
}

const SearchTaskMapView = (props: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('exactLocation')
  const loading = useSelector((state: IRootState) => state.taskSearch.listLoading)
  const tasks = useSelector((state: IRootState) => state.taskSearch.list)
  const total = useSelector((state: IRootState) => state.taskSearch.total)
  const page = useSelector((state: IRootState) => state.taskSearch.page)
  const sortType = useSelector((state: IRootState) => state.taskSearch.sortType)
  const filter = useSelector((state: IRootState) => state.taskSearch.filter)
  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [center, setCenter] = useState(null);
  const [zoom, setZoom] = useState(10);
  const [activeId, setActiveId] = useState(null);
  const points = tasks.map(crime => ({
    type: "Feature",
    properties: { cluster: false, id: crime.id },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(crime.location.lng),
        parseFloat(crime.location.lat)
      ]
    }
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds: bounds ? [ bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat] : null,
    zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  useEffect(() => {
    dispatch(setUseLocationFilter(true, true));
    dispatch(resetTaskSearchList())
    dispatch(fetchTaskSearchList({limit: 100000}))
    return () => {
      dispatch(setUseLocationFilter(false, false));
    }
  }, [])
  const handleSortChange = (item) => {
    dispatch(setSortTaskSearch(item.value));
    dispatch(resetTaskSearchList())
    dispatch(fetchTaskSearchList({limit: 100000}))
    router.replace(`/SearchTaskPage?${queryString.stringify({filter: JSON.stringify(filter), sortType: item.value})}`, undefined, { shallow: true })
  }


  const handleMarkerClick = (itemId) => {
    setActiveId(itemId);
  }
  const handleTaskListClick = (task: ITask) => {
    setActiveId(task.id);
    if (task.location) {
      setCenter(task.location);
    }
  }

  const tabs = [
    { name: t('taskSearch.exactLocationTab'), key: 'exactLocation' },
    { name: t('taskSearch.approximateLocationTab'), key: 'approximateLocation' },
  ];
  const handleChangeTab = (item) => {
    setActiveTab(item.key);
    if (item.key === 'exactLocation') {
      dispatch(setUseLocationFilter(true, true));
    } else {
      dispatch(setUseLocationFilter(true, false));
    }
    dispatch(resetTaskSearchList())
    dispatch(fetchTaskSearchList({limit: 100000}))
  }


  const handleBoundChange = () => {

  }
  return (
    <div className={styles.root}>
      <MapHeader />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.tasks}>
            <Tabs tabs={tabs} activeTab={activeTab} onChange={handleChangeTab}/>
            <div className={styles.tasksWrapper} id={'task-search-map-list'}>
              <div className={styles.tasksTobBar}>
                <div className={styles.tasksAmount}>Tasks: <span>{total}</span></div>
                <div className={styles.tasksSort}>
                  <span>{t('sort.title')}:</span>
                  <DropDown onChange={handleSortChange} value={sortType} options={[
                    {value: 'newFirst',  label: t('sort.newFirst')},
                    {value: 'highPrice', label: t('sort.highestPrice')},
                    {value: 'lowPrice', label: t('sort.lowestPrice')}]}
                            item={(item) => <div>{item?.label}</div>}
                  />
                </div>
              </div>

              {(loading && total === 0) && <Loader/>}
              {(!loading && total > 0) && tasks.filter(item =>  bounds ? inBounds(item.location, bounds) : true).map(task => <Task task={task} isActive={task.id === activeId} onClick={handleTaskListClick}/>)}



            </div>
          </div>
          <div className={styles.map}>
            <Button className={styles.backButton} whiteRed uppercase onClick={props.onShowList}>{t('back')}</Button>
            <Map center={center} onGoogleApiLoaded={({ map }) => {
              mapRef.current = map;
            }}
                 onChange={({ zoom, bounds }) => {
                   setZoom(zoom);
                   setBounds(bounds);
                 }}
            >
              {clusters.map(cluster => {
                const [longitude, latitude] = cluster.geometry.coordinates;
                const {
                  cluster: isCluster,
                  point_count: pointCount
                } = cluster.properties;
                if (isCluster) {
                  return (
                    <Marker
                      key={`cluster-${cluster.id}`}
                      lat={latitude}
                      lng={longitude}
                    >
                      <div
                        className={styles.clusterMarker}
                        style={{
                          width: `${60 + (pointCount / points.length) * 20}px`,
                          height: `${60 + (pointCount / points.length) * 20}px`
                        }}
                        onClick={() => {
                          const expansionZoom = Math.min(
                            supercluster.getClusterExpansionZoom(cluster.id),
                            20
                          );
                          if (mapRef) {
                            // @ts-ignore
                            mapRef.current.setZoom(expansionZoom);
                            // @ts-ignore
                            mapRef.current.panTo({ lat: latitude, lng: longitude });
                          }
                        }}
                      >
                        {pointCount}
                      </div>
                    </Marker>
                  );
                }

                return (
                  <Marker
                    key={`crime-${cluster.properties.id}`}
                    lat={latitude}
                    lng={longitude}
                  >
                    <div
                      className={`${styles.mapMarker} ${cluster.properties.id === activeId && styles.mapMarkerActive}`}
                      onClick={() => handleMarkerClick(cluster.properties.id)}>
                      <MapTaskMarker/>
                    </div>
                  </Marker>
                );
              })}
            </Map>
          </div>
        </div>
      </div>
      <Modals/>
    </div>
  )
}
export default SearchTaskMapView
