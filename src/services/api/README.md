# API Services Documentation

## Assistant API

The `myassistance.ts` service provides functionality to fetch and manage assistant data.

### Endpoints

#### GetAssistants()

- **URL**: `${BASE_URL}/assistants/`
- **Method**: GET
- **Description**: Fetches all assistant data and maps to table format
- **Returns**: `IAssistant[]`
- **Error Handling**: Returns empty array on error

#### GetAssistant(id: number)

- **URL**: `${BASE_URL}/assistants/${id}`
- **Method**: GET
- **Description**: Fetches a specific assistant by ID and maps to table format
- **Returns**: `IAssistant`

### Data Structure

```typescript
interface IAssistant {
  id: number;
  agentsName: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  availability: "Available" | "Offline" | "Busy";
  issues: string;
  industry?: string;
  persona?: string;
  tone?: string;
  created_at: string;
  updated_at: string;
}
```

### Data Mapping

The service maps assistant data from the API to the table format:

```typescript
const mapAssistantToTable = (assistant: IAssistantModel): IAssistant => {
  return {
    id: assistant.id,
    agentsName: assistant.name,
    displayName:
      assistant.business_name || assistant.name || `Assistant ${assistant.id}`,
    email: `assistant-${assistant.id}@example.com`, // Placeholder email
    phoneNumber: "+2348133333333", // Placeholder phone
    availability: "Available", // Default availability
    issues: "No issues", // Default issues
    industry: assistant.industry || "N/A",
    persona: assistant.persona || "N/A",
    tone: assistant.tone || "N/A",
    created_at: assistant.created_at,
    updated_at: assistant.updated_at,
  };
};
```

### Usage in Components

```typescript
import { GetAssistants } from "@/services/api/myassistance";
import { useQuery } from "@tanstack/react-query";

const {
  data: assistantsData = [],
  isLoading,
  error,
} = useQuery({
  queryFn: GetAssistants,
  queryKey: ["assistants"],
});
```

### Integration with LiveAgentsTable

The LiveAgentsTable component has been updated to support:

- Loading states
- Error handling
- Real-time data from the assistant API
- Analytics cards showing counts based on availability status
- **Pagination**: Navigate through pages with configurable page sizes (10, 20, 30, 40, 50)
- **Sorting**: Click column headers to sort by Bot, Display Name, Issues, Email, Phone Number, or Availability
- **Actions**: View button with tooltip to navigate to assistant details
- **Default Sort**: Automatically sorts by Bot name (A-Z)
