import SideBar from "../components/SideBar";
import LineGraph from "../components/LineGraph";
import { ComboBox } from "../components/ComboBox";

function Menu() {
    const frameworks = [
      {
        value: "Entrance",
        label: "Entrance",
      },
    ]
  return (
    <div className="flex">
        <SideBar />
        <div className="flex flex-col w-full h-screen justify-start items-center pt-0">
            <div className="flex items-center gap-x-4 mb-4">
                <h1 className="font-semibold text-lg">Entry attempts on</h1>
                <ComboBox options={frameworks} text="Select Door..."/>
                <h1 className="font-semibold text-lg">door today</h1>
            </div>
            <LineGraph entryType="Succesful Entries" />
            <LineGraph entryType="Failed Entries"/>
        </div>
    </div>
  );
}

export default Menu;