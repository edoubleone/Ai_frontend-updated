import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// import { useToast } from '@/hooks/use-toast'
import { ChevronLeft, ChevronRight, Download, EllipsisVertical, Filter, Search, TableProperties } from 'lucide-react'
import { useState } from 'react'


interface Transaction {
    id: string
    invoiceNo: number
    dueDate: string
    amount: string
    paymentMethod: "Debit Card" | "Transfer"
    subscriptionType: string
    status: "Pending" | "Paid"
}

interface BotsContentProps {
  onEditBot?: (botId: string) => void
  onDuplicateBot?: (botId: string) => void
}

const transactionsData: Transaction[] = [
    { id: "1", invoiceNo: 12345, dueDate:"02 Sept. 2025", amount: "N60,000.00", paymentMethod: "Debit Card", subscriptionType: "Debit Card", status: "Pending" },
    { id: "2", invoiceNo: 12345, dueDate:"02 Sept. 2025", amount: "N60,000.00", paymentMethod: "Debit Card", subscriptionType: "Debit Card", status: "Paid" },
    { id: "3", invoiceNo: 12345, dueDate:"02 Sept. 2025", amount: "N60,000.00", paymentMethod: "Debit Card", subscriptionType: "Debit Card", status: "Paid" },
    { id: "4", invoiceNo: 12345, dueDate:"02 Sept. 2025", amount: "N60,000.00", paymentMethod: "Debit Card", subscriptionType: "Debit Card", status: "Paid" },
    { id: "5", invoiceNo: 12345, dueDate:"02 Sept. 2025", amount: "N60,000.00", paymentMethod: "Debit Card", subscriptionType: "Debit Card", status: "Paid" },
    { id: "6", invoiceNo: 12345, dueDate:"02 Sept. 2025", amount: "N60,000.00", paymentMethod: "Debit Card", subscriptionType: "Debit Card", status: "Paid" },
    { id: "7", invoiceNo: 12345, dueDate:"02 Sept. 2025", amount: "N60,000.00", paymentMethod: "Debit Card", subscriptionType: "Debit Card", status: "Paid" },
    { id: "8", invoiceNo: 12345, dueDate:"02 Sept. 2025", amount: "N60,000.00", paymentMethod: "Debit Card", subscriptionType: "Debit Card", status: "Paid" },
    { id: "9", invoiceNo: 12345, dueDate:"02 Sept. 2025", amount: "N60,000.00", paymentMethod: "Debit Card", subscriptionType: "Debit Card", status: "Paid" },
    { id: "10", invoiceNo: 12345, dueDate:"02 Sept. 2025", amount: "N60,000.00", paymentMethod: "Debit Card", subscriptionType: "Debit Card", status: "Paid" },
]

const PaymentHistory = ({onEditBot, onDuplicateBot}:BotsContentProps) => {
    const [transactionData, ] = useState<Transaction[]>(transactionsData)
    const [selectedTransaction, setSelectedTransaction] = useState<string[]>([])


  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTransaction(transactionData.map((transaction) => transaction.id))
    } else {
      setSelectedTransaction([])
    }
  }

  const handleSelectBot = (transactionId: string, checked: boolean) => {
    if (checked) {
      setSelectedTransaction([...selectedTransaction, transactionId])
    } else {
      setSelectedTransaction(selectedTransaction.filter((id) => id !== transactionId))
    }
  }

  const handleEditBot = (transactionId: string) => {
    onEditBot?.(transactionId)
  }

  const handleDuplicateBot = (transactionId: string) => {
    onDuplicateBot?.(transactionId)
  }

  return (
    <section className='py-6 px-3 md:px-9 bg-background rounded-lg flex flex-col gap-y-5'>
        {/* Search and Filters */}
        <div className="w-full overflow-x-auto">
            <div className="flex items-center justify-between min-w-[640px] gap-4">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-sm">
                <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <Input placeholder="Search bot" className="py-2 pl-10 pr-4 border-gray-200 rounded-lg bg-gray-50 whitespace-nowrap" />
                </div>

                {/* Buttons and Select */}
                <div className="flex items-center gap-3 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort:</span>
                    <Select defaultValue="recent">
                    <SelectTrigger className="w-40">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                    </Select>
                </div>

                <Button variant="outline" size="sm" className="whitespace-nowrap">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                </Button>

                <Button variant="outline" size="sm" className="whitespace-nowrap">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                </Button>
                </div>
            </div>
        </div>


        {/* Bots Table */}
        {/* <Card> */}
            <Table>
            <TableHeader className="bg-gray-100 w-full">
                <TableRow>
                <TableHead className="min-w-12">
                    <Checkbox className='data-[state=checked]:bg-blue-600 ml-2 data-[state=checked]:border-blue-600' checked={selectedTransaction.length === transactionData.length} onCheckedChange={handleSelectAll} />
                </TableHead>
                <TableHead className='whitespace-nowrap min-w-[120px] text-ellipsis'>Invoice No.</TableHead>
                <TableHead  className='whitespace-nowrap min-w-[120px] text-ellipsis'>Amount</TableHead>
                <TableHead  className='whitespace-nowrap min-w-[120px] text-ellipsis'>Payment Method</TableHead>
                <TableHead  className='whitespace-nowrap min-w-[120px] text-ellipsis'>Subscription Type</TableHead>
                <TableHead  className='whitespace-nowrap min-w-[120px] text-ellipsis'>Status</TableHead>
                <TableHead className="w-10"><TableProperties size={18} className='ml-2' /></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactionData.map((transaction) => (
                <TableRow key={transaction.id} className='h-[60px]'>
                    <TableCell>
                    <Checkbox
                        checked={selectedTransaction.includes(transaction.id)}
                        className='data-[state=checked]:bg-blue-600 ml-2 data-[state=checked]:border-blue-600'
                        onCheckedChange={(checked) => handleSelectBot(transaction.id, checked as boolean)}
                    />
                    </TableCell>
                    <TableCell className='whitespace-nowrap min-w-[120px] text-ellipsis'>{transaction.invoiceNo}</TableCell>
                    <TableCell className="font-medium whitespace-nowrap text-ellipsis min-w-[120px]">{transaction.dueDate}</TableCell>
                    <TableCell className='whitespace-nowrap min-w-[120px] text-ellipsis'>{transaction.amount}</TableCell>
                    <TableCell className='whitespace-nowrap min-w-[120px] text-ellipsis'>{transaction.paymentMethod}</TableCell>
                    <TableCell className='whitespace-nowrap min-w-[120px] text-ellipsis'>
                    <Badge
                        variant="default"
                        className={`font-semibold text-md ${
                        transaction.status === "Paid"
                            ? "text-[#34A853]"
                            : "text-[#D39900]"
                        }`}
                    >
                        {transaction.status}
                    </Badge>
                    </TableCell>
                    <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <EllipsisVertical className="w-4 h-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='cursor-pointer'>
                            <DropdownMenuItem className='cursor-pointer' onClick={() => handleEditBot(transaction.id)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer' onClick={() => handleDuplicateBot(transaction.id)}>Download Receipt</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        {/* </Card> */}

        {/* Pagination */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="default" size="sm" className="text-white bg-blue-600">
                1
            </Button>
            <Button variant="outline" className='hidden lg:flex' size="sm">
                2
            </Button>
            <Button variant="outline" className='hidden lg:flex' size="sm">
                3
            </Button>
            <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
            </Button>
            </div>

            <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show:</span>
            <Select defaultValue="all">
                <SelectTrigger className="w-20">
                <SelectValue />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                </SelectContent>
            </Select>
            </div>
        </div>
    </section>
  )
}

export default PaymentHistory