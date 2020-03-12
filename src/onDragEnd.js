// import React,{useState} from 'react';
import uuid from 'uuid/v4';
// import FillComponentDetails from './FillComponentDetails'

const setColumnFunc = (source,destination,sourceColumn,destColumn,sourceItems,destItems) =>{
    return [
      [
       source.droppableId,
       {
         name:sourceColumn[0][1].name,
         items:sourceItems
       }
      ],
  
      [
       destination.droppableId,
       {
         name:destColumn[0][1].name,
         items:destItems
       }
      ]
   ]
  }

const onDragEnd = (result, columns, setColumns) => {
    // console.log('on drag end',columns);
    let x;
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.filter((column)=>column[0]===source.droppableId);
      const destColumn = columns.filter((column)=>column[0]===destination.droppableId);
      const sourceItems = [...sourceColumn[0][1].items];
      const destItems = [...destColumn[0][1].items];
      const [removed]=(sourceItems.splice(source.index, 1));
      // console.log('Removeddddddddd',removed)
  
      if(sourceColumn[0][1].name==='Area'){
        destItems.splice(destination.index, 0);
        sourceItems.splice(source.index,0);
      }
      else{
        destItems.splice(destination.index, 0, removed);
        sourceItems.splice(source.index,0,{
          ...removed,
          componentID:uuid()
        });
      }
  
      if(sourceColumn[0][1].name==='Components'){
        setColumns(setColumnFunc(source,destination,sourceColumn,destColumn,sourceItems,destItems));
      }else{
        setColumns(setColumnFunc(destination,source,destColumn,sourceColumn,destItems,sourceItems));
      }
      x=removed;
    } else {
      console.log('resultttttttttttt',result)
      const column = columns.filter((column)=>column[0]===source.droppableId);
      const copiedItems = [...column[0][1].items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      // setColumns([
      //   source.droppableId,
      //   {
      //     name:column[0][1].name,
      //     items:copiedItems
      //   }
      //  ]);
      //  console.log('sourceeeeeeee 2',columns)
      x=removed
    }
    return x; 
  };

  export default onDragEnd;