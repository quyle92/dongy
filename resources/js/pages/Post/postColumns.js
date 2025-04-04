import {
    adminRoute,
    extractWithContext,
    removeHTMLTags,
} from "@/utils/helpers";
import startCase from "lodash/startCase";
import EditIcon from "@mui/icons-material/Edit";
import { Stack, Button } from "react-bootstrap";
import { router } from "@inertiajs/react";

export const columns = [
    {
        accessorKey: "Edit",
        header: startCase("Edit"),
        enableGlobalFilter: false,
        Cell: ({ cell }) => {
            const id = cell.row.original.id;
            return (
                <Stack direction="horizontal" gap={2}>
                    <Button
                        size="sm"
                        variant="info"
                        onClick={() => {
                            router.get(adminRoute(`/posts/${id}/edit`));
                        }}
                    >
                        <EditIcon />
                    </Button>
                </Stack>
            );
        },
        enableSorting: false,
        size: 50,
    },
    // {
    //     accessorKey: "id",
    //     header: "ID",
    //     size: 150,
    //     enableSorting: false,
    //     enableColumnFilter: false,
    // },
    {
        accessorKey: "title",
        header: "Title",
        size: 150,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ cell }) => {
            const permalink = cell.row.original.permalink;
            const title = cell.getValue();
            return (
                <a href={permalink} target="_blank" rel="noreferrer">
                    {title}
                </a>
            );
        },
    },
    {
        accessorKey: "category.name",
        header: "Category",
        size: 50,
        enableSorting: false,
        enableColumnFilter: false,
    },
    {
        accessorKey: "content",
        header: "Content",
        size: 150,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ table, cell }) => {
            /**
             * #created by chatGPT */
            const globalFilter = table.options.state.globalFilter;
            const content = removeHTMLTags(
                extractWithContext(cell.getValue(), globalFilter),
            );

            if (!globalFilter) return content; // No highlight if no search term

            // Highlight the search term
            const highlightedContent = content.replace(
                new RegExp(`(${globalFilter})`, "gi"),
                `<span style="background-color: yellow; font-weight: bold;">$1</span>`,
            );

            return (
                <span
                    dangerouslySetInnerHTML={{ __html: highlightedContent }}
                />
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        size: 50,
        enableSorting: false,
        enableColumnFilter: false,
    },
];
