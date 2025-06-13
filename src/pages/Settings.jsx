import { MyCardPswd } from "@/components/Cards/MyCardPswd";
import { ProfileInfoCard } from "@/components/Cards/ProfileInfoCard";
import { DeleteAccountCard } from "@/components/Cards/DeleteAccountCard";
import { deleteAccount } from "@/services/AdminService";
import { errorToast } from "@/components/ui/customToasts";
import { useNavigate } from "react-router-dom";

function Settings() {

  const navigate = useNavigate();
  const userEmail = localStorage.getItem('ses-email')

  const handleDeleteAccount = () => {
    try {
      // deleteAccount()
      // logOut()
      console.log('Deleting')
    } catch (error) {
      errorToast(error)
    }
  }

  function logout() {
    localStorage.clear();
    navigate('/');
  }
  
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="shrink-0 px-4 sm:px-10 py-4">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <hr className="border-gray-300 mt-2" />
      </div>

      {/* Scrollable content if needed, but constrained */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-10 py-4 space-y-6">
        <ProfileInfoCard email={userEmail} />
        <MyCardPswd />
        <DeleteAccountCard onDelete={handleDeleteAccount} />
      </div>
    </div>

  );
}

export default Settings;
