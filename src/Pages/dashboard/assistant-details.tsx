import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetAssistant } from "@/services/api/myassistance";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

const AssistantDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: assistant,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["assistant", id],
    queryFn: () => GetAssistant(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading assistant details...</span>
      </div>
    );
  }

  if (error || !assistant) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-red-600 mb-4">Error loading assistant details</div>
        <Button onClick={() => navigate("/dashboard/live-agent")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Live Agents
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-5 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/live-agent")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h2 className="font-bold text-2xl">{assistant.agentsName}</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" className="text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Basic Information</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Display Name
              </label>
              <p className="text-lg">{assistant.displayName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-lg">{assistant.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Phone Number
              </label>
              <p className="text-lg">{assistant.phoneNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Availability
              </label>
              <p className="text-lg">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    assistant.availability === "Available"
                      ? "bg-green-100 text-green-800"
                      : assistant.availability === "Busy"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      assistant.availability === "Available"
                        ? "bg-green-500"
                        : assistant.availability === "Busy"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                  {assistant.availability}
                </span>
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Additional Details</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Issues
              </label>
              <p className="text-lg">{assistant.issues}</p>
            </div>
            {assistant.industry && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Industry
                </label>
                <p className="text-lg">{assistant.industry}</p>
              </div>
            )}
            {assistant.persona && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Persona
                </label>
                <p className="text-lg">{assistant.persona}</p>
              </div>
            )}
            {assistant.tone && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Tone
                </label>
                <p className="text-lg">{assistant.tone}</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Timestamps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">
              Created At
            </label>
            <p className="text-lg">
              {assistant.created_at
                ? new Date(assistant.created_at).toLocaleString()
                : "N/A"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Updated At
            </label>
            <p className="text-lg">
              {assistant.updated_at
                ? new Date(assistant.updated_at).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AssistantDetailsPage;
