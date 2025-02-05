export default function TileComponent({ data, selected = [], onClick }) {
  return data && data.length ? (
    <div className="mt-3 flex flex-wrap items-center gap-1">
      {data.map((dataItem) => (
        <label
          onClick={() => onClick(dataItem)}
          key={dataItem.id}
          className={`cursor-pointer`}
        >
          <span
            className={`rounded-lg border-4 border-button px-6 py-2 font-bold ${
              selected &&
              selected.length &&
              selected.map((item) => item.id).indexOf(dataItem.id) !== -1
                ? "text-white bg-button "
                : "bg-black"
            }`}
          >
            {dataItem.label}
          </span>
        </label>
      ))}
    </div>
  ) : null;
}
