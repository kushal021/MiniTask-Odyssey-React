import React, { useEffect, useState } from "react";
import "./auto-complete.css";

const AutoComplete = () => {
  const [data, setData] = useState([]);
  const [offSet, setOffset] = useState(0);
  let lastScrollTop = 0;
  const handleScroll = (e) => {
    console.log(
      {
        st: e.target.scrollTop,
        oh: e.target.offsetHeight,
        sh: e.target.scrollHeight,
      },
      "all offsets==>",
      lastScrollTop
    );
    if (lastScrollTop >= e.target.scrollTop) {
      return;
    }

    if (e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight) {
      console.log("reached to the end==>", lastScrollTop, e.target.scrollTop);
      lastScrollTop = e.target.scrollTop;
      setOffset((prev) => prev + 1);
    }
  };

  const fetchData = async (offset) => {
    const res = await fetch(
      `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=5`
    );
    const response = await res.json();
    setData((prevData) => [...prevData, ...response]);
  };

  useEffect(() => {
    fetchData(offSet);
  }, [offSet]);
  console.log("data", data);
  return (
    <div>
      <h1>Autocomplete</h1>
      <div className="input-div">
        <input className="input" />
        <div className="list-view" onScroll={(e) => handleScroll(e)}>
          {data?.map((item, index) => (
            <div className="list-item" key={index}>
              <p> {item?.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoComplete;
