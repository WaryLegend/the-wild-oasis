import Select from "./Select";
import { useSearchParams } from "react-router-dom";

/* eslint-disable react/prop-types */
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      value={sortBy} // set Current selected to active
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
