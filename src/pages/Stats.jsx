import SideBar from "../components/SideBar";
import { Stater } from "../components/Stater";

function Stats (){

    return(
        <div className="flex min-h-screen">
            <SideBar/>
            <main className="flex-1 flex justify-start items-center pt-0 p-50">
                <Stater/>
            </main>
        </div>
        
    );
}

export default Stats;