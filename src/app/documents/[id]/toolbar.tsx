'use client'

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ChevronDownIcon, HighlighterIcon, ImageIcon, ItalicIcon, Link2Icon, ListIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, MinusIcon, PlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SearchIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon, UploadIcon,ListCollapseIcon } from 'lucide-react';
import React, { useState } from 'react'
import { type Level } from "@tiptap/extension-heading"
import { type ColorResult, CirclePicker, SketchPicker } from "react-color"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';


const LineHeightButton = () => {
    const { editor } = useEditorStore()

    const lineHeight = [
        {
            label: "Default",
            value: "normal"
        }
        ,
        {
            label: "Single",
            value: "1"
        },
       
        {
            label: "1.15",
            value: "1.15"
        },
        {
            label: "1.5",
            value: "1.5"
        },
        {
            label: "Double",
            value: "2"
        },
       
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={
                    "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                }>
                    <ListCollapseIcon className='size-4' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-2 flex flex-col gap-y-1'>
                {lineHeight.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => editor?.chain().focus().setLineHeight(value).run()}
                        className={
                            cn(
                                "flex items-center gap-x-2 p-2 hover:bg-gray-200/80 rounded",
                                editor?.getAttributes("paragraph").lineheight===value && "bg-gray-200/80"
                            )
                        }
                    >
                       
                        <span className='text-sm'> {label}</span>
                    </button>
                ))}

            </DropdownMenuContent>

        </DropdownMenu>
    )

}



