import React from "react";
import MenuPosition from "../menu-position/menu-position.component";

const MenuList = (props) => {
  return (
    <div className="menu-list">
      {props.items.map((item) => (
        <MenuPosition key={item.id} position={item} />
      ))}
    </div>
  );
};

export default MenuList;
