import "./App.css";
import Search from "./components/Search";
import List from "./components/List";
import { useState, useEffect } from "react";
import usePersistanceState from "./hooks/useSemiPersistance";
import InputWithLabel from "./components/InputWithLabel";
import { useReducer } from "react/cjs/react.development";

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
  /*  Promise.resolve({data:intItems}); here we cant see async function in action */
  //new Promise((res, rej) => setTimeout(() => res({ data: intItems }), 3000));  //cant see error ..so to apply rej we removing it
  new Promise((res, rej) => setTimeout(() => res({ data: intItems }), 3000));

const storiesReducer = (state, action) => {
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
        data: state.data.filter((i) => action.payload.objectId !== i.objectId)
      };
  }
};

function App() {
  const [search, setSearch] = usePersistanceState("customerSearchTerm", "");

  //const [items, setitems] = useState(/* intItems */ []);   removed this bcz of use reducer
  //using use reducer
  const [items, dispatchItems] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  }); //in second item instead of empty array [], send empty array with isloading and iserror initiaklization

  /* const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false); */ // removed this bcz of usereducer

  //for async function
  useEffect(() => {
    //setIsLoading(true); removed this bcz of use reducer... instead
    dispatchItems({ type: "SET_FETCH_INIT" });
    getAsyncData()
      .then((result) => {
        //setitems(result.data); removed this bcz of use reducer
        dispatchItems({ type: "SET_FETCH_SUCCESS", payload: result.data });

        //setIsLoading(false); u need to change it every where so write it separately in finally
      })
      .catch(() => {
        //setIsError(true);  removed this bcz of use reducer..instead
        dispatchItems({ type: "SET_FETCH_FAILURE" });
        //setIsLoading(false); to remove loading... after 3sec. but also now its here in finally
      });
    //.finally(() =>setIsLoading(false)); removed this bcz of use reducer
  }, []);

  const onHandlerDeleteItem = (item) => {
    /* const newList = items.data.filter((i) => item.objectId !== i.objectId); */ //.data bcz after use reducer introduced they are not array instead its obj.
    //setitems(newList);     removed this bcz of use reducer

    dispatchItems({ type: "REMOVE_STORY ", payload: item });
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const FilteredStories = items.data.filter((story) =>
    story.title.toLowerCase().includes(search.toLowerCase())
  ); //.data bcz after use reducer introduced they are not array instead its obj.

  //if uwnat to print error separately
  /* if(isLoading)
  return <h1>Loading...</h1>

  if(isError)
  return <h2>Error : Something Wrong</h2> */

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
//in above jsx we wrote items.isloading because of usereducer() instead of only isloading
export default App;