const FontSizeButton = () => {
    const { editor } = useEditorStore()

    const currentFontSize = editor?.getAttributes("textStyle").fontSize ? editor.getAttributes("textStyle").fontSize.replace("px", "") : "16"


    const [fontSize, setFontSize] = useState(currentFontSize);
    const [inputValue, setInputValue] = useState(fontSize);

    const [isEditing, setIsEditing] = useState(false);

    const updateFontSize = (newSize: string) => {
        const size = parseInt(newSize);
        if (!isNaN(size) && size > 0) {
            editor?.chain().focus().setFontSize(`${size}px`).run();
            setFontSize(newSize);
            setInputValue(newSize);
            setIsEditing(false)
        }
    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleInputBlur = () => {
        updateFontSize(inputValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            updateFontSize(inputValue);
            editor?.commands.focus();
        }
    }


    const Increment = () => {
        const newSize = parseInt(fontSize) + 1;
        updateFontSize(newSize.toString())
    }
    const decrement = () => {
        const newSize = parseInt(fontSize) - 1;
        if (newSize > 0) {

            updateFontSize(newSize.toString())
        }
    }


    return (
        <div className='flex items-center gap-x-0.5'>
            <button onClick={decrement} className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 ">
                <MinusIcon />
            </button>
            {
                isEditing ? (
                    <input type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={handleKeyDown}
                        className="h-7 text-center min-w-10 text-sm rounded-sm border border-neutral-400 bg-transparent focus:outline-none focus:ring-0 "
                    />
                ) : (
                    <button
                        onClick={() => {
                            setIsEditing(true);
                            setFontSize(currentFontSize)
                        }}
                        className="h-7 text-center min-w-10 text-sm rounded-sm border border-neutral-400 bg-transparent cursor-text  ">
                        {currentFontSize}
                    </button>
                )
            }

            <button onClick={Increment} className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 ">
                <PlusIcon />
            </button>

        </div>
    )

}



const ListButton = () => {
    const { editor } = useEditorStore()

    const list = [
        {
            label: "Bullet List",
            icon: ListIcon,
            isActive: () => editor?.isActive("bulletList"),
            onClick: () => editor?.chain().focus().toggleBulletList().run()
        },
        {
            label: "Order List",
            icon: ListIcon,
            isActive: () => editor?.isActive("orderList"),
            onClick: () => editor?.chain().focus().toggleOrderedList().run()
        }
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={
                    "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                }>
                    <ListIcon className='size-4' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-2 flex flex-col gap-y-1'>
                {list.map(({ label, icon: Icon, onClick, isActive }) => (
                    <button
                        key={label}
                        onClick={onClick}
                        className={
                            cn(
                                "flex items-center gap-x-2 p-2 hover:bg-gray-200/80 rounded",
                                isActive() && "bg-gray-200/80"
                            )
                        }
                    >
                        <Icon className="size-4" />
                        <span className='text-sm'> {label}</span>
                    </button>
                ))}

            </DropdownMenuContent>

        </DropdownMenu>
    )

}
const AlignButton = () => {
    const { editor } = useEditorStore()

    const alignments = [
        {
            label: "Align Left",
            value: "left",
            icon: AlignLeftIcon
        }
        ,
        {
            label: "Align Center",
            value: "center",
            icon: AlignCenterIcon
        }
        ,
        {
            label: "Align Right",
            value: "right",
            icon: AlignRightIcon
        }
        ,
        {
            label: "Align Justify",
            value: "justify",
            icon: AlignJustifyIcon
        }
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={
                    "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                }>
                    <AlignLeftIcon className='size-4' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-2 flex flex-col gap-y-1'>
                {alignments.map(({ label, value, icon: Icon }) => (
                    <button
                        key={value}
                        onClick={() => editor?.chain().focus().setTextAlign(value).run()}
                        className={
                            cn(
                                "flex items-center gap-x-2 p-2 hover:bg-gray-200/80 rounded",
                                editor?.isActive({ textAlign: value }) && "bg-gray-200/80"
                            )
                        }
                    >
                        <Icon className="size-4" />
                        <span className='text-sm'> {label}</span>
                    </button>
                ))}

            </DropdownMenuContent>

        </DropdownMenu>
    )

}

const ImageButton = () => {
    const { editor } = useEditorStore()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [imageUrl, setImageUrl] = useState(editor?.getAttributes("link").href || "")

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run();

    }

    const onUpload = () => {
        // Create an input element for file selection
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        // Handle the change event when a file is selected
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]; // Get the selected file
            if (file) {
                const newImageUrl = URL.createObjectURL(file); // Create a URL for the file
                setImageUrl(newImageUrl); // Set the image URL in state
            }
        };

        // Trigger the file selection dialog
        input.click();
    };

    const handleimageUrlSubmit = () => {
        if (imageUrl) {
            onChange(imageUrl);
            setImageUrl("");
            setIsDialogOpen(false)
        }
    }



    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className={
                        "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                    }>
                        <ImageIcon className='size-4' />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadIcon className='Size-4 mr-2' />
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon className='Size-4 mr-2' />
                        Past Image Url
                    </DropdownMenuItem>

                </DropdownMenuContent>

            </DropdownMenu>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert Image Url</DialogTitle>
                    </DialogHeader>
                    <Input placeholder='Image Url' value={imageUrl}
                        onChange={(e) => {
                            setImageUrl(e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleimageUrlSubmit();
                            }
                        }}
                    />
                    <DialogFooter>
                        <Button onClick={handleimageUrlSubmit}>
                            Insert
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )

}
const LinkButton = () => {
    const { editor } = useEditorStore()
    const [value, setValue] = useState(editor?.getAttributes("link").href || "")

    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
        setValue("")
    }


    return (
        <DropdownMenu onOpenChange={(open) => {
            if (open) {
                setValue(editor?.getAttributes("link").href || "")
            }
        }}>
            <DropdownMenuTrigger asChild>
                <button className={
                    "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                }>
                    <Link2Icon className='size-4' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-2.5 flex items-center gap-x-2.5'>
                <Input placeholder='Url' value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button onClick={() => onChange(value)} >
                    Apply
                </Button>
            </DropdownMenuContent>

        </DropdownMenu>
    )

}
// TODO: You can Change acc to you SketchPicker Color / CirclePicker Color
const HighLightColorButton = () => {
    const { editor } = useEditorStore()
    const value = editor?.getAttributes("highlight").color || "#FFFFFF"

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={
                    "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                }>
                    <HighlighterIcon className='size-4' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-2.5 '>
                <SketchPicker color={value} onChange={onChange} />
            </DropdownMenuContent>

        </DropdownMenu>
    )

}
const TextColorButton = () => {
    const { editor } = useEditorStore()
    const value = editor?.getAttributes("textStyle").color || "#000000"

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={
                    "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                }>
                    <span className='text-xs'>
                        A
                    </span>

                    <div className='h-0.5 w-full' style={{ backgroundColor: value }}>

                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-2.5 '>
                <CirclePicker color={value} onChange={onChange} />
            </DropdownMenuContent>

        </DropdownMenu>
    )

}

