import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BotsTableSkeletonLoader = () => {
  return (
    <div className="border-t border-[#E7E7E7] pt-2.5">
      <Table>
        <TableHeader className="bg-[#EEEEFD]">
          <TableRow>
            {Array(7).fill(0).map((_, index) => (
              <TableHead className="text-dark p-4 text-base" key={index}>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(10).fill(0).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array(7).fill(0).map((_, cellIndex) => (
                <TableCell className="p-4" key={cellIndex}>
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BotsTableSkeletonLoader;