import { MyCardPswd } from "@/components/Cards/MyCardPswd";
import { ProfileInfoCard } from "@/components/Cards/ProfileInfoCard";
import { DeleteAccountCard } from "@/components/Cards/DeleteAccountCard";
import { deleteAccount } from "@/services/AdminService";
import { errorToast } from "@/components/ui/customToasts";
import { useNavigate } from "react-router-dom";

function Settings() {

  const navigate = useNavigate();
  const userEmail = localStorage.getItem('ses-email')

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount()
      logOut()
      console.log('Deleting')
    } catch (error) {
      errorToast(error.message)
    }
  }

  function logOut() {
    localStorage.clear();
    navigate('/');
  }
  
  return (
    <div className="flex flex-col flex-1 overflow-hidden px-8 py-6">
      {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <hr className="border-gray-300 mt-2" />

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