const HeadingLevelButton = () => {
    const { editor } = useEditorStore()

    const headings = [
        {
            label: "Normal text", value: 0, fontSize: "16px",
        },
        {
            label: "Heading 1", value: 1, fontSize: "32px",
        },
        {
            label: "Heading 2", value: 2, fontSize: "24px",
        },
        {
            label: "Heading 3", value: 3, fontSize: "20px",
        },
        {
            label: "Heading 4", value: 4, fontSize: "18px",
        },
        {
            label: "Heading 5", value: 5, fontSize: "16px",
        },
        {
            label: "Heading 6", value: 6, fontSize: "14px",
        },
    ]

    const getCurrentHeading = () => {
        for (let level = 1; level <= 6; level++) {
            if (editor?.isActive("heading", { level })) {
                return `Heading ${level}`
            }
        }

        return 'Normal text'
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={
                    "h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                }>
                    <span className='truncate'>
                        {
                            getCurrentHeading()
                        }
                    </span>
                    <ChevronDownIcon className='ml-2 size-4 shrink-0' />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {
                    headings.map(({ label, value, fontSize }) => {
                        return (
                            <button
                                onClick={() => {
                                    if (value == 0) {
                                        editor?.chain().focus().setParagraph().run()
                                    } else {
                                        editor?.chain().focus().toggleHeading({ level: value as Level }).run()
                                    }
                                }}
                                key={value}
                                className={cn(
                                    "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                    (value === 0 && !editor?.isActive("heading") || editor?.isActive("heading", { level: value }) && 'bg-neutral-200/80')
                                )}
                                style={{
                                    fontSize
                                }}
                            >
                                {label}
                            </button>
                        )
                    })
                }
            </DropdownMenuContent>

        </DropdownMenu>
    )
}

const FontFamilyButton = () => {

    const { editor } = useEditorStore()

    const fonts = [
        {
            label: "Arial", value: "Arial",
        },
        {
            label: "Times New Roman", value: "Times New Roman",
        },
        {
            label: "Courier New", value: "Courier New",
        },
        {
            label: "Georgia", value: "Georgia",
        },
        {
            label: "Verdana", value: "Verdana",
        }
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={
                    "h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                }>
                    <span className='truncate'>
                        {
                            editor?.getAttributes("textstyle").fontFamily || "Arial"
                        }
                    </span>
                    <ChevronDownIcon className='ml-2 size-4 shrink-0' />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {
                    fonts.map(({ label, value }) => {
                        return (
                            <button
                                onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                                key={value}
                                className={cn(
                                    "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                    editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                                )}
                                style={{
                                    fontFamily: value
                                }}
                            >
                                <span className='text-sm'>{label}</span>
                            </button>
                        )
                    })
                }
            </DropdownMenuContent>

        </DropdownMenu>
    )
}

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}

const ToolBarButton = ({
    onClick,
    isActive,
    icon: Icon
}: ToolbarButtonProps) => {
    return (
        <button className={cn(
            "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 ",
            isActive && "bg-neutral-200/80"
        )} onClick={onClick}>
            <Icon className='size-4' />
        </button>
    )
}

const Toolbar = () => {

    const { editor } = useEditorStore()

    console.log(editor)
    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean
    }[][] = [
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run(),
                }
                ,
                {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run(),
                }
                ,
                {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => window.print(),
                }
                ,
                {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const value = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", value === "false" ? "true" : "false")
                    },
                }
            ],
            [
                {
                    label: "Bold",
                    icon: BoldIcon,
                    isActive: editor?.isActive("bold"),
                    onClick: () => {
                        editor?.chain().focus().toggleBold().run()
                    },
                }
                ,
                {
                    label: "Italic",
                    icon: ItalicIcon,
                    isActive: editor?.isActive("italic"),
                    onClick: () => {
                        editor?.chain().focus().toggleItalic().run()
                    },
                }
                ,
                {
                    label: "Underline",
                    icon: UnderlineIcon,
                    isActive: editor?.isActive("underline"),
                    onClick: () => {
                        editor?.chain().focus().toggleUnderline().run()
                    },
                }
            ],
            [
                {
                    label: "Comment",
                    icon: MessageSquarePlusIcon,
                    isActive: false,
                    onClick: () => console.log("yes"),
                }

                ,
                {
                    label: "List Todo",
                    icon: ListTodoIcon,
                    isActive: editor?.isActive("taskList"),
                    onClick: () => editor?.chain().focus().toggleTaskList().run(),
                }
                ,
                {
                    label: "Remove Formatting",
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().focus().unsetAllMarks().run(),
                }
            ]
        ];

    return (
        <div
            className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'
        >
            {
                sections[0].map((item) => (
                    <ToolBarButton key={item.label} {...item} />
                ))
            }

            <Separator orientation="vertical" className='h-6 bg-neutral-300' />
            <FontFamilyButton />
            <Separator orientation="vertical" className='h-6 bg-neutral-300' />
            <HeadingLevelButton />

            <Separator orientation="vertical" className='h-6 bg-neutral-300' />
            {/* TODO: font size */}
            <Separator orientation="vertical" className='h-6 bg-neutral-300' />
            {
                sections[1].map((item) => (
                    <ToolBarButton key={item.label} {...item} />
                ))
            }


            {/*  ToDo: text-color */}
            <TextColorButton />
            {/*  ToDo: Highliter color */}
            <HighLightColorButton />
            <Separator orientation="vertical" className='h-6 bg-neutral-300' />
            {/*  ToDo: Link  */}
            <LinkButton />
            {/*  ToDo: Image */}
            <ImageButton />
            {/*  ToDo: Align */}
            <AlignButton />
            {/*  ToDo: Line Hight */}
            {/*  ToDo: List */}
            <ListButton />

            <FontSizeButton />
<LineHeightButton/>

            {
                sections[2].map((item) => (
                    <ToolBarButton key={item.label} {...item} />
                ))
            }

        </div>
    )
}

export default Toolbar;
