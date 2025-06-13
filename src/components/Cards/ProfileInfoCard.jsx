import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";

export function ProfileInfoCard({ email }) {
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Your Profile
        </CardTitle>
      </CardHeader>

      <CardContent className="text-center text-gray-700 text-lg">
        <p>Email: <span className="font-semibold">{email}</span></p>
      </CardContent>
    </Card>
  );
}
