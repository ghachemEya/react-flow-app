import { ReactSortable } from "react-sortablejs";
import React, { FC, useState } from "react";

interface ItemType {
    id: number;
    name: string;
  }
  
  export const Sortable: FC = () => {
    const [state, setState] = useState([
      { id: 1, name: "shrek" },
      { id: 2, name: "fiona" },
    ]);
  
    return (
      <ReactSortable list={state} setList={setState}>
        {state.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </ReactSortable>
    );
  };