import logo from "./logo.svg";
import "./App.css";
import { Input } from "antd";
import {
  SlackOutlined,
  SmileFilled,
  RedditCircleFilled,
} from "@ant-design/icons";

import { useEffect, useState, useRef } from "react";

let id = 0;

function App() {
  const [messageList, setMessageList] = useState([
    {
      id: "tips",
      type: "answer",
      content: `您好，我是您的专属客服小助手，很高兴为您服务！我能帮到你什么？`,
    },
  ]);
  const [value, setValue] = useState("");

  const containerRef = useRef(null);

  const handleSearch = (value) => {
    if (value === "") {
      return;
    }
    setMessageList([
      ...messageList,
      {
        id: id++,
        type: "question",
        content: value,
      },
      {
        id: id++,
        type: "answer",
        content: `您好，我是您的专属客服小助手，很高兴为您服务！我能帮到你什么？`,
      },
    ]);
    setValue("");
  };

  useEffect(() => {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [messageList]);

  return (
    <div className="h-screen bg-slate-200">
      <div className="flex flex-col  justify-center max-w-[1200px] bg-slate-200 w-full h-full m-auto px-10 overflow-hidden">
        <div
          className="overflow-auto h-4/5 pb-5"
          ref={containerRef}
        >
          {messageList.map((item, index) => {
            const { id, type, content } = item;
            return (
              <div
                key={id}
                className="flex items-start text-slate-950 text-lg mb-5 px-4"
              >
                {type === "answer" ? (
                  <RedditCircleFilled className="mr-6 text-2xl text-red-800 pt-1" />
                ) : (
                  <SmileFilled className="mr-6 text-2xl text-yellow-700 pt-1" />
                )}
                <p>{content}</p>
              </div>
            );
          })}
        </div>

        <div className="w-full">
          <Input.Search
            placeholder="请输入您的问题"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            enterButton="Search"
            onSearch={handleSearch}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
