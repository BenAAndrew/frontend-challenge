import React from "react";

function Navigation(props: {
  setIndex: Function;
  index: number;
  totalItems: number;
}) {
  const previousEnabled = props.index > 0;
  const nextEnabled = props.index < props.totalItems - 1;

  return (
    <div className="inline-flex">
      <button
        disabled={!previousEnabled}
        onClick={() => previousEnabled && props.setIndex(props.index - 1)}
        className="disabled:bg-gray-300 hover:bg-blue-500 text-gray-800 font-semibold enabled:hover:text-white py-2 px-4 rounded-l"
      >
        Prev
      </button>
      <button
        disabled={!nextEnabled}
        onClick={() => nextEnabled && props.setIndex(props.index + 1)}
        className="disabled:bg-gray-300 hover:bg-blue-500 text-gray-800 font-semibold enabled:hover:text-white py-2 px-4 rounded-r"
      >
        Next
      </button>
    </div>
  );
}

export default Navigation;
