interface Customer {
   _id: string
   name: string
   email: string
   balance: number
}

interface CustomerTableRowProps {
   customer: Customer
}

interface CustomerTableProps {
   customers: Customer[]
}

interface CustomerCardProps {
   customer: Customer
   onClick: MouseEventHandler<HTMLDivElement>
}

interface Transfer {
   _id: string
   from: string
   to: string
   amount: number
   date: string
}

interface TransferTableRowProps {
   transfer: Transfer
}

interface TransferTableProps {
   transfers: Transfer[]
}