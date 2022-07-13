import React, { useState, useEffect, useMemo } from "react";
import MyImage from "../Images/Vector.png";
import image from "../download.jpg";
import "./design.scss";
const Design = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState([]);
  const [number, setNumber] = useState();
  const [filtered, setFiltered] = useState();
  const [from, setFrom] = useState("0");
  const [to, setTo] = useState("10000");
  const [model, setModel] = useState([]);
  const [selectedMan, setSelectedMan] = useState(10);
  const [category, setCategory] = useState([]);
  const [categoryValue, setCategoryValue] = useState(1);
  const [price, setPrice] = useState([]);
  const [period, setPeriod] = useState([
    "1h",
    "2h",
    "3h",
    "1d",
    "2d",
    "3d",
    "1w",
    "2w",
    "3w",
  ]);
  const [creator, setCreator] = useState([]);
  const [sortOrder, setSortOrder] = useState([1, 3, 4, 5, 6]);
  const [periodValue, setPeriodValue] = useState("1h");
  const [sortValue, setSortValue] = useState(1);
  const [rent, setRent] = useState(0);
  const [selectedModel, setSelectedModel] = useState();

  const getData = () => {
    const request = { method: "GET" };
    let params = new URLSearchParams({
      Mans: `${selectedMan}.${selectedModel}`,
      Cats: categoryValue,
      Period: periodValue,
      ForRent: rent,
      SortOrder: sortValue,
    });
    fetch(`https://api2.myauto.ge/ka/products?${params.toString()}`, request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.items);
        setNumber(data.data.meta.total);
        setData(data.data.items);
        const filter = () => {
          let filtered = data.data.items?.filter((el) => {
            if (el.price >= from && el.price <= to) {
              return el;
            }
          });
          setFiltered(filtered);

          return filtered;
        };
        filter();
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
  };
  useEffect(() => {
    setFiltered(getData());
  }, []);
  // useEffect(() => {}, [
  //   selectedMan,
  //   selectedModel,
  //   categoryValue,
  //   sortValue,
  //   periodValue,
  //   rent,
  // ]);

  useEffect(() => {
    const request = { method: "GET" };
    let params = {};
    fetch(`http://static.my.ge/myauto/js/mans.json`, request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCreator(data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    const request = { method: "GET" };
    let params = new URLSearchParams({ man_id: selectedMan });
    fetch(
      `https://api2.myauto.ge/ka/getManModels?${params.toString()}`,
      request
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setModel(data.data);
          console.log(data);
        }
      })
      .catch((error) => console.log(error));
  }, [selectedMan]);
  useEffect(() => {
    const request = { method: "GET" };
    let params = {};
    fetch(`https://api2.myauto.ge/ka/cats/get`, request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategory(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="design-container">
      {/* nav bar start */}
      <div className="nav">
        <div className="nav-bar">
          <img src={MyImage} alt="" />
          <p>myauto </p>
          <p>.ge</p>
        </div>
      </div>
      {/* nav bar End */}
      <form action="" onSubmit={handleSubmit}>
        <div className="show">
          <div className="filter-Bar-First">
            <div className="filter-itSelf">
              <div className="inputs">
                <div>
                  <p>გარიგების ტიპი</p>

                  <select
                    onChange={(e) => setRent(e.target.value)}
                    name="cars"
                    id="cars"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                  </select>
                </div>
                <div>
                  <p>მწარმოებელი</p>

                  <select
                    onChange={(e) => setSelectedMan(e.target.value)}
                    name="cars"
                    id="cars"
                  >
                    {creator?.map((el) => {
                      return <option value={el.man_id}>{el.man_name}</option>;
                    })}
                  </select>
                </div>
                <div>
                  <p>კატეგორია</p>

                  <select
                    onChange={(e) => setCategoryValue(e.target.value)}
                    name="cars"
                    id="cars"
                  >
                    {category?.map((el) => {
                      return <option value={el.category_id}>{el.title}</option>;
                    })}
                  </select>
                </div>
                <div className="border"></div>
              </div>
              <div className="money-filter">
                <p>ფასი</p>
                <div>
                  <input
                    type="text"
                    placeholder="დან"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                  <span>-</span>
                  <input
                    type="text"
                    placeholder="მდე"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="filter-Btn">
              <button type="submit">ძებნა</button>
            </div>
          </div>
          <div className="cardsWrapper">
            <div className="innerCardFilter">
              <div className="found" style={{ marginRight: "5px" }}>
                {number}
              </div>
              <div className="filters">
                <select
                  style={{ marginRight: "10px" }}
                  onChange={(e) => setPeriodValue(e.target.value)}
                  name="cars"
                  id="cars"
                >
                  <option value="" disabled="disabled" selected="selected">
                    პერიოდი
                  </option>

                  {period?.map((el) => {
                    return <option value={el}>{el}</option>;
                  })}
                </select>
                <select
                  onChange={(e) => setSortValue(e.target.value)}
                  name="cars"
                  id="cars"
                >
                  {sortOrder?.map((el) => {
                    return <option value={el}>{el}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="cardCOntainer">
              {filtered?.map((el) => {
                return (
                  <div className="form">
                    <div className="card">
                      <img src={image} alt="" />
                      <div className="text">
                        <div className="title">
                          <h4>{el.order_date}</h4>
                        </div>
                        <div className="parametrs">
                          <div>
                            <p>{el.engine_volume} კმ</p>
                            <p>ავტომატიკა</p>
                          </div>
                          <div>
                            <p>{el.car_run_km}</p>
                            <p>მარჯვენა</p>
                          </div>
                        </div>
                      </div>
                      <div className="price">{el.price}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Design;
