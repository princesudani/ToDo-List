import React, { useEffect, useState } from "react";
import "./App.css";

const getitem = () => {
  let mylist = localStorage.getItem("list");

  if (mylist) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const App = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState(getitem());
  const [toggle, setToggle] = useState(true);
  const [edits, setEdits] = useState();

  const Item = () => {
    if (!input) {
      alert("Enter Item..");
    } else if (input && !toggle) {
      setItems(
        items.map((elemet) => {
          if (elemet.id === edits) {
            return { ...elemet, name: input };
          }
          return elemet;
        })
      );
      setToggle(true);
      setInput("");
      setEdits(null);
    } else {
      const allData = { id: new Date().getTime().toString(), name: input };
      setItems([...items, allData]);
      setInput("");
    }
  };

  const edititem = (id) => {
    const updateditem = items.find((elemet) => {
      return elemet.id === id;
    });

    // setItems(updateditem);
    console.log(updateditem);
    setToggle(false);
    setInput(updateditem.name);
    setEdits(id);
  };

  const deleteitem = (index) => {
    const deleteditem = items.filter((elemet) => {
      return index !== elemet.id;
    });

    setItems(deleteditem);
  };

  const remove = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="container">
        <h1 className="title">To Do List</h1>
        <div className="menu">
          <input
            className="box"
            type="text"
            placeholder="Enter Item.."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          &nbsp;
          {toggle ? (
            <button
              className="btnadd"
              type="button"
              title="Add item"
              onClick={Item}
            >
              Add
            </button>
          ) : (
            <button
              className="btnedit"
              type="button"
              title="Edit item"
              onClick={Item}
            >
              Edit
            </button>
          )}
          <button
            className="btnclear"
            type="button"
            title="Clear All"
            onClick={remove}
          >
            Clear
          </button>
        </div>
        {items.map((elemet) => {
          return (
            <div className="newItem" key={elemet.id}>
              <h4>{elemet.name}</h4> &nbsp;
              <button
                className="btnedit"
                type="btn"
                title="Edit item"
                onClick={() => edititem(elemet.id)}
              >
                Edit
              </button>
              &nbsp;
              <button
                className="btndelete"
                type="btn"
                title="Delete item"
                onClick={() => deleteitem(elemet.id)}
              >
                Delete
              </button>{" "}
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
