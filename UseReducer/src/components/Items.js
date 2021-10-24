import styles from "./searchstyles.module.css"

const Items = ({stories,handlerDelete}) => {
  
  return (
    <>
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
    </>
  );
};
export default Items;
