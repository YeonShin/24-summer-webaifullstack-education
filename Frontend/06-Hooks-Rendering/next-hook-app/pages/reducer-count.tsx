import { CountActionType } from "@/interface/reducer";
import { countReducer } from "@/utils/reducers";
import { useReducer } from "react";

const ReducerCount = () => {
    const [count, dispatchCount] = useReducer(countReducer, 0);
    return (
        <div className="text-center">
            Count Page 
            <div className="mt-4 text-lg">
                <h1>{count}</h1>
            </div>

            {/* 카운트 값 증감/초기화 버튼영역 */}
            <div className="mt-6">
                <button onClick={()=>dispatchCount({type: CountActionType.PLUS})} className="ml-3 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">증가</button>
                <button onClick={()=>dispatchCount({type: CountActionType.MINUS})} className="ml-3 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">감소</button>
                <button onClick={()=>dispatchCount({type: CountActionType.INIT})} className="ml-3 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">초기화</button>
            </div>
        </div>
    );
}

export default ReducerCount;