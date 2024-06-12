import { useState } from "react";

export default function TodoCard() {
  return (
    <li>
      <input type="checkbox" id="check-box"></input> Hello{" "}
      <button className="delete-task">
        <img src="/icon-cross.svg" />
      </button>
    </li>
  );
}
