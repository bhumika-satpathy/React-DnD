import React from 'react';
import {Draggable, Droppable } from "react-beautiful-dnd";

const columnDesign = (columns,id,type) =>{
    return(
      <div className="columnDesign">
          <h2>{columns[id][1].name}</h2>
          <Droppable droppableId={columns[id][0]} key={columns[id][0]}>
          {(provided, snapshot) => {
            return (
              <div {...provided.droppableProps} ref={provided.innerRef} className={type}>  
                {columns[id][1].items.map((item, index) => {
                  return (
                    <Draggable draggableId={item.componentID} index={index}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: "none",
                              padding: 16,
                              margin: "0 0 8px 0",
                              minHeight: "50px",
                              backgroundColor: snapshot.isDragging
                                ? "#263B4A"
                                : "#456C86",
                              color: "white",
                              ...provided.draggableProps.style
                            }}
                          >
                            {item.componentName}
                          </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
      </div>
    )
  }

  export default columnDesign;