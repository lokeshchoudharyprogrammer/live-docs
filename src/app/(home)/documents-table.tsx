"use client"

import { PaginationStatus } from "convex/react"
import { Doc } from "../../../convex/_generated/dataModel"
import { LoaderIcon } from "lucide-react"
import {Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table"
import { DocumentRow } from "./document-row"
import { Button } from "@/components/ui/button"

interface Props {
    documents: Doc<"documents"> | undefined
    loadMore: (numItems: number) => void
    status: PaginationStatus
}

export const DocumentsTable = ({ documents, loadMore, status }: Props) => {

    return (
        <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
            {documents === undefined ? (
                <div className="flex justify-center items-center h-24">
                    <LoaderIcon className="animate-spin text-muted-foreground size-5" />
                </div>
            ) : (
                <>
                <Table>
                
                    <TableHeader>
                        <TableRow className="hover:bg-transparen border-none">
                            <TableHead > {/* Add padding to headers */}
                                Name
                            </TableHead>
                            <TableHead > {/* Add padding to headers */}
                                &nbsp;
                            </TableHead>
                            <TableHead className="hidden md:table-cell"> {/* Add padding to headers */}
                                Shared
                            </TableHead>
                            <TableHead className="hidden md:table-cell"> {/* Add padding to headers */}
                                Created at
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    {/* @ts-ignore */}
                    {documents.length === 0 ? (
                        <TableBody>
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                    No Docs Found
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : (
                        <TableBody>
                              {/* @ts-ignore */}
                           {documents.map((doc) => {
                               return <DocumentRow key={doc._id} document={doc} />
                           })}
                        </TableBody>
                    )}
                    </Table>
                </>
            )}
            <div className="flex items-center justify-center">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={()=>loadMore(5)}
                    disabled={status!=="CanLoadMore"}
                >
                    {status==="CanLoadMore"?"Load More":"End of results"}
               
                </Button>
        </div>
        </div>
    )
}
