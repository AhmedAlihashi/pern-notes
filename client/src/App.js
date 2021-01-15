import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import { Label, Segment } from "semantic-ui-react";
import { Media, MediaContextProvider } from "./config/media";

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    onNotes();
  }, []);

  const onNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/notes");
      const jsonData = await response.json();

      setNotes(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/notes/${id}`, {
        method: "DELETE",
      }).then(() => setNotes(notes.filter((note) => note.note_id !== id)));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <MediaContextProvider>
      <Media at="mobile">
        <div className="App">
          <header>
            <h1 style={{ fontSize: "40px" }}>PostgreSQL Note Taker</h1>
          </header>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "95vw",
            }}
          >
            <Input />
            <Segment
              style={{
                backgroundColor: "brown",
                borderRadius: 15,
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                flexWrap: "wrap",
                overflowY: "auto",
              }}
            >
              {notes.map((i, k) => (
                <Segment
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    maxWidth: "24vw",
                    minWidth: "23vw",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    backgroundColor: "beige",
                    margin: "7px",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                  key={k}
                >
                  <Label
                    as="a"
                    attached="top left"
                    content={`#${i.note_id}`}
                    onClick={() => deleteTodo(i.note_id)}
                    color="black"
                  />

                  <p>{i.description}</p>

                  <Label
                    as="a"
                    attached="top right"
                    content="Delete"
                    onClick={() => deleteTodo(i.note_id)}
                    color="red"
                  />
                </Segment>
              ))}
            </Segment>
          </div>
        </div>
      </Media>
      <Media greaterThanOrEqual="tablet">
        <div className="App">
          <header>
            <h1 style={{ fontSize: "40px" }}>PostgreSQL Note Taker</h1>
          </header>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "95vw",
            }}
          >
            <Input />
            <Segment
              style={{
                backgroundColor: "brown",
                borderRadius: 15,
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                height: "75vh",
                width: "60%",
                flexWrap: "wrap",
                overflowY: "auto",
              }}
            >
              {notes.map((i, k) => (
                <Segment
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    maxWidth: "24vw",
                    minWidth: "15vw",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    backgroundColor: "beige",
                    margin: "7px",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                  key={k}
                >
                  <Label
                    as="a"
                    attached="top left"
                    content={`#${i.note_id}`}
                    onClick={() => deleteTodo(i.note_id)}
                    color="black"
                  />

                  <p>{i.description}</p>

                  <Label
                    as="a"
                    attached="top right"
                    content="Delete"
                    onClick={() => deleteTodo(i.note_id)}
                    color="red"
                  />
                </Segment>
              ))}
            </Segment>
          </div>
        </div>
      </Media>
    </MediaContextProvider>
  );
};

export default App;
