import styles from "./spotMeta.module.css";

export default function SpotMeta({ spot, intro }) {
  const extractHomepageUrl = (html) => {
    const match = html?.match(/href="(.*?)"/);
    return match ? match[1] : null;
  };

  const removeBr = (text) => text?.replace(/<br\s*\/?\s*>/gi, " ").trim();

  const homepageUrl = extractHomepageUrl(spot.homepage);

  return (
    <div className={styles.meta}>
      <p className={styles.item}>주소: {spot.addr1}</p>

      {/* 행사공연축제 */}
      {intro?.eventhomepage && <p className={styles.item}>행사홈페이지: {removeBr(intro.eventhomepage)}</p>}
      {intro?.usetimefestival && <p className={styles.item}>이용요금: {removeBr(intro.usetimefestival)}</p>}
      {intro?.placeinfo && <p className={styles.item}>행사장위치안내: {removeBr(intro.placeinfo)}</p>}
      {intro?.eventplace && <p className={styles.item}>행사장소: {removeBr(intro.eventplace)}</p>}
      {intro?.agelimit && <p className={styles.item}>관람가능연령: {removeBr(intro.agelimit)}</p>}
      {intro?.sponsor2 && <p className={styles.item}>주관사정보: {removeBr(intro.sponsor2)}</p>}

      {/* 음식점 */}
      {intro?.opentimefood && <p className={styles.item}>영업시간: {removeBr(intro.opentimefood)}</p>}
      {intro?.restdatefood && <p className={styles.item}>쉬는날: {removeBr(intro.restdatefood)}</p>}
      {intro?.reservationfood && <p className={styles.item}>예약안내: {removeBr(intro.reservationfood)}</p>}
      {intro?.firstmenu && <p className={styles.item}>대표메뉴: {removeBr(intro.firstmenu)}</p>}
      {intro?.treatmenu && <p className={styles.item}>취급메뉴: {removeBr(intro.treatmenu)}</p>}
      {intro?.chkcreditcardfood && <p className={styles.item}>신용카드가능정보: {removeBr(intro.chkcreditcardfood)}</p>}
      {intro?.smoking && <p className={styles.item}>흡연여부: {removeBr(intro.smoking)}</p>}
      {intro?.parkingfood && <p className={styles.item}>주차시설: {removeBr(intro.parkingfood)}</p>}

      {/* 쇼핑 */}
      {intro?.chkcreditcardshopping && <p className={styles.item}>신용카드가능정보: {removeBr(intro.chkcreditcardshopping)}</p>}
      {intro?.chkpetshopping && <p className={styles.item}>애완동물동반가능정보: {removeBr(intro.chkpetshopping)}</p>}
      {intro?.fairday && <p className={styles.item}>장서는날: {removeBr(intro.fairday)}</p>}
      {intro?.infocentershopping && <p className={styles.item}>문의및안내: {removeBr(intro.infocentershopping)}</p>}        
      {intro?.opentime && <p className={styles.item}>영업시간: {removeBr(intro.opentime)}</p>}
      {intro?.parkingshopping && <p className={styles.item}>주차시설: {removeBr(intro.parkingshopping)}</p>}    
      {intro?.restdateshopping && <p className={styles.item}>쉬는날: {removeBr(intro.restdateshopping)}</p>} 
      {intro?.restroom && <p className={styles.item}>화장실설명: {removeBr(intro.restroom)}</p>}

      {/* 문화시설 */}
      {intro?.infocenterculture && <p className={styles.item}>문의및안내: {removeBr(intro.infocenterculture)}</p>}
      {intro?.restdateculture && <p className={styles.item}>쉬는날: {removeBr(intro.restdateculture)}</p>}
      {intro?.usefee && <p className={styles.item}>이용요금: {removeBr(intro.usefee)}</p>}
      {intro?.usetimeculture && <p className={styles.item}>이용시간: {removeBr(intro.usetimeculture)}</p>}
      {intro?.parkingculture && <p className={styles.item}>주차시설: {removeBr(intro.parkingculture)}</p>}
      {intro?.parkingfee && <p className={styles.item}>주차요금: {removeBr(intro.parkingfee)}</p>}

      {/* 숙박 */}
      {intro?.reservationlodging && <p className={styles.item}>예약안내: {removeBr(intro.reservationlodging)}</p>}
      {intro?.scalelodging && <p className={styles.item}>규모: {removeBr(intro.scalelodging)}</p>}
      {intro?.infocenterlodging && <p className={styles.item}>문의및안내: {removeBr(intro.infocenterlodging)}</p>}
      {intro?.subfacility && <p className={styles.item}>부대시설: {removeBr(intro.subfacility)}</p>}  
      {intro?.barbecue && <p className={styles.item}>바비큐장여부: {removeBr(intro.barbecue)}</p>}  
      {intro?.fitness && <p className={styles.item}>휘트니스센터여부: {removeBr(intro.fitness)}</p>}  
      {intro?.parkinglodging && <p className={styles.item}>주차시설: {removeBr(intro.parkinglodging)}</p>}
      {intro?.chkcooking && <p className={styles.item}>객실내취사여부: {removeBr(intro.chkcooking)}</p>}
      {intro?.foodplace && <p className={styles.item}>식음료장: {removeBr(intro.foodplace)}</p>}

      {/* 레포츠 */}
      {intro?.infocenterleports && <p className={styles.item}>문의및안내: {removeBr(intro.infocenterleports)}</p>}
      {intro?.parkingleports && <p className={styles.item}>주차시설: {removeBr(intro.parkingleports)}</p>}
      {intro?.reservation && <p className={styles.item}>예약안내: {removeBr(intro.reservation)}</p>}  
      {intro?.usefeeleports && <p className={styles.item}>입장료: {removeBr(intro.usefeeleports)}</p>}     
      {intro?.chkpetleports && <p className={styles.item}>애완동물동반가능정보: {removeBr(intro.chkpetleports)}</p>}   

      {/* 관광지 */}
      {intro?.infocenter && <p className={styles.item}>문의및안내: {removeBr(intro.infocenter)}</p>}
      {intro?.restdate && <p className={styles.item}>쉬는날: {removeBr(intro.restdate)}</p>}
      {intro?.parking && <p className={styles.item}>주차시설: {removeBr(intro.parking)}</p>}
      {intro?.chkcreditcard && <p className={styles.item}>신용카드가능정보: {removeBr(intro.chkcreditcard)}</p>}
      {intro?.chkpet && <p className={styles.item}>애완동물동반가능정보: {removeBr(intro.chkpet)}</p>}
      {intro?.expguide && <p className={styles.item}>체험안내: {removeBr(intro.expguide)}</p>}

      {homepageUrl && (
        <div className={styles.linkWrapper}>
          <a
            className={styles.linkButton}
            href={homepageUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            홈페이지 방문
          </a>
        </div>
      )}
    </div>
  );
}
