import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  fetchSpotDetail,
  fetchSpotIntro,
  fetchBarrierFreeInfo,
} from "../api/SpotDetailApi.js";
import { ClipLoader } from "react-spinners";

import SpotDetailHeader from "../components/SpotDetail/SpotDetailHeader";
import SpotOverview from "../components/SpotDetail/SpotOverview";
import SpotMeta from "../components/SpotDetail/SpotMeta";
import SpotMap from "../components/spotDetail/SpotMap";
import SpotBarrierFree from "../components/spotDetail/SpotBarrierFree";
import styles from "./spotDetailPage.module.css";
import Header from "../components/header/Header";

export default function SpotDetailPage() {
  const { contentId } = useParams();
  const location = useLocation();
  console.log(location.state?.liked);
  
  const liked = location.state?.liked ?? false;

  console.log(liked);
  const [spot, setSpot] = useState(null);
  const [intro, setIntro] = useState(null);
  const [barrierInfo, setBarrierInfo] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const detail = await fetchSpotDetail(contentId);
        setSpot(detail);

        const introData = await fetchSpotIntro(contentId, detail.contenttypeid);
        setIntro(introData);

        const barrier = await fetchBarrierFreeInfo(contentId);
        setBarrierInfo(barrier);
      } catch (err) {
        console.error("상세 정보 불러오기 실패", err);
      }
    };

    loadData();
  }, [contentId]);

  if (!spot) {
    return (
      <div className={styles.loadingWrapper}>
        <ClipLoader color="#7ED6EA" size={60} />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <SpotDetailHeader
          image={spot.firstimage}
          title={spot.title}
          tourSpotId={spot.contentid}
          initialLiked={liked}
        />
        <SpotOverview overview={spot.overview} />
        <SpotBarrierFree info={barrierInfo} />
        {spot.mapy && spot.mapx && (
          <SpotMap lat={parseFloat(spot.mapy)} lng={parseFloat(spot.mapx)} />
        )}
        {spot && (
          <SpotMeta spot={spot} intro={intro} homepage={spot.homepage} />
        )}
      </div>
    </>
  );
}
