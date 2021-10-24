import Items from "./Items";
import styles from "./searchstyles.module.css"

const List = ({stories,handlerDelete}) => {
  

  return <div>
      <ul>
          
      {/* <Items stories={props.stories} handlerDelete={props.onHandlerDeleteItem}></Items> */}
      {stories.map(function (item) {
        return (
          <>
          <ol>
            <li>
              <span className={styles.container}>
                <a href={item.url}> {item.title}</a>
              </span>
              <span className={styles.container}> {item.author}</span>
              <span className={styles.container} ><button onClick={()=>handlerDelete(item)}>Delete</button></span>
            </li></ol>
          </>
        );
      })}
      
      </ul>
  </div>;
};
export default List;
