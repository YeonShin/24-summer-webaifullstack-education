import { IMessage, ISendMessage, UserType } from "@/interface/message";
import { useState } from "react";

const TranslateBot = () => {
  const [message, setMessage] = useState<ISendMessage>({
    role: "",
    message: "",
  });

  const [messageList, setMessageList] = useState<IMessage[]>([]);

  const messageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userMessage: IMessage = {
      user_type: UserType.USER,
      message: message.message,
      send_date: new Date(),
    };

    // 백엔드로 사용자 입력메시지를 전송하기전에 사용자 메시지를 메시지목록에 추가하여
    // 화면에 사용자 입력 정보를 출력한다. 왜? 여기서? 현재 WebSocket기반 실시간 통신이 아니기 때문
    setMessageList((prev) => [...prev, userMessage]);

    const response = await fetch("/api/bot/translatebot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (response.status === 200) {
      const result = await response.json();
      setMessageList((prev) => [...prev, result.data]);
      setMessage({ role: "", message: "" });
    }
  };

  return (
    <div className="m-4">
      SimpleBot
      <form className="flex mt-4" onSubmit={messageSubmit}>
        <div>
          <input
            type="text"
            name="role"
            value={message.role}
            onChange={(e) => setMessage({ ...message, role: e.target.value })}
            placeholder="챗봇의 역할을 지정해주세요"
            className="block rounded-md mb-4 w-[500px] border-0 py-1 pl-2 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400"
          />
          <input
            type="text"
            name="message"
            value={message.message}
            onChange={(e) =>
              setMessage({ ...message, message: e.target.value })
            }
            placeholder="챗봇에게 전달할 명령을 작성해주세요"
            className="block rounded-md w-[500px] border-0 py-1 pl-2 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 ml-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          전송
        </button>
      </form>
      {/* 메시지 출력 표시영역 */}
      <div className="mt-4">
        <ul>
          {messageList.map((msg, index) => (
            <li key={index}>
              {msg.user_type}: {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TranslateBot;
