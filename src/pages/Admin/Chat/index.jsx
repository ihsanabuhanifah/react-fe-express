import React, { useState } from "react";
import {
  Segment,
  Input,
  Button,
  Grid,
  Form,
  Divider,
  Message,
} from "semantic-ui-react";
import { socket } from "../../../App";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [messagelist, setMessageList] = useState([]);
  const joinChat = async () => {
    const room = 1234;

    await socket.emit("join_room", room);
  };

  const sendMessage = async () => {
    if (message !== "") {
      console.log(message);
      const messageData = {
        room: 1234,
        author: username,
        message: message,
        time: new Date(Date.now()),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
    }
  };

  React.useEffect(() => {
    socket.on("received_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <React.Fragment>
      <Segment>
        <Grid.Row></Grid.Row>
        <Grid.Column colums={2} divided>
          <Segment>
            {messagelist.map((message) => (
              <React.Fragment>
                <Message
                  icon="inbox"
                  header={message.author}
                  content={message.message}
                />
              </React.Fragment>
            ))}
          </Segment>
          <Input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            fluid
            focus
            placeholder="username"
          />
          <Button
            disabled={username === "" && true}
            content="join"
            onClick={joinChat}
          />
          <Form>
            <Grid>
              <Grid.Row>
                <Grid.Column width={14}>
                  <Input
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    fluid
                    focus
                    placeholder="Ketik ..."
                  />
                </Grid.Column>
                <Grid.Column width={2}>
                  <Button
                    content="kirim"
                    onClick={() => {
                      sendMessage();
                    }}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Grid.Column>
      </Segment>
    </React.Fragment>
  );
}
