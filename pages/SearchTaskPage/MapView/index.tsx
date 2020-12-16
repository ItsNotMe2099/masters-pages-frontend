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
import InfiniteScroll from "react-infinite-scroll-component";
import { IRootState, ITask } from "types";
import styles from './index.module.scss'
import useSupercluster from "use-supercluster";
import { useDispatch, useSelector } from 'react-redux'
const Marker = ({ children, lat, lng }) => children;

interface Props {
  onShowList: () => void
}
const SearchTaskMapView= (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('exactLocation')
  const loading = useSelector((state: IRootState) => state.taskSearch.listLoading)
  const tasks = useSelector((state: IRootState) => state.taskSearch.list)
  const total = useSelector((state: IRootState) => state.taskSearch.total)
  const page = useSelector((state: IRootState) => state.taskSearch.page)
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
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  console.log("Clusters", clusters, points)
  console.log("Has More", total > tasks.length)

  useEffect(() => {
    dispatch(setUseLocationFilter(true, true));
    dispatch(resetTaskSearchList())
    dispatch(fetchTaskSearchList())
    return () => {
      dispatch(setUseLocationFilter(false, false));
    }
  }, [])
  const handleSortChange = (item) => {
    console.log("ChangeSort", item)
    dispatch(setSortTaskSearch(item.value));
    dispatch(resetTaskSearchList())
    dispatch(fetchTaskSearchList())
  }
  const handleScrollNext = () => {
    console.log("HandleNext", page)
    dispatch(setPageTaskSearch(page + 1))
    dispatch(fetchTaskSearchList())
  }
  const handleMarkerClick = (itemId) => {
    setActiveId(itemId);
    console.log("handle Marker Click", itemId)
  }
  const handleTaskListClick = (task: ITask) => {
      setActiveId(task.id);
      if(task.location) {
        setCenter(task.location);
      }
  }

  const tabs = [
    { name: 'Exact location', key: 'exactLocation' },
    { name: 'Approximate location', key: 'approximateLocation' },
  ];
  const handleChangeTab = (item) => {
    setActiveTab(item.key);

    if(item.key === 'exactLocation'){
      dispatch(setUseLocationFilter(true, true));
    }else{
      dispatch(setUseLocationFilter(true, false));
    }
    dispatch(resetTaskSearchList())
    dispatch(fetchTaskSearchList())
  }
  return (
    <div className={styles.root}>
      <MapHeader/>
      <div className={styles.container}>
        <div className={styles.wrapper}>
        <div className={styles.tasks}>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={handleChangeTab}/>

          <div className={styles.tasksWrapper} id={'task-search-map-list'}>


            <div className={styles.tasksTobBar}>
              <div className={styles.tasksAmount}>Tasks: <span>{total}</span></div>
              <div className={styles.tasksSort}>
                <span>Sort by:</span>
                <DropDown options={[{ value: 'newFirst', label: 'New First' },
                  { value: 'newFirst', label: 'New First' },
                  { value: 'highPrice', label: 'Highest price' },
                  { value: 'lowPrice', label: 'Lowest price' }]}
                          item={(item) => <div>{item?.label}</div>}
                />
              </div>
            </div>

            {(loading && total > 0) && <Loader/>}
            {total > 0 && <InfiniteScroll
              scrollableTarget={'task-search-map-list'}
              onScroll={(e) => console.log("onCscroll", e)}
              dataLength={tasks.length} //This is important field to render the next data
              next={handleScrollNext}
              hasMore={total > tasks.length}
              loader={<Loader/>}>

              {tasks.map(task => <Task task={task} isActive={task.id === activeId} onClick={handleTaskListClick}/>)}
            </InfiniteScroll>}


          </div>
        </div>
        <div className={styles.map}>
          <Button className={styles.backButton} whiteRed uppercase onClick={props.onShowList}>Back</Button>
          <Map center={center}  onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
                 onChange={({ zoom, bounds }) => {
                   setZoom(zoom);
                   setBounds([
                     bounds.nw.lng,
                     bounds.se.lat,
                     bounds.se.lng,
                     bounds.nw.lat
                   ]);
                 }}
          >
            {clusters.map(cluster => {
              const [longitude, latitude] = cluster.geometry.coordinates;
              const {
                cluster: isCluster,
                point_count: pointCount
              } = cluster.properties;

              console.log("Cluster", cluster)
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
                        if(mapRef) {
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
                  <div className={`${styles.mapMarker} ${cluster.properties.id === activeId && styles.mapMarkerActive}`} onClick={() => handleMarkerClick(cluster.properties.id)}>
                      <MapTaskMarker/>
                   </div>
                </Marker>
              );
            })}
          </Map>
        </div>
        </div>
      </div>
    </div>
  )
}
export default SearchTaskMapView
