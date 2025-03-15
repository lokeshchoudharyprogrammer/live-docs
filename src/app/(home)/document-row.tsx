import { TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table"
import { Doc } from "../../../convex/_generated/dataModel"
import { SiGoogledocs } from "react-icons/si"
import { Building2Icon, CircleUserIcon, MoreVertical } from "lucide-react";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { DropDownMenu } from "./DropDownMenu";
import { useRouter } from "next/navigation";



interface Props {
    document: Doc<"documents">
}

export const DocumentRow = ({ document }: Props) => {

    const router = useRouter()

    const onNewTabClick = (id: string) => {
        window.open(`/documents/${id}`, "_blank")
    }

  

    return (
        <TableRow onClick={() => router.push(`/documents/${document._id}`)} className="cursor:pointer">
            <TableCell className="w-[50px]">
                <SiGoogledocs className="size-6 fill-blue-500" />
            </TableCell>
            <TableCell className="font-medium md:w-[45%] cursor:pointer">
                {document.title}
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:flex items-center gap-2 cursor:pointer">
                {document.organizationId ? <Building2Icon className="size-4" /> : <CircleUserIcon className="size-4" />}
                {document.organizationId ? "Organization" : "Personal"}
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:table-cell">
                {format(new Date(document._creationTime), "MMM dd, yyyy")}

            </TableCell>
            <TableCell className="flex ml-auto justify-end">
                <DropDownMenu documentId={document._id} title={document.title} onNewTab={onNewTabClick} />
            </TableCell>
        </TableRow>
    )
}