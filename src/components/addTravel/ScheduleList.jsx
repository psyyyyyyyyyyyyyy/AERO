import { useState, useEffect } from "react";
import styles from "./scheduleList.module.css";
import { FiTrash2 } from "react-icons/fi";
import { useScheduleStore } from "../../stores/useScheduleStore";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";

export default function ScheduleList() {
  const [items, setItems] = useState([
    { value: "" },
    { value: "" },
  ]);
  const setPlaces = useScheduleStore((state) => state.setPlaces);

  useEffect(() => {
    const names = items.map((item) => item.value).filter(Boolean);
    setPlaces(names);
  }, [items]);

  const handleAdd = () => {
    setItems([...items, { value: "" }]);
  };

  const handleChange = (index, value) => {
    const updated = [...items];
    updated[index].value = value;
    setItems(updated);
  };

  const handleDelete = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = [...items];
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);
    setItems(reordered);
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
              {items.map((item, index) => (
                <Draggable
                  key={index}
                  draggableId={`item-${index}`}
                  index={index}
                >
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
                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                      <FiTrash2
                        className={styles.icon}
                        onClick={() => handleDelete(index)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button className={styles.add} onClick={handleAdd}>
        +
      </button>
    </div>
  );
}
