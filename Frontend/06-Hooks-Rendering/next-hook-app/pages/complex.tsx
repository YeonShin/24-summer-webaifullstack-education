import Child1 from "@/components/child1";
import Child2 from "@/components/child2";
import Child31 from "@/components/child3-1";
import Child32 from "@/components/child3-2";
import Child4 from "@/components/child4";
import Child5 from "@/components/child5";

const Complex = () => {
    return (
        <div>
            <h1 className="bg-red-950 h-[300px]">Complex Component</h1>
            <Child1>
                <Child2>
                    <Child31>
                        <Child4>
                            <Child5>
                                
                            </Child5>
                        </Child4>
                    </Child31>
                    <Child32></Child32>
                </Child2>
            </Child1>
        </div>
    );
}

export default Complex;