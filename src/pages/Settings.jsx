import { MyCardAdmin } from "@/components/Cards/MyCardAdmin";
import { MyCardPswd } from "@/components/Cards/MyCardPswd";
import { CreateAdminPopover, ChangeAdminPasswordPopover } from "@/components/popovers/adminPopovers";

function Settings() {
  return (

    <div className="flex-1 px-10 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-left"> Settings </h1>
      <hr className="border-gray-300 mb-4" />

      <div className="flex flex-wrap md:flex-nowrap w-full gap-4">
        <MyCardAdmin />
        <div className="hidden md:block w-px bg-gray-300" />
        <MyCardPswd />
      </div>


      {/* <ul className="space-y-4 text-lg text-gray-700 text-left">
          <CreateAdminPopover text="➤ Add Admin"/>
          <ChangeAdminPasswordPopover text="➤ Change My Password"/>
        </ul> */}
      
    </div>
  );
}

export default Settings;
