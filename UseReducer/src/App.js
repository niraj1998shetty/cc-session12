import "./App.css";
import Search from "./components/Search";
import List from "./components/List";
import { useState, useEffect } from "react";
import usePersistanceState from "./hooks/useSemiPersistance";
import InputWithLabel from "./components/InputWithLabel";
import { useReducer } from "react";

const intItems = [
  {
    title: "react",
    url: "http://google.com",
    author: "guribail john",
    no_comments: 4,
    points: 4,
    objectId: 0,
    createdAt: new Date(Date.UTC(2021, 1, 2, 3, 4, 5)),
  },
  {
    title: "Redux",
    url: "http://youtube.com",
    author: "kudepet john",
    no_comments: 3,
    points: 7,
    objectId: 1,
    createdAt: new Date(Date.UTC(2021, 1, 2, 3, 4, 5)),
  },
  {
    title: "react",
    url: "http://google.com",
    author: "guribail john",
    no_comments: 4,
    points: 4,
    objectId: 2,
    createdAt: new Date(Date.UTC(2021, 1, 2, 3, 4, 5)),
  },
  {
    title: "react",
    url: "http://google.com",
    author: "guribail john",
    no_comments: 4,
    points: 4,
    objectId: 3,
    createdAt: new Date(Date.UTC(2021, 1, 2, 3, 4, 5)),
  },
  {
    title: "react",
    url: "http://google.com",
    author: "guribail john",
    no_comments: 4,
    points: 4,
    objectId: 4,
    createdAt: new Date(Date.UTC(2021, 1, 2, 3, 4, 5)),
  },
];

const getAsyncData = () =>
  new Promise((res, rej) => setTimeout(() => res({ data: intItems }), 3000));

const storiesReducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "SET_FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "SET_FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      };
    case "SET_FETCH_FAILURE":
      return { ...state, data: [], isLoading: false, isError: true };

    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter((i) => action.payload.objectId !== i.objectId),
      };
    default:
      throw new Error();
  }
};

function App() {
  const [search, setSearch] = usePersistanceState("customerSearchTerm", "");

  const [items, dispatchItems] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  useEffect(() => {
    dispatchItems({ type: "SET_FETCH_INIT" });
    getAsyncData()
      .then((result) => {
        dispatchItems({ type: "SET_FETCH_SUCCESS", payload: result.data });
      })
      .catch(() => {
        dispatchItems({ type: "SET_FETCH_FAILURE" });
      });
  }, []);

  const onHandlerDeleteItem = (item) => {
    dispatchItems({ type: "REMOVE_STORY ", payload: item });
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const FilteredStories = items.data.filter((story) =>
    story.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>My stories</h1>
      <hr />
      <InputWithLabel
        id="search"
        value={search}
        onInputChange={searchHandler}
        type="text"
      >
        Search For Stories
      </InputWithLabel>
      <h4>searching for : {search}</h4>
      {items.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List stories={FilteredStories} handlerDelete={onHandlerDeleteItem} />
      )}
      {items.isError && "Error : Something Wrong"}
    </div>
  );
}

export default App;
