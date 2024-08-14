import { useState } from "react";

const Count = () => {
    const [count, setCount] = useState<number>(0);

    const plusCount = () => {
        setCount(count + 1);
    }

    const minusCount = () => {
        setCount(count - 1);
    }
    const initCount = () => {
        setCount(0);
    }
    return (
        <div className="text-center">
            Count Page 
            <div className="mt-4 text-lg">
                <h1>{count}</h1>
            </div>

            {/* 카운트 값 증감/초기화 버튼영역 */}
            <div className="mt-6">
                <button onClick={plusCount} className="ml-3 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">증가</button>
                <button onClick={minusCount} className="ml-3 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">감소</button>
                <button onClick={initCount} className="ml-3 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">초기화</button>
            </div>
        </div>
    );
}

export default Count;