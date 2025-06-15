import { useState, useEffect } from "react";
import styles from "./scheduleList.module.css";
import { FiTrash2 } from "react-icons/fi";
import { useScheduleStore } from "../../stores/useScheduleStore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SearchModal from "./SearchModal";

export default function ScheduleList({ selectedDay }) {
  const schedulesByDay = useScheduleStore((state) => state.schedulesByDay);
  const detailsByDay = useScheduleStore((state) => state.detailsByDay);
  const setPlacesForDay = useScheduleStore((state) => state.setPlacesForDay);
  const setDetailsForDay = useScheduleStore((state) => state.setDetailsForDay);

  const [modalIndex, setModalIndex] = useState(null);

  const rawItems = schedulesByDay[selectedDay] || [];
  const details = detailsByDay[selectedDay] || [];

  // 최소 2개의 빈 관광지를 유지
  const items =
    rawItems.length >= 2
      ? rawItems
      : [
          ...rawItems,
          ...Array(2 - rawItems.length).fill({
            value: "",
            contentId: null,
            mapX: null,
            mapY: null,
          }),
        ];

  useEffect(() => {
    if (rawItems.length < 2) {
      setPlacesForDay(selectedDay, items);
    }
  }, [rawItems, selectedDay]);

  const openSearchModal = (index) => {
    setModalIndex(index);
  };

  const closeSearchModal = () => {
    setModalIndex(null);
  };

  const handlePlaceSelect = (place) => {
    if (!place.title) return;

    const updated = [...items];
    updated[modalIndex] = {
      value: place.title,
      contentId: place.contentId,
      mapX: place.mapX,
      mapY: place.mapY,
    };

    setPlacesForDay(
      selectedDay,
      updated.filter((item) => item.value || item.contentId !== null)
    );

    closeSearchModal();
  };

  const handleAdd = () => {
    setPlacesForDay(selectedDay, [
      ...items,
      { value: "", contentId: null, mapX: null, mapY: null },
    ]);
  };

  const handleDelete = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setPlacesForDay(selectedDay, updated);
  };

  const handleDragEnd = (result) => {
  if (!result.destination) return;

  const reorderedPlaces = [...items];
  const [movedPlace] = reorderedPlaces.splice(result.source.index, 1);
  reorderedPlaces.splice(result.destination.index, 0, movedPlace);
  setPlacesForDay(selectedDay, reorderedPlaces);

  // 상세 정보도 같이 이동
  const reorderedDetails = [...details];
  const [movedDetail] = reorderedDetails.splice(result.source.index, 1);
  reorderedDetails.splice(result.destination.index, 0, movedDetail);
  setDetailsForDay(selectedDay, reorderedDetails);
};

  return (
    <div className={styles.wrapper}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="scheduleList">
          {(provided) => (
            <div
              className={styles.container}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {items.map((item, index) => {
                const keyId =
                  item.contentId !== null
                    ? String(item.contentId)
                    : `fallback-${index}`;

                return (
                  <Draggable key={keyId} draggableId={keyId} index={index}>
                    {(provided) => (
                      <div
                        className={styles.schedule}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <span className={styles.number}>no.{index + 1}</span>
                        <input
                          className={styles.input}
                          placeholder="관광지 이름을 입력하세요"
                          value={item.value}
                          readOnly
                          onClick={() => openSearchModal(index)}
                        />
                        <FiTrash2
                          className={styles.icon}
                          onClick={() => handleDelete(index)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button className={styles.add} onClick={handleAdd}>
        +
      </button>

      {modalIndex !== null && (
        <SearchModal onClose={closeSearchModal} onSelect={handlePlaceSelect} />
      )}
    </div>
  );
}
